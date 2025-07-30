"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import "../css/edit.css";

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
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Error al actualizar la categoría",
            showed: false,
          })
        );
        throw new Error(
          errorData.message || "Error al actualizar la categoría"
        );
      }

      sessionStorage.removeItem("toast-shown");
      sessionStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: "Categoría actualizada",
          showed: false,
        })
      );
      //Usar window en vez de router para redireccionar cuando se muestra un toast para que funcione correctamente
      window.history.back();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Error al actualizar la categoría",
            showed: false,
          })
        );
      } else {
        console.error("Error desconocido:", error);
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Ocurrió un error desconocido al actualizar la categoría",
            showed: false,
          })
        );
      }
    }
  };

  return (
    <section className="container-form">
      <h1>Actualizar categoría</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fields">
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
          <button className="button-form" type="submit">
            Guardar cambios
          </button>
        </fieldset>
      </form>
    </section>
  );
}
