import { apiClient } from '~/lib/apis/config';
import type { CreateTodoDTO, TodoApiService, TodoDTO, UpdateTodoDTO } from '../types';

export const todoApi: TodoApiService = {
  getTodos: (): Promise<TodoDTO[]> =>
    apiClient.get('/api/v1/todos').then((res) => res.data?.data ?? res.data),
  createTodo: (payload: CreateTodoDTO): Promise<TodoDTO> =>
    apiClient.post('/api/v1/todos', payload).then((res) => res.data),
  updateTodo: (id: string, payload: UpdateTodoDTO): Promise<TodoDTO | null> =>
    apiClient.put(`/api/v1/todos/${id}`, payload).then((res) => res.data),
  deleteTodo: (id: string): Promise<boolean> =>
    apiClient.delete(`/api/v1/todos/${id}`).then(() => true),
  reorderTodos: (todoIds: string[]): Promise<void> =>
    apiClient.patch('/api/v1/todos/reorder', { todoIds }).then(() => undefined),
};
