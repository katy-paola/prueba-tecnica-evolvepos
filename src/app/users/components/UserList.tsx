"use client";
import { useEffect, useState } from "react";
import "../css/page.css";
import Link from "next/link";

interface userProps {
  id: number;
  name: string;
  email: string;
  role: string;
}

function UserList() {
  const [usuarios, setUsuarios] = useState<userProps[]>([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await fetch(`https://api.escuelajs.co/api/v1/users`);
        const data = await respuesta.json();

        setUsuarios(data);
      } catch (error) {
        console.log("Error al obtener los usuarios: ", error);
      }
    };
    obtenerUsuarios();
  }, []);

  return (
    <section className="container-users">
      <header className="header-users">
        <h1>Usuarios</h1>
        <Link className="add-user" href="/users/add">
            Nuevo
          </Link>
      </header>
      <ul className="list-users">
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <Link href={`/users/${usuario.id}`} className="item-user">
              <h2>{usuario.name}</h2>
              <p>{usuario.role}</p>
              <small>{usuario.email}</small>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UserList;
