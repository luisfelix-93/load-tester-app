import { Link, useLocation } from "react-router-dom";
import { Zap, HeartPulse, ShieldCheck, Sun, Moon, X, ChevronFirst, Cog } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "../ThemeProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SideBarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const navItems = [
    {
        pillar: "Operacional",
        icon: Zap,
        links: [
            { label: "Executar Teste", path: "/loadtest" },
            { label: "Histórico de Testes", path: "/resumo" },
        ],
    },
    {
        pillar: "Monitoramento",
        icon: HeartPulse,
        links: [
            { label: "Health Check", path: "/monitor" },
        ],
    },
    {
        pillar: "Segurança",
        icon: ShieldCheck,
        links: [
            { label: "DNS & SSL Checker", path: "/dns-checker" },
        ],
    },
    {
        pillar: "Configurações",
        icon: Cog,
        links: [
            { label: "Configurações de SMTP", path: "/settings_smtp" }
        ]
    }
];

export default function SideBar({ isCollapsed, toggleSidebar }: SideBarProps) {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <>
            {/* Overlay para fechar a sidebar no mobile */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Container da Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-card border-r z-40 transition-transform duration-300 ease-in-out",
                    isCollapsed && "-translate-x-full" // Esconde a sidebar fora da tela
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b h-16">
                        <Link to="/" onClick={isMobile ? toggleSidebar : undefined}>
                             <img src={isDark ? "/support_io_white.png" : "/support_io.png"} alt="support.io logo" className="h-16 w-auto" />
                        </Link>
                         <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                        <Accordion type="multiple" defaultValue={["Operacional", "Monitoramento", "Segurança"]} className="w-full">
                            {navItems.map(({ pillar, icon: Icon, links }) => (
                                <AccordionItem value={pillar} key={pillar}>
                                    <AccordionTrigger className="text-sm font-semibold uppercase text-muted-foreground hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-5 w-5" />
                                            <span>{pillar}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-4">
                                        <ul className="space-y-1">
                                            {links.map(({ label, path }) => (
                                                <li key={path}>
                                                    <Link
                                                        to={path}
                                                        onClick={isMobile ? toggleSidebar : undefined}
                                                        className={cn(
                                                            "block px-3 py-2 text-sm rounded-md transition-colors",
                                                            location.pathname.startsWith(path)
                                                                ? "bg-primary text-primary-foreground"
                                                                : "hover:bg-muted"
                                                        )}
                                                    >
                                                        {label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </nav>

                     <div className="p-4 border-t">
                        <Button
                            variant="outline"
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className="w-full justify-start gap-2"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            <span>Mudar Tema</span>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}