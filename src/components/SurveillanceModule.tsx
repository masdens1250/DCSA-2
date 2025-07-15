import React, { useState } from 'react';
import { Eye, MapPin, Clock, AlertCircle, Activity, Users, Target, Zap } from 'lucide-react';

interface SurveillanceModuleProps {
  targets: any[];
}

const SurveillanceModule: React.FC<SurveillanceModuleProps> = ({ targets }) => {
  const [activeTab, setActiveTab] = useState('realtime');
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const realtimeEvents = [
    {
      id: 1,
      time: '14:23:45',
      type: 'Social',
      target: targets[0]?.name || 'Alexandre Dubois',
      event: 'Nouvelle publication LinkedIn',
      location: 'Paris, France',
      priority: 'Moyenne',
      status: 'Nouveau'
    },
    {
      id: 2,
      time: '14:22:12',
      type: 'Localisation',
      target: targets[1]?.name || 'Marie Leclerc',
      event: 'Check-in restaurant',
      location: 'Lyon, France',
      priority: 'Faible',
      status: 'Analysé'
    },
    {
      id: 3,
      time: '14:20:33',
      type: 'Communication',
      target: targets[2]?.name || 'Jean Martin',
      event: 'Activation compte messaging',
      location: 'Marseille, France',
      priority: 'Élevée',
      status: 'En cours'
    },
    {
      id: 4,
      time: '14:18:56',
      type: 'Réseau',
      target: targets[3]?.name || 'Sophie Bernard',
      event: 'Nouvelle connexion suspecte',
      location: 'Nice, France',
      priority: 'Critique',
      status: 'Alerté'
    }
  ];

  const activeTargets = targets.map((target, index) => ({
    id: target.id || `TGT-${String(index + 1).padStart(3, '0')}`,
    name: target.name,
    status: index === 0 ? 'En ligne' : index === 1 ? 'Actif' : 'Inactif',
    lastSeen: index === 0 ? '2 min' : index === 1 ? '5 min' : '1h',
    location: ['Paris 15e', 'Lyon 3e', 'Marseille', 'Nice'][index] || 'Inconnu',
    risk: target.risk,
    activities: Math.floor(Math.random() * 20) + 1
  }));

  const surveillanceZones = [
    { id: 1, name: 'Zone Alpha', location: 'Paris Centre', targets: 12, alerts: 3, status: 'Actif' },
    { id: 2, name: 'Zone Beta', location: 'Lyon Confluence', targets: 8, alerts: 1, status: 'Actif' },
    { id: 3, name: 'Zone Gamma', location: 'Marseille Vieux-Port', targets: 5, alerts: 0, status: 'Surveillance' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critique': return 'text-red-400 bg-red-900/20';
      case 'Élevée': return 'text-orange-400 bg-orange-900/20';
      case 'Moyenne': return 'text-yellow-400 bg-yellow-900/20';
      case 'Faible': return 'text-green-400 bg-green-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En ligne': return 'text-green-400 bg-green-900/20';
      case 'Actif': return 'text-blue-400 bg-blue-900/20';
      case 'Inactif': return 'text-slate-400 bg-slate-700';
      case 'Nouveau': return 'text-blue-400 bg-blue-900/20';
      case 'En cours': return 'text-orange-400 bg-orange-900/20';
      case 'Analysé': return 'text-purple-400 bg-purple-900/20';
      case 'Alerté': return 'text-red-400 bg-red-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'Social': return Users;
      case 'Localisation': return MapPin;
      case 'Communication': return Activity;
      case 'Réseau': return Target;
      default: return AlertCircle;
    }
  };

  const handleAnalyzeEvent = (event: any) => {
    alert(`Analyse lancée pour l'événement: ${event.event}`);
  };

  const handleStartSurveillance = (target: any) => {
    alert(`Surveillance activée pour ${target.name}`);
  };

  const handleManageZone = (zone: any) => {
    setSelectedZone(zone.id);
    alert(`Gestion de la ${zone.name} - ${zone.location}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Surveillance Temps Réel</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400">Système actif</span>
            </div>
            <div className="text-sm text-slate-400">
              {realtimeEvents.length} événements aujourd'hui
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('realtime')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'realtime'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Temps Réel
          </button>
          <button
            onClick={() => setActiveTab('targets')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'targets'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Cibles Actives
          </button>
          <button
            onClick={() => setActiveTab('zones')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'zones'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Zones de Surveillance
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <Eye className="h-8 w-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">25</div>
              <div className="text-sm text-slate-400">Cibles Actives</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">142</div>
              <div className="text-sm text-slate-400">Événements/h</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-8 w-8 text-red-400" />
            <div>
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-sm text-slate-400">Alertes Actives</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-slate-400">Zones Surveillées</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'realtime' && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Événements en Temps Réel</h3>
          <div className="space-y-3">
            {realtimeEvents.map((event) => {
              const EventIcon = getEventTypeIcon(event.type);
              return (
                <div key={event.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:bg-slate-650 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <EventIcon className="h-5 w-5 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">{event.type}</span>
                      <span className="text-sm text-slate-400">•</span>
                      <span className="text-sm text-white font-medium">{event.target}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-white mb-2">{event.event}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <button 
                      onClick={() => handleAnalyzeEvent(event)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Analyser
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 flex justify-between">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Actualiser
            </button>
            <button className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
              Exporter événements
            </button>
          </div>
        </div>
      )}

      {activeTab === 'targets' && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Cibles Surveillées</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-700">
                  <th className="pb-3 text-sm font-medium text-slate-400">ID</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">Nom</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">Status</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">Dernière Activité</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">Localisation</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">Risque</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">Activités</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeTargets.map((target) => (
                  <tr key={target.id} className="border-b border-slate-700/50">
                    <td className="py-3 text-sm font-mono text-slate-300">{target.id}</td>
                    <td className="py-3 text-sm font-medium text-white">{target.name}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(target.status)}`}>
                        {target.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-400">{target.lastSeen}</td>
                    <td className="py-3 text-sm text-slate-400">{target.location}</td>
                    <td className="py-3 text-sm text-slate-400">{target.risk}</td>
                    <td className="py-3 text-sm text-slate-400">{target.activities}</td>
                    <td className="py-3">
                      <button 
                        onClick={() => handleStartSurveillance(target)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Surveiller
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Surveillance globale
              </button>
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
                Alertes critiques
              </button>
            </div>
            <button className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">
              Rapport surveillance
            </button>
          </div>
        </div>
      )}

      {activeTab === 'zones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveillanceZones.map((zone) => (
            <div 
              key={zone.id} 
              className={`bg-slate-800 rounded-lg p-6 border transition-colors ${
                selectedZone === zone.id ? 'border-blue-500' : 'border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{zone.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(zone.status)}`}>
                  {zone.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">{zone.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{zone.targets}</div>
                    <div className="text-xs text-slate-400">Cibles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-400">{zone.alerts}</div>
                    <div className="text-xs text-slate-400">Alertes</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleManageZone(zone)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Gérer Zone
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveillanceModule;