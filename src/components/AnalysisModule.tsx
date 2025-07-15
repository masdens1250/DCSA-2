import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Activity, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar } from 'recharts';

const AnalysisModule: React.FC = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState('trends');

  const trendData = [
    { name: 'Lun', mentions: 45, sentiment: 65, activity: 78 },
    { name: 'Mar', mentions: 78, sentiment: 72, activity: 65 },
    { name: 'Mer', mentions: 123, sentiment: 58, activity: 89 },
    { name: 'Jeu', mentions: 156, sentiment: 45, activity: 94 },
    { name: 'Ven', mentions: 189, sentiment: 38, activity: 67 },
    { name: 'Sam', mentions: 234, sentiment: 52, activity: 45 },
    { name: 'Dim', mentions: 198, sentiment: 68, activity: 56 }
  ];

  const riskData = [
    { name: 'Critique', value: 12, color: '#DC2626' },
    { name: 'Élevé', value: 34, color: '#EA580C' },
    { name: 'Moyen', value: 89, color: '#F59E0B' },
    { name: 'Faible', value: 156, color: '#059669' }
  ];

  const sourceData = [
    { name: 'Facebook', value: 145 },
    { name: 'LinkedIn', value: 98 },
    { name: 'Twitter', value: 76 },
    { name: 'Instagram', value: 54 },
    { name: 'Web', value: 123 },
    { name: 'Forums', value: 32 }
  ];

  const signals = [
    {
      id: 1,
      type: 'Tendance',
      description: 'Augmentation des mentions de "cybersécurité" (+45%)',
      importance: 'Élevée',
      date: '2024-01-15',
      status: 'Nouveau'
    },
    {
      id: 2,
      type: 'Anomalie',
      description: 'Activité suspecte détectée sur le profil TARGET_001',
      importance: 'Critique',
      date: '2024-01-15',
      status: 'En cours'
    },
    {
      id: 3,
      type: 'Réseau',
      description: 'Nouvelle connexion entre cibles surveillées',
      importance: 'Moyenne',
      date: '2024-01-14',
      status: 'Validé'
    },
    {
      id: 4,
      type: 'Géolocalisation',
      description: 'Concentration d\'activité inhabituelle - Zone Paris 15e',
      importance: 'Moyenne',
      date: '2024-01-14',
      status: 'Analysé'
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critique': return 'text-red-400 bg-red-900/20';
      case 'Élevée': return 'text-orange-400 bg-orange-900/20';
      case 'Moyenne': return 'text-yellow-400 bg-yellow-900/20';
      case 'Faible': return 'text-green-400 bg-green-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'text-blue-400 bg-blue-900/20';
      case 'En cours': return 'text-orange-400 bg-orange-900/20';
      case 'Validé': return 'text-green-400 bg-green-900/20';
      case 'Analysé': return 'text-purple-400 bg-purple-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const analysisTypes = [
    { id: 'trends', name: 'Analyse des Tendances', icon: TrendingUp },
    { id: 'risks', name: 'Évaluation des Risques', icon: AlertTriangle },
    { id: 'networks', name: 'Analyse de Réseaux', icon: Target },
    { id: 'signals', name: 'Signaux Faibles', icon: Activity }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Analysis Type Selector */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Module d'Analyse Avancée</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {analysisTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedAnalysis(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedAnalysis === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analysis Content */}
      {selectedAnalysis === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Tendances d'Activité</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="mentions" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="sentiment" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="activity" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Source Distribution */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Distribution des Sources</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {selectedAnalysis === 'risks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Distribution des Risques</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart data={riskData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {riskData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-300">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Métriques de Risque</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">7.3</div>
                <div className="text-sm text-slate-400">Score de Risque Moyen</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-400">23</div>
                  <div className="text-sm text-slate-400">Alertes Actives</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-400">45</div>
                  <div className="text-sm text-slate-400">Profils Surveillés</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Risque Critique</span>
                  <span className="text-red-400">4.2%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '4.2%' }}></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Risque Élevé</span>
                  <span className="text-orange-400">11.7%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '11.7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAnalysis === 'signals' && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Signaux Faibles Détectés</h3>
          <div className="space-y-4">
            {signals.map((signal) => (
              <div key={signal.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-sm font-medium text-blue-400">{signal.type}</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getImportanceColor(signal.importance)}`}>
                      {signal.importance}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(signal.status)}`}>
                      {signal.status}
                    </span>
                  </div>
                </div>
                <p className="text-white mb-2">{signal.description}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{signal.date}</span>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300">
                    Analyser
                  </button>
                  <button className="text-blue-400 hover:text-blue-300">
                    Alerter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedAnalysis === 'networks' && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Analyse de Réseaux</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Connexions Principales</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Nœuds totaux</span>
                  <span className="text-white">2,847</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Connexions</span>
                  <span className="text-white">8,429</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Clusters</span>
                  <span className="text-white">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Densité</span>
                  <span className="text-white">0.67</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Nœuds Influents</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    AD
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Alexandre Dubois</div>
                    <div className="text-xs text-slate-400">Centralité: 0.89</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                    ML
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Marie Leclerc</div>
                    <div className="text-xs text-slate-400">Centralité: 0.76</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisModule;