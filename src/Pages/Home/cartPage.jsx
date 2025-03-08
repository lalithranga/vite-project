import { useState } from "react";
import LoadCart from "../../utils/cart";

export default function CartPage() {
    const [cart, setCart] = useState(LoadCart());

    function reloadCart() {
        setCart(LoadCart());
    }


    return (
        <div>
            <h1>Cart Page</h1>
            <div>
                {cart.oredrItems.map((item) => (
                    <div key={item.key}>
                        <p className="font-bold">{item.key}</p>
                        <p>{item.qty}</p>
                    </div>
                ))}
            </div>





           
        </div>
    );
}