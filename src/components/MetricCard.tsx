import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400 bg-blue-900/20';
      case 'green': return 'text-green-400 bg-green-900/20';
      case 'red': return 'text-red-400 bg-red-900/20';
      case 'purple': return 'text-purple-400 bg-purple-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-400';
    if (change.startsWith('-')) return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:bg-slate-750 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`text-sm font-medium ${getChangeColor(change)}`}>
          {change}
        </span>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-slate-400">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;