"use client";

export default function Search({
  setProductTitle,
}: {
  setProductTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form>
      <input
        type="search"
        onChange={(e) => setProductTitle(e.target.value)}
        placeholder="Buscar productos por título"
      />
    </form>
  );
}
