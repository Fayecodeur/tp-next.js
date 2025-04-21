"use client";

import { useFormState } from "react-dom";
import { createTodo } from "../actions/createTodo";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const CreateTodo = () => {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(createTodo, initialState);
  const [toastIsShown, setToastIsShown] = useState(false);
  const router = useRouter();
  if (state.message === "success" && !toastIsShown) {
    toast.success("Tache ajoutée avec success");
    setToastIsShown(true);
    router.push("/todos");
  } else if (state.message === "error" && !toastIsShown) {
    toast.error("Erreur lors de la création de la tache");
    setToastIsShown(true);
  }
  return (
    <>
      <form className="form" action={formAction}>
        <div className="title">
          <h1>Créer une tâche</h1>
        </div>
        <div className="align-horizontal">
          <div className="todo-container">
            <label className="placeholder">Tâche</label>
            <input
              name="title"
              required
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
              type="date"
              placeholder="Indiquez une date"
              name="date"
              required
            />
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="btn-success">
            Créer
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
