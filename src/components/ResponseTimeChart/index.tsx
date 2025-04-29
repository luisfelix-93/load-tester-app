// src/components/ResponseTimeChart.tsx

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
  // Ordena os resultados pelo número da requisição
  const sortedResult = [...result].sort((a, b) => a.n - b.n);

  const chartData = {
    labels: sortedResult.map(item => item.n),
    datasets: [
      {
        label: 'Tempo de Resposta (s)',
        data: sortedResult.map(item => item.responseTime),
        fill: false,
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.2,
        pointRadius: 2,
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
