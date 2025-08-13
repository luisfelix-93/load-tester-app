import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">Load Tester & Monitor</h1>
                <p className="text-lg text-gray-600 mt-2">Suas ferramentas para análise de performance e disponibilidade.</p>
            </div>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card 1: Teste de Carga */}
                <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center h-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">⚡ Teste de Carga</h2>
                    <p className="text-gray-700 mb-6 flex-grow">
                        Simule carga em endpoints HTTP e analise a performance
                        com gráficos detalhados e relatórios interativos.
                    </p>
                    <ul className="text-left text-gray-600 mb-8 space-y-2">
                        <li>✅ Simulação com múltiplas requisições</li>
                        <li>✅ Métricas de sucesso, falha, e tempo de resposta</li>
                        <li>✅ Gráficos interativos dos resultados</li>
                        <li>✅ Exportação dos relatórios em JSON</li>
                    </ul>
                    <Button onClick={() => navigate("/loadtest")} className="w-full max-w-xs text-lg mt-auto">
                        Iniciar Teste
                    </Button>
                </div>

                {/* Card 2: Health Check */}
                <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center h-full">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">🔎 Monitoramento de Health Check</h2>
                    <p className="text-gray-700 mb-6 flex-grow">
                        Cadastre endpoints para monitorar disponibilidade e tempo de resposta em tempo real.
                    </p>
                    <ul className="text-left text-gray-600 mb-8 space-y-2">
                        <li>✅ Relatórios de uptime e histórico de status</li>
                        <li>✅ Gráficos de disponibilidade e resposta</li>
                        <li>✅ Gerenciamento fácil pelo dashboard</li>
                    </ul>
                    <Button
                        onClick={() => navigate("/monitor")}
                        className="w-full max-w-xs text-lg mt-auto"
                        variant="secondary"
                    >
                        Acessar Monitoramento
                    </Button>
                </div>
            </div>
        </div>
    );
}