import { ListTodo } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '~/components/ui/sidebar';
import { TodosCounter } from './todos-counter';
import { TodosFilter } from './todos-filter';

export function LayoutTodos() {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold flex items-center gap-2">
            {isExpanded && <ListTodo className="h-5 w-5" />}
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <TodosFilter />
      </SidebarContent>
      {isExpanded && <TodosCounter />}
    </Sidebar>
  );
}
