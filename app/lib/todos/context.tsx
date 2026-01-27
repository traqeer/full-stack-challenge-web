import React, { createContext, useContext, useEffect, useState } from 'react';
import { todoApi } from '~/lib/backend';
import type { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from '~/lib/backend/types';

type TodosContextType = {
  todos: TodoDTO[];
  loading: boolean;
  refresh: () => Promise<void>;
  createTodo: (payload: CreateTodoDTO) => Promise<TodoDTO>;
  updateTodo: (id: string, payload: UpdateTodoDTO) => Promise<TodoDTO | null>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const list = await todoApi.getTodos();
      setTodos(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const createTodo = async (payload: CreateTodoDTO) => {
    const created = await todoApi.createTodo(payload);
    setTodos((s) => [...s, created].sort((a, b) => a.order - b.order));
    return created;
  };

  const updateTodo = async (id: string, payload: UpdateTodoDTO) => {
    const updated = await todoApi.updateTodo(id, payload);
    if (updated) {
      setTodos((s) => s.map((t) => (t.id === id ? updated : t)).sort((a, b) => a.order - b.order));
    }
    return updated;
  };

  return (
    <TodosContext.Provider value={{ todos, loading, refresh, createTodo, updateTodo }}>
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error('useTodos must be used inside TodosProvider');
  return ctx;
}
