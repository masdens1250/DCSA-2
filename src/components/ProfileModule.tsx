import React, { useState } from 'react';
import { User, MapPin, Briefcase, Calendar, Mail, Phone, Globe, AlertCircle, FileText, Camera, Activity } from 'lucide-react';

interface ProfileModuleProps {
  targets: any[];
  onUpdateTarget: (targets: any[]) => void;
}

const ProfileModule: React.FC<ProfileModuleProps> = ({ targets, onUpdateTarget }) => {
  const [selectedProfile, setSelectedProfile] = useState('profile1');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState<any>(null);
  
  const profiles = targets.map((target, index) => ({
    id: `profile${index + 1}`,
    name: target.name,
    status: target.status,
    risk: target.risk,
    lastUpdate: target.lastUpdate,
    avatar: `https://images.pexels.com/photos/${2379004 + index}/pexels-photo-${2379004 + index}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face`
  }));

  const currentProfile = profiles.find(p => p.id === selectedProfile);

  const profileData = {
    personal: {
      age: '34 ans',
      location: 'Paris, France',
      phone: '+33 1 23 45 67 89',
      email: 'alexandre.dubois@email.com',
      nationality: 'Française'
    },
    professional: {
      company: 'Tech Innovation Corp',
      position: 'Ingénieur Logiciel Senior',
      industry: 'Technologie',
      experience: '12 ans',
      salary: '65,000€/an (estimé)'
    },
    social: {
      facebook: 'Profil public - 247 amis',
      linkedin: '500+ relations',
      twitter: '@alexdubois_dev',
      instagram: 'Profil privé',
      activity: 'Actif quotidiennement'
    },
    interests: [
      'Intelligence artificielle',
      'Développement web',
      'Cybersécurité',
      'Entrepreneuriat',
      'Voyages',
      'Photographie'
    ],
    connections: [
      { name: 'Sophie Martin', relation: 'Collègue', platform: 'LinkedIn' },
      { name: 'Thomas Bernard', relation: 'Ami proche', platform: 'Facebook' },
      { name: 'Julie Moreau', relation: 'Ex-collègue', platform: 'LinkedIn' },
      { name: 'Pierre Durand', relation: 'Relation professionnelle', platform: 'Twitter' }
    ],
    timeline: [
      { date: '2024-01-15', event: 'Publication LinkedIn sur l\'IA', importance: 'Moyenne' },
      { date: '2024-01-14', event: 'Check-in restaurant parisien', importance: 'Faible' },
      { date: '2024-01-12', event: 'Conférence technologique', importance: 'Élevée' },
      { date: '2024-01-10', event: 'Changement de poste', importance: 'Critique' }
    ]
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critique': return 'text-red-400 bg-red-900/20';
      case 'Élevé': return 'text-orange-400 bg-orange-900/20';
      case 'Moyen': return 'text-yellow-400 bg-yellow-900/20';
      case 'Faible': return 'text-green-400 bg-green-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'text-green-400 bg-green-900/20';
      case 'Surveillance': return 'text-orange-400 bg-orange-900/20';
      case 'Analyse': return 'text-blue-400 bg-blue-900/20';
      default: return 'text-slate-400 bg-slate-700';
    }
  };

  const handleEditProfile = (profile: any) => {
    setEditingProfile(profile);
    setShowEditModal(true);
  };

  const handleSaveProfile = (updatedData: any) => {
    const updatedTargets = targets.map(target => 
      target.name === editingProfile.name 
        ? { ...target, ...updatedData, lastUpdate: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }
        : target
    );
    onUpdateTarget(updatedTargets);
    setShowEditModal(false);
    setEditingProfile(null);
  };

  const handleDeleteProfile = (profileName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le profil de ${profileName} ?`)) {
      const updatedTargets = targets.filter(target => target.name !== profileName);
      onUpdateTarget(updatedTargets);
      if (currentProfile?.name === profileName) {
        setSelectedProfile(profiles[0]?.id || '');
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile List */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Profils Actifs</h3>
              <span className="text-sm text-slate-400">{profiles.length}</span>
            </div>
            
            <div className="space-y-3">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`p-3 rounded-lg transition-colors ${
                    selectedProfile === profile.id 
                      ? 'bg-blue-600 border-blue-500' 
                      : 'bg-slate-700 hover:bg-slate-600 border-transparent'
                  } border`}
                >
                  <div 
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => setSelectedProfile(profile.id)}
                  >
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{profile.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(profile.status)}`}>
                          {profile.status}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getRiskColor(profile.risk)}`}>
                          {profile.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProfile(profile);
                      }}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProfile(profile.name);
                      }}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-3 space-y-6">
          {currentProfile && (
            <>
              {/* Profile Header */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={currentProfile.avatar} 
                      alt={currentProfile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-white">{currentProfile.name}</h2>
                      <p className="text-sm text-slate-400">ID: TGT-{currentProfile.id.slice(-3).toUpperCase()}</p>
                      <p className="text-sm text-slate-400">Dernière MAJ: {currentProfile.lastUpdate}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert(`Surveillance activée pour ${currentProfile.name}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Surveillance
                    </button>
                    <button 
                      onClick={() => {
                        const reportData = {
                          profile: currentProfile,
                          data: profileData,
                          generatedAt: new Date().toISOString()
                        };
                        
                        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `rapport-${currentProfile.name.replace(/\s+/g, '-')}.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg"
                    >
                      Rapport
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">87%</div>
                    <div className="text-sm text-slate-400">Complétude</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24</div>
                    <div className="text-sm text-slate-400">Sources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">156</div>
                    <div className="text-sm text-slate-400">Connexions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">7j</div>
                    <div className="text-sm text-slate-400">Dernière activité</div>
                  </div>
                </div>
              </div>

              {/* Profile Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Informations Personnelles
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(profileData.personal).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-400 capitalize">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Info */}
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Informations Professionnelles
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(profileData.professional).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-400 capitalize">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Réseaux Sociaux
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(profileData.social).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-400 capitalize">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Centres d'Intérêt</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Timeline d'Activité
                </h3>
                <div className="space-y-4">
                  {profileData.timeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-slate-700 rounded-lg">
                      <div className="text-sm text-slate-400 font-mono">{event.date}</div>
                      <div className="flex-1 text-white">{event.event}</div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        event.importance === 'Critique' ? 'bg-red-900/20 text-red-400' :
                        event.importance === 'Élevée' ? 'bg-orange-900/20 text-orange-400' :
                        event.importance === 'Moyenne' ? 'bg-yellow-900/20 text-yellow-400' :
                        'bg-green-900/20 text-green-400'
                      }`}>
                        {event.importance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Edit Modal */}
      {showEditModal && editingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Modifier le profil</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleSaveProfile({
                name: formData.get('name'),
                status: formData.get('status'),
                risk: formData.get('risk')
              });
            }}>
              <div className="space-y-4">
                <input
                  name="name"
                  type="text"
                  defaultValue={editingProfile.name}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  required
                />
                <select
                  name="status"
                  defaultValue={editingProfile.status}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  required
                >
                  <option value="Profilage">Profilage</option>
                  <option value="En Analyse">En Analyse</option>
                  <option value="Surveillance Active">Surveillance Active</option>
                  <option value="Validé">Validé</option>
                </select>
                <select
                  name="risk"
                  defaultValue={editingProfile.risk}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  required
                >
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
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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
  );
};

export default ProfileModule;