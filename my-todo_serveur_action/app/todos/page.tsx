"use client"
import { formatDate } from '@/app/utils/formatDate';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Todo {
  id: string;
  title: string;
  date: string
}

const TodoList = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("api/todos");
      const data = await response.json();
      console.log(data)
      setTodos(data);
      setIsLoading(false);
    }

    getTodos()
  }, [])
  
  const handleEdit = async (todo: Todo) => {
    router.push(`/todos/edit?id=${todo.id}`);
  }

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");

      if(confirmDelete) {

        const response = await fetch(`/api/delete-todo/${todo.id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        
        if (response.ok) {
          const newTodoList = todos.filter((todo: Todo) => todo.id !== data.id);
          setTodos(newTodoList);
          toast.success("Tâche supprimée avec succès", {
            onClose: () => {
              window.location.reload();
            }
          })
        }
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <section>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <h1 className="text-center">Tâches créées</h1>
      {
        todos.length === 0 && (
          <p className="loader">
            {isLoading ? "Veuillez patienter ..." : "Aucune Todos à afficher"}
          </p>
        )
      }

      <div className="listContainer">
        <ul className="ul-list mb w-60 shadow-hover" role="list">
        {
          todos.map((todo: Todo ) => (
            <li key={todo.id} className="li-list">
              <div className="todo">
                <p className="date">{formatDate(todo.date)}</p>
                <h2>{todo.title}</h2>

                <div>
                  <button 
                    className="btn btn-update"
                    onClick={() => handleEdit(todo)}
                  >
                    <PencilSquareIcon style={{ width: '20px'}} />
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteTodo(todo)}
                  >
                    <TrashIcon style={{ width: '20px'}} />
                  </button>
                </div>
              </div>
            </li>
          ))
        }
        </ul>
      </div>
    </section>
  )
}

export default TodoList;