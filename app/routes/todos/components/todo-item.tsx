import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Eye } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui/button';
import type { TodoDTO } from '~/lib/apis/backend/types';

export default function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDetail,
}: {
  todo: TodoDTO;
  onToggle: () => Promise<void> | void;
  onEdit: () => void;
  onDetail: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform ?? null),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 cursor-pointer ${isDragging ? 'opacity-50' : 'hover:bg-muted/50 transition-colors'} border rounded flex justify-between items-center`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onChange={async () => {
            await onToggle();
          }}
        />
        <div>
          <div className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </div>
          {todo.description && <div className="text-sm text-gray-600">{todo.description}</div>}
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onDetail}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onEdit}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export { TodoItem };
