import React, { useState } from 'react';
import { Search, Shield, Users, Target, Activity, AlertCircle, FileText, Settings, Database, TrendingUp, Eye, Clock, MapPin, Plus } from 'lucide-react';
import Dashboard from './components/Dashboard';
import SearchModule from './components/SearchModule';
import ProfileModule from './components/ProfileModule';
import AnalysisModule from './components/AnalysisModule';
import ReportsModule from './components/ReportsModule';
import SurveillanceModule from './components/SurveillanceModule';
import SettingsModule from './components/SettingsModule';
import Navigation from './components/Navigation';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showNewTargetModal, setShowNewTargetModal] = useState(false);
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([
    { 
      id: '1', 
      type: 'warning', 
      title: 'Activité Suspecte',
      message: 'Activité suspecte détectée - Profil: TARGET_001', 
      timestamp: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    },
    { 
      id: '2', 
      type: 'info', 
      title: 'Nouveau Profil',
      message: 'Nouveau profil généré - Organisation: CORP_045', 
      timestamp: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
    },
    { 
      id: '3', 
      type: 'error', 
      title: 'Alerte Prioritaire',
      message: 'Alerte prioritaire - Événement en cours', 
      timestamp: new Date(Date.now() - 13 * 60 * 1000) // 13 minutes ago
    }
  ]);
  
  const [targets, setTargets] = useState([
    { id: 'TGT-001', name: 'Alexandre Dubois', status: 'Surveillance Active', risk: 'Élevé', lastUpdate: '14:23' },
    { id: 'TGT-002', name: 'Marie Leclerc', status: 'En Analyse', risk: 'Moyen', lastUpdate: '14:18' },
    { id: 'TGT-003', name: 'Jean Martin', status: 'Profilage', risk: 'Faible', lastUpdate: '14:15' },
    { id: 'TGT-004', name: 'Sophie Bernard', status: 'Validé', risk: 'Critique', lastUpdate: '14:12' }
  ]);

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const addNewTarget = (targetData: any) => {
    const newTarget = {
      id: `TGT-${String(targets.length + 1).padStart(3, '0')}`,
      ...targetData,
      lastUpdate: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    setTargets([...targets, newTarget]);
    setShowNewTargetModal(false);
  };

  const navigationItems = [
    { id: 'dashboard', name: 'Centre de Commandement', icon: Shield },
    { id: 'search', name: 'Recherche OSINT', icon: Search },
    { id: 'profiles', name: 'Profilage', icon: Users },
    { id: 'analysis', name: 'Analyse', icon: TrendingUp },
    { id: 'surveillance', name: 'Surveillance', icon: Eye },
    { id: 'reports', name: 'Rapports', icon: FileText },
    { id: 'settings', name: 'Paramètres', icon: Settings }
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard 
          alerts={alerts} 
          targets={targets}
          onDismissAlert={dismissAlert}
          onNewTarget={() => setShowNewTargetModal(true)}
          onNewReport={() => setShowNewReportModal(true)}
        />;
      case 'search':
        return <SearchModule onCreateProfile={addNewTarget} />;
      case 'profiles':
        return <ProfileModule targets={targets} onUpdateTarget={setTargets} />;
      case 'analysis':
        return <AnalysisModule />;
      case 'surveillance':
        return <SurveillanceModule targets={targets} />;
      case 'reports':
        return <ReportsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <Dashboard 
          alerts={alerts} 
          targets={targets}
          onDismissAlert={dismissAlert}
          onNewTarget={() => setShowNewTargetModal(true)}
          onNewReport={() => setShowNewReportModal(true)}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">OSINT COMMAND CENTER</h1>
              <p className="text-sm text-slate-400">Intelligence Analysis & Surveillance Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Status Indicators */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">SYSTÈME ACTIF</span>
              </div>
              <div className="flex items-center space-x-1">
                <Database className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-400">DB: ONLINE</span>
              </div>
            </div>
            
            {/* Alerts Counter */}
            <div className="flex items-center space-x-2 bg-red-900/20 px-3 py-1 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">{alerts.length} ALERTES</span>
            </div>
            
            {/* Time Display */}
            <div className="flex items-center space-x-2 bg-slate-700 px-3 py-1 rounded-lg">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-mono">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Navigation Sidebar */}
        <Navigation 
          items={navigationItems} 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
          onNewSearch={() => setActiveModule('search')}
          onNewReport={() => setShowNewReportModal(true)}
          onActiveSurveillance={() => setActiveModule('surveillance')}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderActiveModule()}
        </main>
        
        {/* Modals */}
        {showNewTargetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 w-96 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Nouvelle Cible</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                addNewTarget({
                  name: formData.get('name'),
                  status: formData.get('status'),
                  risk: formData.get('risk')
                });
              }}>
                <div className="space-y-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Nom de la cible"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    required
                  />
                  <select
                    name="status"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    required
                  >
                    <option value="">Sélectionner un statut</option>
                    <option value="Profilage">Profilage</option>
                    <option value="En Analyse">En Analyse</option>
                    <option value="Surveillance Active">Surveillance Active</option>
                    <option value="Validé">Validé</option>
                  </select>
                  <select
                    name="risk"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    required
                  >
                    <option value="">Niveau de risque</option>
                    <option value="Faible">Faible</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Élevé">Élevé</option>
                    <option value="Critique">Critique</option>
                  </select>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTargetModal(false)}
                    className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;