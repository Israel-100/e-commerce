import Productnav from "../components/Productnav"
import ProductList from "../components/productlist"
import Footer from "../components/Footer"

function Products() {
  return (
    <>
      <Productnav />
      <main className="pt-16">
        <ProductList />
        <Footer />
      </main>
    </>
  );
}

export default Products
