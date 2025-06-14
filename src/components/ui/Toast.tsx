import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'error', 
  duration = 30000, // 30 seconds
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300); // Animation duration
  };

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getIcon = () => {
    const iconClass = 'w-5 h-5';
    switch (type) {
      case 'error':
        return <AlertCircle className={`${iconClass} text-red-500`} />;
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
      case 'info':
        return <Info className={`${iconClass} text-blue-500`} />;
      default:
        return <AlertCircle className={`${iconClass} text-red-500`} />;
    }
  };

  const getProgressBarColor = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
      
      <div
        className={`
          max-w-md w-full mx-4 sm:mx-0
          ${getToastStyles()}
          border rounded-xl shadow-lg backdrop-blur-sm
          transform transition-all duration-300 ease-out
          ${isExiting 
            ? 'translate-x-full opacity-0 scale-95' 
            : 'translate-x-0 opacity-100 scale-100'
          }
        `}
        style={{
          animation: isExiting ? 'slideOut 0.3s ease-out forwards' : 'slideIn 0.3s ease-out forwards'
        }}
      >
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>
          
          <button
            onClick={handleClose}
            className={`
              flex-shrink-0 p-1 rounded-lg transition-colors duration-200
              hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${type === 'error' ? 'focus:ring-red-500' : 
                type === 'success' ? 'focus:ring-green-500' :
                type === 'warning' ? 'focus:ring-yellow-500' : 'focus:ring-blue-500'}
            `}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-black/10 rounded-b-xl overflow-hidden">
          <div
            className={`
              h-full transition-all ease-linear
              ${getProgressBarColor()}
            `}
            style={{
              width: '100%',
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Toast;