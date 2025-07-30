"use client";

import { useEffect, useState } from "react";
import DeleteModal from "../[id]/components/DeleteModal";
import "../css/page.css";
import DeleteIcon from "@/app/icons/Delete";
import EditIcon from "@/app/icons/Edit";

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
    <section className="container-category">
      <h2>Categorías</h2>
      <ul className="list-category">
        {categories.map((category) => (
          <li key={category.id} className="item-category">
            <div className="info-category">
              <span>{category.id}</span>
              <p className="name-category">{category.name}</p>
            </div>
            <div className="actions-category">
              <a href={`/categories/${category.id}/edit`}>
                <EditIcon />
              </a>
              <button onClick={() => setSelectedCategoryId(category.id)}>
                <DeleteIcon />
              </button>
            </div>
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
    </section>
  );
}

export default CategoryList;
