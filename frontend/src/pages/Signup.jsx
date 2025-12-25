import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bg from "../assets/bgphoto.jpeg";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

 
      toast.success("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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

       
        <div className="relative mb-5">
          <input
            type="text"
            placeholder=" "
            className="peer w-full border border-borderLight rounded px-3 pt-5 pb-2"
            onChange={(e) => setName(e.target.value)}
          />
          <label
            className="absolute left-3 top-2 text-xs text-gray-500  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm   peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Name
          </label>
        </div>

       
        <div className="relative mb-5">
          <input
            type="email"
            placeholder=" "
            className="peer w-full border border-borderLight rounded px-3 pt-5 pb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="absolute left-3 top-2 text-xs text-gray-500  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm  peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Email
          </label>
        </div>

      
        <div className="relative mb-5">
          <input
            type="password"
            placeholder=" "
            className="peer w-full border border-borderLight rounded px-3 pt-5 pb-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="absolute left-3 top-2 text-xs text-gray-500 peer-placeholder-shown:top-3.  peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Password
          </label>
        </div>

     
        <div className="relative mb-6">
          <input
            type="password"
            placeholder=" "
            className="peer w-full border border-borderLight rounded px-3 pt-5 pb-2"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label
            className="absolute left-3 top-2 text-xs text-gray-500  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm  peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Re-enter Password
          </label>
        </div>

        <button
          onClick={submit}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primaryDark transition"
        >
          Sign up
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
