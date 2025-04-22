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
