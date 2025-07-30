import CategoryList from "./categories/components/CategoryList";
import ProductList from "./products/components/ProductList";
import "./page.css";

export default function Home() {
  return (
    <section className="main-container">
      <CategoryList />
      <ProductList />
    </section>
  );
}
