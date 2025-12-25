import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  Squares2X2Icon,
  ListBulletIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const menu = [
  { name: "Home", path: "/dashboard", icon: HomeIcon },
  { name: "Category", path: "/category", icon: Squares2X2Icon },
  { name: "Subcategory", path: "/subcategory", icon: ListBulletIcon },
  { name: "Products", path: "/product", icon: CubeIcon },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
     
      <div className="h-14 bg-primary flex items-center px-6">
        <div className="flex items-center gap-2 text-white font-semibold">
          <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold">
            D
          </div>
          digitalflake
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm transition
               ${
                 isActive
                   ? "bg-yellow-200 font-medium"
                   : "text-gray-600 hover:bg-yellow-100"
               }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
