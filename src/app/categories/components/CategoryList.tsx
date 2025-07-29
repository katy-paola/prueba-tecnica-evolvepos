"use client";
import { useEffect, useState } from "react";

interface categoryProps {
  id: number;
  name: string;
}

function CategoryList() {
  const [categories, setCategories] = useState<categoryProps[]>([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const respuesta = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        const data = await respuesta.json();
        setCategories(data);
      } catch (error) {
        console.log("Error al obtener las categorías: ", error);
      }
    };
    obtenerCategorias();
  }, []);

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <span>{category.id}</span>
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

