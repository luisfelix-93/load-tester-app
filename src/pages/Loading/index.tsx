import { getTestResults } from "@/api/loadtester";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function Loading () {
    const { testId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async () =>{
            if (!testId) return;
            const data = await getTestResults(testId);
            // Verifica se 'data' é um objeto, não nulo, e se 'result' é um array com itens
            if (typeof data === 'object' && data !== null && Array.isArray(data.result) && data.result.length > 0) {
                clearInterval(interval);
                navigate(`/resumo/${testId}`);
            }
            // Se os dados não estiverem prontos ou houver um erro temporário, o polling continua
        }, 2000); // Polling a cada 2 segundos
        return () => clearInterval(interval);
    }, [testId, navigate]);
    return(
        <div className="flex justify-center items-center h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Testando a aplicação...</h1>
          <p>Estamos processando o teste. Isso pode levar alguns segundos.</p>
        </div>
      </div>
    )
}