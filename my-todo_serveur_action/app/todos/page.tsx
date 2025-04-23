import { formatDate } from "@/app/utils/formatDate";
import { getTodos } from "../actions/getTodos";
import UptadeButton from "../ui/UptadeButton";
import DeleteTodoButton from "../ui/DeleteTodoButton";

interface Todo {
  id: string;
  title: string;
  date: string;
}

const TodoList = async () => {
  const todos = await getTodos();
  if (!todos || todos.length === 0) {
    return <p>Vous n'avez pas de tache en cours</p>;
  }

  return (
    <section>
      <h1 className="text-center">Tâches créées</h1>

      <div className="listContainer">
        <ul className="ul-list mb w-60 shadow-hover" role="list">
          {todos.map((todo) => (
            <li key={todo.id.toString()} className="li-list">
              <div className="todo">
                <p className="date">{formatDate(todo.date)}</p>
                <h2>{todo.title}</h2>

                <div className="btnIconsContainer">
                  <UptadeButton id={todo.id.toString()} />
                  <DeleteTodoButton id={todo.id.toString()} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
