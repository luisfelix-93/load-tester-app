import { getAllTests } from "@/api/loadtester";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Resumo() {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTests = async () => {
            const data = await getAllTests();
            if (data) setTests(data);
            setLoading(false);
        };
        fetchTests();
    }, []
    );
    
    if (loading) return <p className="text-center mt-8">Carregando testes anteriores...</p>
    if (tests.length === 0) return <p className="text-center mt-8">Nenhum teste encontrado.</p>;

    return (
        <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Testes Realizados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <Card
              key={test._id}
              onClick={() => navigate(`/resumo/${test._id}`)}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-base truncate">{test.url}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Requisições:</strong> {test.requests}</p>
                <p><strong>Concorrência:</strong> {test.concurrency}</p>
                <p><strong>Data:</strong> {new Date(test.createdAt).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
}