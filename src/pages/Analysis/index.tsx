import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnalysisById, AnalysisResult } from "../../api/dnsCertAPI";
import DnsResults from "../../components/DnsResults";
import SslResults from "../../components/SslResults";

export default function Analysis() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchAnalysis = async () => {
            setLoading(true);
            const response = await getAnalysisById(id);
            if (typeof response === 'string') {
                setError(response);
            } else {
                setAnalysis(response);
            }
            setLoading(false);
        };

        fetchAnalysis();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-primary">Resultado da Análise</h1>
                 {analysis && <p className="text-lg text-muted-foreground mt-2">Detalhes para: {analysis.Target}</p>}
            </div>

            {error && (
                <div className="mt-4 text-red-500 text-center">
                    {error}
                </div>
            )}

            {loading && (
                <div className="mt-8 text-center">
                    <p>Carregando resultado da análise...</p>
                </div>
            )}

            {analysis && (
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* --- CORRIGIDO --- */}
                    {/* Apenas verificamos se o objeto existe */}
                    {analysis.dns && <DnsResults dns={analysis.dns} />}
                    {analysis.ssl && <SslResults ssl={analysis.ssl} />}
                </div>
            )}
        </div>
    );
}

