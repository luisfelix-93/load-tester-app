// src/pages/Relatórios/index.tsx
import { useState } from "react";
import { getTestByDate, IDateRange } from "@/api/loadtester";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ITestResult {
  _id: string;
  url: string;
  requests: number;
  concurrency: number;
  createdAt: string;
}

export default function Relatorios() {
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: "",
    endDate: "",
  });
  const [results, setResults] = useState<ITestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await getTestByDate(dateRange);
    if (data) {
      setResults(data);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Relatórios por data</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <Input
          type="date"
          name="startDate"
          value={dateRange.startDate}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="endDate"
          value={dateRange.endDate}
          onChange={handleChange}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      <div>
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((test) => (
              <li key={test._id} className="p-4 rounded bg-gray-100 shadow">
                <p><strong>URL:</strong> {test.url}</p>
                <p><strong>Requisições:</strong> {test.requests}</p>
                <p><strong>Concorrência:</strong> {test.concurrency}</p>
                <p><strong>Data:</strong> {new Date(test.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>Nenhum teste encontrado no intervalo informado.</p>
        )}
      </div>
    </div>
  );
}
