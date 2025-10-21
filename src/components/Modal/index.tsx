import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div 
            // Fundo semi-transparente que cobre a tela
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Painel do Modal */}
            <div
                // CORREÇÕES AQUI:
                // - Trocamos 'bg-white' por 'bg-card' que se adapta ao tema.
                // - Adicionamos 'border' para uma borda sutil no modo escuro.
                className="bg-card border rounded-lg shadow-xl w-full max-w-md m-4 z-50"
                onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
            >
                {/* Cabeçalho do Modal */}
                <div className="flex justify-between items-center border-b p-4">
                    {/* Usando 'text-card-foreground' para o texto do título */}
                    <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
                    {/* Usando 'text-muted-foreground' para o botão de fechar */}
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl">&times;</button>
                </div>

                {/* Corpo do Modal */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}