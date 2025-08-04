import axios from "axios";
import { Type } from "lucide-react";

export interface HealthCheckLog {
  _id: string;
  status: 'Online' | 'Offline';
  statusCode: number | null;
  responseTimeInMs: number;
  createdAt: string;
}

// Define a estrutura de um Endpoint, usando o tipo de log que acabamos de criar
export interface Endpoint {
  _id: string;
  name: string;
  url: string;
  // Agora 'logs' é um array do tipo HealthCheckLog
  logs: HealthCheckLog[]; 
  createdAt: string;
  updatedAt: string;
}

export interface IEndpoint {
    url: string;
    name: string;
}


export const createEndpoint = async (data: IEndpoint) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:5000/api/endpoints',
            data: data
        }
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getEndpoints = async () => {
    try {
        const options = {
            method: 'GET',
            url: 'http://localhost:5000/api/endpoints'
        };
        const response = await axios.request(options);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Endpoints não encontrados");
            return "Endpoints não encontrados";
        }
    } catch (error) {
        console.log(error);
    }

}

export const getEndpointById =  async (endpointId: string | undefined) => {
    try {
        const options = {
            method: 'GET',
            url: `http://localhost:5000/api/endpoints/${endpointId}`
        }
        const response = await axios.request(options);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Endpoint não encontrado");
            return "Endpoint não encontrado";
        }
    } catch (error) {
        console.log(error);
    }
}

export const getLogsByEndpoint = async (endpointId: string | undefined) => {
    try {
        const options = {
            method: "GET",
            url: `http://localhost:5000/api/logs/${endpointId}`
        };
        const response = await axios.request(options);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Endpoint não encontrado");
            return "Endpoint não encontrado";
        }
    } catch (error) {
        console.error(error);
    }
}
