import { User, Menu } from "lucide-react";

const Navbar = ({ onSidebarToggle }: { onSidebarToggle?: () => void }) => {
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

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm text-gray-600 font-medium">Vaibhav</span>
        <User className="w-7 h-7 text-blue-700 bg-blue-100 rounded-full p-1 border" />
      </div>
    </header>
  );
};

export default Navbar;