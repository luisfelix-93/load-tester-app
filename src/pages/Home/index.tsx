import { Button } from "@/components/ui/button";
import { Zap, HeartPulse, ShieldCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Home() {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
                <div className="text-center mb-12">
                    <img src="/support_io.png" alt="support.io logo" className="h-60 mx-auto dark:hidden" />
                    <img src="/support_io_white.png" alt="support.io logo" className="h-60 mx-auto hidden dark:block" />
                    <h3 className="text-lg text-muted-foreground mt-2">Suas ferramentas para análise de performance e disponibilidade.</h3>
                </div>

                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Teste de Carga */}
                    <div className="bg-card rounded-lg shadow-lg p-8 flex flex-col items-center text-center h-full">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center justify-center"><Zap className="mr-2" /> Teste de Carga</h2>
                        <p className="text-card-foreground mb-6 flex-grow">
                            Simule carga em endpoints HTTP e analise a performance
                            com gráficos detalhados e relatórios interativos.
                        </p>
                        <ul className="text-left text-muted-foreground mb-8 space-y-2">
                            <li>✅ Simulação com múltiplas requisições</li>
                            <li>✅ Métricas de sucesso, falha, e tempo de resposta</li>
                            <li>✅ Gráficos interativos dos resultados</li>
                            <li>✅ Exportação dos relatórios em JSON</li>
                        </ul>
                        <Button onClick={() => navigate("/loadtest")} className="w-full max-w-xs text-lg mt-auto" aria-label="Iniciar teste de carga">
                            Iniciar Teste
                        </Button>
                    </div>

                    {/* Card 2: Health Check */}
                    <div className="bg-card rounded-lg shadow-lg p-8 flex flex-col items-center text-center h-full">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center justify-center"><HeartPulse className="mr-2" /> Monitoramento de Health Check</h2>
                        <p className="text-card-foreground mb-6 flex-grow">
                            Cadastre endpoints para monitorar disponibilidade e tempo de resposta em tempo real.
                        </p>
                        <ul className="text-left text-muted-foreground mb-8 space-y-2">
                            <li>✅ Relatórios de uptime e histórico de status</li>
                            <li>✅ Gráficos de disponibilidade e resposta</li>
                            <li>✅ Gerenciamento fácil pelo dashboard</li>
                        </ul>
                        <Button
                            onClick={() => navigate("/monitor")}
                            className="w-full max-w-xs text-lg mt-auto"
                            variant="secondary"
                            aria-label="Acessar monitoramento de Health Check"
                        >
                            Acessar Monitoramento
                        </Button>
                    </div>

                    {/* Card 3: DNS & SSL Checker */}
                    <div className="bg-card rounded-lg shadow-lg p-8 flex flex-col items-center text-center h-full">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center justify-center"><ShieldCheck className="mr-2" /> DNS & SSL Health Checker</h2>
                        <p className="text-card-foreground mb-6 flex-grow">
                            Verifique a configuração de DNS e o estado do certificado SSL de qualquer domínio.
                        </p>
                        <ul className="text-left text-muted-foreground mb-8 space-y-2">
                            <li>✅ Análise de registros DNS (A, AAAA, MX, TXT, NS)</li>
                            <li>✅ Verificação de validade e expiração de certificado SSL</li>
                            <li>✅ Detalhes do emissor e domínios cobertos</li>
                        </ul>
                        <Button
                            onClick={() => navigate("/dns-checker")}
                            className="w-full max-w-xs text-lg mt-auto"
                            variant="outline"
                            aria-label="Verificar DNS e SSL de um domínio"
                        >
                            Verificar Domínio
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="text-center mb-12">
                <img src="/support_io.png" alt="support.io logo" className="h-60 mx-auto dark:hidden" />
                <img src="/support_io_white.png" alt="support.io logo" className="h-60 mx-auto hidden dark:block" />
                <h3 className="text-lg text-muted-foreground mt-2">Suas ferramentas para análise de performance e disponibilidade.</h3>
            </div>

            <Accordion type="single" collapsible className="w-full max-w-md">
                <AccordionItem value="item-1">
                    <AccordionTrigger><Zap className="mr-2" /> Teste de Carga</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-card-foreground mb-6">
                            Simule carga em endpoints HTTP e analise a performance
                            com gráficos detalhados e relatórios interativos.
                        </p>
                        <ul className="text-left text-muted-foreground mb-8 space-y-2">
                            <li>✅ Simulação com múltiplas requisições</li>
                            <li>✅ Métricas de sucesso, falha, e tempo de resposta</li>
                            <li>✅ Gráficos interativos dos resultados</li>
                            <li>✅ Exportação dos relatórios em JSON</li>
                        </ul>
                        <Button onClick={() => navigate("/loadtest")} className="w-full max-w-xs text-lg mt-auto" aria-label="Iniciar teste de carga">
                            Iniciar Teste
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger><HeartPulse className="mr-2" /> Monitoramento de Health Check</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-card-foreground mb-6">
                            Cadastre endpoints para monitorar disponibilidade e tempo de resposta em tempo real.
                        </p>
                        <ul className="text-left text-muted-foreground mb-8 space-y-2">
                            <li>✅ Relatórios de uptime e histórico de status</li>
                            <li>✅ Gráficos de disponibilidade e resposta</li>
                            <li>✅ Gerenciamento fácil pelo dashboard</li>
                        </ul>
                        <Button
                            onClick={() => navigate("/monitor")}
                            className="w-full max-w-xs text-lg mt-auto"
                            variant="secondary"
                            aria-label="Acessar monitoramento de Health Check"
                        >
                            Acessar Monitoramento
                        </Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger><ShieldCheck className="mr-2" /> DNS & SSL Health Checker</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-card-foreground mb-6">
                            Verifique a configuração de DNS e o estado do certificado SSL de qualquer domínio.
                        </p>
                        <ul className="text-left text-muted-foreground mb-8 space-y-2">
                            <li>✅ Análise de registros DNS (A, AAAA, MX, TXT, NS)</li>
                            <li>✅ Verificação de validade e expiração de certificado SSL</li>
                            <li>✅ Detalhes do emissor e domínios cobertos</li>
                        </ul>
                        <Button
                            onClick={() => navigate("/dns-checker")}
                            className="w-full max-w-xs text-lg mt-auto"
                            variant="outline"
                            aria-label="Verificar DNS e SSL de um domínio"
                        >
                            Verificar Domínio
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}