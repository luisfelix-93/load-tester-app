import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

// Estrutura de navegação atualizada para suportar submenus
const navItems = [
  {
    label: "Teste de Carga",
    // O path principal pode ser o do primeiro item do submenu ou uma página agregadora
    path: "/loadtest",
    submenu: [
      { label: "Executar Teste", path: "/loadtest" },
      { label: "Histórico", path: "/resumo" },
    ],
  },
  { label: "Health Check", path: "/monitor" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 hover:opacity-80 transition">
          Load Tester
        </Link>
        <nav className="flex items-center space-x-2">
          {navItems.map((item) =>
            item.submenu ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center text-sm font-medium px-3 py-2 rounded-md transition-colors",
                      // Destaca se a rota atual está dentro do submenu
                      item.submenu.some((sub) => sub.path === location.pathname)
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {item.submenu.map((subItem) => (
                    <DropdownMenuItem key={subItem.path} asChild>
                      <Link to={subItem.path}>{subItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )
          )}
        </nav>
      </div>
    </header>
  );
}
