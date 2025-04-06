"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
name: z.string().nonempty("Le nom est requis"),
quantity: z.coerce.number().min(1, "Quantité minimale : 1"),
price: z.coerce.number().min(1000, "Prix minimal : 1000 CFA"),
});

type Inputs = z.infer<typeof schema>;

export default function EditProductPage() {
const { id } = useParams();
const router = useRouter();
const queryClient = useQueryClient();

// 1. Récupération du produit
const { data: product, isLoading } = useQuery({
queryKey: ["product", id],
queryFn: async () => {
const res = await fetch(`/api/products/${id}`);
if (!res.ok) throw new Error("Erreur de récupération");
return res.json();
},
});

// 2. Hook form
const {
register,
handleSubmit,
reset,
formState: { errors },
} = useForm<Inputs>({
resolver: zodResolver(schema),
values: {
name: product?.name || "",
quantity: product?.quantity || 0,
price: product?.price || 0,
},
});

// 3. Mutation de mise à jour
const mutation = useMutation({
mutationFn: async (data: Inputs) => {
const res = await fetch(`/api/products/${id}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Erreur lors de la modification");
return res.json();
},
onSuccess: () => {
toast.success("Produit modifié avec succès");
queryClient.invalidateQueries({ queryKey: ["product", id] });
router.push("/"); // ou "/products"
},
onError: () => {
toast.error("Erreur lors de la modification");
},
});

const onSubmit = (data: Inputs) => {
mutation.mutate(data);
reset();
};

if (isLoading) return <p className="text-center">Chargement...</p>;

return (
<div className="max-w-xl mx-auto p-4">
<h2 className="text-xl font-bold mb-4">Modifier le produit</h2>
<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
<input
type="text"
{...register("name")}
placeholder="Nom du produit"
className="p-2 border border-gray-300 rounded"
/>
{errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="number"
          {...register("quantity")}
          placeholder="Quantité"
          className="p-2 border border-gray-300 rounded"
        />
        {errors.quantity && (
          <p className="text-red-500">{errors.quantity.message}</p>
        )}

        <input
          type="number"
          {...register("price")}
          placeholder="Prix"
          className="p-2 border border-gray-300 rounded"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {mutation.isPending ? "Modification..." : "Modifier"}
        </button>
      </form>
    </div>

);
}
