import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { useTranslations } from '~/lib/i18n/hooks';
import translations from '../translations';
import { useTodos } from './context';
import TodoDetailModal from './todo-detail-modal';
import { TodoFormModal } from './todo-form-modal';
import TodoItem from './todo-item';

const filterTitleTranslations = {
  en: {
    all: 'All Todos',
    pending: 'Pending',
    completed: 'Completed',
  },
  es: {
    all: 'Todas las tareas',
    pending: 'Pendientes',
    completed: 'Completadas',
  },
};

export function TodosList() {
  const { todos, loading, createTodo, updateTodo, refresh, reorderTodos, visibleTodos, filter } =
    useTodos();
  const t = useTranslations(translations);
  const filterTitles = useTranslations(filterTitleTranslations);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDetailId, setShowDetailId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  if (loading) return <div className="p-8">Loading...</div>;

  const handleCreate = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDetail = (id: string) => {
    setShowDetailId(id);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Find the dragged todo's position in visible todos
    const draggedId = String(active.id);
    const targetId = String(over.id);

    const draggedIndex = visibleTodos.findIndex((t) => t.id === draggedId);
    const targetIndex = visibleTodos.findIndex((t) => t.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Reorder only the visible todos
    const reorderedVisible = arrayMove(visibleTodos, draggedIndex, targetIndex);

    // Calculate new global order: insert reordered visible todos back into full list
    const allTodosSorted = [...todos].sort((a, b) => a.order - b.order);
    const visibleIds = new Set(visibleTodos.map((t) => t.id));

    // Remove visible todos from the sorted list
    const hiddenTodos = allTodosSorted.filter((t) => !visibleIds.has(t.id));

    // Find where to insert the reordered visible todos
    const firstVisibleOriginalIndex = allTodosSorted.findIndex((t) => visibleIds.has(t.id));
    const newGlobalOrder = [
      ...hiddenTodos.slice(0, firstVisibleOriginalIndex),
      ...reorderedVisible,
      ...hiddenTodos.slice(firstVisibleOriginalIndex),
    ];

    // Update local state immediately
    if (reorderTodos) {
      reorderTodos(newGlobalOrder.map((t) => t.id));
    }

    // Update backend with new order
    try {
      await Promise.all(
        newGlobalOrder.map((todo, index) =>
          import('~/lib/apis/todos').then(({ todoApi }) =>
            todoApi.updateTodo(todo.id, { order: index })
          )
        )
      );
    } catch (err) {
      // Revert on error
      await refresh();
    }
  };

  return (
    <main className=" p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{filterTitles(filter)}</h1>
        <Button onClick={handleCreate}>{t('create')}</Button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={visibleTodos.map((v) => v.id)} strategy={rectSortingStrategy}>
          <ul className="mt-6 space-y-3">
            {visibleTodos.length === 0 && <li>{t('noTodos')}</li>}
            {visibleTodos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  onToggle={async () => {
                    await updateTodo(todo.id, { completed: !todo.completed });
                  }}
                  onEdit={() => handleEdit(todo.id)}
                  onDetail={() => handleDetail(todo.id)}
                />
              </li>
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <TodoFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        initial={editingId ? todos.find((t) => t.id === editingId) : undefined}
        onSave={async (payload) => {
          if (editingId) {
            await updateTodo(editingId, payload as any);
          } else {
            await createTodo(payload);
          }
        }}
      />

      <TodoDetailModal
        open={!!showDetailId}
        onClose={() => setShowDetailId(null)}
        todo={todos.find((t) => t.id === showDetailId)}
      />
    </main>
  );
}
