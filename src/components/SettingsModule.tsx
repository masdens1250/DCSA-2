import React, { useState } from 'react';
import { Settings, User, Shield, Database, Bell, Globe, Key, Monitor, Save, RefreshCw } from 'lucide-react';

const SettingsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      language: 'fr',
      timezone: 'Europe/Paris',
      theme: 'dark',
      autoSave: true,
      notifications: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      ipWhitelist: '',
      auditLog: true,
      encryptData: true
    },
    sources: {
      facebook: true,
      linkedin: true,
      twitter: true,
      instagram: false,
      webScraping: true,
      databases: true,
      apiKeys: {
        facebook: '',
        linkedin: '',
        twitter: ''
      }
    },
    alerts: {
      emailNotifications: true,
      pushNotifications: false,
      criticalAlerts: true,
      dailyReports: true,
      weeklyReports: false
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleApiKeyChange = (service: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      sources: {
        ...prev.sources,
        apiKeys: {
          ...prev.sources.apiKeys,
          [service]: value
        }
      }
    }));
  };

  const saveSettings = () => {
    // Simulate saving settings
    alert('Paramètres sauvegardés avec succès');
  };

  const resetSettings = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      // Reset to default values
      alert('Paramètres réinitialisés');
    }
  };

  const tabs = [
    { id: 'general', name: 'Général', icon: Settings },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'sources', name: 'Sources', icon: Database },
    { id: 'alerts', name: 'Alertes', icon: Bell },
    { id: 'system', name: 'Système', icon: Monitor }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Paramètres Système</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Paramètres Généraux</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Langue</label>
                <select 
                  value={settings.general.language}
                  onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Fuseau horaire</label>
                <select 
                  value={settings.general.timezone}
                  onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Thème</label>
                <select 
                  value={settings.general.theme}
                  onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="dark">Sombre</option>
                  <option value="light">Clair</option>
                  <option value="auto">Automatique</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.general.autoSave}
                  onChange={(e) => handleSettingChange('general', 'autoSave', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Sauvegarde automatique</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.general.notifications}
                  onChange={(e) => handleSettingChange('general', 'notifications', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Notifications activées</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Paramètres de Sécurité</h3>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.security.twoFactor}
                  onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Authentification à deux facteurs</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.security.auditLog}
                  onChange={(e) => handleSettingChange('security', 'auditLog', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Journal d'audit</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.security.encryptData}
                  onChange={(e) => handleSettingChange('security', 'encryptData', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Chiffrement des données</span>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Timeout de session (minutes)</label>
                <input 
                  type="number" 
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Liste blanche IP</label>
                <input 
                  type="text" 
                  value={settings.security.ipWhitelist}
                  onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
                  placeholder="192.168.1.0/24"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Configuration des Sources</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium text-blue-400">Sources activées</h4>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.sources.facebook}
                  onChange={(e) => handleSettingChange('sources', 'facebook', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Facebook</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.sources.linkedin}
                  onChange={(e) => handleSettingChange('sources', 'linkedin', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">LinkedIn</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.sources.twitter}
                  onChange={(e) => handleSettingChange('sources', 'twitter', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Twitter</span>
              </label>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-blue-400">Clés API</h4>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Facebook API Key</label>
                <input 
                  type="password" 
                  value={settings.sources.apiKeys.facebook}
                  onChange={(e) => handleApiKeyChange('facebook', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">LinkedIn API Key</label>
                <input 
                  type="password" 
                  value={settings.sources.apiKeys.linkedin}
                  onChange={(e) => handleApiKeyChange('linkedin', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Configuration des Alertes</h3>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.alerts.emailNotifications}
                  onChange={(e) => handleSettingChange('alerts', 'emailNotifications', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Notifications par email</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.alerts.criticalAlerts}
                  onChange={(e) => handleSettingChange('alerts', 'criticalAlerts', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Alertes critiques</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  checked={settings.alerts.dailyReports}
                  onChange={(e) => handleSettingChange('alerts', 'dailyReports', e.target.checked)}
                  className="rounded border-slate-600 text-blue-600"
                />
                <span className="text-white">Rapports quotidiens</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Informations Système</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Statut des Services</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Collecte de données</span>
                    <span className="text-green-400">Actif</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Analyse IA</span>
                    <span className="text-green-400">Opérationnel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Base de données</span>
                    <span className="text-green-400">Connectée</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Performances</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">CPU</span>
                    <span className="text-blue-400">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mémoire</span>
                    <span className="text-blue-400">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stockage</span>
                    <span className="text-blue-400">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button 
          onClick={resetSettings}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Réinitialiser</span>
        </button>
        
        <button 
          onClick={saveSettings}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Sauvegarder</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsModule;