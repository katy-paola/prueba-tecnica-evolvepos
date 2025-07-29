"use client";
import { useEffect, useState } from "react";

interface productProps {
  id: number;
  images: string[];
  title: string;
  price: number;
}

function ProductList() {
  const [productos, setProductos] = useState<productProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const offset = (page - 1) * limit;
        const respuesta = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
        );
        const data = await respuesta.json();
        setProductos(data);
        setHasMore(data.length === limit);
      } catch (error) {
        console.log("Error al obtener los productos: ", error);
      }
    };
    obtenerProductos();
  }, [page]);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <article>
              <img
                src={producto.images[0]}
                alt={producto.title}
                width={200}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://i.imgur.com/sC0ztOB.jpeg";
                }}
              />
              {producto.id}. {producto.title} - ${producto.price}
            </article>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={!hasMore}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ProductList;
