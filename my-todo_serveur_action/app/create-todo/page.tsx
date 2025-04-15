import { prisma } from "@/lib/prisma";

const CreateTodo = () => {
  async function createTodo(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    await prisma.todo.create({
      data: { title, date },
    });
  }
  return (
    <>
      <form className="form" action={createTodo}>
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
