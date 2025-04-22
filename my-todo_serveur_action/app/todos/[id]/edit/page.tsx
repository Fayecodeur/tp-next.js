import { getTodoById } from "@/app/actions/getTodos";
import EditTodo from "@/app/ui/EditForm";

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const todo = await getTodoById(id);

  if (!todo) {
    return <p>Pas de tâche à afficher</p>;
  }

  return <EditTodo todo={todo} />;
}
