import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { Button } from "../ui/button";

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
  const { setTheme } = useTheme();

  return (
    <header className="w-full bg-white border-b shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 hover:opacity-80 transition dark:text-blue-400">
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
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
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
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
