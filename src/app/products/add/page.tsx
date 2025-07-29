"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface categoryProps {
  id: number;
  name: string;
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

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<categoryProps[]>([]);

  //Obtener todas las categorías para que el usuario pueda seleccionar una
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      images: [{ url: "" }],
    },
  });

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
      const respuesta = await fetch(
        "https://api.escuelajs.co/api/v1/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        console.error("Error de la API:", errorData);
        throw new Error(errorData.message || "Error al crear el producto");
      }

      const nuevoProducto = await respuesta.json();
      console.log("Producto creado:", nuevoProducto);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error desconocido al crear el producto.");
      }
    }
  };

  return (
    <section>
      <h1>Agregar nuevo producto</h1>
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
          <label htmlFor="category">Categoría</label>
          <select
            defaultValue=""
            {...register("category.id", {
              required: "La categoría es obligatoria",
              valueAsNumber: true,
            })}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

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
                {...register("images.0.url", {
                  required: "La imagen principal es obligatoria",
                })}
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
          <button type="submit">Crear producto</button>
        </fieldset>
      </form>
    </section>
  );
}
