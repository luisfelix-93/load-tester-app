import axios from "axios";

const API_BASE_URL = "http://localhost:4000/load-test";

export interface IDateRange {
    startDate: string,
    endDate: string
}

export interface ILoadTestData {
    targetUrl: string,
    numRequests: number,
    concurrency: number,
    method?: string,
    payload?: any
}

export const createTest = async (testData : ILoadTestData) => {
    try {
        const options = {
            url: API_BASE_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: testData
        }
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar o teste: ", error);
    }
}

export const getTestResults = async (testId: string) => {
    try {
        const options = {
            url: `${API_BASE_URL}/test/${testId}`,
            method: 'GET'
        }

        const response = await axios.request(options);
        if (response.status === 200) {
            return response.data;
        }
        else if (response.status === 404) {
            console.error("Teste não encontrado");
            return "Teste não encontrado";
        }
    } catch (error) {
        console.error("Erro ao obter os resultados do teste: ", error);   
    }
}
 export const getAllTests = async () => {
    try {
        const options = {
            url: API_BASE_URL,
            method: 'GET'
        }

        const response = await axios.request(options);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao obter os testes: ", error);   
    }
}

export const getTestByDate = async (dateRange: IDateRange) => {
    try {
        const options = {
            url: `${API_BASE_URL}/load-test/by-date?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
            method: 'GET'
        }
        const response = await axios.request(options);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao obter os testes por data: ", error);
    }
}