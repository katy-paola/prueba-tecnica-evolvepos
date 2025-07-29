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
        throw new Error(errorData.message || "Error al eliminar la categoría");
      }
      console.log("Categoría eliminada");
      onDeleteSuccess();
      closeDeleteModal();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar a la API:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Ocurrió un error desconocido al eliminar la categoría.");
      }
    }
  };
  return (
    <form onSubmit={deleteCategory}>
      <button type="button" onClick={closeDeleteModal}>
        Cerrar
      </button>
      <p>¿Está seguro que desea eliminar esta categoría?</p>
      <div>
        <button type="submit">Sí, eliminar</button>
        <button type="button" onClick={closeDeleteModal}>
          No, cancelar
        </button>
      </div>
    </form>
  );
}
