import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Productsnav from "../components/Productnav";
import Footer from "../components/Footer";

function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", image: null });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          {
            name: form.name,
            price: parseInt(form.price),
            image_url: editingProduct.image_url,
          },
          form.image
        );
        setEditingProduct(null);
      } else {
        await addProduct(
          {
            name: form.name,
            price: parseInt(form.price),
          },
          form.image
        );
      }

      setForm({ name: "", price: "", image: null });
      setPreview("");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Start editing product
  const startEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      image: null,
    });
    setPreview(product.image_url);
  };

  return (
    <>
      <Productsnav />

      <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Admin Dashboard
          </h1>

          {/* Product Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md max-w-lg mx-auto mb-10 border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Nike Air Max"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price (₦)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 20000"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required={!editingProduct}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 h-28 w-28 object-cover rounded-lg"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : editingProduct
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </div>
          </form>

          {/* Product Table */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-4">
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="h-12 w-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="py-2 px-4 font-medium text-gray-800">
                        {p.name}
                      </td>
                      <td className="py-2 px-4 text-blue-600 font-semibold">
                        ₦{p.price.toLocaleString()}
                      </td>
                      <td className="py-2 px-4 flex justify-center gap-3">
                        <button
                          onClick={() => startEdit(p)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-6 text-center text-gray-500 font-medium"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Admin;
