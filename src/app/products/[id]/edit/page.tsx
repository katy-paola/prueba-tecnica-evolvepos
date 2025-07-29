"use client";

import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

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

type FormData = {
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
  };
  images: {
    url: string;
  }[];
};

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [producto, setProducto] = useState<productProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: { id: undefined },
      images: [],
    },
  });

  useEffect(() => {
    const obtenerProductoPorId = async () => {
      try {
        const respuesta = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const data = await respuesta.json();
        setProducto(data);
      } catch (error) {
        console.log("Error al obtener el producto: ", error);
      }
    };
    if (id) obtenerProductoPorId();
  }, [id]);

  useEffect(() => {
    if (producto) {
      reset({
        title: producto.title,
        price: producto.price,
        description: producto.description,
        category: {
          id: producto.category.id,
        },
        images: producto.images.map((img) => ({ url: img })),
      });
    }
  }, [producto, reset]);

  const onSubmit = async (data: FormData) => {
    const payload = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.category.id,
      images: data.images
        .map((img) => img.url.trim())
        .filter((url) => url !== ""),
    };

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error de la API:", errorData);
        throw new Error(errorData.message || "Error al actualizar el producto");
      }

      const productoActualizado = await response.json();
      console.log("Producto actualizado:", productoActualizado);
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error desconocido al actualizar el producto.");
      }
    }
  };

  return (
    <section>
      <h1>Actualizar producto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="">
            Título
            <input
              type="text"
              {...register("title", { required: "El título es obligatorio" })}
              placeholder="Classic Red Pullover Hoodie"
            />
            {errors.title && <span>{errors.title.message}</span>}
          </label>
          <label htmlFor="">
            Precio
            <input
              type="number"
              {...register("price", {
                required: "El precio es obligatorio",
                valueAsNumber: true,
                min: { value: 0, message: "El precio debe ser positivo" },
              })}
              placeholder="3672"
            />
            {errors.price && <span>{errors.price.message}</span>}
          </label>
          <label htmlFor="">
            Descripción
            <textarea
              {...register("description")}
              placeholder="Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire."
            ></textarea>
          </label>
          <label htmlFor="">
            ID de categoría
            <input
              type="number"
              {...register("category.id", {
                required: "El ID de categoría es obligatorio",
                valueAsNumber: true,
              })}
            />
          </label>
          <fieldset>
            <label htmlFor="">
              Url foto 1
              <input
                type="text"
                {...register("images.0.url", { required: true })}
                placeholder="https://i.imgur.com/kg1ZhhH.jpeg"
              />
            </label>
            <label htmlFor="">
              Url foto 2
              <input
                type="text"
                {...register("images.1.url")}
                placeholder="https://i.imgur.com/kg1ZhhH.jpeg"
              />
            </label>
            <label htmlFor="">
              Url foto 3
              <input
                type="text"
                {...register("images.2.url")}
                placeholder="https://i.imgur.com/kg1ZhhH.jpeg"
              />
            </label>
          </fieldset>
          <button type="submit">Guardar cambios</button>
        </fieldset>
      </form>
    </section>
  );
}
