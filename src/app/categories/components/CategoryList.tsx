"use client";

import { useEffect, useState } from "react";
import DeleteModal from "../[id]/components/DeleteModal";

interface categoryProps {
  id: number;
  name: string;
  image: string;
}

function CategoryList() {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
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
  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleDeleteSuccess = () => {
    setSelectedCategoryId(null); // Cierra modal
    obtenerCategorias(); // Vuelve a cargar la lista
  };

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <img src={category.image} alt={category.name} />
            <span>{category.id}</span>
            <p>{category.name}</p>
            <button onClick={() => setSelectedCategoryId(category.id)}>
              Eliminar categoría
            </button>
            {selectedCategoryId === category.id && (
              <DeleteModal
                id={category.id}
                closeDeleteModal={() => setSelectedCategoryId(null)}
                onDeleteSuccess={handleDeleteSuccess}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
