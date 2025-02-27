import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./user.css"

export default function User() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailError, setEmailError] = useState(""); // New state for email error

    const navigate = useNavigate();

    // Validate email format
    const validateEmail = (email) => {
        // Regex to check if email contains "@" and "."
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    function onsubmitForm(e) {
        e.preventDefault(); // Prevent default form submission

        // Check if the email is valid
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError(""); // Clear error if email is valid
        }

        // Proceed with the API request if email is valid
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            address: address,
            phone_number: phoneNumber
        })
            .then((res) => {
                console.log(res.data.message);
                navigate("/login");
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.response?.data?.error || "Request failed with status code 400", {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    }

    return (
        <div className="background min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md shadow-lg rounded-lg p-8 backdrop-blur-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Registration</h2>
                <form className="space-y-4" onSubmit={onsubmitForm}>
                    <div>
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Show error if any */}
                    </div>
                    <div>
                        <label className="block font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Enter your first name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Enter your last name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Phone Number</label>
                        <input
                            type="number"
                            name="phone_number"
                            placeholder="Enter your phone number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
