/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
/* eslint-enable no-unused-vars */

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-gray-300 py-8 px-4 md:px-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo / Brand Name */}
        <h1 className="text-2xl font-bold text-white">Diamomd Store</h1>

        {/* Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm">
          <li>
            <Link to="/" className="hover:text-violet-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="hover:text-violet-400 transition-colors"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-violet-400 transition-colors"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/checkout"
              className="hover:text-violet-400 transition-colors"
            >
              Checkout
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a
            href="#"
            className="hover:text-violet-400 transition-colors"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="hover:text-violet-400 transition-colors"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="hover:text-violet-400 transition-colors"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BrandName. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
