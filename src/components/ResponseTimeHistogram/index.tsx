import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ResultItem {
    responseTime: number;
    codeStatus: number;
    n: number;
}

interface Props {
    result: ResultItem[];
    binSize?: number;
}

export default function ResponseTimeHistogram({result, binSize = 100}: Props) {
    const histogram: Record<string, number> = {};

    result.forEach(({responseTime}) => {
        const ms = Math.round(responseTime);
        const bin = Math.floor(ms/binSize) * binSize;
        const label = `${bin}-${bin + binSize - 1}ms`;
        histogram[label] = (histogram[label] || 0) + 1;
    });

    const labels = Object.keys(histogram).sort((a, b) => {
        const getStart = (label: string) => parseInt(label.split('-')[0]);
        return getStart(a) - getStart(b);
    });

    const values = labels.map(label => histogram[label]);

    const chartData = {
        labels, 
        datasets :[
            {
                label: 'Quantidade de Requisições',
                data: values,
                backgroundColor: "#6366f1", // Índigo-500
                borderRadius: 4
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: { title: { display: true, text: 'Faixa de Tempo de Resposta (ms)' } },
            y: {
                beginAtZero: true,
                ticks: { precision: 0 },
                title: { display: true, text: 'Número de Requisições' },
            },
        },
    };
    
    return (
        <div className="w-full max-w-4x1 mx-auto mt-8">
            <h2 className="text-xl font-bold mb4">Distribuição dos Tempos de Resposta</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}