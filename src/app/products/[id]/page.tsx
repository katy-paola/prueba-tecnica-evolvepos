"use client";
import { useState, useEffect, SetStateAction } from "react";
import { useParams } from "next/navigation";

interface productProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
  images: string[];
}

export default function ProductDetails() {
  const { id } = useParams();
  const [producto, setProducto] = useState<productProps>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const obtenerProductoPorId = async () => {
      try {
        const respuesta = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const data = await respuesta.json();
        setProducto(data);
      } catch (error) {
        console.log("Error al obtener los productos: ", error);
      }
    };
    if (id) obtenerProductoPorId();
  }, [id]);
  return (
    <section>
      <h1>{producto?.title}</h1>
      <ul>
        {producto?.images.map((image, i) => (
          <li key={i}>
            <img src={image} alt={producto?.title} />
          </li>
        ))}
      </ul>
      <p>{producto?.price}</p>
      <p>{producto?.description}</p>
      <p>{producto?.category.name}</p>
      <button onClick={() => setShowDeleteModal(!showDeleteModal)}>
        Eliminar producto
      </button>
      {showDeleteModal && <p>Modal para eliminar un producto</p>}
    </section>
  );
}
