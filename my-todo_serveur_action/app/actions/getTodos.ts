"use server";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getTodos() {
  noStore;
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { date: "asc" },
    });
    return todos;
  } catch (error) {
    console.error("erreur", error);
  } finally {
    prisma.$disconnect;
  }
}

export async function getTodoById(id: string) {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });
    return todo;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la tâche");
  } finally {
    await prisma.$disconnect();
  }
}
