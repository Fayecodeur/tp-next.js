"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { deleteTodo } from "../actions/createTodo";

export default function DeleteTodoButton({ id }: { id: string }) {
  const handleClick = async () => {
    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer la tâche ?"
    );
    if (confirm) {
      const response = await deleteTodo(id);
      if (response.message === "success") {
        toast.success("Tâche supprimée avec succès");
      } else {
        toast.error("Échec lors de la suppression");
      }
    }
  };

  return (
    <button className="btn btn-delete" onClick={handleClick}>
      <TrashIcon style={{ width: "20px" }} />
    </button>
  );
}
