"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { z } from "zod";

export async function createTodo(
  prevState: { message: string },
  formData: FormData
) {
  const todoSchema = z.object({
    title: z.string().min(1, "Le titre de la tache est obligatoire"),
    date: z.string().min(1, "La date est obligatoire"),
  });
  const parsed = todoSchema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
  });

  if (!parsed.success) {
    return { message: "error" };
  }

  const { title, date } = parsed.data;

  try {
    await prisma.todo.create({
      data: { title, date },
    });
    revalidatePath("/todos");
    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
}

export async function updateTodo(
  prevState: { message: string },
  formData: FormData
) {
  const todoSchema = z.object({
    title: z.string().min(1, "Le titre de la tache est obligatoire"),
    date: z.string().min(1, "La date est obligatoire"),
    id: z.string(),
  });

  const parsed = todoSchema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
    id: formData.get("id"),
  });

  if (!parsed.success) {
    return { message: "error" };
  }

  const { id, title, date } = parsed.data;

  try {
    await prisma.todo.update({
      where: {
        id: Number(id), // ou `id: id` si ton id est de type string dans la base
      },
      data: {
        title,
        date,
      },
    });

    revalidatePath("/todos");
    return { message: "success" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return { message: "error" };
  }
}
