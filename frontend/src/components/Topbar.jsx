import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
   
    setOpen(false);
  };

  return (
    <>
      <header className="h-14 bg-primary flex items-center justify-end px-6">
        <button onClick={() => setOpen(true)}>
          <UserCircleIcon className="w-8 h-8 text-white" />
        </button>
      </header>

      {open && (
        <LogoutModal
          onCancel={() => setOpen(false)}
          onConfirm={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        />
      )}
    </>
  );
}
