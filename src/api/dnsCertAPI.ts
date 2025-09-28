import axios from "axios";

export interface AnalysisResult {
    id: string;
    Target: string;
    Status: string;
    CheckedAt: Date;
    dns: DNS;
    ssl: SSL;
}

export interface DNS {
    a?: string[];
    aaaa?: string[];
    cname?: string[];
    mx?: string[];
    ns?: string[];
    txt?: string[];
    error?: string;
}

export interface SSL {
    is_valid: boolean;
    issued_to: string;
    issued_by: String;
    valid_from: Date;
    valid_until: Date;
    days_remaining: number;
    covered_domains: string[];
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
            url: `/analyze`,
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
            url: `/analysis/${analysisId}`
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
            url: `/history/${targetUrl}`
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
