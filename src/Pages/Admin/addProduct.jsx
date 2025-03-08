import { useState } from "react"; // Import useState for managing input field states
import toast from "react-hot-toast"; // Import toast for showing notifications
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection after product addition
import mediaUpload from "../../utils/mediaUpload";

export default function AddProduct() {
    /* Define state variables for form fields */
    const [key, setKey] = useState(""); // Unique product key
    const [name, setName] = useState(""); // Product name
    const [price, setPrice] = useState(""); // Product price
    const [description, setDescription] = useState(""); // Product description
    const [category, setCategory] = useState("Audio"); // Default category set to "Audio"
    const [dimensions, setDimensions] = useState(""); // Product dimensions
    const [image, setImage] = useState(); // Image URL (not currently used in form)
    
    const navigate = useNavigate(); // Hook for redirecting after form submission

    /* Function to handle form submission */
    async function addProduct() {

        event.preventDefault();
       
        
        const promises=[];

        for (let i = 0; i < image.length; i++) {
            const promise = await mediaUpload(image[i]);

            promises.push(promise);
        }
        
   

         
        console.log({ key, name, price, description, category, dimensions, image });

        const token = localStorage.getItem("token"); 
        console.log(token); 

        if (token) {
            if (!image || image?.length === 0) {
                toast.error("Please upload an image");
                return;
            }
            

            try {

                const imageurl = await Promise.all(promises);
                /* Send a POST request to the backend to add the product */
                const result = await axios.post("http://localhost:3000/api/products", {
                    key: key,
                    name: name,
                    price: price,
                    description: description,
                    catagory: category,
                    dimensions: dimensions,
                    images: imageurl,
                }, { 
                    headers: {
                        Authorization: "Bearer " + token // Include authentication token
                    },
                    timeout: 5000 // Set timeout to 5 seconds to avoid infinite waiting
                });

                console.log(result); // Log response from backend
                toast.success("Product added successfully"); // Show success notification
                navigate("/admin/"); // Redirect to the admin panel
                
            } catch (error) {
                console.error(error); // Log any errors
                toast.error(`Request failed: ${error.message}`); // Show error notification
            }
        } else {
            toast.error("No token found. Please log in."); // Notify user if no token is found
        }
    }

    return (
        /* Outer container with full width and padding */
        <div className="w-full h-full flex flex-row bg-gray-100 p-6">
            
            {/* Form container */}
            <form className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md" onSubmit={addProduct}>
                
                {/* Input field for Product Key */}
                <input
                    type="text"
                    name="key"
                    placeholder="Key"
                    className="border border-gray-300 p-2 rounded"
                    required
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />

                {/* Input field for Product Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    className="border border-gray-300 p-2 rounded"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Input field for Product Price */}
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="border border-gray-300 p-2 rounded"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                {/* Textarea for Product Description */}
                <textarea
                    name="description"
                    placeholder="Description"
                    className="border border-gray-300 p-2 rounded"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                {/* Dropdown selection for Product Category */}
                <select
                    name="category"
                    className="border border-gray-300 p-2 rounded"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Audio">Audio</option>
                    <option value="Lights">Lights</option>
                    <option value="Instrument">Instrument</option>
                </select>
                <input
                    type="file"
                    name="image"
                    multiple
                    className="border border-gray-300 p-2 rounded-2xl bg-gray-100 "
                    onChange={(e) => setImage(Array.from(e.target.files))}

                />

                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Submit
                </button>

            </form>
        </div>
    );
}
