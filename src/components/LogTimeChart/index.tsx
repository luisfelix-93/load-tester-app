import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { format } from 'date-fns';
import { HealthCheckLog } from '@/api/healthcheck';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface LogTimeChartProps {
    logs: HealthCheckLog[];
}

export default function LogTimeChart({ logs }: LogTimeChartProps) {
    const sortedLogs = [...logs].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const chartData = {
        labels: sortedLogs.map(log => format(new Date(log.createdAt), 'HH:mm:ss')),
        datasets: [
            {
                label: 'Tempo de Resposta (ms)',
                data: sortedLogs.map(log => log.responseTimeInMs),
                fill: false,
                borderColor: '#2f10b9ff',
                backgroundColor: '#2f10b9ff',
                tension: 0.2,
                pointRadius: 3,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const index = context.dataIndex;
                        const log = sortedLogs[index];
                        const labels = [
                            `Horário: ${format(new Date(log.createdAt), 'HH:mm:ss')}`,
                            `Tempo de Resposta: ${log.responseTimeInMs} ms`
                        ];
                        if (log.status) {
                            labels.push(`Status: ${log.status}`);
                        }
                        return labels;
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Tempo (ms)',
                },
                beginAtZero: true,
            },
            x: {
                title: {
                    display: true,
                    text: 'Horário',
                },
            },
        },
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">Tempo de Resposta por Health Check</h2>
            <Line data={chartData} options={options} />
        </div>
    );
}
