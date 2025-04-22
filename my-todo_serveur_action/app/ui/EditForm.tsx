"use client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation"; // ✅ bon import
import toast from "react-hot-toast";
import { updateTodo } from "../actions/createTodo";

interface Todo {
  id: number;
  title: string;
  date: string;
}

const initialState = {
  message: "",
};

export default function EditTodo({ todo }: { todo: Todo }) {
  const [state, formAction] = useFormState(updateTodo, initialState);
  const router = useRouter();
  const [toastIsShown, setToastIsShown] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success" && !toastIsShown) {
      toast.success("Tâche modifiée avec succès");
      setToastIsShown(true);
      router.push("/todos");
    } else if (state.message === "error" && !toastIsShown) {
      toast.error("Erreur lors de la modification de la tâche");
      setToastIsShown(true);
    }
  }, [state.message, toastIsShown, router]);

  const { title, date } = todo;

  return (
    <form
      className="form"
      action={async (formData: FormData) => {
        formAction(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      {/* ✅ id caché pour le backend */}
      <input type="hidden" name="id" value={todo.id} />

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
        <button type="submit" className="btn-success">
          Modifier
        </button>
      </div>
    </form>
  );
}
