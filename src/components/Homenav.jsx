/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ADMIN_EMAIL } from "../config/admin";
/* eslint-enable no-unused-vars */

function Homenav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, signInWithGoogle, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFallbackAvatar = (email) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}`;

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-black/60 border-none backdrop-blur-lg shadow-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-6 py-3 text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/newlogo.png"
            alt="Brand Logo"
            className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain"
          />
          <span className="text-lg sm:text-xl md:text-2xl font-semibold">
            Store
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center p-2 text-gray-200 rounded-lg hover:bg-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
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

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-blue-400 font-medium hover:text-white">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-400">
            Store
          </Link>
          <Link to="/checkout" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="bg-white text-black px-3 py-1.5 rounded-full font-semibold hover:bg-gray-200"
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
                  src={user.user_metadata?.avatar_url}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getFallbackAvatar(user.email);
                  }}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-white cursor-pointer"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40">
                  <div className="px-4 py-2 text-sm border-b truncate">
                    {user.user_metadata?.full_name || user.email}
                  </div>

                  {user.email === ADMIN_EMAIL && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600 font-semibold"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 text-white backdrop-blur-lg px-6 py-4 space-y-3 border-t border-white/10">
          <Link
            to="/"
            className="block hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Store
          </Link>
          <Link
            to="/checkout"
            className="block hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            🛒 Checkout ({cartCount})
          </Link>

          {user && user.email === ADMIN_EMAIL && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="block bg-yellow-400 text-black px-3 py-1.5 rounded-md font-semibold text-center hover:bg-yellow-500"
            >
              Admin
            </Link>
          )}

          {!user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                signInWithGoogle();
              }}
              className="block bg-white text-black px-3 py-1.5 rounded-full font-semibold w-full hover:bg-gray-200"
            >
              Sign in
            </button>
          ) : (
            <div className="flex items-center justify-between bg-white text-black px-4 py-2 rounded-md">
              <img
                src={user.user_metadata?.avatar_url}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getFallbackAvatar(user.email);
                }}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-sm font-semibold hover:text-blue-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </motion.nav>
  );
}

export default Homenav;
