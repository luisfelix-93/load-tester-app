import { createEndpoint } from "@/api/healthcheck";
import { useState } from "react";

interface AddEndpointFormProps {
    onSuccess: () => void;
}


export default function AddEndpointForm({ onSuccess }: AddEndpointFormProps) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await createEndpoint({ name, url });

            if (response) {
                onSuccess();
                setName('');
                setUrl('');
            } else {
                throw new Error('A resposta da criação do endpoint foi inválida.')
            }
        } catch (error) {
            setError('Falha ao criar o endpoint. Verifique os dados e a conexão.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required aria-label="Nome do endpoint" />
            </div>
            <div className="mb-4">
                <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">URL</label>
                <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required aria-label="URL do endpoint" />
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300" aria-label="Salvar novo endpoint">
                    {isSubmitting ? 'Salvando...' : 'Salvar Endpoint'}
                </button>
            </div>
        </form>
    );
}