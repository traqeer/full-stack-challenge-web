import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { TaskItem } from '~/components/TaskItem';
import { todoApi } from '~/lib/apis/todos';
import { useTranslations } from '~/lib/i18n/hooks';
import { useTodos } from '../context';

const translations = {
  en: {
    noTodos: 'No todos found.',
  },
  es: {
    noTodos: 'No se encontraron tareas.',
  },
};

export function TodosList({
  onEdit,
  onView,
}: {
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}) {
  const {
    todos,
    loading,
    toggleCompleted,
    visibleTodos,
    filter,
    updateTodos,
  } = useTodos();
  const t = useTranslations(translations);

  const sensors = useSensors(useSensor(PointerSensor));

  if (loading) return <div className="p-8">Loading...</div>;

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedId = String(active.id);
    const targetId = String(over.id);

    const draggedIndex = visibleTodos.findIndex((t) => t.id === draggedId);
    const targetIndex = visibleTodos.findIndex((t) => t.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const reorderedVisible = arrayMove(visibleTodos, draggedIndex, targetIndex);

    const allTodosSorted = [...todos].sort((a, b) => a.order - b.order);
    const visibleIds = new Set(visibleTodos.map((t) => t.id));

    const hiddenTodos = allTodosSorted.filter((t) => !visibleIds.has(t.id));

    const firstVisibleOriginalIndex = allTodosSorted.findIndex((t) => visibleIds.has(t.id));
    const newGlobalOrder = [
      ...hiddenTodos.slice(0, firstVisibleOriginalIndex),
      ...reorderedVisible,
      ...hiddenTodos.slice(firstVisibleOriginalIndex),
    ];

    const previousTodos = todos;
    updateTodos(() => {
      const map = Object.fromEntries(todos.map((t) => [t.id, t]));
      return newGlobalOrder.map((todo, i) => ({ ...map[todo.id], order: i }));
    });

    try {
      const payload = { items: newGlobalOrder.map((todo, index) => ({ id: todo.id, order: index })) };
      await todoApi.reorderTodos(payload);
    } catch (err) {
      updateTodos(() => previousTodos);
      throw err;
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={visibleTodos.map((v) => v.id)} strategy={rectSortingStrategy}>
        <ul className="space-y-3">
          {visibleTodos.length === 0 && <li>{t('noTodos')}</li>}
          {visibleTodos.map((todo) => (
            <li key={todo.id}>
              <TaskItem
                task={todo}
                onToggle={() => toggleCompleted(todo.id)}
                onEdit={() => onEdit(todo.id)}
                onView={() => onView(todo.id)}
              />
            </li>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
