'use client';

import { useLocation, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { useTranslations } from '~/lib/i18n/hooks';
import { useTodos } from '~/lib/todos/context';
import translations from '../todos/translations';

export default function TodoDetail() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const { todos } = useTodos();
  const t = useTranslations(translations);
  const navigate = useNavigate();

  const todo = todos.find((t0) => t0.id === id);

  if (!todo) {
    return (
      <div className="p-6">
        <div>Todo not found</div>
        <Button className="mt-4" onClick={() => navigate('/todos')}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{todo.title}</h1>
      {todo.description && <p className="mt-2 text-gray-700">{todo.description}</p>}
      <p className="mt-4 text-sm text-gray-500">
        Created: {new Date(todo.createdAt).toLocaleString()}
      </p>
      <div className="mt-4">
        <Button className="btn" onClick={() => navigate('/todos')}>
          Back
        </Button>
      </div>
    </div>
  );
}
