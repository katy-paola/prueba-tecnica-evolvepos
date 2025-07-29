"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface userProps {
  name: string;
  email: string;
}

type FormData = {
  name: string;
  email: string;
};

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState<userProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const obtenerUsuarioPorId = async () => {
      try {
        const respuesta = await fetch(
          `https://api.escuelajs.co/api/v1/users/${id}`
        );
        const data = await respuesta.json();
        setUser(data);
      } catch (error) {
        console.log("Error al obtener el usuario: ", error);
      }
    };
    if (id) obtenerUsuarioPorId();
  }, [id]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.name,
      email: data.email,
    };

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/users/${id}`,
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
        throw new Error(errorData.message || "Error al actualizar el usuario");
      }

      const usuarioActualizado = await response.json();
      console.log("Usuario actualizado:", usuarioActualizado);
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error desconocido al actualizar el usuario.");
      }
    }
  };

  return (
    <section>
      <h1>Actualizar usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="">
            Nombre
            <input
              type="text"
              {...register("name", { required: "El nombre es obligatorio" })}
              placeholder="Jane Doe"
            />
            {errors.name && <span>{errors.name.message}</span>}
          </label>
          <label htmlFor="">
            Correo electrónico
            <input
              type="email"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El correo no es válido",
                },
              })}
              placeholder="janedoe@email.com"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </label>
          <button type="submit">Guardar cambios</button>
        </fieldset>
      </form>
    </section>
  );
}
