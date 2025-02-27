export default function ItemCard({product}) {



    return (
       
    <div className="bg-white shadow-lg rounded-2xl p-4 w-80 hover:shadow-2xl hover:scale-105 transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
        <p className="text-sm text-gray-500">Category: {product.catagory}</p>
        <p className="text-sm text-gray-500">Dimensions: {product.dimentions || "N/A"}</p>
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
            product.availablity ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {product.availablity ? "In stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
};

