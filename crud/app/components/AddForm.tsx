"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const schema = z.object({
  name: z.string().nonempty("Le nom est obligatoire"),
  quantity: z.coerce.number().min(1, "La quantité doit être supérieure à 1"),
  price: z.coerce.number().min(1000, "Le prix doit être supérieur à 1000"),
});

type Inputs = z.infer<typeof schema>;
export default function AddForm() {
  const { pending } = useFormStatus();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await fetch("/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok)
        throw new Error("Une erreur s'est produite lors de l'ajout");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Nouveau produit ajouté");
    },
    onError() {
      toast.error("Une erreur s'est produite lors de l'ajout... ");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const handleAdd = (data: Inputs) => {
    mutation.mutate(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleAdd)}
      className="max-w-[1000px] mx-auto flex items-start gap-x-4 flex-wrap"
    >
      <div className="flex flex-col">
        <input
          type="text"
          {...register("name")}
          placeholder="Nom du produit"
          className="p-2 border border-gray-400 rounded-md"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="number"
          {...register("quantity")}
          placeholder="Quantité"
          className="p-2 border border-gray-400 rounded-md"
        />
        {errors.quantity && (
          <span className="text-red-500 text-sm mt-1">
            {errors.quantity.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="number"
          {...register("price")}
          step={0.01}
          placeholder="Prix"
          className="p-2 border border-gray-400 rounded-md"
        />
        {errors.price && (
          <span className="text-red-500 text-sm mt-1">
            {errors.price.message}
          </span>
        )}
      </div>

      <button
        disabled={mutation.isPaused || pending}
        className="bg-blue-500 px-5 py-2 h-fit text-white hover:bg-blue-700 rounded-md cursor-pointer mt-2"
      >
        {mutation.isPaused || pending ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}
