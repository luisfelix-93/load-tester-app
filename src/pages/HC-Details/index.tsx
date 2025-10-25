import { Endpoint, getEndpointById, getLogsByEndpoint, HealthCheckLog, deleteEndpoint } from "@/api/healthcheck";
import { Button } from "@/components/ui/button";
import { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";

const LogTimeChart = lazy(() => import("@/components/LogTimeChart"));
const LogDisplay = lazy(() => import("@/components/LogDisplay"));

export default function HCDetails() {
    const { endpointId } = useParams<{ endpointId: string }>();
    const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
    const [logs, setLogs] = useState<HealthCheckLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [endpointData, logsData] = await Promise.all([
                    getEndpointById(endpointId),
                    getLogsByEndpoint(endpointId)
                ]);
                setEndpoint(endpointData);
                setLogs(logsData);
            } catch (error) {
                setError("Falha ao buscar os dados. Verifique se a API está no ar");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [endpointId])

    const handleDelete = async () => {
        if (window.confirm("Tem certeza que deseja deletar este endpoint? Esta ação é irreversível.")) {
            try {
                await deleteEndpoint(endpointId);
                alert("Endpoint deletado com sucesso!");
                navigate('/monitor');
            } catch (err) {
                setError("Falha ao deletar o endpoint.");
                console.error(err);
            }
        }
    };

    if (loading) return <p className="text-center">Carregando detalhes...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!endpoint) return <p className="text-center">Endpoint não encontrado.</p>;

    const onlineLogs = logs.filter(log => log.status === 'Online').length;
    const uptime = logs.length > 0 ? ((onlineLogs / logs.length) * 100).toFixed(2) : 'N/A';
    return (
        <div className="space-y-8">
            <div>
                <button
                    onClick={() => navigate('/monitor')}
                    className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Retornar
                </button>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{endpoint.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{endpoint.url}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Uptime ({logs.length} checks): <span className="font-bold">{uptime}%</span></p>
                </div>
                <Button variant="destructive" onClick={handleDelete}>
                    Deletar Endpoint
                </Button>
            </div>

            {logs.length > 0 ? (
                <Suspense fallback={<Loading />}>
                    <div className="flex flex-col gap-8 max-h-[70vh] overflow-y-auto pb-4">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <LogTimeChart logs={logs} />
                        </div>
                        <LogDisplay logs={logs} />
                    </div>
                </Suspense>
            ) : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-500">
                    Ainda não há logs de monitoramento para este endpoint.
                </div>
            )}

        </div>
    );
}
