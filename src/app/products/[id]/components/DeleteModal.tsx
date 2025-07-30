import { useRouter } from "next/navigation";

export default function DeleteModal({
  id,
  showDeleteModal,
  setShowDeleteModal,
}: {
  id: number | undefined;
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
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Error al eliminar el producto",
            showed: false,
          })
        );
        throw new Error(errorData.message || "Error al eliminar el producto");
      }
      sessionStorage.removeItem("toast-shown");
      sessionStorage.setItem(
        "toast",
        JSON.stringify({
          message: "Producto eliminado",
          showed: false,
        })
      );

      //Usar window en vez de router para redireccionar cuando se muestra un toast para que funcione correctamente
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Error al eliminar el producto",
            showed: false,
          })
        );
      } else {
        console.error("Error desconocido:", error);
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Ocurrió un error desconocido al eliminar el producto",
            showed: false,
          })
        );
      }
    }
  };
  return (
    <form className="delete-modal" onSubmit={deleteProduct}>
      <button
        className="close-delete-button"
        type="button"
        onClick={() => setShowDeleteModal(!showDeleteModal)}
      >
        Cerrar
      </button>
      <p>¿Está seguro que desea eliminar este producto?</p>
      <div className="buttons-delete-container">
        <button type="submit">Sí, eliminar</button>
        <button
          type="button"
          className="cancelar-button"
          onClick={() => setShowDeleteModal(!showDeleteModal)}
        >
          No, cancelar
        </button>
      </div>
    </form>
  );
}
