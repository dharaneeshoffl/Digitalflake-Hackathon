import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const res = await fetch(
      `http://localhost:5000/api/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgLight">
      <div className="bg-white w-[420px] p-8 rounded shadow">
        <h2 className="text-center text-xl font-semibold mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Reset Password
        </button>

        {msg && <p className="text-sm text-green-600 mt-4">{msg}</p>}
      </div>
    </div>
  );
}
