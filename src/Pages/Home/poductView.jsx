import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ImageSlider from "../../Component/imageSlider";
import { addToCard } from "../../utils/cart";

export default function ProductView() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [ItemQuantity, setQuantity] = useState(1);
  const [state, setState] = useState("loading");


  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`http://localhost:3000/api/products/${params.key}`)
        .then((response) => {
          setProduct(response.data);
          console.log(response.data);
          setState("loaded");
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setState("error");
        });
    }
  }, [state]);

  const handleChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <div className="h-full w-full flex flex-row ">
      <div className="h-full w-[50%] flex-col  ">
        <ImageSlider images={product.images || []} />
      </div>

      <div className="h-full w-[49%] flex items-center justify-center">
        {state === "loading" && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[50px] h-[50px] border-4 rounded-full border-t-blue-500 animate-spin"></div>
          </div>
        )}
        {state === "loaded" && (
          <div className="w-full h-full flex flex-col items-center p-6 rounded-lg mt-20">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="w-full max-w-lg p-6 rounded-lg shadow-md space-y-4">
              <p className="text-xl font-semibold text-blue-600">
                {" "}
                {product.price}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 mr-2">
                  Category:
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  {product.catagory}
                </span>
              </div>

              {/* Dimensions */}
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 mr-2">
                  Dimensions:
                </span>
                <span className="text-gray-800">{product.dimensions}</span>
              </div>

              {/* Availability */}
              <div
                className={`text-lg font-semibold ${
                  product.availablity ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.availablity ? "✅ In Stock" : "❌ Out of Stock"}
              </div>

              <div>
                {" "}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToCard(product.key, ItemQuantity)}>
                  Add to Cart
                </button>{" "}
              </div>
              <div>
                <input
                  type="number"
                  value={ItemQuantity}
                  min="1"
                  onChange={handleChange}
                  className="border p-2 w-20 text-center"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
