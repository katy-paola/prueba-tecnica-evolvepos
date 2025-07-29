import { useRouter } from "next/navigation";

export default function DeleteModal({
  id,
  showDeleteModal,
  setShowDeleteModal,
}: {
  id: number;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const deleteProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error de la API:", errorData);
        throw new Error(errorData.message || "Error al eliminar el producto");
      }
      console.log("Producto eliminado");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error desconocido al eliminar el producto.");
      }
    }
  };
  return (
    <form onSubmit={deleteProduct}>
      <button
        type="button"
        onClick={() => setShowDeleteModal(!showDeleteModal)}
      >
        Cerrar
      </button>
      <p>¿Está seguro que desea eliminar este producto?</p>
      <div>
        <button type="submit">Sí, eliminar</button>
        <button
          type="button"
          onClick={() => setShowDeleteModal(!showDeleteModal)}
        >
          No, cancelar
        </button>
      </div>
    </form>
  );
}
