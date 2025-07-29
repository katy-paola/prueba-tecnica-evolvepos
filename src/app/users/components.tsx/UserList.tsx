"use client";
import { useEffect, useState } from "react";

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
        const respuesta = await fetch(
          `https://api.escuelajs.co/api/v1/users`
        );
        const data = await respuesta.json();

        setUsuarios(data);
      } catch (error) {
        console.log("Error al obtener los usuarios: ", error);
      }
    };
    obtenerUsuarios();
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <article>
              {usuario.name} - {usuario.email} - ${usuario.role}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
