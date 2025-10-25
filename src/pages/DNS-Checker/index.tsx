import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { analyzeUrl, AnalysisResult } from "../../api/dnsCertAPI";
import DnsResults from "../../components/DnsResults";
import SslResults from "../../components/SslResults";
import { useNavigate } from "react-router-dom";


export default function DNSChecker() {
    const navigate = useNavigate();
    const [domain, setDomain] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyse = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            // A sanitização do hostname já é feita no backend,
            // então podemos enviar o domínio diretamente.
            const response = await analyzeUrl(domain);

            if (typeof response === 'string') {
                setError(response);
            } else {
                setResults(response);
            }

        } catch (err) {
            setError("Falha ao analisar o domínio. Verifique o nome e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-primary">DNS & SSL Health Checker</h1>
                <p className="text-lg text-muted-foreground mt-2">
                    Análise rápida da saúde da configuração DNS e SSL de um domínio.
                </p>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Ex: google.com ou https://google.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="flex-grow"
                    />
                    <Button onClick={handleAnalyse} disabled={loading}>
                        {loading ? "Analisando..." : "Analisar"}
                    </Button>
                </div>

                {error && (
                    <div className="mt-4 text-red-500 text-center">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="mt-8 text-center">
                        <p>Analisando... por favor, aguarde.</p>
                        {/* Pode adicionar um spinner aqui */}
                    </div>
                )}

                {results && (
                    <div className="mt-8 space-y-8">
                        <div className="flex gap-2 justify-center">
                            <Button onClick={() => navigate(`/analysis/${results.id}`)}>
                                Ver Detalhes
                            </Button>
                            {/* <Button onClick={() => navigate(`/history/${results.Target}`)} variant="outline">
                                Ver Histórico
                            </Button> */}
                        </div>
                        {/* --- CORRIGIDO --- */}
                        {/* Apenas verificamos se o objeto existe, sem usar .length ou [0] */}
                        {results.dns && <DnsResults dns={results.dns} />}
                        {results.ssl && <SslResults ssl={results.ssl} />}
                    </div>
                )}
            </div>
        </div>
    );
}

