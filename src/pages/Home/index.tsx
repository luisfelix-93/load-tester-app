import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                LoadTester
            </h1>
            <p className="text-left text-gray-700 max -w-2x1 mb-8">
                Uma ferramenta para simular carga em endpoints HTTP e analisar a performance
                com gráficos detalhados e relatórios interativos.
            </p>

            <ul className="text-left text-gray-600 mb-8 space-y-2 max-w-md">
                <li>✅ Simulação com múltiplas requisições e concorrência configurável</li>
                <li>✅ Métricas de sucesso, falha, TTFB, TTLB</li>
                <li>✅ Gráficos de Requisição E Retorno</li>
                <li>✅ Gráficos de Tempo de Resposta por Requisição</li>
                <li>✅ Gráficos de Código de Status e Tempo de Requisição</li>
                <li>✅ Exportação dos Resultados como JSON</li>
                <li>✅ Visualização interativa em páginas de relatório com rolagens</li>
            </ul>
            <Button onClick={() => navigate("/loadtest")} className="text-lg px-6 py-3">
                Iniciar Teste
            </Button>
        </div>
    )
}