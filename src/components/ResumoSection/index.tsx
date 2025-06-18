import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Stats {
    successCount: number;
    failedCount: number;
    requestsPerSecond: number;
    totalTime: { min: number; avg: number; max: number };
    timeToFirstByte: { min: number; avg: number; max: number };
    timeToLastByte: { min: number; avg: number; max: number }
}

interface Props {
    url: string;
    requests: number;
    concurrency: number;
    stats: Stats;
}

const formatNumber = (value: number | null | undefined, decimals = 2) =>
    typeof value === "number" ? value.toFixed(decimals) : "N/A";

export default function ResumoSection({ url, requests, concurrency, stats }: Props) {
    return (
        <div className="space-y-6 max-w-5xl w-full mx-auto">
            <h1 className="text-3xl font-bold text-center">Resumo do Teste</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Informações do Teste</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>URL:</strong> {url}</p>
                    <p><strong>Número de requisições:</strong> {requests}</p>
                    <p><strong>Concorrência:</strong> {concurrency}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resultados</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-2">Status</h3>
                        <p><strong>Sucesso:</strong> {stats.successCount}</p>
                        <p><strong>Falhas:</strong> {stats.failedCount}</p>
                        <p><strong>Requests por segundo:</strong> {formatNumber(stats.requestsPerSecond)}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Tempo Total</h3>
                        <p><strong>Mínimo:</strong> {stats.totalTime.min}s</p>
                        <p><strong>Médio:</strong> {formatNumber(stats.totalTime.avg)}s</p>
                        <p><strong>Máximo:</strong> {stats.totalTime.max}s</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Time to First Byte</h3>
                        <p><strong>Mínimo:</strong> {stats.timeToFirstByte.min}s</p>
                        <p><strong>Médio:</strong> {formatNumber(stats.timeToFirstByte.avg)}s</p>
                        <p><strong>Máximo:</strong> {stats.timeToFirstByte.max}s</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Time to Last Byte</h3>
                        <p><strong>Mínimo:</strong> {stats.timeToLastByte.min}s</p>
                        <p><strong>Médio:</strong> {formatNumber(stats.timeToLastByte.avg)}s</p>
                        <p><strong>Máximo:</strong> {stats.timeToLastByte.max}s</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}