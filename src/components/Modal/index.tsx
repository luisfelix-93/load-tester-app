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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center items-center"
            onClick={onClose}
        >
            {/* Painel do Modal */}
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 z-50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabeçal do Modal */}
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2x1">&times;</button>
                </div>

                {/* Corpo do Modal */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}