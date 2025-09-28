import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHistoryByTarget, AnalysisResult } from "@/api/dnsCertAPI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function History() {
    // --- CORRIGIDO ---
    // O parâmetro na URL é 'target', para ser consistente com a API.
    // Usamos 'useParams' para extrair esse valor.
    const { target } = useParams<{ target: string }>();
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<AnalysisResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Usamos a variável 'target' que vem da URL
        if (!target) return;

        const fetchHistory = async () => {
            setLoading(true);
            const response = await getHistoryByTarget(target);
            if (typeof response === 'string') {
                setError(response);
            } else {
                setHistory(response);
            }
            setLoading(false);
        };

        fetchHistory();
    }, [target]); // A dependência do useEffect agora é 'target'

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                {/* Exibimos o 'target' no título */}
                <h1 className="text-4xl font-bold text-primary">Histórico de Análise para {target}</h1>
            </div>

            {error && (
                <div className="mt-4 text-red-500 text-center">
                    {error}
                </div>
            )}

            {loading && (
                <div className="mt-8 text-center">
                    <p>Carregando histórico...</p>
                </div>
            )}

            {history && history.length > 0 ? (
                <div className="max-w-2xl mx-auto space-y-4">
                    {history.map((analysis) => (
                        <Link to={`/analysis/${analysis.id}`} key={analysis.id}>
                            <Card className="hover:bg-muted transition-colors">
                                <CardHeader>
                                    <CardTitle>Análise de {new Date(analysis.CheckedAt).toLocaleString()}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Status: <span className="font-semibold">{analysis.Status}</span></p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center text-muted-foreground">Nenhum histórico encontrado para este domínio.</p>
            )}
        </div>
    );
}

