import { useEffect, useState } from "react";
import axios from "axios";
import { redirectDocument } from "react-router-dom";
import ItemCard from "../../Component/itemCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProducts(res.data);
          setState("loaded");
        })
        .catch((err) => {
          console.error(err);
          setState("error");
        });
    }
  }, [state]); // ✅ Correct dependency

  return (
    <div className="w-full h-full flex flex-wrap justify-center pt-[30px]">
      {/* Loading State */}
      {state === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      )}

      {/* Loaded State - Show Products */}
      {state === "loaded" && (
        <div className="grid grid-cols-3 gap-17">
          {products.map((product) => {
            return (
                <ItemCard product={product} key={product.key}/>
              
          )}
            
           
          )}
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="w-full h-full flex justify-center items-center text-red-500">
          <p>Failed to load products. Please try again.</p>
        </div>
      )}
    </div>
  );
}
