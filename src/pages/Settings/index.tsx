import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getSmtpConfig, saveSmtpConfig, testSmtpConfig, ISmtpConfig } from '@/api/smtpAPI';
import toast from 'react-hot-toast';

export default function Settings() {
    const [config, setConfig] = useState<Partial<ISmtpConfig>>({
        host: '',
        port: 587,
        user: '',
        pass: '',
        secure: true,
    });
    const [testEmail, setTestEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            setIsLoading(true);
            const data = await getSmtpConfig();
            if (data && data.host) {
                setConfig(prev => ({ ...prev, ...data, pass: '' })); // Carrega dados existentes, mas nunca a palavra-passe
            }
            setIsLoading(false);
        };
        fetchConfig();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setConfig(prev => ({ ...prev, secure: checked }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!config.pass) {
            toast.error('A palavra-passe é obrigatória para guardar.');
            return;
        }
        setIsSaving(true);
        toast.promise(
            saveSmtpConfig(config as ISmtpConfig),
            {
                loading: 'A guardar configuração...',
                success: 'Configuração SMTP guardada com sucesso!',
                error: 'Falha ao guardar a configuração.',
            }
        ).finally(() => setIsSaving(false));
    };

    const handleTest = async () => {
        if (!testEmail) {
            toast.error('Por favor, insira um e-mail para o teste.');
            return;
        }
        setIsTesting(true);
        toast.promise(
            testSmtpConfig(testEmail),
            {
                loading: 'A enviar e-mail de teste...',
                success: `E-mail de teste enviado para ${testEmail}!`,
                error: 'Falha ao enviar e-mail. Verifique as credenciais guardadas.',
            }
        ).finally(() => setIsTesting(false));
    };

    if (isLoading) {
        return <p>A carregar configurações...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Configuração do Servidor de E-mail (SMTP)</CardTitle>
                    <CardDescription>
                        Configure um servidor SMTP para enviar e-mails de alerta. As credenciais são guardadas de forma segura.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="host">Host SMTP</label>
                                <Input id="host" name="host" value={config.host} onChange={handleChange} placeholder="smtp.exemplo.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="port">Porta</label>
                                <Input id="port" name="port" type="number" value={config.port} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="user">Utilizador</label>
                            <Input id="user" name="user" value={config.user} onChange={handleChange} placeholder="seu-email@exemplo.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="pass">Palavra-passe</label>
                            <Input id="pass" name="pass" type="password" value={config.pass} onChange={handleChange} placeholder="••••••••" />
                            <p className="text-xs text-muted-foreground">A sua palavra-passe é encriptada antes de ser guardada. Deixe em branco se não a quiser alterar.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="secure" checked={config.secure} onCheckedChange={handleSwitchChange} />
                            <label htmlFor="secure">Usar conexão segura (TLS)</label>
                        </div>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? 'A guardar...' : 'Guardar Configuração'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Testar Configuração</CardTitle>
                    <CardDescription>
                        Envie um e-mail de teste para verificar se as suas credenciais guardadas estão a funcionar.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Input
                        type="email"
                        placeholder="E-mail de destino para o teste"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleTest} disabled={isTesting}>
                        {isTesting ? 'A enviar...' : 'Enviar Teste'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}