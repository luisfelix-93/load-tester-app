import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlacklistResult } from "../../api/dnsCertAPI";

interface BlacklistResultsProps {
    blacklist: BlacklistResult | null | undefined;
}

export default function BlacklistResults({ blacklist }: BlacklistResultsProps) {
    if (!blacklist) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Verificação de Blacklist</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Nenhuma informação de blacklist disponível.</p>
                </CardContent>
            </Card>
        );
    }
    
    const isListed = blacklist.is_listed;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Verificação de Blacklist</span>
                     <span className={`text-lg font-bold ${isListed ? 'text-red-500' : 'text-green-500'}`}>
                        {isListed ? 'EM BLACKLIST' : 'LIMPO'}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {isListed && Array.isArray(blacklist.listed_on) && blacklist.listed_on.length > 0 && (
                     <div>
                        <h3 className="font-semibold">Encontrado nas seguintes listas:</h3>
                        <ul className="list-disc list-inside pl-4 mt-2 font-mono text-sm">
                            {blacklist.listed_on.map((server, index) => (
                                <li key={index}>{server}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {!isListed && (
                     <p>O IP do domínio não foi encontrado nas principais listas de DNSBL.</p>
                )}
                 {blacklist.error && (
                    <div>
                        <h3 className="font-semibold text-red-500">Erro</h3>
                        <p>{blacklist.error}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
