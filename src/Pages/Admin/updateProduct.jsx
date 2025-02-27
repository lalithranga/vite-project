import axios from "axios"; // Import axios for making HTTP requests
import { useState } from "react"; // Import useState for managing form state
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks for navigation and retrieving route state

export default function UpdateProduct() {
    const location = useLocation(); // Get the current route's state
    const navigate = useNavigate(); // Hook for navigating between pages

    /* Define state variables for each product field */
    const [key, setKey] = useState(location.state?.key || ""); // Product key (read-only)
    const [name, setName] = useState(location.state?.name || ""); // Product name
    const [price, setPrice] = useState(location.state?.price || ""); // Product price
    const [description, setDescription] = useState(location.state?.description || ""); // Product description
    const [category, setCategory] = useState(location.state?.category || "uncategorised"); // Product category (default: "uncategorised")
    const [dimensions, setDimensions] = useState(location.state?.dimensions || ""); // Product dimensions

    /* Handle form submission */
    function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission behavior

        const token = localStorage.getItem("token"); // Retrieve authentication token from local storage
        console.log(token); // Log the token for debugging purposes

        /* Send a PUT request to update the product */
        axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${location.state.key}`, // API endpoint with product key
            { key, name, price, description, category, dimensions }, // Request payload
            {
                headers: {
                    Authorization: "Bearer " + token // Include authorization header
                }
            }
        )
        .then((res) => {
            console.log(res); // Log server response
            navigate("/admin/product"); // Redirect to the admin product page after a successful update
        })
        .catch(err => console.error(err)); // Log errors if the request fails
    }

    return (
        /* Outer container with full width and height */
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
            
            {/* Centered card for the form */}
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                
                {/* Heading for the form */}
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Product</h2>
                
                {/* Form element with submit handler */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    
                    {/* Input field for Key (Read-Only) */}
                    <input
                        type="text"
                        name="key"
                        placeholder="Key"
                        value={key}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setKey(e.target.value)}
                        disabled // This prevents user modification
                    />

                    {/* Input field for Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Input field for Price */}
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={price}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    {/* Input field for Description */}
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={description}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Input field for Category */}
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={category}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    {/* Input field for Dimensions */}
                    <input
                        type="text"
                        name="dimensions"
                        placeholder="Dimensions"
                        value={dimensions}
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setDimensions(e.target.value)}
                    />

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 font-semibold text-lg hover:bg-blue-600 transition duration-200"
                    >
                        Update Item
                    </button>
                </form>
            </div>
        </div>
    )
}
