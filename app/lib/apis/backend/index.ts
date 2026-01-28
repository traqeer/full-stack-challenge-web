import type { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from './types';
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
    createdAt: new Date().toISOString(),
  },
  {
    id: uid(),
    title: 'Preparar presentación del proyecto',
    description: 'Crear las diapositivas y practicar la presentación para la reunión del viernes.',
    completed: false,
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: uid(),
    title: 'Llamar al banco',
    description: 'Contactar al banco para resolver el problema con la tarjeta de débito.',
    completed: true,
    order: 2,
    createdAt: new Date().toISOString(),
  },
];

function delay<T>(value: T, ms = 200) {
  return new Promise<T>((res) => setTimeout(() => res(value), ms));
}

export const todoApi = {
  async getTodos(): Promise<TodoDTO[]> {
    const copy = store.slice().sort((a, b) => a.order - b.order);
    return delay(copy);
  },

  async createTodo(payload: CreateTodoDTO): Promise<TodoDTO> {
    const nextOrder = store.length ? Math.max(...store.map((t) => t.order)) + 1 : 0;
    const now = new Date().toISOString();
    const todo: TodoDTO = {
      id: uid(),
      title: payload.title,
      description: payload.description,
      completed: false,
      order: payload.order ?? nextOrder,
      createdAt: now,
    };
    store.push(todo);
    return delay({ ...todo });
  },

  async updateTodo(id: string, payload: UpdateTodoDTO): Promise<TodoDTO | null> {
    const idx = store.findIndex((t) => t.id === id);
    if (idx === -1) return delay(null);
    const updated: TodoDTO = {
      ...store[idx],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    store[idx] = updated;
    return delay({ ...updated });
  },
};
