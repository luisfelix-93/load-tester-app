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
  result: ResultItem[];
}

// Função para definir cores por status code
const getColorByStatusCode = (code: number): string => {
  if (code === 500) return '#ef4444'; // vermelho
  if (code === 408) return '#10b981'; // verde
  if (code === 200) return '#3b82f6'; // azul
  return '#6b7280'; // cinza padrão
};

export default function StatusCodeChart({ result }: Props) {
  const statusCounts: Record<number, number> = {};

  // Agrupa status codes
  result.forEach(({ codeStatus }) => {
    statusCounts[codeStatus] = (statusCounts[codeStatus] || 0) + 1;
  });

  const labels = Object.keys(statusCounts);
  const values = Object.values(statusCounts);
  const backgroundColors = labels.map((label) => getColorByStatusCode(Number(label)));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Quantidade de Respostas',
        data: values,
        backgroundColor: backgroundColors,
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
