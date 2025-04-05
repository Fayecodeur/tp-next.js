"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation Zod
const schema = z.object({
  name: z.string().min(2, { message: "Le nom est requis (min. 2 caractères)" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Mot de passe trop court (min. 6 caractères)" }),
});

// Typage basé sur le schéma
type Inputs = z.infer<typeof schema>;

export default function TestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // <== ici !
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    console.log("Formulaire soumis ✅", data);

    // Réinitialiser le formulaire après soumission
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-[400px] mx-auto mt-10 bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      {/* Champ nom */}
      <div>
        <label className="block mb-1 font-medium">Nom</label>
        <input
          type="text"
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Entrez votre nom"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      {/* Champ email */}
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="exemple@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Champ mot de passe */}
      <div>
        <label className="block mb-1 font-medium">Mot de passe</label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Mot de passe"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Inscription
      </button>
    </form>
  );
}
