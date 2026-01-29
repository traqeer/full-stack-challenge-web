export const useMock =
  typeof window === 'undefined' ? process.env.VITE_USE_MOCK : import.meta.env.VITE_USE_MOCK;

const apiModule = useMock ? await import('./mock') : await import('./backend');

export const todoApi: import('./types').TodoApiService = apiModule.todoApi;

export type { CreateTodoDTO, TodoApiService, TodoDTO, UpdateTodoDTO } from './types';
