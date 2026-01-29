import { CheckCircle, CheckSquare, Clock } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar
} from '~/components/ui/sidebar';
import { useTranslations } from '~/lib/i18n/hooks';
import { useTodos } from '../context';

const filterTranslations = {
  en: {
    filters: 'Filters',
    'filter.all': 'All',
    'filter.pending': 'Pending',
    'filter.completed': 'Completed',
  },
  es: {
    filters: 'Filtros',
    'filter.all': 'Todas',
    'filter.pending': 'Pendientes',
    'filter.completed': 'Completadas',
  },
};

export function TodosFilter() {
  const { filter, setFilter, counts } = useTodos();
  const { state } = useSidebar();
  const t = useTranslations(filterTranslations);
  const isExpanded = state === 'expanded';

  return (
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
  );
}