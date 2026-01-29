import { Button } from '~/components/ui/button';
import type { TodoDTO } from '~/lib/apis/todos/types';
import { useTranslations } from '~/lib/i18n/hooks';
import type { Translations } from '~/lib/i18n/types';

const localTranslations: Translations = {
  en: {
    todoNotFound: 'Todo not found',
    'button.close': 'Close',
    createdOn: 'Created',
  },
  es: {
    todoNotFound: 'Tarea no encontrada',
    'button.close': 'Cerrar',
    createdOn: 'Creado',
  },
};

export function TodoDetailModal({
  open,
  onClose,
  todo,
}: {
  open: boolean;
  onClose: () => void;
  todo?: TodoDTO;
}) {
  const t = useTranslations(localTranslations);

  if (!open) return null;

  if (!todo) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative z-50 w-full max-w-md rounded bg-white p-6 shadow-lg">
          <div>{t('todoNotFound')}</div>
          <div className="mt-4 flex justify-end">
            <Button onClick={onClose}>{t('button.close')}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-50 w-full max-w-md rounded bg-white p-6 shadow-lg">
        <h3 className="text-lg font-medium">{todo.title}</h3>
        {todo.description && <p className="mt-2 text-sm text-gray-700">{todo.description}</p>}
        <p className="mt-4 text-xs text-gray-500">
          {t('createdOn')}: {new Date(todo.createdAt).toLocaleString()}
        </p>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>{t('button.close')}</Button>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailModal;
