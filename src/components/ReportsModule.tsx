import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Search, Eye, Share2, Printer, Mail, Clock, User, Target, TrendingUp } from 'lucide-react';

const ReportsModule: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      id: 'RPT-001',
      title: 'Analyse Comportementale - Alexandre Dubois',
      type: 'Profil',
      date: '2024-01-15',
      author: 'Système OSINT',
      status: 'Terminé',
      pages: 24,
      priority: 'Élevée',
      targets: ['Alexandre Dubois'],
      summary: 'Analyse complète du comportement numérique et des connexions sociales.'
    },
    {
      id: 'RPT-002',
      title: 'Surveillance Réseau - Groupe Tech Corp',
      type: 'Réseau',
      date: '2024-01-14',
      author: 'Agent OSINT-01',
      status: 'En cours',
      pages: 18,
      priority: 'Critique',
      targets: ['Marie Leclerc', 'Jean Martin'],
      summary: 'Cartographie des connexions professionnelles et analyse des risques.'
    },
    {
      id: 'RPT-003',
      title: 'Rapport Hebdomadaire - Activités Suspectes',
      type: 'Synthèse',
      date: '2024-01-13',
      author: 'Système OSINT',
      status: 'Terminé',
      pages: 12,
      priority: 'Moyenne',
      targets: ['Multiple'],
      summary: 'Synthèse des activités suspectes détectées cette semaine.'
    },
    {
      id: 'RPT-004',
      title: 'Analyse Géospatiale - Zone Paris 15e',
      type: 'Géolocalisation',
      date: '2024-01-12',
      author: 'Agent OSINT-02',
      status: 'Validé',
      pages: 31,
      priority: 'Élevée',
      targets: ['Sophie Bernard'],
      summary: 'Analyse des déplacements et points d\'intérêt géographiques.'
    },
    {
      id: 'RPT-005',
      title: 'Évaluation Risques - Q1 2024',
      type: 'Évaluation',
      date: '2024-01-10',
      author: 'Analyste Senior',
      status: 'Archivé',
      pages: 45,
      priority: 'Critique',
      targets: ['Multiple'],
      summary: 'Évaluation trimestrielle des risques et recommandations stratégiques.'
    }
  ];

  const reportTemplates = [
    { id: 'profile', name: 'Rapport de Profil', icon: User, description: 'Analyse détaillée d\'un individu' },
    { id: 'network', name: 'Analyse de Réseau', icon: Target, description: 'Cartographie des connexions' },
    { id: 'surveillance', name: 'Rapport de Surveillance', icon: Eye, description: 'Suivi d\'activités en temps réel' },
    { id: 'synthesis', name: 'Rapport de Synthèse', icon: TrendingUp, description: 'Vue d\'ensemble périodique' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé': return 'text-green-400 bg-green-900/20';
      case 'En cours': return 'text-blue-400 bg-blue-900/20';
      case 'Validé': return 'text-purple-400 bg-purple-900/20';
      case 'Archivé': return 'text-slate-400 bg-slate-700';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critique': return 'text-red-400 bg-red-900/20';
      case 'Élevée': return 'text-orange-400 bg-orange-900/20';
      case 'Moyenne': return 'text-yellow-400 bg-yellow-900/20';
      case 'Faible': return 'text-green-400 bg-green-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = reportType === 'all' || report.type.toLowerCase() === reportType.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.targets.some(target => target.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleViewReport = (reportId: string) => {
    setSelectedReport(reportId);
    alert(`Ouverture du rapport ${reportId}`);
  };

  const handleDownloadReport = (report: any) => {
    const reportData = {
      ...report,
      generatedAt: new Date().toISOString(),
      content: 'Contenu détaillé du rapport...'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.id}-${report.title.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareReport = (report: any) => {
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: report.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${report.title}\n${report.summary}\n${window.location.href}`);
      alert('Lien copié dans le presse-papiers');
    }
  };

  const handleCreateReport = (templateId: string) => {
    alert(`Création d'un nouveau rapport: ${templateId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Gestion des Rapports</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400">{filteredReports.length} rapports</span>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Nouveau Rapport</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Type</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">Tous les types</option>
              <option value="profil">Profil</option>
              <option value="réseau">Réseau</option>
              <option value="synthèse">Synthèse</option>
              <option value="géolocalisation">Géolocalisation</option>
              <option value="évaluation">Évaluation</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Période</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="90d">3 derniers mois</option>
              <option value="1y">Dernière année</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-400 mb-2">Recherche</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre ou cible..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Modèles de Rapports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:bg-slate-650 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="h-6 w-6 text-blue-400" />
                  <h4 className="font-medium text-white">{template.name}</h4>
                </div>
                <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                <button 
                  onClick={() => handleCreateReport(template.id)}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                >
                  Créer
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Rapports Existants</h3>
        
        {filteredReports.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-white mb-2">Aucun rapport trouvé</h4>
            <p className="text-slate-400">Modifiez vos critères de recherche ou créez un nouveau rapport.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:bg-slate-650 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-white">{report.title}</h4>
                      <span className="text-sm font-mono text-slate-400">{report.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{report.summary}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{report.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{report.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{report.pages} pages</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3" />
                        <span>{report.targets.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleViewReport(report.id)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                      title="Voir le rapport"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDownloadReport(report)}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                      title="Télécharger"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleShareReport(report)}
                      className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
                      title="Partager"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => alert(`Impression du rapport ${report.id}`)}
                      className="p-2 bg-slate-600 hover:bg-slate-500 text-white rounded"
                      title="Imprimer"
                    >
                      <Printer className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{reports.length}</div>
              <div className="text-sm text-slate-400">Rapports Total</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {reports.filter(r => r.status === 'En cours').length}
              </div>
              <div className="text-sm text-slate-400">En Cours</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {reports.filter(r => r.status === 'Terminé').length}
              </div>
              <div className="text-sm text-slate-400">Terminés</div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round(reports.reduce((acc, r) => acc + r.pages, 0) / reports.length)}
              </div>
              <div className="text-sm text-slate-400">Pages Moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;