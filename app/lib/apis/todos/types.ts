export type TodoDTO = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateTodoDTO {
  title: string;
  description?: string;
}

export interface UpdateTodoDTO {
  title: string;
  description?: string;
}

export interface ReorderTodoDTO {
  items: ReorderItemDTO[];
}
export interface ReorderItemDTO {
  id: string;
  order: number;
}

export interface TodoApiService {
  getTodos(): Promise<TodoDTO[]>;
  createTodo(payload: CreateTodoDTO): Promise<TodoDTO>;
  updateTodo(id: string, payload: UpdateTodoDTO): Promise<TodoDTO | null>;
  deleteTodo(id: string): Promise<boolean>;
  toggleCompleted(id: string): Promise<TodoDTO>;
  reorderTodos(payload: ReorderTodoDTO): Promise<void>;
}
