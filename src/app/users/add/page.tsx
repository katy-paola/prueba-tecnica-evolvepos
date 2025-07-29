"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export default function AddUserPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  const onSubmit = async (data: FormData) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    };

    try {
      const respuesta = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        console.error("Error de la API:", errorData);
        throw new Error(errorData.message || "Error al crear el usuario");
      }

      const nuevoUsuario = await respuesta.json();
      console.log("Usuario creado:", nuevoUsuario);
      router.push("/users");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error desconocido al crear el usuario.");
      }
    }
  };

  return (
    <section>
      <h1>Agregar nuevo usuario</h1>
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
          <label htmlFor="">
            Contraseña
            <input
              type="text"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              placeholder="12345"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </label>
          <label htmlFor="">
            Avatar
            <input
              type="text"
              {...register("avatar", {
                required: "El avatar es obligatorio",
                pattern: {
                  value: /^https?:\/\/.*\.(jpeg|jpg|gif|png|webp)$/,
                  message: "El avatar debe ser una URL válida de imagen",
                },
              })}
              placeholder="https://i.imgur.com/yhW6Yw1.jpg"
            />
            {errors.avatar && <span>{errors.avatar.message}</span>}
          </label>
          <button type="submit">Crear usuario</button>
        </fieldset>
      </form>
    </section>
  );
}
