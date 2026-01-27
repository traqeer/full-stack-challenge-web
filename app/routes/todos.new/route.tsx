'use client';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useTranslations } from '~/lib/i18n/hooks';
import { useTodos } from '~/lib/todos/context';
import translations from '../todos/translations';

export default function TodoCreateEdit() {
  const t = useTranslations(translations);
  const { createTodo, updateTodo, todos } = useTodos();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const editId = params.get('id');

  const existing = todos.find((t0) => t0.id === editId);

  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setDescription(existing.description || '');
    }
  }, [existing]);

  const onSave = async () => {
    if (editId) {
      await updateTodo(editId, { title, description });
    } else {
      await createTodo({ title, description });
    }
    navigate('/todos');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{editId ? t('edit') : t('create')}</h1>

      <div className="mt-4 space-y-3 max-w-lg">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="flex gap-2">
          <Button className="btn" onClick={onSave}>
            Save
          </Button>
          <Button className="btn" onClick={() => navigate('/todos')}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
