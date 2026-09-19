import React, { createContext, useContext } from 'react';
import { toast, Toaster } from 'sonner';

interface NotificationContextType {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const success = (message: string, description?: string) => {
    toast.success(message, { description });
  };

  const error = (message: string, description?: string) => {
    toast.error(message, { description });
  };

  const info = (message: string, description?: string) => {
    toast(message, { description });
  };

  const warning = (message: string, description?: string) => {
    toast.warning(message, { description });
  };

  return (
    <NotificationContext.Provider value={{ success, error, info, warning }}>
      {children}
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        closeButton
        theme="light"
        toastOptions={{
          style: {
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid var(--dash-border)',
            background: 'var(--dash-surface)',
            color: 'var(--dash-heading)',
            boxShadow: 'var(--dash-shadow-lg)',
          },
        }}
      />
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
