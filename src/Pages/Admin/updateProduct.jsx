import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateProduct() {
    const location = useLocation();
    const navigate = useNavigate();

    const [key, setKey] = useState(location.state?.key || "");
    const [name, setName] = useState(location.state?.name || "");
    const [price, setPrice] = useState(location.state?.price || "");
    const [description, setDescription] = useState(location.state?.description || "");
    const [category, setCategory] = useState(location.state?.category || "uncategorised");
    const [dimensions, setDimensions] = useState(location.state?.dimensions || "");
    const [image, setImage] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let imageUrls = location.state?.images || [];

            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            if (image.length > 0) { // Upload only if new images are selected
                const promises = image.map(file => mediaUpload(file));
                const uploadedImages = await Promise.all(promises);
                imageUrls = [...imageUrls, ...uploadedImages]; // Append new images to existing ones
            }

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`,
                { key, name, price, description, category, dimensions, images: imageUrls },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Product updated:", response.data);
            navigate("/admin/product");

        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Update Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input type="text" name="key" value={key} className="w-full p-3 border border-gray-300 rounded-lg text-lg" disabled />
                    <input type="text" name="name" placeholder="Name" value={name} className="w-full p-3 border border-gray-300 rounded-lg text-lg" onChange={(e) => setName(e.target.value)} />
                    <input type="number" name="price" placeholder="Price" value={price} className="w-full p-3 border border-gray-300 rounded-lg text-lg" onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" name="description" placeholder="Description" value={description} className="w-full p-3 border border-gray-300 rounded-lg text-lg" onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" name="category" placeholder="Category" value={category} className="w-full p-3 border border-gray-300 rounded-lg text-lg" onChange={(e) => setCategory(e.target.value)} />
                    <input type="text" name="dimensions" placeholder="Dimensions" value={dimensions} className="w-full p-3 border border-gray-300 rounded-lg text-lg" onChange={(e) => setDimensions(e.target.value)} />
                    <input type="file" name="image" multiple className="w-full p-3 border border-gray-300 rounded-lg text-lg" onChange={(e) => setImage([...e.target.files])} />
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 font-semibold text-lg hover:bg-blue-600">Update Item</button>
                </form>
            </div>
        </div>
    );
}
