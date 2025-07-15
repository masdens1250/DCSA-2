import React from 'react';
import { AlertCircle, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface AlertPanelProps {
  alerts: Alert[];
  onDismissAlert: (id: string) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onDismissAlert }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border-green-500/30 text-green-100';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-500/30 text-yellow-100';
      case 'error':
        return 'bg-red-900/20 border-red-500/30 text-red-100';
      case 'info':
        return 'bg-blue-900/20 border-blue-500/30 text-blue-100';
      default:
        return 'bg-gray-900/20 border-gray-500/30 text-gray-100';
    }
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border ${getAlertStyles(alert.type)} relative`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{alert.title}</h4>
              <p className="text-sm opacity-90 mt-1">{alert.message}</p>
              <p className="text-xs opacity-70 mt-2">
                {alert.timestamp.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onDismissAlert(alert.id)}
              className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertPanel;