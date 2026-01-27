import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import type { CreateTodoDTO } from '~/lib/backend/types';
import { useTranslations } from '~/lib/i18n/hooks';
import type { Translations } from '~/lib/i18n/types';

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
  initial,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  initial?: { title?: string; description?: string };
  onSave: (payload: CreateTodoDTO) => Promise<void> | void;
}) {
  const t = useTranslations(localTranslations);
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || '');
      setDescription(initial?.description || '');
    }
  }, [open, initial]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg rounded bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium">{initial ? t('form.edit') : t('form.new')}</h3>
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
              await onSave({ title, description });
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

export default TodoFormModal;
