import axios from "axios";
import "./login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function onsubmitForm(e) {
        e.preventDefault();
        console.log(user, password);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const res = await axios.post(`${backendUrl}/api/users/login`, {
                email: user,
                password: password,
            });

            console.log(res);
            toast.success(res.data.message);

            const { user: loggedInUser, token } = res.data;
            localStorage.setItem("token", token);

            if (loggedInUser.role === "admin") {
                navigate("/Admin");
            } else {
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || "Request failed with status code 400");
        }
    }

    return (
        <div className="background w-full h-screen flex items-center justify-center relative">
            <div className="h-70 w-80 absolute rounded-2xl backdrop-blur-xl">
                <form onSubmit={onsubmitForm}>
                    <input
                        type="text"
                        placeholder="UserName"
                        value={user}
                        className="w-full h-12  outline-white rounded-2xl my-2 px-2 mt-[70px]"
                        onChange={(e) => setUser(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="w-full h-12 outline-white rounded-2xl my-2 px-2 mt-[20px]"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="w-full h-12 bg-white rounded-2xl my-2 px-2 mt-[20px]">
                        Login
                    </button>

                    <Link to="/register" className="w-full h-5 mt-[1px] my-0 text-white mr-2">
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}
