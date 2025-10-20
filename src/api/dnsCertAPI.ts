import axios from "axios";

export interface AnalysisResult {
    id: string;
    target: string;
    status: string;
    checked_at: string; // Manter como string para evitar problemas de fuso horário
    dns?: DNSResult;
    ssl?: SSLResult;
    headers?: HeaderResult;
    blacklist?: BlacklistResult;
}

// Estrutura para os resultados DNS
export interface DNSResult {
    a?: string[];
    aaaa?: string[];
    mx?: string[];
    txt?: string[];
    ns?: string[];
    error?: string;
}

// Estrutura para os resultados do certificado SSL
export interface SSLResult {
    is_valid: boolean;
    issued_to: string;
    issued_by: string;
    valid_from: string;
    valid_until: string;
    days_remaining: number;
    covered_domains?: string[];
    error?: string;
}

// Estrutura para os resultados dos cabeçalhos HTTP
export interface HeaderResult {
    status_code: number;
    headers: Record<string, string[]>;
    error?: string;
}

export interface BlacklistResult {
    is_listed: boolean;
    listed_on: string[];
    error?: string;
}

// const URLBase: string = 'http://localhost:8080/api/v1'

export const analyzeUrl = async (targetUrl: string): Promise<AnalysisResult | string> => {
    let result: AnalysisResult;
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: `/dns-cert/analyze`,
            data: {
                target: targetUrl
            }
        }
        const response = await axios.request(options);
        console.log(response.data);
        result = response.data;
        return result;
    } catch (error) {
        console.log(`Erro ao fazer a análise: ${error}`);
        return `Erro ao fazer a análise: ${error}`;
    }
}

export const getAnalysisById = async (analysisId: string): Promise<AnalysisResult | string> => {
    let result: AnalysisResult;
    try {
        const options = {
            method: 'GET',
            url: `/dns-cert/analysis/${analysisId}`
        }
        const response = await axios.request(options);
        if (response.status === 404) {
            return "Análise não encontrada";
        }
        result = response.data
        return result;
    } catch (error) {
        console.log(`Erro ao buscar a análise: ${error}`);
        return `Erro ao buscar a análise: ${error}`;
    }
}

export const getHistoryByTarget = async (targetUrl: string): Promise<AnalysisResult[] | string> =>{
    let result: AnalysisResult[];
    try {
        const options = {
            method: 'GET',
            url: `/dns-cert/history/${targetUrl}`
        }
        const response = await axios.request(options);
        if (response.status === 404) {
            return "Histórico não encontrado";
        }
        result = response.data
        console.log(result);
        return result;
    } catch (error) {
        console.log(`Erro ao buscar a análise: ${error}`);
        return `Erro ao buscar a análise: ${error}`;
    }
}
