import { createContext, useContext, useEffect, ReactNode } from 'react';
import { socket } from '@/services/socket';
import toast, { Toaster } from 'react-hot-toast';

// Define a interface para os dados da notificação (deve ser a mesma do backend)
interface NotificationPayload {
  testId: string;
  status: 'completed' | 'failed';
  message: string;
  resultsUrl?: string;
}

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Conecta ao servidor de notificação quando o provider é montado
    socket.connect();

    // Define o listener para o evento 'push-notification'
    const handleNotification = (data: NotificationPayload) => {
      console.log('Push notification recebida:', data);

      // Exibe o toast com base no status
      if (data.status === 'completed') {
        toast.success(data.message, {
          duration: 6000,
          position: 'top-right',
        });
      } else {
        toast.error(data.message, {
          duration: 6000,
          position: 'top-right',
        });
      }
    };

    socket.on('push-notification', handleNotification);

    // Função de limpeza: desconecta e remove o listener quando o componente é desmontado
    return () => {
      socket.off('push-notification', handleNotification);
      socket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={null}>
      {/* O componente Toaster renderiza os toasts que chamamos */}
      <Toaster />
      {children}
    </NotificationContext.Provider>
  );
};

// Hook customizado para usar o contexto (opcional, mas boa prática)
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};