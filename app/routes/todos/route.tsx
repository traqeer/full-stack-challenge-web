'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { useTranslations } from '~/lib/i18n/hooks';
import { TodosProvider, useTodos } from './components/context';
import TodoDetailModal from './components/todo-detail-modal';
import TodoFormModal from './components/todo-form-modal';
import translations from './translations';

function TodosList() {
  const { todos, loading, createTodo, updateTodo } = useTodos();
  const t = useTranslations(translations);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDetailId, setShowDetailId] = useState<string | null>(null);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <Button onClick={handleCreate}>{t('create')}</Button>
      </div>

      <ul className="mt-6 space-y-3">
        {todos.length === 0 && <li>{t('noTodos')}</li>}
        {todos.map((todo) => (
          <li key={todo.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{todo.title}</div>
              {todo.description && <div className="text-sm text-gray-600">{todo.description}</div>}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleDetail(todo.id)}>{t('details')}</Button>
              <Button onClick={() => handleEdit(todo.id)}>{t('edit')}</Button>
            </div>
          </li>
        ))}
      </ul>

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
    </div>
  );
}

export default function TodosRouteWrapper() {
  return (
    <TodosProvider>
      <TodosList />
    </TodosProvider>
  );
}
