import { useEffect, useState } from "react";

interface productProps {
  id: string;
  images: string[]
  title: string;
  price: number;
}

function ProductList() {
  const [productos, setProductos] = useState<productProps[]>([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await respuesta.json();
        setProductos(data);
      } catch (error) {
        console.log("Error al obtener los productos: ", error);
      }
    };
    obtenerProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <article>
                <img src={producto.images[0]} alt={producto.title} width={200} />
              {producto.title} - ${producto.price}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
