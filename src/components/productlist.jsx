import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

function ProductList() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 md:px-10 py-10">
     

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium">
          No products available yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Product Image */}
              <img
                src={product.image_url}
                alt={product.name}
                className="h-48 w-full object-cover"
              />

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold mt-1 text-sm md:text-base">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-transform duration-200"
                >
                  🛒 <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
