# Componentes Principales del Proyecto

## Componentes UI

- `<Button variant:string size:string asChild:boolean isLoading:boolean />`
- `<Card className:string />`
- `<Input className:string type:string />`
- `<Label className:string />`
- `<PageLayout title:string onAction:function actionLabel:string />`
- `<Separator className:string orientation:string decorative:boolean />`
- `<Skeleton className:string />`
- `<Spinner size:string />`
- `<TaskItem task:TodoDTO onToggle:function onEdit:function onView:function />`
- `<Textarea className:string />`
- `<TooltipContent className:string sideOffset:number />`

## Componentes de Rutas (Todos)

- `<LayoutTodos />`
- `<TodoDetailModal open:boolean onClose:function todo:TodoDTO />`
- `<TodoFormModal open:boolean onClose:function editingId:string />`
- `<TodosList onEdit:function onView:function />`

## Otros Componentes

- `<ErrorBoundary />`

## Tipos/DTOs

- `TodoDTO`: { id: string; title: string; description: string | null; completed: boolean; order: number; createdAt: Date; updatedAt: Date; }
- `CreateTodoDTO`: { title: string; description?: string; }
- `UpdateTodoDTO`: { title: string; description?: string; }
- `ReorderTodoDTO`: { items: ReorderItemDTO[]; }
- `ReorderItemDTO`: { id: string; order: number; }