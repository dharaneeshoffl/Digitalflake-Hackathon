import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="h-14 bg-primary flex items-center justify-end px-6">
        <button onClick={() => setOpen(true)}>
          <UserCircleIcon className="w-7 h-7 text-white" />
        </button>
      </header>

      {open && (
        <LogoutModal onCancel={() => setOpen(false)} onConfirm={logout} />
      )}
    </>
  );
}
