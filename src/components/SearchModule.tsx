import React, { useState } from 'react';
import { Search, Globe, Users, FileText, Database, Filter, MapPin, Calendar, Share2, Instagram, Twitter, Linkedin, AlertCircle, Clock, Eye } from 'lucide-react';

interface SearchModuleProps {
  onCreateProfile?: (profileData: any) => void;
}

const SearchModule: React.FC<SearchModuleProps> = ({ onCreateProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [searchType, setSearchType] = useState('person');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const sources = [
    { id: 'all', name: 'Toutes les sources', icon: Globe },
    { id: 'social', name: 'Réseaux sociaux', icon: Users },
    { id: 'web', name: 'Web public', icon: FileText },
    { id: 'databases', name: 'Bases de données', icon: Database },
    { id: 'news', name: 'Actualités', icon: FileText },
    { id: 'forums', name: 'Forums', icon: Users }
  ];

  const facebookCriteria = [
    'Profil public', 'Publications', 'Photos', 'Vidéos', 'Check-ins', 'Amis visibles',
    'Informations personnelles', 'Emploi', 'Formation', 'Lieux', 'Événements',
    'Pages aimées', 'Groupes', 'Avis', 'Mentions J\'aime'
  ];

  // Fonction pour générer des résultats de recherche simulés
  const generateMockResults = (query: string, source: string, type: string) => {
    const baseResults = [
      {
        id: 1,
        name: query || 'Alexandre Dubois',
        type: 'Personne',
        source: 'Facebook',
        reliability: 'Élevée',
        lastUpdate: '2024-01-15',
        confidence: 92,
        data: {
          age: '34 ans',
          location: 'Paris, France',
          job: 'Ingénieur logiciel',
          connections: '247 amis',
          activity: 'Actif il y a 2h'
        }
      },
      {
        id: 2,
        name: query || 'Alexandre Dubois',
        type: 'Personne',
        source: 'LinkedIn',
        reliability: 'Très élevée',
        lastUpdate: '2024-01-14',
        confidence: 96,
        data: {
          company: 'Tech Corp',
          position: 'Senior Developer',
          connections: '500+ relations',
          activity: 'Posté il y a 1 jour'
        }
      },
      {
        id: 3,
        name: query || 'Alexandre Dubois',
        type: 'Mention',
        source: 'Article presse',
        reliability: 'Moyenne',
        lastUpdate: '2024-01-10',
        confidence: 78,
        data: {
          title: 'Conférence technologique',
          context: 'Intervenant sur l\'IA',
          publication: 'Tech News',
          sentiment: 'Positif'
        }
      },
      {
        id: 4,
        name: query || 'Alexandre Dubois',
        type: 'Profil',
        source: 'Twitter',
        reliability: 'Moyenne',
        lastUpdate: '2024-01-12',
        confidence: 84,
        data: {
          handle: '@alexdubois_dev',
          followers: '1.2K followers',
          tweets: '456 tweets',
          activity: 'Actif quotidiennement'
        }
      },
      {
        id: 5,
        name: query || 'Alexandre Dubois',
        type: 'Référence',
        source: 'Base de données publique',
        reliability: 'Très élevée',
        lastUpdate: '2024-01-08',
        confidence: 98,
        data: {
          registry: 'Registre du commerce',
          role: 'Dirigeant',
          company: 'Tech Innovation SARL',
          status: 'Actif'
        }
      }
    ];

    // Filtrer par source si nécessaire
    let filteredResults = baseResults;
    if (source !== 'all') {
      const sourceMap = {
        'social': ['Facebook', 'LinkedIn', 'Twitter'],
        'web': ['Article presse'],
        'databases': ['Base de données publique'],
        'news': ['Article presse'],
        'forums': []
      };
      
      if (sourceMap[source]) {
        filteredResults = baseResults.filter(result => 
          sourceMap[source].includes(result.source)
        );
      }
    }

    return filteredResults;
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Veuillez saisir un terme de recherche');
      return;
    }

    setIsSearching(true);
    setHasSearched(false);
    
    // Simulation d'une recherche avec délai
    setTimeout(() => {
      const results = generateMockResults(searchQuery, selectedSource, searchType);
      setSearchResults(results);
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Facebook': return Share2;
      case 'LinkedIn': return Linkedin;
      case 'Twitter': return Twitter;
      case 'Instagram': return Instagram;
      default: return Globe;
    }
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'Très élevée': return 'text-green-400';
      case 'Élevée': return 'text-blue-400';
      case 'Moyenne': return 'text-yellow-400';
      case 'Faible': return 'text-orange-400';
      default: return 'text-slate-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-blue-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const handleCriteriaChange = (criteria: string) => {
    setSelectedCriteria(prev => 
      prev.includes(criteria) 
        ? prev.filter(c => c !== criteria)
        : [...prev, criteria]
    );
  };

  const handleCreateProfile = (result: any) => {
    if (onCreateProfile) {
      onCreateProfile({
        name: result.name,
        status: 'Profilage',
        risk: result.confidence > 90 ? 'Élevé' : result.confidence > 75 ? 'Moyen' : 'Faible'
      });
      alert(`Profil créé pour ${result.name}`);
    }
  };

  const handleStartSurveillance = (result: any) => {
    alert(`Surveillance activée pour ${result.name}`);
  };

  const handleExport = (result: any) => {
    const exportData = {
      target: result.name,
      source: result.source,
      confidence: result.confidence,
      data: result.data,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `osint-${result.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-6">Recherche OSINT Avancée</h2>
        
        {/* Search Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Type de recherche</label>
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="person">Personne</option>
                <option value="organization">Organisation</option>
                <option value="event">Événement</option>
                <option value="location">Lieu</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Source</label>
              <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {sources.map(source => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Période</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
                <option value="all">Toutes périodes</option>
                <option value="24h">Dernières 24h</option>
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="1y">Dernière année</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nom, organisation, événement..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>{isSearching ? 'Recherche...' : 'Rechercher'}</span>
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        <div className="mt-6 p-4 bg-slate-700 rounded-lg">
          <h3 className="text-sm font-medium text-white mb-3">Critères Facebook spécifiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {facebookCriteria.map((criteria, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-600 text-blue-600"
                  checked={selectedCriteria.includes(criteria)}
                  onChange={() => handleCriteriaChange(criteria)}
                />
                <span className="text-sm text-slate-300">{criteria}</span>
              </label>
            ))}
          </div>
          {selectedCriteria.length > 0 && (
            <div className="mt-3 text-sm text-blue-400">
              {selectedCriteria.length} critères sélectionnés
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
            <span className="text-white">Recherche en cours dans les sources OSINT...</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Analyse des réseaux sociaux</span>
              <span className="text-blue-400">En cours...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Scan des bases de données publiques</span>
              <span className="text-blue-400">En cours...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Recherche dans les archives web</span>
              <span className="text-blue-400">En cours...</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !isSearching && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Résultats de recherche</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">{searchResults.length} résultats trouvés</span>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                Exporter tout
              </button>
            </div>
          </div>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">Aucun résultat trouvé</h4>
              <p className="text-slate-400">Essayez avec d'autres termes de recherche ou élargissez vos critères.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((result) => {
                const SourceIcon = getSourceIcon(result.source);
                
                return (
                  <div key={result.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:bg-slate-650 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <SourceIcon className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="font-medium text-white">{result.name}</h4>
                          <p className="text-sm text-slate-400">{result.type} - {result.source}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-sm font-medium ${getReliabilityColor(result.reliability)}`}>
                            {result.reliability}
                          </span>
                          <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                            {result.confidence}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{result.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                      {Object.entries(result.data).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-slate-400 capitalize">{key}:</span>
                          <span className="text-white ml-1">{value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>Créer profil</span>
                        </button>
                        <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>Surveillance</span>
                        </button>
                        <button className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm">
                          Exporter
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>Analysé il y a {Math.floor(Math.random() * 60)} min</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Export All Results */}
      {hasSearched && searchResults.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Actions groupées</span>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  const allData = {
                    searchQuery,
                    searchType,
                    selectedSource,
                    results: searchResults,
                    exportDate: new Date().toISOString()
                  };
                  
                  const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `osint-search-${Date.now()}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
              >
                Exporter tout
              </button>
              <button 
                onClick={() => {
                  searchResults.forEach(result => handleCreateProfile(result));
                  alert(`${searchResults.length} profils créés`);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Créer tous les profils
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Tips */}
      {!hasSearched && !isSearching && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Conseils de recherche</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-400 mb-2">Recherche de personnes</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Utilisez le nom complet pour de meilleurs résultats</li>
                <li>• Ajoutez la ville ou l'entreprise si connue</li>
                <li>• Testez différentes variantes du nom</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">Optimisation des sources</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Commencez par "Toutes les sources"</li>
                <li>• Affinez ensuite par source spécifique</li>
                <li>• Vérifiez les critères Facebook pour plus de détails</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModule;