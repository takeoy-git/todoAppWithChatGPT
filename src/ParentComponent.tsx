import React, { useState } from "react";
import { InputFormComponent } from "./InputFormComponent";
import { TodoListComponent } from "./TodoListComponent";

export const ParentComponent: React.FC = () => {
  const [todos, setTodos] = useState<
    {
      id: number;
      todo: string;
      detail: string;
      deadline: string;
      isComplete: boolean;
    }[]
  >([]);
  const [editTarget, setEditTarget] = useState<{
    id: number;
    todo: string;
    detail: string;
    deadline: string;
    isComplete: boolean;
  } | null>(null);

  // 新しいタスクを追加
  const addTodo = (newTodo: {
    todo: string;
    detail: string;
    deadline: string;
  }) => {
    const id = new Date().getTime(); // 一意のIDを生成
    setTodos((prevTodos) => [
      ...prevTodos,
      { id, ...newTodo, isComplete: false }, // 初期状態は未完了
    ]);
  };

  // タスクを削除（確認ダイアログ付き）
  const deleteTodo = (id: number) => {
    if (window.confirm("このタスクを削除してもよろしいですか？")) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  // タスクを編集
  const editTodo = (updatedTodo: {
    id: number;
    todo: string;
    detail: string;
    deadline: string;
    isComplete: boolean;
  }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditTarget(null); // 編集モード解除
  };

  // タスクの完了状態を切り替え
  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  return (
    <div>
      <InputFormComponent
        addTodo={addTodo}
        editTarget={editTarget}
        editTodo={editTodo}
      />
      <TodoListComponent
        todos={todos}
        deleteTodo={deleteTodo}
        setEditTarget={setEditTarget}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};
