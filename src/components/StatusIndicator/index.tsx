interface StatusIndicatorProps {
    status: 'Online' | 'Offline';

}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
    const isOnline = status === 'Online';

    const bgColor = isOnline ? 'bg-green-500' : 'bg-red-500';
    const textColor = isOnline ? 'text-green-800' : 'text-red-800';

    return (

        <div className="flex items-center" title={`Status: ${status}`}>
            <span className="relative flex h-3 w-3">
                {isOnline && (
                    <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${bgColor} opacity-75`}
                    ></span>
                )}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${bgColor}`}></span>
            </span>
            <span className={`ml-2 text-sm font-semibold ${textColor}`}>
                {status}
            </span>
        </div>
    );
}