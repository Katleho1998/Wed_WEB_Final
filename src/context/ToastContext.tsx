import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import Toast from '../components/ui/Toast';

interface ToastData {
  id: string;
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  showError: (message: string, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((
    message: string, 
    type: 'error' | 'success' | 'warning' | 'info' = 'error',
    duration: number = 30000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastData = {
      id,
      message,
      type,
      duration
    };

    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showError = useCallback((message: string, duration?: number) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  const showInfo = useCallback((message: string, duration?: number) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showError, showSuccess, showWarning, showInfo }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-0 right-0 z-[9999] pointer-events-none">
        <div className="flex flex-col gap-2 p-4 pointer-events-auto">
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              style={{
                transform: `translateY(${index * 8}px)`,
                zIndex: 9999 - index
              }}
            >
              <Toast
                message={toast.message}
                type={toast.type}
                duration={toast.duration}
                onClose={() => removeToast(toast.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};