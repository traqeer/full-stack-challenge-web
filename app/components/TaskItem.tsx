import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Eye } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui/button';
import type { TodoDTO } from '~/lib/apis/todos/types';

const translations = {
  en: {},
  es: {},
};

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onView,
}: {
  task: TodoDTO;
  onToggle: () => Promise<any> | void;
  onEdit: () => void;
  onView: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
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
          checked={task.completed}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onChange={async () => {
            await onToggle();
          }}
        />
        <div>
          <div className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </div>
          {task.description && <div className="text-sm text-gray-600">{task.description}</div>}
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onView}
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

const DemoProps = {
  props: [
    {
      name: 'task',
      type: 'TodoDTO',
      required: true,
      description: 'La tarea a mostrar'
    },
    {
      name: 'onToggle',
      type: 'function',
      required: true,
      description: 'Función para alternar el estado completado'
    },
    {
      name: 'onEdit',
      type: 'function',
      required: true,
      description: 'Función para editar la tarea'
    },
    {
      name: 'onView',
      type: 'function',
      required: true,
      description: 'Función para ver detalles de la tarea'
    }
  ],
  defaultValues: {
    task: {
      id: '1',
      title: 'Sample Task',
      description: 'This is a sample task',
      completed: false,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    onToggle: () => {},
    onEdit: () => {},
    onView: () => {}
  }
};

function Demo(props: Partial<TaskItemProps>) {
  return <TaskItem
    task={props.task || DemoProps.defaultValues.task}
    onToggle={props.onToggle || DemoProps.defaultValues.onToggle}
    onEdit={props.onEdit || DemoProps.defaultValues.onEdit}
    onView={props.onView || DemoProps.defaultValues.onView}
  />;
}

type TaskItemProps = Parameters<typeof TaskItem>[0];

export { Demo, DemoProps };
