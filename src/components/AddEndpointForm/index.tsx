// src/components/AddEndpointForm/index.tsx

import { useState } from "react";
import { createEndpoint, IEndpoint } from "@/api/healthcheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AddEndpointFormProps {
    onSuccess: () => void;
}

const initialFormData: IEndpoint = {
    name: '',
    url: '',
    alertsEnabled: false,
    responseTimeThresholdMs: 1000,
    recipientEmail: ''
};

export default function AddEndpointForm({ onSuccess }: AddEndpointFormProps) {
    const [formData, setFormData] = useState<IEndpoint>(initialFormData);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            alertsEnabled: checked
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (formData.alertsEnabled && !formData.recipientEmail) {
            setError('O e-mail para alertas é obrigatório quando a opção está ativada.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await createEndpoint(formData);
            if (response) {
                onSuccess();
            } else {
                throw new Error('A API não retornou uma resposta válida.');
            }
        } catch (err) {
            setError('Falha ao criar o endpoint. Verifique os dados e tente novamente.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // O formulário em si não precisa de cores, ele herda do Modal
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* CORREÇÃO AQUI: Usando a cor 'destructive' do tema para o erro */}
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <div className="space-y-2">
                {/* CORREÇÃO AQUI: Usando a cor padrão 'text-foreground' para os labels */}
                <label htmlFor="name" className="text-sm font-medium text-foreground">Nome do Endpoint</label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ex: API de Pagamentos"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium text-foreground">URL</label>
                <Input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://sua-api.com/health"
                    value={formData.url}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                    <label htmlFor="alertsEnabled" className="font-medium text-sm text-foreground">
                        Ativar Alertas por E-mail
                    </label>
                    <Switch
                        id="alertsEnabled"
                        checked={formData.alertsEnabled}
                        onCheckedChange={handleSwitchChange}
                    />
                </div>
                
                <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    formData.alertsEnabled ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                )}>
                    <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                            <label htmlFor="responseTimeThresholdMs" className="text-sm font-medium text-foreground">
                                Limite de Tempo de Resposta (ms)
                            </label>
                            <Input
                                id="responseTimeThresholdMs"
                                name="responseTimeThresholdMs"
                                type="number"
                                value={formData.responseTimeThresholdMs}
                                onChange={handleChange}
                                disabled={!formData.alertsEnabled}
                            />
                             {/* CORREÇÃO AQUI: Usando a cor 'muted-foreground' para textos de ajuda */}
                             <p className="text-xs text-muted-foreground">
                                Enviar alerta se a resposta levar mais que este tempo.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="recipientEmail" className="text-sm font-medium text-foreground">
                                E-mail para Alerta
                            </label>
                            <Input
                                id="recipientEmail"
                                name="recipientEmail"
                                type="email"
                                placeholder="seu-email@exemplo.com"
                                value={formData.recipientEmail}
                                onChange={handleChange}
                                disabled={!formData.alertsEnabled}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : 'Salvar Endpoint'}
                </Button>
            </div>
        </form>
    );
}