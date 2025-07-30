"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./css/user.css";

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
    <section className="container-user">
      <h1>Perfil de usuario</h1>
      <article className="card-user">
        <img src={user?.avatar} alt={`Foto de ${user?.name}`} />
        <section className="content-user">
          <h2>{user?.name}</h2>
          <p>{user?.role}</p>
          <p>{user?.email}</p>
          <a className="edit-user" href={`/users/${user?.id}/edit`}>
            Editar
          </a>
        </section>
      </article>
    </section>
  );
}
