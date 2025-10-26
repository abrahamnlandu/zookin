'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPrinter, FiDownload, FiEye, FiDollarSign, FiUsers, FiCalendar, FiFilter, FiSearch } from 'react-icons/fi';

// Types
type CategoryType = 'National' | 'Expatrié' | 'Diplomatique' | 'Scientifique';
type TicketType = 'Adulte' | 'Enfant' | 'Étudiant' | 'Groupe';
type StatusType = 'confirmed' | 'pending';

interface Reservation {
  id: number;
  visitorName: string;
  category: CategoryType;
  ticketType: TicketType;
  quantity: number;
  totalAmount: number;
  reservationDate: string;
  visitDate: string;
  status: StatusType;
  reference: string;
}

export default function TicketsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Données des réservations
  const reservations: Reservation[] = [
    {
      id: 1,
      visitorName: 'Jean Kamba',
      category: 'National',
      ticketType: 'Adulte',
      quantity: 2,
      totalAmount: 10000,
      reservationDate: '2024-01-15',
      visitDate: '2024-01-20',
      status: 'confirmed',
      reference: 'ZK-001'
    },
    {
      id: 2,
      visitorName: 'Sarah Johnson',
      category: 'Expatrié',
      ticketType: 'Adulte',
      quantity: 1,
      totalAmount: 15000,
      reservationDate: '2024-01-15',
      visitDate: '2024-01-20',
      status: 'confirmed',
      reference: 'ZK-002'
    },
    {
      id: 3,
      visitorName: 'Ambassade de France',
      category: 'Diplomatique',
      ticketType: 'Groupe',
      quantity: 5,
      totalAmount: 0,
      reservationDate: '2024-01-15',
      visitDate: '2024-01-21',
      status: 'confirmed',
      reference: 'ZK-003'
    },
    {
      id: 4,
      visitorName: 'Université de Kinshasa',
      category: 'Scientifique',
      ticketType: 'Étudiant',
      quantity: 15,
      totalAmount: 75000,
      reservationDate: '2024-01-14',
      visitDate: '2024-01-22',
      status: 'confirmed',
      reference: 'ZK-004'
    },
    {
      id: 5,
      visitorName: 'Paul Mbayo',
      category: 'National',
      ticketType: 'Enfant',
      quantity: 3,
      totalAmount: 7500,
      reservationDate: '2024-01-15',
      visitDate: '2024-01-20',
      status: 'pending',
      reference: 'ZK-005'
    }
  ];

  // Tarifs par catégorie
  const pricing = {
    'National': {
      'Adulte': 5000,
      'Enfant': 2500,
      'Étudiant': 3000,
      'Groupe': 4000
    },
    'Expatrié': {
      'Adulte': 15000,
      'Enfant': 8000,
      'Étudiant': 10000,
      'Groupe': 12000
    },
    'Diplomatique': {
      'Adulte': 0,
      'Enfant': 0,
      'Étudiant': 0,
      'Groupe': 0
    },
    'Scientifique': {
      'Adulte': 5000,
      'Enfant': 2500,
      'Étudiant': 3000,
      'Groupe': 4000
    }
  };

  // Calcul des statistiques
  const calculateStats = () => {
    const filteredReservations = reservations.filter(reservation => 
      (selectedCategory === 'all' || reservation.category === selectedCategory) &&
      reservation.reservationDate === selectedDate
    );

    const totalVisitors = filteredReservations.reduce((sum, res) => sum + res.quantity, 0);
    const totalRevenue = filteredReservations.reduce((sum, res) => sum + res.totalAmount, 0);
    
    const categories: Record<CategoryType, number> = {
      'National': 0,
      'Expatrié': 0,
      'Diplomatique': 0,
      'Scientifique': 0
    };

    filteredReservations.forEach(res => {
      categories[res.category] += res.quantity;
    });

    return { totalVisitors, totalRevenue, categories };
  };

  const { totalVisitors, totalRevenue, categories } = calculateStats();

  const categoriesOptions = [
    { value: 'all', label: 'Toutes catégories' },
    { value: 'National', label: 'Nationaux' },
    { value: 'Expatrié', label: 'Expatriés' },
    { value: 'Diplomatique', label: 'Corps diplomatique' },
    { value: 'Scientifique', label: 'Corps scientifique' }
  ];

  const handlePrintList = () => {
    const printContent = `
      <html>
        <head>
          <title>Liste des Visiteurs - Zoo Kinshasa</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1a5632; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #1a5632; color: white; }
            .header { text-align: center; margin-bottom: 20px; }
            .date { color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Zoo de Kinshasa</h1>
            <h2>Liste des Visiteurs Réservés</h2>
            <p class="date">Date: ${new Date(selectedDate).toLocaleDateString('fr-FR')}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Nom du visiteur</th>
                <th>Catégorie</th>
                <th>Type de ticket</th>
                <th>Quantité</th>
                <th>Montant</th>
                <th>Date de visite</th>
              </tr>
            </thead>
            <tbody>
              ${reservations
                .filter(res => res.reservationDate === selectedDate)
                .map(res => `
                  <tr>
                    <td>${res.reference}</td>
                    <td>${res.visitorName}</td>
                    <td>${res.category}</td>
                    <td>${res.ticketType}</td>
                    <td>${res.quantity}</td>
                    <td>${res.totalAmount.toLocaleString()} CDF</td>
                    <td>${new Date(res.visitDate).toLocaleDateString('fr-FR')}</td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Veuillez autoriser les fenêtres pop-up pour imprimer la liste.');
    }
  };

  const handlePrintReport = () => {
    const printContent = `
      <html>
        <head>
          <title>Rapport Journalier - Zoo Kinshasa</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { color: #1a5632; }
            .header { text-align: center; margin-bottom: 30px; }
            .stats { margin: 20px 0; }
            .stat-item { margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #1a5632; color: white; }
            .total { font-weight: bold; background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Zoo de Kinshasa</h1>
            <h2>Rapport Journalier des Tickets</h2>
            <p>Date: ${new Date(selectedDate).toLocaleDateString('fr-FR')}</p>
          </div>
          
          <div class="stats">
            <h3>Résumé de la journée</h3>
            <div class="stat-item">Total visiteurs: ${totalVisitors}</div>
            <div class="stat-item">Recettes totales: ${totalRevenue.toLocaleString()} CDF</div>
          </div>

          <h3>Répartition par catégorie</h3>
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Nombre de visiteurs</th>
                <th>Pourcentage</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(categories).map(([category, count]) => `
                <tr>
                  <td>${category}</td>
                  <td>${count}</td>
                  <td>${totalVisitors > 0 ? ((count / totalVisitors) * 100).toFixed(1) : 0}%</td>
                </tr>
              `).join('')}
              <tr class="total">
                <td>TOTAL</td>
                <td>${totalVisitors}</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>

          <h3>Détail des réservations</h3>
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Visiteur</th>
                <th>Catégorie</th>
                <th>Type</th>
                <th>Quantité</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              ${reservations
                .filter(res => res.reservationDate === selectedDate)
                .map(res => `
                  <tr>
                    <td>${res.reference}</td>
                    <td>${res.visitorName}</td>
                    <td>${res.category}</td>
                    <td>${res.ticketType}</td>
                    <td>${res.quantity}</td>
                    <td>${res.totalAmount.toLocaleString()} CDF</td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Veuillez autoriser les fenêtres pop-up pour générer le rapport.');
    }
  };

  const filteredReservations = reservations.filter(reservation => 
    reservation.reservationDate === selectedDate &&
    (selectedCategory === 'all' || reservation.category === selectedCategory) &&
    (searchQuery === '' || 
      reservation.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.reference.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Tickets</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez les réservations et générez les rapports</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrintList}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPrinter className="text-lg" />
            <span>Imprimer liste</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrintReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiDownload className="text-lg" />
            <span>Rapport journalier</span>
          </motion.button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total visiteurs aujourd'hui</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalVisitors}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiUsers className="text-2xl text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Recettes du jour</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalRevenue.toLocaleString()} CDF</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiDollarSign className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Réservations confirmées</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredReservations.filter(r => r.status === 'confirmed').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <FiCalendar className="text-2xl text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {categoriesOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recherche
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Nom ou référence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des réservations */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Visiteur
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type de ticket
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date visite
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReservations.map((reservation) => (
                <motion.tr 
                  key={reservation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {reservation.reference}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {reservation.visitorName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {reservation.category}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {reservation.ticketType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {reservation.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {reservation.totalAmount.toLocaleString()} CDF
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(reservation.visitDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reservation.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
                    }`}>
                      {reservation.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <FiEye className="text-lg" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReservations.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Aucune réservation trouvée pour les critères sélectionnés
          </div>
        )}
      </div>
    </motion.div>
  );
}