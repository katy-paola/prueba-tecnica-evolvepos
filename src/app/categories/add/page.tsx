"use client";

import { useForm } from "react-hook-form";
import "./css/add.css";

type FormData = {
  name: string;
  image: string;
};

export default function AddCategoryPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.name,
      image: data.image,
    };

    try {
      const respuesta = await fetch(
        "https://api.escuelajs.co/api/v1/categories/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        console.error("Error de la API:", errorData);
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Error al crear la categoría",
            showed: false,
          })
        );
        throw new Error(errorData.message || "Error al crear la categoría");
      }

      sessionStorage.removeItem("toast-shown");
      sessionStorage.setItem(
        "toast",
        JSON.stringify({
          type: "success",
          message: "Nueva categoría creada",
          showed: false,
        })
      );
      //Usar window en vez de toast para redireccionar cuando se muestra un toast para que funcione correctamente
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Error al crear la categoría",
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
            message: "Ocurrió un error desconocido al crear la categoría",
            showed: false,
          })
        );
      }
    }
  };

  return (
    <section className="container-form">
      <h1>Agregar nueva categoría</h1>
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
            Crear categoría
          </button>
        </fieldset>
      </form>
    </section>
  );
}
