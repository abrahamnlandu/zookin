'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiFilter, FiUsers, FiUserPlus, FiUserCheck, FiUserX, FiMail, FiEdit, FiTrash2, FiUser } from 'react-icons/fi';

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddStaff, setShowAddStaff] = useState(false);

  const staffMembers = [
    { 
      id: 1, 
      name: 'Jean Kabasele', 
      email: 'jean.kabasele@zookinshasa.cd', 
      phone: '+243 81 123 4567', 
      joinDate: '15 Jan 2022', 
      status: 'active', 
      role: 'Vétérinaire', 
      department: 'Soins animaux' 
    },
    { 
      id: 2, 
      name: 'Marie Lutete', 
      email: 'marie.lutete@zookinshasa.cd', 
      phone: '+243 82 234 5678', 
      joinDate: '20 Fév 2022', 
      status: 'active', 
      role: 'Responsable soigneurs', 
      department: 'Soins animaux' 
    },
    { 
      id: 3, 
      name: 'Paul Mbayo', 
      email: 'paul.mbayo@zookinshasa.cd', 
      phone: '+243 83 345 6789', 
      joinDate: '5 Mar 2022', 
      status: 'active', 
      role: 'Soigneur', 
      department: 'Soins animaux' 
    },
    { 
      id: 4, 
      name: 'Sarah Ngoie', 
      email: 'sarah.ngoie@zookinshasa.cd', 
      phone: '+243 84 456 7890', 
      joinDate: '12 Avr 2022', 
      status: 'active', 
      role: 'Responsable accueil', 
      department: 'Accueil' 
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      email: 'michael.brown@zookinshasa.cd', 
      phone: '+243 85 567 8901', 
      joinDate: '18 Mai 2022', 
      status: 'inactive', 
      role: 'Guide touristique', 
      department: 'Visites guidées' 
    },
    { 
      id: 6, 
      name: 'David Tshibangu', 
      email: 'david.tshibangu@zookinshasa.cd', 
      phone: '+243 86 678 9012', 
      joinDate: '10 Juin 2022', 
      status: 'active', 
      role: 'Technicien maintenance', 
      department: 'Maintenance' 
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'vacation', label: 'En congé' },
  ];

  const roleOptions = [
    { value: 'veterinarian', label: 'Vétérinaire' },
    { value: 'keeper', label: 'Soigneur' },
    { value: 'manager', label: 'Responsable' },
    { value: 'guide', label: 'Guide' },
    { value: 'reception', label: 'Accueil' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'admin', label: 'Administratif' },
  ];

  const departmentOptions = [
    { value: 'animal-care', label: 'Soins animaux' },
    { value: 'reception', label: 'Accueil' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'guided-tours', label: 'Visites guidées' },
    { value: 'administration', label: 'Administration' },
    { value: 'security', label: 'Sécurité' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personnel du Zoo</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez le personnel du Jardin Zoologique de Kinshasa</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddStaff(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="text-lg" />
          <span>Nouveau membre</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiUsers className="text-2xl text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total du personnel</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">68</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiUserCheck className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Personnel actif</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">62</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <FiUserPlus className="text-2xl text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nouveaux ce mois</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <FiUserX className="text-2xl text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">En congé</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un membre du personnel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:text-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <FiFilter className="text-lg" />
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Personnel</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date d'embauche</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rôle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Département</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {staffMembers.map((staff) => (
                <motion.tr 
                  key={staff.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <FiUser className="text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{staff.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{staff.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{staff.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{staff.joinDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{staff.role}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{staff.department}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      staff.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' 
                        : staff.status === 'vacation'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                    }`}>
                      {staff.status === 'active' ? 'Actif' : staff.status === 'vacation' ? 'En congé' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <FiMail className="text-lg" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                      >
                        <FiEdit className="text-lg" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <FiTrash2 className="text-lg" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">6</span> sur <span className="font-medium">68</span> membres du personnel
          </p>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300"
            >
              Précédent
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-green-600 border border-transparent rounded-md text-sm text-white"
            >
              1
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300"
            >
              2
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300"
            >
              Suivant
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}