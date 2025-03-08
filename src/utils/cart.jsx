export default function LoadCart() {
    

    let cart = localStorage.getItem("cart");

    if (cart === null) {
        cart = {
            oredrItems : [],
            days : 1,
            startingDate : formatDate(new Date()),
            endingDate : formatDate(new Date()),

        }
        const cartString = JSON.stringify(cart);
        localStorage.setItem("cart", cartString);

        return cart;

    }

    return JSON.parse(cart);
}



export function addToCard(key,qty) {
    const cart = LoadCart();
    let found = false;

    for (let i = 0; i < cart.oredrItems.length; i++) {
        if (cart.oredrItems[i].key === key) {
            cart.oredrItems[i].qty += qty;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.oredrItems.push({key, qty});
    }
    console.log(cart);

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);

    }

export function removeFromCart(key) {
    const cart = LoadCart();
    const newCart = cart.oredrItems.filter(item => item.key !== key);
    cart.orderItems= newCart;
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}

export function updateQty(key, qty) {
    const cart = LoadCart();

    for (let i = 0; i < cart.oredrItems.length; i++) {
        if (cart.oredrItems[i].key === key) {
            cart.oredrItems[i].qty = qty;
            break;
        }
    }
    

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}   


export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;
}

