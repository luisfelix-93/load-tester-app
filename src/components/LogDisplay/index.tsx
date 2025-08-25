import { HealthCheckLog } from "@/api/healthcheck";

interface LogDisplayProps {
    logs: HealthCheckLog[];
}

export default function LogDisplay({ logs }: LogDisplayProps) {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Logs Recentes</h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-64 overflow-y-auto">
                <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {JSON.stringify(logs.map(({ data, createdAt, updatedAt, status }) => ({ data, createdAt, updatedAt, status })), null, 2)}
                </pre>
            </div>
        </div>
    );
}
