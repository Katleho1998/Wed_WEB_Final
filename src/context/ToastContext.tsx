import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/ui/ToastContainer';

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
  const { showError, showSuccess, showWarning, showInfo } = useToast();

  return (
    <ToastContext.Provider value={{ showError, showSuccess, showWarning, showInfo }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};