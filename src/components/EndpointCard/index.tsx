import { Endpoint } from "@/api/healthcheck";
import StatusIndicator from "../StatusIndicator";
import { Link } from "react-router-dom";

interface EndpointCardProps {
    endpoint: Endpoint;
}

export default function EndpointCard({ endpoint }: EndpointCardProps) {

  const lastLog = endpoint.logs?.[0] || { status: 'Offline', responseTimeInMs: 0 };

  return (
   
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      
      {/* Seção Superior: Nome, URL e Status */}
      <div className="flex justify-between items-start">
        <div className="flex-grow pr-4 overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 truncate" title={endpoint.name}>
            {endpoint.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 truncate" title={endpoint.url}>
            {endpoint.url}
          </p>
        </div>
        {/* Componente reutilizável para o indicador de status visual */}
        <div className="flex-shrink-0">
          <StatusIndicator status={lastLog.status} />
        </div>
      </div>

      {/* Seção Inferior: Tempo de Resposta e Link para Detalhes */}
      <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Resposta: <span className="font-semibold text-gray-900">{lastLog.responseTimeInMs} ms</span>
        </p>
        {/* O Link do react-router-dom cria uma navegação sem recarregar a página */}
        <Link 
          to={`/endpoint/${endpoint._id}`} 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
