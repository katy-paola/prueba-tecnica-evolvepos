interface DeleteModalProps {
  id: number;
  closeDeleteModal: () => void;
  onDeleteSuccess: () => void;
}

export default function DeleteModal({
  id,
  closeDeleteModal,
  onDeleteSuccess,
}: DeleteModalProps) {
  const deleteCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${id}`,
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
            message: "Error al eliminar la categoría",
            showed: false,
          })
        );
        throw new Error(errorData.message || "Error al eliminar la categoría");
      }

      onDeleteSuccess();
      closeDeleteModal();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        sessionStorage.removeItem("toast-shown");
        sessionStorage.setItem(
          "toast",
          JSON.stringify({
            type: "error",
            message: "Error al eliminar la categoría",
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
            message: "Ocurrió un error desconocido al eliminar la categoría",
            showed: false,
          })
        );
      }
    }
  };
  return (
    <form className="delete-modal" onSubmit={deleteCategory}>
      <button
        className="close-delete-button"
        type="button"
        onClick={closeDeleteModal}
      >
        Cerrar
      </button>
      <p>¿Está seguro que desea eliminar esta categoría?</p>
      <div className="buttons-delete-container">
        <button type="submit">Sí, eliminar</button>
        <button
          type="button"
          className="cancelar-button"
          onClick={closeDeleteModal}
        >
          No, cancelar
        </button>
      </div>
    </form>
  );
}
