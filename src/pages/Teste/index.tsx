import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createTest, ILoadTestData } from '@/api/loadtester';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Teste () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ILoadTestData>({
    targetUrl: '',
    numRequests: 100,
    concurrency: 10,
    method: 'GET',
    payload: undefined
  });

  const [loading, setLoading] = useState(false);
  const [isPost, setIsPost] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === 'targetUrl' ? value : parseInt(value),
    }));
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      payload: e.target.value,
    }));
    console.log("Payload atualizado:", e.target.value);
  };

  const handleToggleMethod = (checked: boolean) => {
    setIsPost(checked);
    setFormData((prev: any) => ({
      ...prev,
      method: checked ? 'POST' : 'GET',
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let parsedPayload: any = undefined;
    if (isPost) {
      try {
        parsedPayload = JSON.parse(formData.payload);

      } catch (error) {
        alert("Payload inválido. Certifique-se de que está em formato JSON.");
        return;
      }
    }
    const testData: ILoadTestData = {
      targetUrl: formData.targetUrl,
      numRequests: formData.numRequests,
      concurrency: formData.concurrency,
      method: isPost ? 'POST' : 'GET',
      payload: parsedPayload,
    };
    try {
      setLoading(true);
      const result = await createTest(testData);
      if (result && result.testId) {
        // Redireciona para a tela de loading passando o ID do teste
        navigate(`/loading/${result.testId}`);
      } else {
        // Caso não tenha _id, redireciona para erro
        navigate("/error");
      }
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 p-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium'>Requisição POST?</label>
            <Switch checked={isPost} onCheckedChange={handleToggleMethod} />
            </div>
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
          {isPost && (
            <div>
              <label className="block text-sm font-medium mb-1">Payload (JSON)</label>
              <Textarea
                value={formData.payload as string}
                onChange={handlePayloadChange}
                placeholder='"{ \"key\": \"value\" }"'
                rows={6}
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            Iniciar Teste
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

