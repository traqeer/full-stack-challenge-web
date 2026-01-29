import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useTranslations } from '~/lib/i18n/hooks';
import type { Translations } from '~/lib/i18n/types';
import { useTodos } from '../context';

const localTranslations: Translations = {
  en: {
    'form.new': 'New todo',
    'form.edit': 'Edit todo',
    'button.cancel': 'Cancel',
    'button.save': 'Save',
    'placeholder.title': 'Title',
    'placeholder.description': 'Description',
  },
  es: {
    'form.new': 'Tarea nueva',
    'form.edit': 'Editar tarea',
    'button.cancel': 'Cancelar',
    'button.save': 'Guardar',
    'placeholder.title': 'Título',
    'placeholder.description': 'Descripción',
  },
};

export function TodoFormModal({
  open,
  onClose,
  editingId,
}: {
  open: boolean;
  onClose: () => void;
  editingId?: string;
}) {
  const { createTodo, updateTodo, todos } = useTodos();
  const t = useTranslations(localTranslations);
  const editingTodo = editingId ? todos.find((t) => t.id === editingId) : null;
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');

  useEffect(() => {
    if (open) {
      const currentTodo = editingId ? todos.find((t) => t.id === editingId) : null;
      setTitle(currentTodo?.title || '');
      setDescription(currentTodo?.description || '');
    }
  }, [open, editingId, todos]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg rounded bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium">{editingId ? t('form.edit') : t('form.new')}</h3>
        <div className="mt-4 space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('placeholder.title')}
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('placeholder.description')}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {t('button.cancel')}
          </Button>
          <Button
            onClick={async () => {
              if (editingId) {
                await updateTodo(editingId, { title, description });
              } else {
                await createTodo({ title, description });
              }
              onClose();
            }}
          >
            {t('button.save')}
          </Button>
        </div>
      </div>
    </div>
  );
}
