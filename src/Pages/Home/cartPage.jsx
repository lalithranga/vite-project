import { useState } from "react";
import LoadCart from "../../utils/cart";
import axios, { Axios } from "axios";

export default function CartPage() {
    const [cart, setCart] = useState(LoadCart());
    const [loading, setLoading] = useState("loading"); //error,loaded,loading

    useEffect(() => {
        if (loading === "loading") {

            reloadCart();
            axios

            setLoading("loaded");
        }
        
         }, []);

    function reloadCart() {
        setCart(LoadCart());
    }
    
    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Cart Page</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col space-y-4">
                    {cart.oredrItems.map((item) => (
                        
                        <div key={item.key} 
                             className="flex flex-row items-center justify-between p-4 hover:bg-gray-50 rounded-md border border-gray-200">


                            <p className="font-bold text-lg text-gray-700 w-1/2">{item.key}</p>
                            <p className="font-bold text-lg text-gray-700">
                                Quantity: <span className="text-blue-600">{item.qty}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}