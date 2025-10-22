/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
/* eslint-enable no-unused-vars */

function Productsnav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, signInWithGoogle, logout } = useAuth();
  const dropdownRef = useRef(null);

  const isAdmin =
    user?.email &&
    (user.email === "israelakinsegun.bincom@gmail.com" ||
      user.user_metadata?.role === "admin");

  // ✅ Handle scroll background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md"
          : "bg-white border-gray-100"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-6 py-3 text-gray-800">
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600">
            Store
          </span>
        </Link>

        {/* ✅ Mobile Toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center p-2 text-gray-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-blue-600 transition-all duration-300"
          >
            Store
          </Link>

          {/* 🛒 Cart */}
          <Link to="/checkout" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-600 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.3A1 1 0 007 20h10a1 1 0 00.9-.6L20 13M7 13l1.2-5M10 21a1 1 0 110-2 1 1 0 010 2zm8 0a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 👤 Auth Section */}
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="focus:outline-none"
              >
                <img
                  src={
                    user.user_metadata?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.user_metadata?.full_name || user.email
                    )}`
                  }
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-blue-500 cursor-pointer"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg text-black w-44 border border-gray-100">
                  <div className="px-4 py-2 text-sm border-b truncate">
                    {user.user_metadata?.full_name || user.email}
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600 font-semibold"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-50 text-gray-800 px-6 py-4 space-y-3 border-t border-blue-200">
          <Link
            to="/"
            className="block font-medium hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/products"
            className="block hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Store
          </Link>

          <Link
            to="/checkout"
            className="flex items-center gap-2 hover:text-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            🛒 Checkout ({cartCount})
          </Link>

          {!user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                signInWithGoogle();
              }}
              className="block bg-blue-600 text-white px-3 py-1.5 rounded-full font-semibold w-full hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          ) : (
            <div className="flex flex-col gap-2 bg-white text-black px-4 py-2 rounded-md">
              <div className="flex items-center justify-between">
                <img
                  src={
                    user.user_metadata?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.user_metadata?.full_name || user.email
                    )}`
                  }
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block text-blue-600 font-semibold text-center hover:underline"
                >
                  Go to Admin
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </motion.nav>
  );
}

export default Productsnav;
