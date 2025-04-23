import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createTest, ILoadTestData } from '@/api/loadtester';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ILoadTestData>({
    targetUrl: '',
    numRequests: 100,
    concurrency: 10,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === 'targetUrl' ? value : parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await createTest(formData);
      if(result._id) {
        navigate(`/resumo/${result._id}`);
      }
      console.log('Resultado do teste:', result);
      // Aqui pode colocar um feedback visual
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 p-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL do Alvo</label>
            <Input
              type="text"
              name="targetUrl"
              value={formData.targetUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Número de Requisições</label>
            <Input
              type="number"
              name="numRequests"
              value={formData.numRequests}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Concorrência</label>
            <Input
              type="number"
              name="concurrency"
              value={formData.concurrency}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Iniciar Teste
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Inicio;
