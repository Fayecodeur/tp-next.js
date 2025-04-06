"use client";
import { Product } from "@/libs/type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";

const fetchData = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok)
    throw new Error("Erreur lors de la récupération des données");
  return response.json();
};

const deleteProduct = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression du produit");
  return response.json();
};

export function ProductsList() {
  const queryClient = useQueryClient(); // Pour invalidation de cache
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalider la requête pour actualiser la liste des produits après la suppression
      toast.success("Produit supprimé avec succés");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Erreur lors de la suppression du produit");
    },
  });

  if (isLoading) return <p className="text-center">Chargement...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Erreur lors de la récupération des données.
      </p>
    );

  return (
    <div className="overflow-x-auto w-full max-w-5xl mx-auto mt-10 px-4">
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-2 px-4 font-semibold text-gray-700">
              Nom
            </th>
            <th className="text-left py-2 px-4 font-semibold text-gray-700">
              Quantité
            </th>
            <th className="text-left py-2 px-4 font-semibold text-gray-700">
              Prix (CFA)
            </th>
            <th className="text-left py-2 px-4 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 &&
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors border-t border-gray-200"
              >
                <td className="py-3 px-6 text-gray-800">{product.name}</td>
                <td className="py-3 px-6 text-gray-800">{product.quantity}</td>
                <td className="py-3 px-6 text-gray-800">{product.price}</td>
                <td className="py-3 px-6">
                  <Link
                    href={`product/${product.id}`}
                    className="bg-yellow-500 p-1 rounded-md text-white"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteMutation.mutate(product.id)}
                    className="bg-red-500 p-1 rounded-md ml-3 text-white cursor-pointer"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
