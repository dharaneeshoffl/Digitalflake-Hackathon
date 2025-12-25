import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LogoutModal from "../components/LogoutModal";
import {
  HomeIcon,
  Squares2X2Icon,
  CubeIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-bgLight flex flex-col">
     
      <header className="h-14 bg-primary flex items-center justify-between px-4 sm:px-6">
      
        <div className="flex items-center gap-3">
       
          <button
            onClick={() => setOpenSidebar(true)}
            className="sm:hidden text-white"
          >
            <Bars3Icon className="w-7 h-7" />
          </button>

      
          <div className="text-white font-semibold flex items-center gap-2">
            <span className="border border-white px-2 py-1 rounded">D</span>
            Digital Flake
          </div>
        </div>

     
        <UserCircleIcon
          onClick={() => setShowLogout(true)}
          className="w-8 h-8 text-white cursor-pointer"
        />
      </header>

      <div className="flex flex-1">
        
        <aside className="hidden sm:block w-56 bg-white border-r">
          <SidebarContent />
        </aside>

      
        <main className="flex-1 p-4 sm:p-6">
          <div className="bg-white h-full rounded flex flex-col items-center justify-center">
            <div className="border px-4 py-3 rounded text-white bg-primaryDark text-xl font-semibold mb-2">
              D
            </div>
            <h2 className="text-xl font-semibold text-violet-600">
              <span className="text-black font-bold">Digital</span>flake
            </h2>
            <p className="text-sm text-black mt-1">
              Welcome to Digitalflake admin
            </p>
          </div>
        </main>
      </div>

    
      {openSidebar && (
        <div className="fixed inset-0 z-50 flex">
       
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpenSidebar(false)}
          />

          
          <aside className="w-64 bg-white h-full shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold text-primary">
                <span className="border px-2 py-1 rounded">D</span>
                Digital Flake
              </div>
              <button onClick={() => setOpenSidebar(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <SidebarContent onClickItem={() => setOpenSidebar(false)} />
          </aside>
        </div>
      )}

   
      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={confirmLogout}
        />
      )}
    </div>
  );
}



function SidebarContent({ onClickItem }) {
  return (
    <ul className="text-sm space-y-1">
      <li className="bg-accent rounded">
        <Link
          to="/dashboard"
          onClick={onClickItem}
          className="flex items-center gap-2 px-3 py-2"
        >
          <HomeIcon className="w-4 h-4" />
          Home
        </Link>
      </li>

      <li>
        <Link
          to="/category"
          onClick={onClickItem}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
        >
          <Squares2X2Icon className="w-4 h-4" />
          Category
        </Link>
      </li>

      <li>
        <Link
          to="/subcategory"
          onClick={onClickItem}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
        >
          <Squares2X2Icon className="w-4 h-4" />
          Subcategory
        </Link>
      </li>

      <li>
        <Link
          to="/product"
          onClick={onClickItem}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
        >
          <CubeIcon className="w-4 h-4" />
          Products
        </Link>
      </li>
    </ul>
  );
}
