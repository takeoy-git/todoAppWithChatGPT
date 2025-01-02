import React, { useState } from "react";

interface InputFormProps {
  addTodo: (newTodo: {
    todo: string;
    detail: string;
    deadline: string;
  }) => void;
  editTarget: any;
  editTodo: (updatedTodo: any) => void;
}

export const InputFormComponent: React.FC<InputFormProps> = ({
  addTodo,
  editTarget,
  editTodo,
}) => {
  const [todo, setTodo] = useState(editTarget?.todo || "");
  const [detail, setDetail] = useState(editTarget?.detail || "");
  const [deadline, setDeadline] = useState(editTarget?.deadline || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTarget) {
      editTodo({
        id: editTarget.id,
        todo,
        detail,
        deadline,
        isComplete: editTarget.isComplete,
      });
    } else {
      addTodo({ todo, detail, deadline });
    }
    setTodo("");
    setDetail("");
    setDeadline("");
  };

  return (
    <div className="todo-form">
      <h2>タスクを{editTarget ? "編集" : "追加"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="todo">タスク名</label>
          <input
            id="todo"
            type="text"
            placeholder="タスクを入力してください"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="detail">詳細</label>
          <textarea
            id="detail"
            placeholder="タスクの詳細を入力してください"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="deadline">締め切り</label>
          <input
            id="deadline"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button type="submit">{editTarget ? "更新" : "追加"}</button>
      </form>
    </div>
  );
};
