export type TodoDTO = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  order: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type CreateTodoDTO = Pick<TodoDTO, 'title' | 'description'> & {
  order?: number;
};

export type UpdateTodoDTO = Partial<Pick<TodoDTO, 'title' | 'description' | 'completed' | 'order'>>;

export interface TodoApiService {
  getTodos(): Promise<TodoDTO[]>;
  createTodo(payload: CreateTodoDTO): Promise<TodoDTO>;
  updateTodo(id: string, payload: UpdateTodoDTO): Promise<TodoDTO | null>;
  deleteTodo(id: string): Promise<boolean>;
  reorderTodos(idsInOrder: string[]): Promise<void>;
}
