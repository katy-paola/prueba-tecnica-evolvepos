"use client";
import Search from "@/app/components/Search";
import { useEffect, useState } from "react";
import { mock_products } from "@/mock-data/products";
import "../css/page.css";
import Link from "next/link";
import EditIcon from "@/app/icons/Edit";

interface productProps {
  id: number;
  images: string[];
  title: string;
  price: number;
}

function ProductList() {
  const [productos, setProductos] = useState<productProps[]>([]);
  const [productTitle, setProductTitle] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;
  const [emptySearch, setEmptySearch] = useState("");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const offset = (page - 1) * limit;

        let url = `https://api.escuelajs.co/api/v1/products`;

        if (productTitle !== "") {
          url += `?title=${encodeURIComponent(
            productTitle.trim()
          )}&offset=${offset}&limit=${limit}`;
        } else {
          url += `?offset=${offset}&limit=${limit}`;
        }

        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          const errorData = await respuesta.json();
          console.error("Error de la API:", errorData);
          throw new Error(
            errorData.message || "Error al obtener los productos"
          );
        }
        const data = await respuesta.json();

        if (Array.isArray(data)) {
          if (data.length === 0) {
            if (productTitle === "") {
              // Sin búsqueda y API vacía => usar mock
              setProductos(mock_products);
              setHasMore(mock_products.length === limit);
              setEmptySearch("");
            } else {
              // Hay búsqueda, pero sin resultados => vaciar productos
              setProductos([]);
              setHasMore(false);
              setEmptySearch(
                `No se encontraron resultados para ${productTitle}`
              );
            }
          } else {
            // API devolvió productos
            setProductos(data);
            setHasMore(data.length === limit);
            setEmptySearch("");
          }
        } else {
          // Manejo por si la API responde con un objeto u otro tipo de error
          setProductos([]);
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error al obtener los productos: ", error);
      }
    };
    obtenerProductos();
  }, [productTitle, page]);
  return (
    <section className="container-product">
      <header className="header-product">
        <h2>Productos</h2>
        <div>
          <Link className="add-product" href="/products/add">
            Nuevo
          </Link>
          <Search setProductTitle={setProductTitle} setPage={setPage} />
        </div>
      </header>{" "}
      {emptySearch === "" ? (
        <>
          {" "}
          <ul className="list-product">
            {productos.map((producto) => (
              <li key={producto.id}>
                <article className="item-product">
                  <a
                    className="edit-product"
                    href={`/products/${producto.id}/edit`}
                  >
                    <EditIcon />
                  </a>
                  <Link
                    className="link-product"
                    href={`/products/${producto.id}`}
                  >
                    <img
                      className="img-product"
                      src={producto.images[0]}
                      alt={producto.title}
                      width={200}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://i.imgur.com/sC0ztOB.jpeg";
                      }}
                    />
                    <p className="title-product">{producto.title}</p>
                    <span className="price-product">${producto.price}</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <div className="pagination-container">
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
        </>
      ) : (
        <p>{emptySearch}</p>
      )}
    </section>
  );
}

export default ProductList;
