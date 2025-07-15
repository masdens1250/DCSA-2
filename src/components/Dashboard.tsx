import React from 'react';
import { Activity, Users, Search, AlertTriangle, TrendingUp, MapPin, Clock, Database } from 'lucide-react';
import MetricCard from './MetricCard';
import AlertPanel from './AlertPanel';
import ActivityChart from './ActivityChart';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface Target {
  id: string;
  name: string;
  status: string;
  risk: string;
  lastUpdate: string;
}

interface DashboardProps {
  alerts: Alert[];
  targets: Target[];
  onDismissAlert: (alertId: string) => void;
  onNewTarget: () => void;
  onNewReport: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ alerts, targets, onDismissAlert, onNewTarget, onNewReport }) => {
  const metrics = [
    { title: 'Profils Actifs', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Recherches Aujourd\'hui', value: '1,234', change: '+8%', icon: Search, color: 'green' },
    { title: 'Alertes Critiques', value: '23', change: '-5%', icon: AlertTriangle, color: 'red' },
    { title: 'Sources Analysées', value: '156,789', change: '+15%', icon: Database, color: 'purple' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Surveillance Active': return 'bg-red-900/20 text-red-400';
      case 'En Analyse': return 'bg-yellow-900/20 text-yellow-400';
      case 'Profilage': return 'bg-blue-900/20 text-blue-400';
      case 'Validé': return 'bg-green-900/20 text-green-400';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critique': return 'text-red-400';
      case 'Élevé': return 'text-orange-400';
      case 'Moyen': return 'text-yellow-400';
      case 'Faible': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-1">
          <AlertPanel alerts={alerts} onDismissAlert={onDismissAlert} />
        </div>

        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
      </div>

      {/* Recent Targets */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Cibles Récentes</h3>
          <button 
            onClick={onNewTarget}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            + Nouvelle cible
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
              Toutes
            </button>
            <button className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm">
              Actives
            </button>
            <button className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm">
              Critiques
            </button>
          </div>
          <button 
            onClick={onNewReport}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Voir tout
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="pb-3 text-sm font-medium text-slate-400">ID</th>
                <th className="pb-3 text-sm font-medium text-slate-400">Nom</th>
                <th className="pb-3 text-sm font-medium text-slate-400">Status</th>
                <th className="pb-3 text-sm font-medium text-slate-400">Risque</th>
                <th className="pb-3 text-sm font-medium text-slate-400">Dernière MAJ</th>
              </tr>
            </thead>
            <tbody>
              {targets.slice(0, 4).map((target) => (
                <tr key={target.id} className="border-b border-slate-700/50">
                  <td className="py-3 text-sm font-mono text-slate-300">{target.id}</td>
                  <td className="py-3 text-sm font-medium text-white">{target.name}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(target.status)}`}>
                      {target.status}
                    </span>
                  </td>
                  <td className={`py-3 text-sm font-medium ${getRiskColor(target.risk)}`}>
                    {target.risk}
                  </td>
                  <td className="py-3 text-sm text-slate-400">{target.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="h-5 w-5 text-green-400" />
            <h4 className="font-medium text-white">Système</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Serveurs</span>
              <span className="text-green-400 cursor-pointer hover:text-green-300">100% Opérationnel</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Collecte</span>
              <span className="text-green-400 cursor-pointer hover:text-green-300">Active</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Analyse</span>
              <span className="text-green-400 cursor-pointer hover:text-green-300">En cours</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h4 className="font-medium text-white">Performance</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Requêtes/min</span>
              <span className="text-blue-400">2,847</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Latence</span>
              <span className="text-blue-400">89ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Fiabilité</span>
              <span className="text-blue-400">99.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-3">
            <MapPin className="h-5 w-5 text-purple-400" />
            <h4 className="font-medium text-white">Géolocalisation</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Régions actives</span>
              <span className="text-purple-400">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Points d'intérêt</span>
              <span className="text-purple-400">847</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Couverture</span>
              <span className="text-purple-400">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;