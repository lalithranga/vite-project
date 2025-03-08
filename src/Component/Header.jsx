import { FaCartShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"


export default function Header() {

  return (

<header className="w-full h-[70px] flex items-center justify-between px-8 bg-gradient-to-r from-blue-400 shadow-lg">
  <div className="flex space-x-6">
    <Link to="/" className="text-white text-lg font-semibold hover:text-gray-200 transition">Home</Link>
    <Link to="/products" className="text-white text-lg font-semibold hover:text-gray-200 transition">Products</Link>
    <Link to="/about" className="text-white text-lg font-semibold hover:text-gray-200 transition"></Link>
    <Link to="/contact" className="text-white text-lg font-semibold hover:text-gray-200 transition">Contact</Link>
  </div>

  {/* Container for Cart and Login buttons */}
  <div className="flex items-center space-x-6">
    <Link to="/cart" className="text-blue-600 text-2xl font-semibold hover:text-blue-800 transition">
      <FaCartShopping />
    </Link>
    <Link to="/login" className="text-white text-lg font-semibold bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 transition">
      Login
    </Link>
  </div>
</header>


  )
}