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
            if (data && data.result.length > 0) {
                clearInterval(interval);
                navigate(`/resumo/${testId}`);
            }
        }, 1000);
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