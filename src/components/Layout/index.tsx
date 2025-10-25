import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SideBar from "../SideBar";
import { cn } from "@/lib/utils";

export default function Layout() {
    // Estado para controlar a visibilidade da sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Efeito para ajustar o estado inicial com base na largura da tela
    useEffect(() => {
        const checkScreenWidth = () => {
            setIsCollapsed(window.innerWidth < 1024); // Recolhe por padrão em telas menores que lg
        };
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    return (
        <div className="relative flex min-h-screen bg-background">
            {/* Componente da Sidebar */}
            <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

            {/* Wrapper do Conteúdo Principal */}
            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                    // Adiciona margem à esquerda quando a sidebar estiver aberta em telas de desktop
                    !isCollapsed ? "lg:ml-64" : ""
                )}
            >
                {/* Cabeçalho com o botão de toggle */}
                <header className="sticky top-0 h-16 flex items-center px-4 bg-card/80 backdrop-blur-lg border-b z-30">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </header>

                {/* Conteúdo da Página */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}