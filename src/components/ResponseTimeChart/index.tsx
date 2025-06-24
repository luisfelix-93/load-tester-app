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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface ResultItem {
  n: number;
  codeStatus: number;
  responseTime: number;
}

interface Props {
  result: ResultItem[];
}

export default function ResponseTimeChart({ result }: Props) {
  const sortedResult = [...result].sort((a, b) => a.n - b.n);

  const chartData = {
    labels: sortedResult.map(item => item.n),
    datasets: [
      {
        label: 'Tempo de Resposta (ms)',
        data: sortedResult.map(item => item.responseTime),
        fill: false,
        borderColor: '#10b981',
        backgroundColor: '#10b981',
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
            const item = sortedResult[index];
            return [
              `Requisição: ${item.n}`,
              `Tempo de Resposta: ${item.responseTime}s`,
              `Status Code: ${item.codeStatus}`,
            ];
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
          text: 'Requisição',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Tempo de Resposta por Requisição</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
