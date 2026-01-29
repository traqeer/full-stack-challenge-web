import type {
  CreateTodoDTO,
  ReorderTodoDTO,
  TodoApiService,
  TodoDTO,
  UpdateTodoDTO,
} from '../types';

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const store: TodoDTO[] = [
  {
    id: uid(),
    title: 'Comprar víveres para la semana',
    description: 'Ir al supermercado y comprar frutas, verduras, carne y productos de limpieza.',
    completed: false,
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uid(),
    title: 'Preparar presentación del proyecto',
    description: 'Crear las diapositivas y practicar la presentación para la reunión del viernes.',
    completed: false,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uid(),
    title: 'Llamar al banco',
    description: 'Contactar al banco para resolver el problema con la tarjeta de débito.',
    completed: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function delay<T>(value: T, ms = 200) {
  return new Promise<T>((res) => setTimeout(() => res(value), ms));
}

export const todoApi: TodoApiService = {
  getTodos: (): Promise<TodoDTO[]> => delay(store.slice().sort((a, b) => a.order - b.order)),
  createTodo: (payload: CreateTodoDTO): Promise<TodoDTO> => {
    const nextOrder = store.length ? Math.max(...store.map((t) => t.order)) + 1 : 0;
    const now = new Date();
    const todo: TodoDTO = {
      id: uid(),
      title: payload.title,
      description: payload.description || null,
      completed: false,
      order: nextOrder,
      createdAt: now,
      updatedAt: now,
    };
    store.push(todo);
    return delay({ ...todo });
  },
  updateTodo: (id: string, payload: UpdateTodoDTO): Promise<TodoDTO | null> => {
    const idx = store.findIndex((t) => t.id === id);
    if (idx === -1) return delay(null);
    const updated: TodoDTO = {
      ...store[idx],
      ...payload,
      updatedAt: new Date(),
    };
    store[idx] = updated;
    return delay({ ...updated });
  },
  deleteTodo: (id: string): Promise<boolean> => {
    const idx = store.findIndex((t) => t.id === id);
    if (idx === -1) return delay(false);
    store.splice(idx, 1);
    return delay(true);
  },
  reorderTodos: (payload: ReorderTodoDTO): Promise<void> => {
    const reorderedStore: TodoDTO[] = [];
    payload.items.forEach((item) => {
      const todo = store.find((t) => t.id === item.id);
      if (todo) {
        reorderedStore.push({ ...todo, order: item.order });
      }
    });
    store.splice(0, store.length, ...reorderedStore);
    return delay(undefined);
  },
  toggleCompleted: (id: string): Promise<TodoDTO> => {
    const idx = store.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Todo not found');
    const todo = store[idx];
    const updated: TodoDTO = {
      ...todo,
      completed: !todo.completed,
      updatedAt: new Date(),
    };
    store[idx] = updated;
    return delay(updated);
  },
};
