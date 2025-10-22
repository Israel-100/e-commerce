/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
/* eslint-enable no-unused-vars */

function Slidingcards({ image, name, price }) {
  const { addToCart } = useCart();

  const numericPrice =
    typeof price === "string" ? Number(price.replace(/[₦,]/g, "")) || 0 : price;

  const handleAdd = () => {
    const newItem = { image, name, price: numericPrice };
    addToCart(newItem);
    alert(`${name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="min-w-[250px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl flex flex-col justify-between"
    >
      <img src={image} alt={name} className="w-64 h-56 object-cover" />

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">{name}</h3>
        <p className="text-gray-500 mb-3">₦{numericPrice.toLocaleString()}</p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="px-4 py-2 border border-blue-500 text-black rounded-lg font-medium hover:bg-black/40 hover:text-white transition-all"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Slidingcards;
