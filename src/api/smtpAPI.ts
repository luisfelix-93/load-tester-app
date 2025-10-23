import axios from 'axios';

// Interface para os dados de configuração do SMTP
export interface ISmtpConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string; // A palavra-passe só é enviada, nunca recebida
}

// O URL base para a API de notificações, passando pelo gateway Nginx
const API_URL = '/api/notifications/settings/smtp';

/**
 * Obtém a configuração SMTP atual (sem a palavra-passe).
 */
export const getSmtpConfig = async (): Promise<Partial<ISmtpConfig>> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter a configuração SMTP:", error);
        // Retorna um objeto vazio em caso de erro (ex: 404 se ainda não houver config)
        return {};
    }
};

/**
 * Guarda a configuração SMTP.
 */
export const saveSmtpConfig = async (config: ISmtpConfig) => {
    try {
        const response = await axios.post(API_URL, config);
        return response.data;
    } catch (error) {
        console.error("Erro ao guardar a configuração SMTP:", error);
        throw error; // Lança o erro para ser tratado no componente
    }
};

/**
 * Envia um e-mail de teste com a configuração atual.
 * @param recipientEmail O e-mail para onde o teste será enviado.
 */
export const testSmtpConfig = async (recipientEmail: string) => {
    try {
        const response = await axios.post(`${API_URL}/test`, { recipientEmail });
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar o e-mail de teste:", error);
        throw error; // Lança o erro para ser tratado no componente
    }
};