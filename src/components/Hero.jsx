/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */
import bg from "../assets/bg.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="min-h-[100vh] w-full flex items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll", // use 'fixed' for parallax
      }}
    >
      {/* Text container with hover effect */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-black/50 p-6 sm:p-10 rounded-2xl shadow-lg backdrop-blur-sm max-w-2xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Welcome to Our Clothing Brand
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-6">
          Discover the latest fashion trends with our stylish and affordable
          collections.
        </p>
        <Link to="/products">
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(55, 65, 81, 1)", // Tailwind gray-700
              color: "#fff",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="px-8 sm:px-10 py-3 sm:py-4 border border-gray-400 text-gray-300 font-semibold rounded-lg bg-transparent transition-all duration-300"
          >
            Explore Now
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
