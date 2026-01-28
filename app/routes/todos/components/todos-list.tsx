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

    const visibleIds = visibleTodos.map((t) => t.id);
    const oldIndex = visibleIds.indexOf(String(active.id));
    const newIndex = visibleIds.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    const newVisible = arrayMove(visibleTodos.slice(), oldIndex, newIndex);

    const base = todos.slice().sort((a, b) => a.order - b.order);
    const minPos = Math.min(...base.map((t, i) => (visibleIds.includes(t.id) ? i : Infinity)));
    const baseWithoutVisible = base.filter((t) => !visibleIds.includes(t.id));
    const newBase = [
      ...baseWithoutVisible.slice(0, minPos),
      ...newVisible,
      ...baseWithoutVisible.slice(minPos),
    ];

    if (reorderTodos) {
      reorderTodos(newBase.map((t) => t.id));
    }

    (async () => {
      try {
        await Promise.all(
          newBase.map((t, i) =>
            import('~/lib/apis/backend').then(({ todoApi }) =>
              todoApi.updateTodo(t.id, { order: i })
            )
          )
        );
      } catch (err) {
        refresh().catch(() => {});
      }
    })();
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
