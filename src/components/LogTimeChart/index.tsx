import { HealthCheckLog } from "@/api/healthcheck";
import { format } from "date-fns";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface LogTimeChartProps {
    logs: HealthCheckLog[];
}


export default function LogTimeChart({ logs }: LogTimeChartProps) {
    const chartData = logs.map(log => ({
        time: format(new Date(log.createdAt), 'HH:mm:ss'),
        responseTime: log.responseTimeInMs,
    })).reverse();
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
             <h3 className="text-xl font-semibold mb-4 text-gray-700">Histórico de Tempo de Resposta</h3>
             <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '0.5rem'
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="responseTime"
                        stroke="#4f46e5" // Um tom de roxo/índigo
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}