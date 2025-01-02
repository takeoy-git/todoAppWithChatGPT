import React from "react";

interface TodoListProps {
  todos: {
    id: number;
    todo: string;
    detail: string;
    deadline: string;
    isComplete: boolean;
  }[];
  deleteTodo: (id: number) => void;
  setEditTarget: (todo: any) => void;
  toggleComplete: (id: number) => void;
}

export const TodoListComponent: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  setEditTarget,
  toggleComplete,
}) => {
  const isDeadlineNear = (deadline: string) => {
    const now = new Date();
    const taskDeadline = new Date(deadline);
    const difference = taskDeadline.getTime() - now.getTime();
    return difference <= 24 * 60 * 60 * 1000; // 締め切りが24時間以内の場合
  };

  return (
    <div className="todo-list">
      <h2>登録されたタスク一覧</h2>
      {todos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          現在、登録されたタスクはありません。
        </p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.isComplete ? "complete" : ""} ${
              isDeadlineNear(todo.deadline) ? "highlight" : ""
            }`}
          >
            <div className="content">
              <h3>{todo.todo}</h3>
              <p>{todo.detail}</p>
              <p>
                <strong>締め切り:</strong> {todo.deadline || "未設定"}
              </p>
            </div>
            <div className="actions">
              <button onClick={() => toggleComplete(todo.id)}>
                {todo.isComplete ? "未完了に戻す" : "完了"}
              </button>
              <button onClick={() => setEditTarget(todo)}>編集</button>
              <button onClick={() => deleteTodo(todo.id)}>削除</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
