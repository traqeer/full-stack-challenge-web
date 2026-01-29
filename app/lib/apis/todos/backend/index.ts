import { apiClient } from '~/lib/apis/config';
import type {
  CreateTodoDTO,
  ReorderTodoDTO,
  TodoApiService,
  TodoDTO,
  UpdateTodoDTO,
} from '../types';

export const todoApi: TodoApiService = {
  getTodos: (): Promise<TodoDTO[]> =>
    apiClient.get('/todos').then((res) => res.data?.data ?? res.data),
  createTodo: (payload: CreateTodoDTO): Promise<TodoDTO> =>
    apiClient.post('/todos', payload).then((res) => res.data),
  updateTodo: (id: string, payload: UpdateTodoDTO): Promise<TodoDTO | null> =>
    apiClient.put(`/todos/${id}`, payload).then((res) => res.data),
  deleteTodo: (id: string): Promise<boolean> => apiClient.delete(`/todos/${id}`).then(() => true),
  reorderTodos: (payload: ReorderTodoDTO): Promise<void> =>
    apiClient.patch('/todos/reorder', payload).then(() => undefined),
  toggleCompleted: (id: string): Promise<TodoDTO> =>
    apiClient.patch(`/todos/${id}/toggle-completed`).then((res) => res.data),
};
