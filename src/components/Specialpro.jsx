import Slidingcards from "./Slidingcards";

function Specialpro() {
  const popular = [
    {
      id: 1,
      name: "Denim Jacket",
      price: 70000,
      image: "/jacket2.jpg",
    },
    {
      id: 2,
      name: "Casual Sneakers",
      price: 45000,
      image: "/shoe1.jpg",
    },
    {
      id: 3,
      name: "Leather Bag",
      price: 50000,
      image: "/bag3.jpg",
    },
    {
      id: 4,
      name: "Shirt",
      price: 30000,
      image: "/sh1.jpg",
    },
  ];

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Most Popular
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our best-selling fashion essentials loved by everyone.
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((p) => (
            <div key={p.id} className="flex justify-center">
              <Slidingcards {...p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specialpro;
