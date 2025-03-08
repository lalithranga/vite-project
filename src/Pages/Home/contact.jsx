import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Contact() {
    useEffect(() => {
            AOS.init();
            AOS.refresh();
          }, []);
        
    // State Variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");

    async function onsubmitForm(e) {
        e.preventDefault(); // Prevent form refresh

        try {
            const result = await axios.post("http://localhost:3000/api/massage", {
                name   : name,
                email  : email,
                contact_number : phoneNumber,
                message : message
            });

            console.log(result);

            toast.success("Message sent successfully");

            // Clear form fields
            setName("");
            setEmail("");
            setPhoneNumber("");
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again.");
        }
    }

    return (
        <div className="h-full w-full flex flex-row justify-evenly mt-1 "   data-aos="fade-left"
  data-aos-offset="500"
  data-aos-duration="500"  // 10000 is 10 seconds which is very slow
  data-aos-easing="ease-in-out"
  data-aos-once="false">
            {/* Left Section - Contact Info */}
            <div className="flex flex-col justify-center p-10 text-gray-900 h-full w-[500px]">
                <h1 className="text-3xl font-bold mb-4">How can we help?</h1>
                <p className="mb-4">
                    Get a FREE quote or simply say hi and tell us how we can help you with your next event.
                </p>

                <div className="mb-4">
                    <h2 className="font-bold">Address</h2>
                    <p>48A, Radley Street</p>
                    <p>Woolston, Christchurch</p>
                </div>

                <div className="mb-4">
                    <h2 className="font-bold">Open Times</h2>
                    <p>Mon-Fri 10am to 6pm</p>
                    <p>Sat 10am to 12pm</p>
                </div>

                <div className="mb-4">
                    <h2 className="font-bold">Contact us here</h2>
                    <p className="text-blue-600 font-medium">027 316 7994</p>
                    <p className="text-blue-600 font-medium">
                        <a href="mailto:wkdlkumara@gmail.com">wkdlkumara@gmail.com</a>
                    </p>
                </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="w-[100%-500px] h-full flex flex-col items-center justify-center mt-15 mr-20">
                <div className="bg-white shadow-lg rounded-2xl p-3 max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Feel free to reach out to us for any inquiries or support.
                    </p>

                    <form className="space-y-4" onSubmit={onsubmitForm}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
                            <input
                                type="string"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Contact Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Message</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Message"
                                rows="4"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
