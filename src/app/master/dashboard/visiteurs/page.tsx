'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPrinter, FiUsers, FiCalendar, FiDollarSign, FiSearch, FiFilter, FiFileText } from 'react-icons/fi';

// Types
type VisitorCategory = 'National' | 'Expatrié' | 'Diplomatique' | 'Scientifique';
type PeriodType = 'day' | 'week' | 'month' | 'year';

interface Sale {
  id: string;
  date: string;
  clientName: string;
  items: {
    category: VisitorCategory;
    type: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  totalAmount: number;
  totalVisitors: number;
  discount: number;
  finalAmount: number;
}

interface VisitorStats {
  totalVisitors: number;
  totalSales: number;
  totalRevenue: number;
  averagePerSale: number;
  categoryBreakdown: Record<VisitorCategory, number>;
}

export default function VisitorsPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Charger les données depuis le localStorage au chargement
  useEffect(() => {
    const savedSales = localStorage.getItem('zoo-sales');
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    }
  }, []);

  // Filtrer les données en fonction de la période et de la recherche
  useEffect(() => {
    let filtered = [...sales];

    // Filtrer par période
    const currentDate = new Date(selectedDate);
    switch (selectedPeriod) {
      case 'day':
        filtered = filtered.filter(sale => 
          new Date(sale.date).toDateString() === currentDate.toDateString()
        );
        break;
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        filtered = filtered.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate >= startOfWeek && saleDate <= endOfWeek;
        });
        break;
      case 'month':
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        filtered = filtered.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate >= startOfMonth && saleDate <= endOfMonth;
        });
        break;
      case 'year':
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
        
        filtered = filtered.filter(sale => {
          const saleDate = new Date(sale.date);
          return saleDate >= startOfYear && saleDate <= endOfYear;
        });
        break;
    }

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(sale =>
        sale.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSales(filtered);
  }, [sales, selectedPeriod, selectedDate, searchQuery]);

  // Calculer les statistiques
  const stats: VisitorStats = {
    totalVisitors: filteredSales.reduce((sum, sale) => sum + sale.totalVisitors, 0),
    totalSales: filteredSales.length,
    totalRevenue: filteredSales.reduce((sum, sale) => sum + sale.finalAmount, 0),
    averagePerSale: filteredSales.length > 0 
      ? filteredSales.reduce((sum, sale) => sum + sale.finalAmount, 0) / filteredSales.length 
      : 0,
    categoryBreakdown: {
      'National': filteredSales.flatMap(sale => 
        sale.items.filter(item => item.category === 'National')
      ).reduce((sum, item) => sum + item.quantity, 0),
      'Expatrié': filteredSales.flatMap(sale => 
        sale.items.filter(item => item.category === 'Expatrié')
      ).reduce((sum, item) => sum + item.quantity, 0),
      'Diplomatique': filteredSales.flatMap(sale => 
        sale.items.filter(item => item.category === 'Diplomatique')
      ).reduce((sum, item) => sum + item.quantity, 0),
      'Scientifique': filteredSales.flatMap(sale => 
        sale.items.filter(item => item.category === 'Scientifique')
      ).reduce((sum, item) => sum + item.quantity, 0),
    }
  };

  const periodOptions = [
    { value: 'day', label: 'Aujourd\'hui' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' },
  ];

  const getPeriodLabel = () => {
    const currentDate = new Date(selectedDate);
    switch (selectedPeriod) {
      case 'day':
        return currentDate.toLocaleDateString('fr-FR');
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `Semaine du ${startOfWeek.toLocaleDateString('fr-FR')} au ${endOfWeek.toLocaleDateString('fr-FR')}`;
      case 'month':
        return currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      case 'year':
        return currentDate.getFullYear().toString();
      default:
        return '';
    }
  };

  const printVisitorList = () => {
    if (filteredSales.length === 0) {
      alert('Aucune donnée à imprimer pour la période sélectionnée');
      return;
    }

    const printContent = `
      <html>
        <head>
          <title>Liste des Visiteurs - Zoo Kinshasa</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1a5632; padding-bottom: 15px; }
            h1 { color: #1a5632; margin: 0; }
            h2 { color: #333; margin: 10px 0; }
            .period { color: #666; font-size: 16px; }
            .summary { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #1a5632; color: white; }
            .total-row { font-weight: bold; background-color: #e8f5e8; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Zoo de Kinshasa</h1>
            <h2>LISTE DES VISITEURS</h2>
            <div class="period">Période: ${getPeriodLabel()}</div>
          </div>

          <div class="summary">
            <h3>Résumé</h3>
            <div>Total des clients: ${filteredSales.length}</div>
            <div>Total des visiteurs: ${stats.totalVisitors}</div>
            <div>Recettes totales: ${stats.totalRevenue.toLocaleString()} FC</div>
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
              ${Object.entries(stats.categoryBreakdown).map(([category, count]) => `
                <tr>
                  <td>${category}</td>
                  <td>${count}</td>
                  <td>${stats.totalVisitors > 0 ? ((count / stats.totalVisitors) * 100).toFixed(1) : 0}%</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td>TOTAL</td>
                <td>${stats.totalVisitors}</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>

          <h3>Détail des clients</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Nombre de billets</th>
                <th>Montant payé</th>
                <th>Catégories</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSales.map(sale => `
                <tr>
                  <td>${new Date(sale.date).toLocaleDateString('fr-FR')}</td>
                  <td>${sale.clientName}</td>
                  <td>${sale.totalVisitors}</td>
                  <td>${sale.finalAmount.toLocaleString()} FC</td>
                  <td>${[...new Set(sale.items.filter(item => item.quantity > 0).map(item => item.category))].join(', ')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>Rapport généré le ${new Date().toLocaleString('fr-FR')}</p>
            <p>Zoo de Kinshasa - Service des Visiteurs</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Veuillez autoriser les fenêtres pop-up pour imprimer le rapport.');
    }
  };

  const printDetailedReport = () => {
    if (filteredSales.length === 0) {
      alert('Aucune donnée à imprimer pour la période sélectionnée');
      return;
    }

    const printContent = `
      <html>
        <head>
          <title>Rapport Détaillé des Visiteurs - Zoo Kinshasa</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1a5632; padding-bottom: 15px; }
            h1 { color: #1a5632; margin: 0; }
            h2 { color: #333; margin: 10px 0; }
            .period { color: #666; font-size: 16px; }
            .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
            .stat-card { background: #f8f9fa; padding: 15px; border-radius: 5px; text-align: center; border-left: 4px solid #1a5632; }
            .stat-number { font-size: 24px; font-weight: bold; color: #1a5632; }
            .stat-label { font-size: 14px; color: #666; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #1a5632; color: white; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Zoo de Kinshasa</h1>
            <h2>RAPPORT DÉTAILLÉ DES VISITEURS</h2>
            <div class="period">Période: ${getPeriodLabel()}</div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${stats.totalVisitors}</div>
              <div class="stat-label">Total Visiteurs</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${stats.totalSales}</div>
              <div class="stat-label">Total Ventes</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${stats.totalRevenue.toLocaleString()} FC</div>
              <div class="stat-label">Recettes Totales</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${Math.round(stats.averagePerSale).toLocaleString()} FC</div>
              <div class="stat-label">Moyenne par vente</div>
            </div>
          </div>

          <h3>Répartition par catégorie de visiteur</h3>
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Nombre</th>
                <th>Pourcentage</th>
                <th>Recettes</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(stats.categoryBreakdown).map(([category, count]) => {
                const categoryRevenue = filteredSales.flatMap(sale => 
                  sale.items.filter(item => item.category === category)
                ).reduce((sum, item) => sum + item.total, 0);
                
                return `
                  <tr>
                    <td>${category}</td>
                    <td>${count}</td>
                    <td>${stats.totalVisitors > 0 ? ((count / stats.totalVisitors) * 100).toFixed(1) : 0}%</td>
                    <td>${categoryRevenue.toLocaleString()} FC</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <h3>Détail complet des ventes</h3>
          <table>
            <thead>
              <tr>
                <th>Date/Heure</th>
                <th>Référence</th>
                <th>Client</th>
                <th>Billets</th>
                <th>Détail des catégories</th>
                <th>Montant</th>
                <th>Réduction</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSales.map(sale => `
                <tr>
                  <td>${new Date(sale.date).toLocaleString('fr-FR')}</td>
                  <td>${sale.id}</td>
                  <td>${sale.clientName}</td>
                  <td>${sale.totalVisitors}</td>
                  <td>${sale.items.filter(item => item.quantity > 0).map(item => 
                    `${item.quantity} ${item.category}-${item.type}`
                  ).join(', ')}</td>
                  <td>${sale.totalAmount.toLocaleString()} FC</td>
                  <td>${sale.discount.toLocaleString()} FC</td>
                  <td>${sale.finalAmount.toLocaleString()} FC</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>Rapport généré le ${new Date().toLocaleString('fr-FR')}</p>
            <p>Zoo de Kinshasa - Direction Générale</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Veuillez autoriser les fenêtres pop-up pour imprimer le rapport.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Visiteurs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Suivi des clients et statistiques de fréquentation - {getPeriodLabel()}
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={printVisitorList}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPrinter className="text-lg" />
            <span>Liste visiteurs</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={printDetailedReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiFileText className="text-lg" />
            <span>Rapport détaillé</span>
          </motion.button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total visiteurs</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVisitors}</p>
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
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre de ventes</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSales}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiCalendar className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Recettes totales</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRevenue.toLocaleString()} FC</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <FiDollarSign className="text-2xl text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Moyenne/vente</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(stats.averagePerSale).toLocaleString()} FC</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <FiUsers className="text-2xl text-purple-600 dark:text-purple-400" />
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
                Période
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as PeriodType)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {periodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date de référence
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
                Recherche client
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Nom du client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par catégorie */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Répartition par catégorie de visiteur</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
              <div key={category} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{category}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{count}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stats.totalVisitors > 0 ? ((count / stats.totalVisitors) * 100).toFixed(1) : 0}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tableau des visiteurs */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Billets achetés
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégories
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant payé
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSales.map((sale) => (
                <motion.tr 
                  key={sale.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(sale.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {sale.clientName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sale.totalVisitors} billet(s)
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {[...new Set(sale.items.filter(item => item.quantity > 0).map(item => item.category))].join(', ')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {sale.finalAmount.toLocaleString()} FC
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Aucune vente trouvée pour les critères sélectionnés
          </div>
        )}
      </div>
    </motion.div>
  );
}