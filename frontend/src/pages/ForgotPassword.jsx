import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bgphoto.jpeg";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setMsg("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setMsg(
        data.message || "If this email exists, a reset link has been sent."
      );
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
      <div className="bg-white w-[420px] p-8 rounded shadow relative z-10">
       
        <h2 className="text-center text-xl font-semibold mb-2">
          <span className="text-primary">Digital</span>flake
        </h2>

        
        <p className="text-center text-primary font-medium mb-4">
          Did you forget the password?
        </p>

      
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email address and we’ll send you a password reset link.
        </p>

        
        <div className="relative mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full border border-borderLight rounded px-3 pt-5 pb-2 text-sm focus:outline-none focus:border-primary"
          />
          <label
            className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Email Address
          </label>
        </div>

        
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

       
        {msg && (
          <p className="text-sm text-green-600 mb-4 text-center">{msg}</p>
        )}

      
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primaryDark transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Request Reset Link"}
        </button>

       
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-primary hover:underline"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
