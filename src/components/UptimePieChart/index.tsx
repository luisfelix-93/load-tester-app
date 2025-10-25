import { HealthCheckLog } from "@/api/healthcheck";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface UptimePieChartProps {
    logs: HealthCheckLog[];
}

const COLORS = {
    Online: '#10b981', //Verde
    Offline: '#EF4444' //Vermelho
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
                <p className="text-gray-700">{`${data.name}: ${data.value} (${(data.percent * 100).toFixed(2)}%)`}</p>
            </div>
        );
    }
    return null;
};

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    // Ensure percent is a number, default to 0 if NaN or undefined
    const safePercent = typeof percent === 'number' && !isNaN(percent) ? percent : 0;

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${name} ${(safePercent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function UptimePieChart({ logs }: UptimePieChartProps) {
    const onlineCount = logs.filter(log => log.status === 'Online').length;
    const offlineCount = logs.length - onlineCount;

    const data = [
        { name: 'Online', value: onlineCount },
        { name: 'Offline', value: offlineCount },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Disponibilidade (Uptime)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60} // Make it a donut chart
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        labelLine={true} // Enable label lines
                        label={CustomLabel} // Use custom label component
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} /> {/* Use custom tooltip */}
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}