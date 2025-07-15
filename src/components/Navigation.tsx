import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface NavigationProps {
  items: NavigationItem[];
  activeModule: string;
  onModuleChange: (module: string) => void;
  onNewSearch: () => void;
  onNewReport: () => void;
  onActiveSurveillance: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  items, 
  activeModule, 
  onModuleChange, 
  onNewSearch, 
  onNewReport, 
  onActiveSurveillance 
}) => {
  return (
    <nav className="w-64 bg-slate-800 border-r border-slate-700 p-4">
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">ACTIONS RAPIDES</h3>
        <div className="space-y-2">
          <button 
            onClick={onNewSearch}
            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
          >
            Nouvelle recherche
          </button>
          <button 
            onClick={onNewReport}
            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
          >
            Créer rapport
          </button>
          <button 
            onClick={onActiveSurveillance}
            className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
          >
            Surveillance active
          </button>
        </div>
        
        {/* System Status */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-slate-400 mb-3">STATUT SYSTÈME</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Collecte</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400">ON</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Analyse</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-400">ACTIF</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Surveillance</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-orange-400">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;