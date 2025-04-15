"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  date: z.string().min(1, "La date est requise"),
});

export async function createTodo(
  prevState: { message: string },
  formData: FormData
) {
  const parse = schema.safeParse({
    title: formData.get("title"),
    date: formData.get("date"),
  });

  if (!parse.success) {
    return { message: "error" }; // plus simple à tester dans le composant
  }

  const { title, date } = parse.data;

  try {
    await prisma.todo.create({
      data: {
        title,
        date,
      },
    });
    return { message: "success" };
  } catch (error) {
    return { message: "error" };
  }
}
