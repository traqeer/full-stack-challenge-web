'use client';

import { useState } from 'react';
import { PageLayout } from '~/components/PageLayout';
import { SidebarProvider } from '~/components/ui/sidebar';
import { useTranslations } from '~/lib/i18n/hooks';
import { cn } from '~/lib/utils';
import { LayoutTodos } from './components/sidebar';
import { TodoDetailModal } from './components/todo-detail-modal';
import { TodoFormModal } from './components/todo-form-modal';
import { TodosList } from './components/todos-list';
import { TodosProvider, useTodos } from './context';

const translations = {
  en: {
    create: 'Create Todo',
  },
  es: {
    create: 'Crear Tarea',
  },
};

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

function TodosRoute() {
  const {
    todos,
    filter,
  } = useTodos();
  const t = useTranslations(translations);
  const filterTitles = useTranslations(filterTitleTranslations);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [showDetailId, setShowDetailId] = useState<string | undefined>(undefined);

  const handleCreate = () => {
    setEditingId(undefined);
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
    <div className="flex min-h-svh w-full">
      <LayoutTodos />
      <div
        id="content"
        className={cn(
          'flex h-svh flex-col w-full transition-[width] duration-200 ease-linear',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]'
        )}
      >
        <PageLayout
          title={filterTitles(filter)}
          onAction={handleCreate}
          actionLabel={t('create')}
        >
          <TodosList onEdit={handleEdit} onView={handleDetail} />
        </PageLayout>
      </div>

      <TodoFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        editingId={editingId}
      />

      <TodoDetailModal
        open={!!showDetailId}
        onClose={() => setShowDetailId(undefined)}
        todo={todos.find((t) => t.id === showDetailId)}
      />
    </div>
  );
}

export default function TodosRouteWrapper() {
  return (
    <SidebarProvider>
      <TodosProvider>
        <TodosRoute />
      </TodosProvider>
    </SidebarProvider>
  );
}
