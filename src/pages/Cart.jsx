// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
   const { cart } = useCart();

   const total = cart.reduce(
     (sum, item) => sum + item.price * (item.quantity || 1),
     0
   );
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">₦{item.price}</p>
                </div>
                <p className="text-gray-700">Qty: {item.quantity || 1}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <span className="text-xl font-bold">₦{total.toFixed(2)}</span>
          </div>

          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
