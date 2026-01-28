import { User, Menu, LogOut } from "lucide-react";
import { useState } from "react";

const Navbar = ({ onSidebarToggle }: { onSidebarToggle?: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy logout handler
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setMenuOpen(false);
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur border-b flex items-center justify-between px-4 md:px-8 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-blue-100 focus:outline-none lg:hidden"
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6 text-blue-700" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-blue-700 tracking-tight">Credit Card Manager</h1>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* <span className="hidden sm:block text-sm text-gray-600 font-medium">Vaibhav</span> */}
        <div
          className="relative"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            className="focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="User menu"
          >
            <User className="w-7 h-7 text-blue-700 bg-blue-100 rounded-full p-1 border cursor-pointer" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-30 py-2 animate-fade-in">
              <button
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-700 hover:bg-blue-50"
                onClick={handleLogout}
              >
                <LogOut onClick={handleLogout} className="w-4 h-4 text-blue-700" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;