import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import bg from "../assets/bgphoto.jpeg";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials");
        return;
      }

     
      login(data.token);
      toast.success("Login successful!");

    
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "600px",
        backgroundColor: "#F6F7FB",
      }}
    >
      <div className="bg-white w-[420px] p-8 rounded shadow">
        <h2 className="text-center text-xl font-semibold mb-8">
          <span className="text-primary">Digital</span>flake
        </h2>

       
        <div className="relative mb-6">
          <input
            type="email"
            placeholder=" "
            className="peer w-full border border-borderLight rounded px-3 pt-5 pb-2 text-sm focus:outline-none focus:border-primary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="absolute left-3 top-2 text-xs text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Email
          </label>
        </div>

       
        <div className="relative mb-6">
          <input
            type="password"
            placeholder=" "
            className="peer w-full border border-borderLight rounded px-3 pt-5 pb-2 text-sm focus:outline-none focus:border-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="absolute left-3 top-2 text-xs text-gray-500  peer-placeholder-shown:top-3.5  peer-placeholder-shown:text-sm  peer-focus:top-2  peer-focus:text-xs peer-focus:text-primary"
          >
            Password
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        <button
          onClick={submit}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primaryDark transition"
        >
          Log in
        </button>

      
        <p className="text-sm text-center mt-4 text-gray-500">
          <a href="/forgot-password" className="hover:underline">
            Forgot Password?
          </a>
        </p>

        
        <p className="text-sm text-center mt-2 text-gray-500">
          New user?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
