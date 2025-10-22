/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /** 🔹 Fetch all products from Supabase */
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("❌ Error fetching products:", error.message);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /** 🔹 Add a new product (optionally with image upload) */
  const addProduct = async (product, imageFile) => {
    try {
      setLoading(true);
      let image_url = product.image_url;

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: storageError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (storageError) throw storageError;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        image_url = publicUrlData.publicUrl;
      }

      const { error } = await supabase.from("products").insert([
        {
          name: product.name.trim(),
          price: Number(product.price),
          image_url,
        },
      ]);

      if (error) throw error;

      await fetchProducts();
      alert("✅ Product added successfully!");
    } catch (err) {
      console.error("Add product error:", err.message);
      alert("❌ Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Update an existing product */
  const updateProduct = async (id, updatedData, newImageFile) => {
    try {
      setLoading(true);
      let image_url = updatedData.image_url;

      if (newImageFile) {
        const fileName = `${Date.now()}-${newImageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, newImageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        image_url = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("products")
        .update({ ...updatedData, image_url })
        .eq("id", id);

      if (error) throw error;

      await fetchProducts();
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error("Update product error:", err.message);
      alert("❌ Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Delete product */
  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("🗑️ Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("❌ Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
