"use client";

export default function Search({
  setProductTitle,
  setPage,
}: {
  setProductTitle: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductTitle(e.target.value);

    //Reiniciar la página a 1 para que el filtro se aplique a todos los productos
    setPage(1);
  };

  return (
    <input
      className="search-product"
      type="search"
      name="search"
      onChange={handleSearchChange}
      placeholder="Buscar productos por título"
    />
  );
}
