"use client";

export default function Search({
  setProductTitle,
}: {
  setProductTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <input
      className="search-product"
      type="search"
      name="search"
      onChange={(e) => setProductTitle(e.target.value)}
      placeholder="Buscar productos por título"
    />
  );
}
