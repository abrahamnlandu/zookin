'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCalendar, FiBook, FiDollarSign, FiUsers, FiBell, FiMic, FiSettings, FiTrendingUp, FiArrowUp, FiArrowDown, FiEye, FiUser, FiVideo, FiMap, FiHeart, FiShield } from 'react-icons/fi';
import StatCard from '@/components/Dashboard/StatCard';

export default function DashboardPage() {
  // Données pour les graphiques
  const attendanceData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Visiteurs mensuels',
        data: [5200, 6800, 7200, 8500, 9200, 11500],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const financeData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus',
        data: [12500, 15800, 14200, 16800, 19200, 21500],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Dépenses',
        data: [9800, 11200, 10500, 12400, 13800, 15200],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const animalGrowthData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Nouveaux animaux',
        data: [3, 5, 2, 8, 6, 4],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const animalCategoriesData = {
    labels: ['Mammifères', 'Oiseaux', 'Reptiles', 'Amphibiens', 'Poissons'],
    datasets: [
      {
        data: [45, 25, 15, 8, 7],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Données pour les sections de résumé
  const recentEvents = [
    { id: 1, title: 'Nourissage des lions', date: 'Aujourd\'hui, 14h00', location: 'Enclos des félins', participants: 85 },
    { id: 2, title: 'Spectacle d\'oiseaux', date: 'Demain, 11h00', location: 'Volière principale', participants: 120 },
    { id: 3, title: 'Visite guidée nocturne', date: 'Samedi, 19h00', location: 'Départ entrée principale', participants: 40 },
  ];

  const recentAnimals = [
    { id: 1, name: 'Kivu - Girafe mâle', species: 'Giraffa camelopardalis', arrivalDate: '15 juin 2023', health: 'Excellent', enclosure: 'Savane' },
    { id: 2, name: 'Zola - Chimpanzé femelle', species: 'Pan troglodytes', arrivalDate: '10 juin 2023', health: 'Bon', enclosure: 'Forêt tropicale' },
    { id: 3, name: 'Mosi - Python royal', species: 'Python regius', arrivalDate: '5 juin 2023', health: 'Très bon', enclosure: 'Reptilarium' },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'Nouvel espace inauguré', content: 'Le nouvel habitat des éléphants est maintenant ouvert au public.', date: '15 juin 2023', author: 'Dr. Mukendi' },
    { id: 2, title: 'Maintenance prévue', content: 'La volière sera fermée pour maintenance du 25 au 27 juin.', date: '10 juin 2023', author: 'Service technique' },
    { id: 3, title: 'Nouveaux horaires d\'été', content: 'À partir du 1er juillet, le zoo ouvrira jusqu\'à 19h00.', date: '5 juin 2023', author: 'Direction' },
  ];

  const staffActivities = [
    { id: 1, name: 'Jean Kabasele', activity: 'Examen vétérinaire', time: 'Il y a 2h', avatar: 'JK', department: 'Vétérinaire' },
    { id: 2, name: 'Marie Lutete', activity: 'Nettoyage enclos', time: 'Il y a 3h', avatar: 'ML', department: 'Entretien' },
    { id: 3, name: 'Paul Mbayo', activity: 'Nourissage reptiles', time: 'Il y a 4h', avatar: 'PM', department: 'Soigneur' },
    { id: 4, name: 'Sarah Ngoie', activity: 'Accueil visiteurs', time: 'Il y a 5h', avatar: 'SN', department: 'Accueil' },
  ];

  const financialSummary = {
    income: 21500,
    expenses: 15200,
    balance: 6300,
    growth: 12.5,
  };

  return (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard 
          title="Visiteurs ce mois" 
          value="11,500" 
          change="+15% ce mois" 
          icon={<FiUsers className="text-green-600 dark:text-green-400" />} 
          color="green" 
        />
        <StatCard 
          title="Animaux total" 
          value="287" 
          change="4 nouveaux" 
          icon={<FiHeart className="text-blue-600 dark:text-blue-400" />} 
          color="blue" 
        />
        <StatCard 
          title="Revenus mensuels" 
          value="$21,500" 
          change="+12.5% ce mois" 
          icon={<FiDollarSign className="text-purple-600 dark:text-purple-400" />} 
          color="purple" 
        />
        <StatCard 
          title="Espaces ouverts" 
          value="24" 
          change="2 en maintenance" 
          icon={<FiMap className="text-orange-600 dark:text-orange-400" />} 
          color="orange" 
        />
      </motion.div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Fréquentation des visiteurs</h2>
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <FiTrendingUp className="mr-1" />
              <span>+15% ce mois</span>
            </div>
          </div>
          <div className="h-80">
            <Line 
              data={attendanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Finances du zoo</h2>
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <FiTrendingUp className="mr-1" />
              <span>+{financialSummary.growth}% ce mois</span>
            </div>
          </div>
          <div className="h-80">
            <Bar 
              data={financeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Résumé des événements et animaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Événements à venir</h2>
            <Link href="/admin/dashboard/events">
              <span className="text-sm text-green-600 dark:text-green-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <motion.div 
                key={event.id}
                whileHover={{ y: -2 }}
                className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg mr-4">
                  <FiCalendar className="text-green-600 dark:text-green-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.date} • {event.location}</p>
                  <div className="mt-2 flex items-center">
                    <FiUser className="text-gray-400 mr-1 text-sm" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Capacité: {event.participants} personnes</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Nouveaux animaux</h2>
            <Link href="/admin/dashboard/animals">
              <span className="text-sm text-green-600 dark:text-green-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentAnimals.map((animal) => (
              <motion.div 
                key={animal.id}
                whileHover={{ y: -2 }}
                className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mr-4">
                  <FiHeart className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{animal.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{animal.species}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Arrivé le {animal.arrivalDate}</span>
                    <div className="flex items-center">
                      <FiShield className="text-gray-400 mr-1 text-sm" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{animal.health}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Résumé des annonces et activités du personnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Annonces récentes</h2>
            <Link href="/admin/dashboard/announcements">
              <span className="text-sm text-green-600 dark:text-green-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <motion.div 
                key={announcement.id}
                whileHover={{ y: -2 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{announcement.content}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Par {announcement.author}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Activités du personnel</h2>
            <Link href="/admin/dashboard/staff">
              <span className="text-sm text-green-600 dark:text-green-400 hover:underline">Voir tous</span>
            </Link>
          </div>
          <div className="space-y-4">
            {staffActivities.map((staff) => (
              <motion.div 
                key={staff.id}
                whileHover={{ y: -2 }}
                className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-all duration-200"
              >
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-medium mr-3">
                  {staff.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{staff.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{staff.activity}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">{staff.time}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {staff.department}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Graphiques supplémentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold mb-6">Nouveaux animaux</h2>
          <div className="h-64">
            <Line 
              data={animalGrowthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold mb-6">Répartition des animaux</h2>
          <div className="h-64">
            <Doughnut 
              data={animalCategoriesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}