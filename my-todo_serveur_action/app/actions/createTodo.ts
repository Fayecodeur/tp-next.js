"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1, "Le titre de la tache est obligatoire"),
  date: z.string().min(1, "La date est obligatoire"),
});

export async function createTodo(
  prevState: { message: string },
  formData: FormData
) {
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
