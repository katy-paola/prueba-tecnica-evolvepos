"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface categoryProps {
  name: string;
  image: string;
}

type FormData = {
  name: string;
  image: string;
};

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams();

  const [category, setCategory] = useState<categoryProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      image: "",
    },
  });

  useEffect(() => {
    const obtenerCategoriaPorId = async () => {
      try {
        const respuesta = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${id}`
        );
        const data = await respuesta.json();
        setCategory(data);
      } catch (error) {
        console.log("Error al obtener el usuario: ", error);
      }
    };
    if (id) obtenerCategoriaPorId();
  }, [id]);

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        image: category.image,
      });
    }
  }, [category, reset]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.name,
      image: data.image,
    };

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error de la API:", errorData);
        throw new Error(
          errorData.message || "Error al actualizar la categoría"
        );
      }

      const categoriaActualizada = await response.json();
      console.log("Categoría actualizada:", categoriaActualizada);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error desconocido al actualizar la categoría.");
      }
    }
  };

  return (
    <section>
      <h1>Actualizar categoría</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="">
            Nombre
            <input
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
              placeholder="Clothes"
            />
            {errors.name && <span>{errors.name.message}</span>}
          </label>
          <label htmlFor="">
            Foto
            <input
              type="text"
              {...register("image", {
                required: "La imagen es obligatoria",
              })}
              placeholder="https://i.imgur.com/kg1ZhhH.jpeg"
            />
          </label>
          <button type="submit">Guardar cambios</button>
        </fieldset>
      </form>
    </section>
  );
}
