import { CheckCircle, CheckSquare, Clock, ListTodo } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '~/components/ui/sidebar';
import { useTranslations } from '~/lib/i18n/hooks';
import { useTodos } from './context';

const sidebarTranslations = {
  en: {
    title: 'Todos',
    filters: 'Filters',
    'filter.all': 'All',
    'filter.pending': 'Pending',
    'filter.completed': 'Completed',
    total: 'Total:',
    completed_label: 'Completed:',
  },
  es: {
    title: 'Tareas',
    filters: 'Filtros',
    'filter.all': 'Todas',
    'filter.pending': 'Pendientes',
    'filter.completed': 'Completadas',
    total: 'Total:',
    completed_label: 'Completado:',
  },
};

export function LayoutTodos() {
  const { filter, setFilter, counts } = useTodos();
  const { state } = useSidebar();
  const t = useTranslations(sidebarTranslations);
  const isExpanded = state === 'expanded';

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold flex items-center gap-2">
            {isExpanded && (
              <>
                <ListTodo className="h-5 w-5" />
                {t('title')}
              </>
            )}
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {isExpanded && <SidebarGroupLabel>{t('filters')}</SidebarGroupLabel>}
          <SidebarMenu>
            <SidebarMenuButton
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-accent' : ''}
            >
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                {isExpanded && (
                  <span>
                    {t('filter.all')} ({counts.all})
                  </span>
                )}
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={() => setFilter('pending')}
              className={filter === 'pending' ? 'bg-accent' : ''}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {isExpanded && (
                  <span>
                    {t('filter.pending')} ({counts.pending})
                  </span>
                )}
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'bg-accent' : ''}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {isExpanded && (
                  <span>
                    {t('filter.completed')} ({counts.completed})
                  </span>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {isExpanded && (
        <SidebarFooter>
          <div className="p-4 text-sm text-muted-foreground">
            <div className="flex justify-between items-center">
              <span>{t('total')}</span>
              <span className="font-medium">{counts.all}</span>
            </div>
            {counts.all > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-xs">
                  <span>{t('completed_label')}</span>
                  <span>{Math.round((counts.completed / counts.all) * 100)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 mt-1">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(counts.completed / counts.all) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
