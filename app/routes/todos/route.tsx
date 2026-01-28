'use client';

import { SidebarProvider } from '~/components/ui/sidebar';
import { cn } from '~/lib/utils';
import { TodosProvider } from './components/context';
import { LayoutTodos } from './components/sidebar';
import { TodosList } from './components/todos-list';

export default function TodosRouteWrapper() {
  return (
    <SidebarProvider>
      <TodosProvider>
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
            {' '}
            <TodosList />
          </div>
        </div>
      </TodosProvider>
    </SidebarProvider>
  );
}
