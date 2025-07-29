"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface userProps {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<userProps>();

  useEffect(() => {
    const obtenerUsuarioPorId = async () => {
      try {
        const respuesta = await fetch(
          `https://api.escuelajs.co/api/v1/users/${id}`
        );

        if (!respuesta.ok) {
          const errorData = await respuesta.json();
          console.error("Error de la API:", errorData);
          throw new Error(errorData.message || "Error al obtener el usuario");
        }

        const data = await respuesta.json();
        setUser(data);
      } catch (error) {
        console.log("Error al obtener el usuario: ", error);
      }
    };
    if (id) obtenerUsuarioPorId();
  }, [id]);
  return (
    <section>
      <img src={user?.avatar} alt={`Foto de ${user?.name}`} />
      <h1>{user?.name}</h1>
      <p>{user?.role}</p>
      <p>{user?.email}</p>
    </section>
  );
}
