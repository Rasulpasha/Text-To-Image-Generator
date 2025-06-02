import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-slide-in">
      <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onDismiss}
            className="ml-auto pl-3 -mr-1 -mt-1 text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-100"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;