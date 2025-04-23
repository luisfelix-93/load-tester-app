// src/components/StatusCodeChart.tsx

import { Bar } from 'react-chartjs-2';
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
  n: number;
  codeStatus: number;
  responseTime: number;
}

interface Props {
  result: ResultItem[]; // array com { n, codeStatus, responseTime }
}

export default function StatusCodeChart({ result }: Props) {
  const statusCounts: Record<number, number> = {};

  // Agrupa os statusCodes e soma quantas vezes cada um apareceu
  result.forEach(({ codeStatus }) => {
    statusCounts[codeStatus] = (statusCounts[codeStatus] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(statusCounts), // ['200', '404', ...]
    datasets: [
      {
        label: 'Quantidade de Respostas',
        data: Object.values(statusCounts), // [80, 15, ...]
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Gráfico de Status Code</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
