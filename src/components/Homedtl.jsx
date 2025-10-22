/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */

function Homedtl() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-gray-100 py-16 px-6 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          About Our Brand
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          At <span className="font-semibold">Diamond's Clothing</span>, we believe
          fashion is more than style — it’s identity. We create timeless,
          high-quality pieces designed to make you feel confident, comfortable,
          and unique. Our collections are made with love, precision, and
          sustainable materials.
        </p>
      </div>
    </motion.section>
  );
}

export default Homedtl;
