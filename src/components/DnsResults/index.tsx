import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DNS } from "../../api/dnsCertAPI";

interface DnsResultsProps {
    dns: DNS | null; // Permite que a prop dns seja nula
}

export default function DnsResults({ dns }: DnsResultsProps) {
    // Se não houver dados de DNS, não renderiza nada ou mostra uma mensagem
    if (!dns) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Resultados DNS</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Não foram encontrados resultados de DNS.</p>
                </CardContent>
            </Card>
        );
    }

    const dnsRecords = {
        A: dns.a,
        AAAA: dns.aaaa,
        // CNAME não está no seu modelo de backend, removido por enquanto
        MX: dns.mx,
        NS: dns.ns,
        TXT: dns.txt,
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resultados DNS</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Object.entries(dnsRecords).map(([type, records]) => (
                        // Garante que 'records' é um array antes de mapear
                        Array.isArray(records) && records.length > 0 && (
                            <div key={type}>
                                <h3 className="font-semibold">{type}</h3>
                                <ul className="list-disc list-inside pl-4 break-all">
                                    {records.map((record, index) => (
                                        <li key={index} className="font-mono text-sm">{record}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                    {dns.error && (
                        <div>
                            <h3 className="font-semibold text-red-500">Erro</h3>
                            <p>{dns.error}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

