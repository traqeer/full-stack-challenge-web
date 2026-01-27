import type { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from './types';
// lightweight id generator to avoid adding dependencies in the challenge
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// In-memory store. In a real app this would be replaced by HTTP calls.
const store: TodoDTO[] = [
  {
    id: uid(),
    title: 'Welcome to Todo App',
    description: 'This is a sample todo created by the mock backend.',
    completed: false,
    order: 0,
    createdAt: new Date().toISOString(),
  },
];

function delay<T>(value: T, ms = 200) {
  return new Promise<T>((res) => setTimeout(() => res(value), ms));
}

export const todoApi = {
  async getTodos(): Promise<TodoDTO[]> {
    // return a shallow clone sorted by order
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
