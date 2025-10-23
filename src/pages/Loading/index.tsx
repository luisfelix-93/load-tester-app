// src/pages/Loading/index.tsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "@/services/socket"; // Importe o socket

export default function Loading() {
    const { testId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Função para lidar com a notificação
        const handleTestCompletion = (data: { testId: string }) => {
            // Verifica se a notificação é para o teste atual
            if (data.testId === testId) {
                // Redireciona o usuário para a página de resultados
                navigate(`/resumo/${testId}`);
            }
        };

        // Começa a ouvir pelo evento
        socket.on('push-notification', handleTestCompletion);

        // Função de limpeza para remover o listener
        return () => {
            socket.off('push-notification', handleTestCompletion);
        };
    }, [testId, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">Processando seu teste...</h1>
                <p>Você será redirecionado para os resultados assim que estiverem prontos.</p>
                {/* Pode adicionar um spinner/loading visual aqui */}
            </div>
        </div>
    );
}