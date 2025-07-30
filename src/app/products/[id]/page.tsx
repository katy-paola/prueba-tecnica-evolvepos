"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DeleteModal from "./components/DeleteModal";
import "./css/product.css";

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
    <section className="container-product-details">
      <h1>{producto?.title}</h1>
      <article className="content-product-details">
        <ul className="images-product-details">
          {producto?.images.map((image, i) => (
            <li key={i}>
              <img src={image} alt={producto?.title} />
            </li>
          ))}
        </ul>
        <div className="info-product-details">
          <p className="price-product-details">${producto?.price}</p>
          <p className="category-product-details">{producto?.category.name}</p>
        </div>
        <p>{producto?.description}</p>
        <div className="buttons-product-details">
          <a
            className="action-product-details"
            href={`/products/${producto?.id}/edit`}
          >
            Editar
          </a>
          <button
            className="action-product-details delete"
            onClick={() => setShowDeleteModal(!showDeleteModal)}
          >
            Eliminar
          </button>
        </div>
      </article>
      {showDeleteModal && (
        <DeleteModal
          id={producto?.id}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </section>
  );
}
