import { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getAnalysisById, AnalysisResult } from "../../api/dnsCertAPI";

// Componente de fallback para o Suspense
const LoadingComponent = () => (
    <div className="text-center p-4">
        <p>A carregar componentes...</p>
    </div>
);

// Lazy loading para todos os componentes de resultado
const DnsResults = lazy(() => import("../../components/DnsResults"));
const SslResults = lazy(() => import("../../components/SslResults"));
const HeaderResults = lazy(() => import("../../components/HeaderResults"));
const BlacklistResults = lazy(() => import("../../components/BlackListResults"));


export default function Analysis() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Nenhum ID de análise fornecido.");
            setLoading(false);
            return;
        }

        const fetchAnalysis = async () => {
            setLoading(true);
            setError(null);
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
                {analysis && <p className="text-lg text-muted-foreground mt-2">Detalhes para: {analysis.target}</p>}
            </div>

            {loading && (
                <div className="mt-8 text-center">
                    <p>A carregar o resultado da análise...</p>
                </div>
            )}

            {error && (
                <div className="mt-4 text-red-500 text-center bg-red-100 p-4 rounded-md">
                    <p className="font-bold">Ocorreu um erro</p>
                    <p>{error}</p>
                </div>
            )}

            {!loading && analysis && (
                 <div className="max-w-4xl mx-auto space-y-8">
                    <Suspense fallback={<LoadingComponent />}>
                        {/* Os componentes são renderizados aqui, apenas se os dados existirem */}
                        {analysis.blacklist && <BlacklistResults blacklist={analysis.blacklist} />}
                        {analysis.headers && <HeaderResults headers={analysis.headers} />}
                        {analysis.dns && <DnsResults dns={analysis.dns} />}
                        {analysis.ssl && <SslResults ssl={analysis.ssl} />}
                    </Suspense>
                </div>
            )}
        </div>
    );
}

