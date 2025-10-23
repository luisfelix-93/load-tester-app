import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeaderResult } from "../../api/dnsCertAPI";

interface HeaderResultsProps {
    headers: HeaderResult | null | undefined;
}

export default function HeaderResults({ headers }: HeaderResultsProps) {
    if (!headers) {
         return (
            <Card>
                <CardHeader>
                    <CardTitle>Verificação de Cabeçalhos HTTP</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Nenhuma informação de cabeçalhos disponível.</p>
                </CardContent>
            </Card>
        );
    }

    const getStatusColor = (status: number) => {
        if (status >= 200 && status < 300) return "text-green-500";
        if (status >= 300 && status < 400) return "text-yellow-500";
        if (status >= 400 && status < 600) return "text-red-500";
        return "text-muted-foreground";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                     <span>Cabeçalhos HTTP</span>
                    {headers.status_code > 0 && (
                         <span className={`text-lg font-bold ${getStatusColor(headers.status_code)}`}>
                            Status: {headers.status_code}
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {headers.error && (
                    <div>
                        <h3 className="font-semibold text-red-500">Erro</h3>
                        <p>{headers.error}</p>
                    </div>
                )}
                {headers.headers && (
                    <Accordion type="single" collapsible className="w-full">
                        {Object.entries(headers.headers).map(([key, values]) => (
                            <AccordionItem value={key} key={key}>
                                <AccordionTrigger className="font-semibold">{key}</AccordionTrigger>
                                <AccordionContent>
                                    <pre className="text-sm bg-muted p-2 rounded-md whitespace-pre-wrap break-all">
                                        <code>{values.join("\n")}</code>
                                    </pre>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </CardContent>
        </Card>
    );
}
