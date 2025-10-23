import { 
    Chart as ChartJS,
    BarElement, 
    CategoryScale, 
    Legend, 
    LinearScale, 
    Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface ResultItem {
    n: number
    codeStatus: number
    responseTime: number
}

interface Props {
    result: ResultItem[]
}

export default function AverageTimeByStatusChart({ result }: Props) {
    // Agrupa os tempos por status code
    const grouped: Record<number, number[]> = {};
    result.forEach(({ codeStatus, responseTime }) => {
        if(!grouped[codeStatus]) grouped[codeStatus] = [];
        grouped[codeStatus].push(responseTime)
    });

    // Calcula a média 
    const labels = Object.keys(grouped);
    const avgValues = labels.map((code) => {
        const times = grouped[Number(code)];
        const avg = times.reduce((a,b) => a + b, 0) / times.length;
        return Number(avg.toFixed(3));
    });

    const backgroundColors = labels.map((code) => {
        const status = Number(code);
        if (status === 200 || 201 || 202) return '#3b82f6' // azul
        if (status === 500) return '#ef4444' // vermelho
        if (status === 408) return '#10b981' // verde
    })

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Tempo Médio por Status Code (ms)',
                data: avgValues,
                backgroundColor: backgroundColors,
                borderRadius: 6, 
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => 
                        `Tempo médio ${context.parsed.y.toFixed(3)} ms`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tempo (ms)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Status Code',
                },
            },
        },
    }

    return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Tempo Médio por Status Code</h2>
      <Bar data={chartData} options={options} />
    </div>
  )
}