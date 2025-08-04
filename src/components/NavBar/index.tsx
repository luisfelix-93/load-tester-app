import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Teste", path: "/loadtest" },
  { label: "Resumo", path: "/resumo" },
  { label: "Health Check", path: "/monitor"}
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo como link para a home */}
        <Link to="/" className="text-xl font-bold text-blue-600 hover:opacity-80 transition">
          Load Tester
        </Link>
        {/* Navegação */}
        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
