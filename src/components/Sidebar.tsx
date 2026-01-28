import { NavLink } from "react-router";
import { X, CreditCard, List, Calendar, Gift, Shield } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: <CreditCard className="w-5 h-5" /> },
  { to: "/transactions", label: "Transactions", icon: <List className="w-5 h-5" /> },
  { to: "/billing", label: "Billing", icon: <Calendar className="w-5 h-5" /> },
  { to: "/rewards", label: "Rewards", icon: <Gift className="w-5 h-5" /> },
  { to: "/controls", label: "Card Controls", icon: <Shield className="w-5 h-5" /> },
  // { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
];

const Sidebar = ({ open, onClose }: { open?: boolean; onClose?: () => void }) => {
  return (
    <aside
      className={`
        fixed lg:static z-40 top-0 left-0 h-full w-64 bg-white shadow-lg border-r
        flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Mobile close button */}
      <div className="flex items-center justify-between md:hidden h-16 px-4 border-b">
        <span className="font-bold text-blue-700 text-lg">Menu</span>
        <button onClick={onClose} className="p-2 rounded hover:bg-blue-100">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors text-gray-700 text-base ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-blue-100"
              }`
            }
            onClick={onClose}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="hidden md:block h-8" />
    </aside>
  );
};

export default Sidebar;