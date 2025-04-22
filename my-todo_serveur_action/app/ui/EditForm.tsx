import React from "react";
import Button from "./Button";
interface Todo {
  id: number;
  title: string;
  date: string;
}

export default function EditTodo({ todo }: { todo: Todo }) {
  const { title, date } = todo;
  return (
    <form className="form">
      <div className="title">
        <h1>Modifier une tâche</h1>
      </div>
      <div className="align-horizontal">
        <div className="todo-container">
          <label className="placeholder">Tâche</label>
          <input
            name="title"
            required
            defaultValue={title}
            className="input"
            type="text"
            placeholder="Indiquez une tâche"
            autoComplete="off"
          />
        </div>

        <div className="date-container">
          <label className="placeholder">Date</label>
          <input
            className="input"
            defaultValue={date}
            type="date"
            placeholder="Indiquez une date"
            name="date"
            required
          />
        </div>
      </div>

      <div className="button-container">
        <Button />
      </div>
    </form>
  );
}
