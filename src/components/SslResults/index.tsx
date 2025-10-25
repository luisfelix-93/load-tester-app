import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SSL } from "../../api/dnsCertAPI";

interface SslResultsProps {
    ssl: SSL;
}

export default function SslResults({ ssl }: SslResultsProps) {
    const getDaysRemainingColor = () => {
        if (ssl.days_remaining < 15) {
            return "text-red-500";
        }
        if (ssl.days_remaining < 30) {
            return "text-yellow-500";
        }
        return "text-green-500";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Certificado SSL</span>
                    <span className={`text-lg font-bold ${ssl.is_valid ? 'text-green-500' : 'text-red-500'}`}>
                        {ssl.is_valid ? 'VÁLIDO' : 'INVÁLIDO'}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {ssl.error && <p className="text-red-500">{ssl.error}</p>}
                <div>
                    <h3 className="font-semibold">Emitido Para</h3>
                    <p>{ssl.issued_to || 'N/A'}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Emitido Por</h3>
                    <p>{ssl.issued_by || 'N/A'}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Válido Desde</h3>
                    <p>{ssl.valid_from ? new Date(ssl.valid_from).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Válido Até</h3>
                    <p>{ssl.valid_until ? new Date(ssl.valid_until).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Dias Restantes</h3>
                    <p className={getDaysRemainingColor()}>{ssl.days_remaining ?? 'N/A'}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Domínios Cobertos (SANs)</h3>
                    {/* --- CORREÇÃO AQUI --- */}
                    {/* Garante que covered_domains é um array antes de chamar .map() */}
                    {Array.isArray(ssl.covered_domains) && ssl.covered_domains.length > 0 ? (
                        <ul className="list-disc list-inside pl-4">
                            {ssl.covered_domains.map((san, index) => (
                                <li key={index}>{san}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum domínio alternativo encontrado.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

