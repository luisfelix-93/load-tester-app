// src/components/StatusCodeChart.tsx

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  if (code >= 200 && code < 300) return '#3b82f6'; // azul
  if (code === 429) return '#f59e0b'; // amarelo
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
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    mantainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Gráfico de Status Code</h2>
      <div className="relative w-[350px] h-[350px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );

}
