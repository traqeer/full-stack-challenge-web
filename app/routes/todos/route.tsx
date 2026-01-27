'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { useTranslations } from '~/lib/i18n/hooks';
import { TodosProvider, useTodos } from '~/lib/todos/context';
import translations from './translations';

function TodosList() {
  const { todos, loading } = useTodos();
  const t = useTranslations(translations);
  const navigate = useNavigate();

  useEffect(() => {
    // ensure page title
    document.title = t('title');
  }, [t]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <Button onClick={() => navigate('/todos/new')}>{t('create')}</Button>
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
              <Button onClick={() => navigate(`/todos/detail?id=${todo.id}`)}>
                {t('details')}
              </Button>
              <Button onClick={() => navigate(`/todos/new?id=${todo.id}`)}>{t('edit')}</Button>
            </div>
          </li>
        ))}
      </ul>
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
