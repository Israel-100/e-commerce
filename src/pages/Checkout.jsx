import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";
import Productnav from "../components/Productnav";

function Checkout() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const [editedCart, setEditedCart] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [showToast, setShowToast] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    setEditedCart(cart.map((it) => ({ ...it })));
  }, [cart]);

  const total = editedCart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const incLocal = (id) =>
    setEditedCart((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: it.quantity + 1 } : it
      )
    );

  const decLocal = (id) =>
    setEditedCart((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, quantity: Math.max(0, it.quantity - 1) } : it
        )
        .filter((it) => it.quantity > 0)
    );

  const removeLocal = (id) =>
    setEditedCart((prev) => prev.filter((it) => it.id !== id));

  const generateTicketImage = async () => {
    const ticketElement = document.getElementById("ticket");
    if (!ticketElement) return null;

    const prevStyle = {
      width: ticketElement.style.width,
      margin: ticketElement.style.margin,
      transform: ticketElement.style.transform,
    };

    ticketElement.style.width = "420px";
    ticketElement.style.margin = "0 auto";
    ticketElement.style.transform = "scale(1)";

    const canvas = await html2canvas(ticketElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    ticketElement.style.width = prevStyle.width;
    ticketElement.style.margin = prevStyle.margin;
    ticketElement.style.transform = prevStyle.transform;

    return canvas.toDataURL("image/png");
  };

  const syncEditedCartToContext = async () => {
    if (!addToCart || !removeFromCart) {
      throw new Error("Cart context missing required functions.");
    }

    if (typeof clearCart === "function") {
      clearCart();
    } else {
      cart.forEach((it) => {
        try {
          removeFromCart(it.id ?? it.name);
        } catch (e) {
          console.warn(e);
        }
      });
    }

    await new Promise((r) => setTimeout(r, 50));

    for (const it of editedCart) {
      const qty = it.quantity || 1;
      for (let i = 0; i < qty; i++) {
        addToCart({ ...it, quantity: 1 });
      }
    }
  };

  const applyAndSend = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill in your details before checkout.");
      return;
    }

    if (editedCart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setIsApplying(true);
      setShowToast(true);

      await syncEditedCartToContext();

      const orderDetails = editedCart
        .map(
          (item) =>
            `• ${item.name} x${item.quantity} — ₦${(
              (item.price || 0) * item.quantity
            ).toLocaleString()}`
        )
        .join("\n");

      const message = `🛒 *New Order from ${form.name}*\n📞 ${form.phone}\n🏠 ${
        form.address
      }\n\n📦 *Order Details:*\n${orderDetails}\n\n💰 *Total:* ₦${total.toLocaleString()}`;

      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = "2349151991736";

      window.open(
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
        "_blank"
      );

      const imgData = await generateTicketImage();
      if (imgData) {
        const link = document.createElement("a");
        link.download = `${form.name || "order"}-ticket.png`;
        link.href = imgData;
        link.click();
      }
    } catch (err) {
      console.error("applyAndSend error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsApplying(false);
      setTimeout(() => setShowToast(false), 1200);
    }
  };

  if (!editedCart) return null;

  return (
    <>
      <Productnav />

      <div className="flex flex-col min-h-screen bg-gray-100">
        {showToast && (
          <div className="fixed top-5 right-5 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg z-50">
            Applying changes & Generating Ticket...
          </div>
        )}

        {/* ✅ Add top padding to prevent navbar overlap */}
        <main className="flex-grow p-6 max-w-5xl mx-auto w-full pt-24">
          <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
            Checkout
          </h1>

          {editedCart.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">
              Your cart is empty 🛍️
            </p>
          ) : (
            <>
              {/* 🧾 Ticket Preview */}
              <div
                id="ticket"
                className="bg-white shadow-xl rounded-xl p-6 mb-6 border border-gray-200 mx-auto w-full max-w-md text-gray-800"
                style={{ fontFamily: "monospace", lineHeight: 1.5 }}
              >
                <h2 className="text-center font-extrabold text-lg border-b pb-2 mb-3">
                  🧾 ORDER RECEIPT
                </h2>

                <div className="text-sm mb-4 grid grid-cols-1 gap-1">
                  <div>
                    <span className="text-gray-600">Name:</span>{" "}
                    <span className="font-semibold">{form.name || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>{" "}
                    <span className="font-semibold">{form.phone || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Address:</span>{" "}
                    <span className="font-semibold">{form.address || "—"}</span>
                  </div>
                </div>

                <table className="w-full text-xs border-t border-b border-gray-300 mb-3">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-1 px-1">Item</th>
                      <th className="text-center py-1 px-1">Qty</th>
                      <th className="text-right py-1 px-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedCart.map((it, i) => (
                      <tr key={it.id ?? i}>
                        <td className="py-1 px-1">{it.name}</td>
                        <td className="text-center py-1 px-1">{it.quantity}</td>
                        <td className="text-right py-1 px-1">
                          ₦{((it.price || 0) * it.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right font-bold text-base">
                  Total: ₦{total.toLocaleString()}
                </div>
                <p className="text-center text-xs mt-4 text-gray-500 border-t pt-2">
                  Thank you for shopping with us ❤️
                </p>
              </div>

              {/* 🛍️ Cart Editing Section */}
              <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Review & Edit Cart
                </h2>
                <div className="space-y-4">
                  {editedCart.map((it) => (
                    <div
                      key={it.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-sm text-gray-500">
                          ₦{(it.price || 0).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decLocal(it.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{it.quantity}</span>
                        <button
                          onClick={() => incLocal(it.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeLocal(it.id)}
                          className="text-red-600 ml-3 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 👤 Customer Form */}
              <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Customer Details
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="p-2 border rounded"
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="p-2 border rounded"
                  />
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Address"
                    className="p-2 border rounded sm:col-span-2"
                  />
                </div>
              </div>

              {/* ✅ Apply & Send Button */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white shadow-md border border-gray-200 p-4 rounded-xl">
                <div className="text-lg font-semibold text-gray-700">
                  Total:{" "}
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={applyAndSend}
                  disabled={isApplying}
                  className={`w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 font-semibold ${
                    isApplying ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  💬 Apply changes & Send to WhatsApp
                </button>
              </div>
            </>
          )}
        </main>

        <footer className="mt-10">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Checkout;
