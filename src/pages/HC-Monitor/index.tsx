import { Endpoint, getEndpoints, getLogsByEndpoint } from "@/api/healthcheck";
import AddEndpointForm from "@/components/AddEndpointForm";
import EndpointCard from "@/components/EndpointCard";
import Modal from "@/components/Modal";
import { useCallback, useEffect, useState } from "react";

export default function HCMonitor() {
    const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchAllData = useCallback(async () => {
        try {
            if (endpoints.length === 0) setLoading(true);

            // 1. Busca a lista inicial de endpoints
            const initialEndpoints = await getEndpoints();
            if (!initialEndpoints) {
                throw new Error("Não foi possível buscar a lista de endpoints.");
            }

            // 2. Dispara todas as chamadas para buscar os logs em paralelo
            const logPromises = initialEndpoints.map((endpoint: { _id: string; }) =>
                getLogsByEndpoint(endpoint._id)
            );

            // Espera todas as chamadas de logs terminarem
            const logsResults = await Promise.all(logPromises);

            // 3. Combina os endpoints com seus respectivos logs
            const endpointsWithLogs = initialEndpoints.map((endpoint: any, index: number | number) => {
                return {
                    ...endpoint,
                    logs: logsResults[index] || [] // Adiciona o array de logs ao objeto do endpoint
                };
            });

            setEndpoints(endpointsWithLogs);
            setError(null);
        } catch (err) {
            setError('Falha ao buscar os dados. Verifique se a API está no ar.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [endpoints.length]);

    useEffect(() => {
        fetchAllData(); // Chama a função de busca na montagem

        const intervalId = setInterval(() => {
            fetchAllData(); // E a cada 30 segundos
        }, 30000); // 30 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [fetchAllData]); // Adiciona fetchAllData como dependência do useEffect

    const handleSuccessOnCreate = () => {
        setIsModalOpen(false);
        fetchAllData(); // Atualiza todos os dados após criar um novo endpoint
    };
    return(
        <div>
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700">Dashboard</h2>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
                + Adicionar Endpoint
            </button>
        </div>

        {loading && <p className="text-center text-gray-500">Carregando dados...</p>}
        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>}

        {!loading && !error && endpoints.length === 0 && (
            <div className="text-center p-12 border-2 border-dashed rounded-lg mt-4">
                <h3 className="text-xl font-semibold text-gray-700">Nenhum endpoint monitorado</h3>
                <p className="text-gray-500 mt-2">Clique no botão "+ Adicionar Endpoint" para começar a monitorar.</p>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endpoints.map((endpoint) => (
                // O EndpointCard não precisa de nenhuma mudança, ele receberá a prop 'logs'
                <EndpointCard key={endpoint._id} endpoint={endpoint} />
            ))}
        </div>

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Adicionar Novo Endpoint"
        >
            <AddEndpointForm onSuccess={handleSuccessOnCreate} />
        </Modal>
    </div>
    )
    
}