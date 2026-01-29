import React, { createContext, useContext, useEffect, useState } from 'react';
import { todoApi } from '~/lib/apis/todos';
import type { CreateTodoDTO, TodoDTO, UpdateTodoDTO } from '~/lib/apis/todos/types';

type TodosContextType = {
  todos: TodoDTO[];
  loading: boolean;
  refresh: () => Promise<void>;
  createTodo: (payload: CreateTodoDTO) => Promise<TodoDTO>;
  updateTodo: (id: string, payload: UpdateTodoDTO) => Promise<TodoDTO | null>;
  deleteTodo: (id: string) => Promise<boolean>;
  toggleCompleted: (id: string) => Promise<TodoDTO>;
  filter: 'all' | 'pending' | 'completed';
  setFilter: (filter: 'all' | 'pending' | 'completed') => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
  visibleTodos: TodoDTO[];
  updateTodos: (updater: (prev: TodoDTO[]) => TodoDTO[]) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const refresh = async () => {
    setLoading(true);
    try {
      const list = await todoApi.getTodos();
      console.log(list);
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

  const deleteTodo = async (id: string) => {
    const deleted = await todoApi.deleteTodo(id);
    if (deleted) {
      setTodos((s) => s.filter((t) => t.id !== id));
    }
    return deleted;
  };

  const toggleCompleted = async (id: string) => {
    const updated = await todoApi.toggleCompleted(id);
    setTodos((s) => s.map((t) => (t.id === id ? updated : t)).sort((a, b) => a.order - b.order));
    return updated;
  };

  const counts = {
    all: todos.length,
    pending: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const visibleTodos = todos.filter((t) =>
    filter === 'pending' ? !t.completed : filter === 'completed' ? t.completed : true
  );

  return (
    <TodosContext.Provider
      value={{
        todos,
        loading,
        refresh,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleCompleted,
        filter,
        setFilter,
        counts,
        visibleTodos,
        updateTodos: setTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error('useTodos must be used inside TodosProvider');
  return ctx;
}
