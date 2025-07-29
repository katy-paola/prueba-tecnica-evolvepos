import CategoryList from "./categories/components/CategoryList";
import "./page.css";
import ProductList from "./products/components/ProductList";

export default function Home() {
  return (
    <div>
      Hola, Mundo Next JS, aquí en el home se mostrarán los productos y
      categorías
      <CategoryList />
      <ProductList />
    </div>
  );
}
