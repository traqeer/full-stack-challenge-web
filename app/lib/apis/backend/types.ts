export type TodoDTO = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  order: number;
  createdAt: string; // ISO
  updatedAt?: string; // ISO
};

export type CreateTodoDTO = Pick<TodoDTO, 'title' | 'description'> & {
  order?: number;
};

export type UpdateTodoDTO = Partial<Pick<TodoDTO, 'title' | 'description' | 'completed' | 'order'>>;
