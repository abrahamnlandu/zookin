'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiBell, FiCalendar, FiEye, FiEyeOff, FiClock, FiDollarSign, FiUsers } from 'react-icons/fi';

// Types
type AnnouncementType = 'nouveauté' | 'communiqué' | 'horaire' | 'animal' | 'tarif' | 'fermeture' | 'autre';
type AnnouncementStatus = 'published' | 'draft';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  status: AnnouncementStatus;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  author: string;
  important: boolean;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Nouvel arrivage de girafes',
      content: 'Nous sommes heureux de vous annoncer l\'arrivée de deux nouvelles girafes dans notre espace savane. Venez découvrir ces magnifiques animaux dès cette semaine !',
      type: 'animal',
      status: 'published',
      startDate: '2024-01-15',
      endDate: null,
      createdAt: '2024-01-10',
      author: 'Dr. Mukendi',
      important: true
    },
    {
      id: '2',
      title: 'Changement d\'horaire pour la saison sèche',
      content: 'À partir du 1er février, le zoo ouvrira ses portes de 8h00 à 18h00. La dernière entrée se fera à 17h00.',
      type: 'horaire',
      status: 'published',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      createdAt: '2024-01-08',
      author: 'Direction',
      important: true
    },
    {
      id: '3',
      title: 'Fermeture exceptionnelle',
      content: 'Le zoo sera exceptionnellement fermé le 25 janvier pour travaux de maintenance. Nous vous remercions de votre compréhension.',
      type: 'fermeture',
      status: 'published',
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      createdAt: '2024-01-05',
      author: 'Service technique',
      important: true
    },
    {
      id: '4',
      title: 'Nouveaux tarifs à partir du 1er mars',
      content: 'Chers visiteurs, veuillez noter que nos tarifs seront ajustés à partir du 1er mars 2024. Les nouveaux prix seront communiqués prochainement.',
      type: 'tarif',
      status: 'draft',
      startDate: '2024-03-01',
      endDate: null,
      createdAt: '2024-01-03',
      author: 'Comptabilité',
      important: false
    },
    {
      id: '5',
      title: 'Spectacle des oiseaux rares',
      content: 'Ne manquez pas notre nouveau spectacle d\'oiseaux rares tous les weekends à 11h00 et 15h00. Réservation recommandée.',
      type: 'nouveauté',
      status: 'published',
      startDate: '2024-01-20',
      endDate: null,
      createdAt: '2024-01-12',
      author: 'Animation',
      important: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [filterType, setFilterType] = useState<AnnouncementType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<AnnouncementStatus | 'all'>('all');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'nouveauté' as AnnouncementType,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    important: false
  });

  const typeOptions = [
    { value: 'nouveauté', label: 'Nouveauté', icon: '🆕', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
    { value: 'communiqué', label: 'Communiqué', icon: '📢', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' },
    { value: 'horaire', label: 'Horaire', icon: '⏰', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    { value: 'animal', label: 'Nouvel animal', icon: '🐾', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' },
    { value: 'tarif', label: 'Tarif', icon: '💰', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
    { value: 'fermeture', label: 'Fermeture', icon: '🚧', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
    { value: 'autre', label: 'Autre', icon: '📝', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300' }
  ];

  const getTypeConfig = (type: AnnouncementType) => {
    return typeOptions.find(option => option.value === type) || typeOptions[6];
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'nouveauté',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      important: false
    });
    setEditingAnnouncement(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAnnouncement) {
      // Modification
      setAnnouncements(announcements.map(ann => 
        ann.id === editingAnnouncement.id 
          ? {
              ...ann,
              ...formData,
              endDate: formData.endDate || null
            }
          : ann
      ));
    } else {
      // Nouvelle annonce
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        status: 'published',
        createdAt: new Date().toISOString().split('T')[0],
        author: 'Administrateur',
        endDate: formData.endDate || null
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    
    resetForm();
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type,
      startDate: announcement.startDate,
      endDate: announcement.endDate || '',
      important: announcement.important
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id 
        ? { ...ann, status: ann.status === 'published' ? 'draft' : 'published' }
        : ann
    ));
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const typeMatch = filterType === 'all' || ann.type === filterType;
    const statusMatch = filterStatus === 'all' || ann.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const publishedCount = announcements.filter(ann => ann.status === 'published').length;
  const draftCount = announcements.filter(ann => ann.status === 'draft').length;
  const importantCount = announcements.filter(ann => ann.important).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Annonces</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Communiquez les nouveautés et informations importantes du zoo</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="text-lg" />
          <span>Nouvelle annonce</span>
        </motion.button>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Annonces publiées</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{publishedCount}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiEye className="text-2xl text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Brouillons</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{draftCount}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <FiEyeOff className="text-2xl text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Annonces importantes</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{importantCount}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <FiBell className="text-2xl text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Formulaire */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            {editingAnnouncement ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre de l'annonce *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ex: Nouvel horaire d'ouverture"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contenu de l'annonce *
              </label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="Décrivez les détails de l'annonce..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type d'annonce *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as AnnouncementType })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date de début *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date de fin (optionnel)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <input
                  type="checkbox"
                  id="important"
                  checked={formData.important}
                  onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="important" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Marquer comme important
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                {editingAnnouncement ? 'Modifier' : 'Publier'} l'annonce
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtrer par type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as AnnouncementType | 'all')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Tous les types</option>
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtrer par statut
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as AnnouncementStatus | 'all')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des annonces */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => {
            const typeConfig = getTypeConfig(announcement.type);
            return (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 border rounded-lg transition-all ${
                  announcement.important
                    ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 text-xs rounded-full ${typeConfig.color}`}>
                        {typeConfig.icon} {typeConfig.label}
                      </span>
                      {announcement.important && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 rounded-full flex items-center">
                          <FiBell className="mr-1" /> Important
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        announcement.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                      }`}>
                        {announcement.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {announcement.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {announcement.content}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        Début: {new Date(announcement.startDate).toLocaleDateString('fr-FR')}
                      </div>
                      {announcement.endDate && (
                        <div className="flex items-center">
                          <FiClock className="mr-1" />
                          Fin: {new Date(announcement.endDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                      <div>
                        Par: {announcement.author}
                      </div>
                      <div>
                        Créé le: {new Date(announcement.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleStatus(announcement.id)}
                      className={`p-2 rounded-lg ${
                        announcement.status === 'published'
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400'
                          : 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
                      }`}
                      title={announcement.status === 'published' ? 'Mettre en brouillon' : 'Publier'}
                    >
                      {announcement.status === 'published' ? <FiEyeOff /> : <FiEye />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(announcement)}
                      className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg"
                      title="Modifier"
                    >
                      <FiEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(announcement.id)}
                      className="p-2 bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 rounded-lg"
                      title="Supprimer"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <FiBell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Aucune annonce trouvée
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {filterType !== 'all' || filterStatus !== 'all' 
                  ? 'Aucune annonce ne correspond aux filtres sélectionnés.'
                  : 'Commencez par créer votre première annonce.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}