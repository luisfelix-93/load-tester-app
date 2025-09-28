import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Moon, Sun} from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { Button } from "../ui/button";
import { useState } from "react";

// Estrutura de navegação atualizada para suportar submenus
const navItems = [
  {
    label: "Teste de Carga",
    path: "/loadtest",
    submenu: [
      { label: "Executar Teste", path: "/loadtest" },
      { label: "Histórico", path: "/resumo" },
    ],
  },
  { label: "Health Check", path: "/monitor"},
  { label: "DNS & SSL Checker", path:"/dns-checker"}
];

export default function Navbar() {
  const location = useLocation();
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/">
          <img src="/support_io.png" alt="support.io logo" className="h-20 w-auto" />
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-4">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center text-sm font-medium px-3 py-2 rounded-md transition-colors",
                        // Destaca se a rota atual está dentro do submenu
                        item.submenu.some((sub) => sub.path === location.pathname)
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted hover:text-muted-foreground"
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
        <div className="md:hidden flex items-center">
          <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "w-full text-left flex items-center text-sm font-medium px-3 py-2 rounded-md transition-colors",
                        // Destaca se a rota atual está dentro do submenu
                        item.submenu.some((sub) => sub.path === location.pathname)
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted hover:text-muted-foreground"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="ml-auto h-4 w-4" />
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
                    "block text-sm font-medium px-3 py-2 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted hover:text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <div className="px-4 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>Theme</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
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
          </div>
        </div>
      )}
    </header>
  );
}
