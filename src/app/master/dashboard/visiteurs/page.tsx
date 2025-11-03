'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPrinter, FiUsers, FiCalendar, FiDollarSign, FiSearch, FiFilter, FiFileText } from 'react-icons/fi';

// Types
type VisitorCategory = 'National' | 'Expatrié' | 'Diplomatique' | 'Scientifique' | 'Tout';
type PeriodType = 'day' | 'week' | 'month' | 'year' | 'all';

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
  const [selectedCategory, setSelectedCategory] = useState<VisitorCategory>('Tout');

  // Générer 30 visiteurs pour 2025
  const generate2025Visitors = (): Sale[] => {
    const categories: VisitorCategory[] = ['National', 'Expatrié', 'Diplomatique', 'Scientifique'];
    const firstNames = ['Jean', 'Marie', 'Paul', 'Julie', 'David', 'Sarah', 'Marc', 'Anna', 'Pierre', 'Claire', 'Luc', 'Sophie', 'Jacques', 'Isabelle', 'Michel', 'Nathalie'];
    const lastNames = ['Kabasele', 'Lutete', 'Mbayo', 'Ngoie', 'Mukendi', 'Tshibanda', 'Kalala', 'Mbuyi', 'Kanku', 'Mpiana', 'Nzuzi', 'Mvita', 'Bakajika', 'Mpoyo', 'Kazadi', 'Mwilambwe'];
    
    const visitors: Sale[] = [];
    
    for (let i = 1; i <= 30; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const clientName = `${firstName} ${lastName}`;
      
      // Générer une date aléatoire en 2025
      const startDate = new Date('2025-01-01');
      const endDate = new Date('2025-12-31');
      const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      
      // Prix basés sur la catégorie (Diplomatique et Scientifique = gratuit)
      let unitPrice = 0;
      let quantity = Math.floor(Math.random() * 5) + 1; // 1-5 billets
      
      switch (category) {
        case 'National':
          unitPrice = 5000; // 5000 FC
          break;
        case 'Expatrié':
          unitPrice = 10000; // 10000 FC
          break;
        case 'Diplomatique':
        case 'Scientifique':
          unitPrice = 0; // Gratuit
          break;
      }
      
      const totalAmount = unitPrice * quantity;
      const discount = 0;
      const finalAmount = category === 'Diplomatique' || category === 'Scientifique' ? 0 : totalAmount - discount;
      
      visitors.push({
        id: `V2025-${i.toString().padStart(3, '0')}`,
        date: randomDate.toISOString(),
        clientName,
        items: [{
          category,
          type: 'Standard',
          quantity,
          unitPrice,
          total: finalAmount
        }],
        totalAmount,
        totalVisitors: quantity,
        discount,
        finalAmount
      });
    }
    
    // Trier par date (du plus récent au plus ancien)
    return visitors.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Charger les données au chargement
  useEffect(() => {
    const savedSales = localStorage.getItem('zoo-sales');
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    } else {
      // Générer des données de démonstration pour 2025
      const demoData = generate2025Visitors();
      setSales(demoData);
      localStorage.setItem('zoo-sales', JSON.stringify(demoData));
    }
  }, []);

  // Filtrer les données en fonction de la période, catégorie et recherche
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
      case 'all':
        // Pas de filtre de période
        break;
    }

    // Filtrer par catégorie
    if (selectedCategory !== 'Tout') {
      filtered = filtered.filter(sale =>
        sale.items.some(item => item.category === selectedCategory)
      );
    }

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(sale =>
        sale.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSales(filtered);
  }, [sales, selectedPeriod, selectedDate, searchQuery, selectedCategory]);

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
      'Tout': filteredSales.reduce((sum, sale) => sum + sale.totalVisitors, 0)
    }
  };

  const periodOptions = [
    { value: 'day', label: 'Aujourd\'hui' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' },
    { value: 'all', label: 'Toutes périodes' },
  ];

  const categoryOptions = [
    { value: 'Tout', label: 'Toutes catégories' },
    { value: 'National', label: 'National' },
    { value: 'Expatrié', label: 'Expatrié' },
    { value: 'Diplomatique', label: 'Diplomatique' },
    { value: 'Scientifique', label: 'Scientifique' },
  ];

  const getPeriodLabel = () => {
    if (selectedPeriod === 'all') {
      return 'Toutes périodes';
    }
    
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
      alert('Aucune donnée à imprimer pour les critères sélectionnés');
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
            .free-category { background-color: #fff3cd; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Zoo de Kinshasa</h1>
            <h2>LISTE DES VISITEURS</h2>
            <div class="period">Période: ${getPeriodLabel()}</div>
            <div class="period">Catégorie: ${selectedCategory}</div>
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
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(stats.categoryBreakdown)
                .filter(([category]) => category !== 'Tout')
                .map(([category, count]) => `
                <tr class="${category === 'Diplomatique' || category === 'Scientifique' ? 'free-category' : ''}">
                  <td>${category}</td>
                  <td>${count}</td>
                  <td>${stats.totalVisitors > 0 ? ((count / stats.totalVisitors) * 100).toFixed(1) : 0}%</td>
                  <td>${category === 'Diplomatique' || category === 'Scientifique' ? 'GRATUIT' : 'PAYANT'}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td>TOTAL</td>
                <td>${stats.totalVisitors}</td>
                <td>100%</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>

          <h3>Détail des clients</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Référence</th>
                <th>Client</th>
                <th>Nombre de billets</th>
                <th>Catégorie</th>
                <th>Montant payé</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSales.map(sale => {
                const category = sale.items[0].category;
                const isFree = category === 'Diplomatique' || category === 'Scientifique';
                return `
                <tr class="${isFree ? 'free-category' : ''}">
                  <td>${new Date(sale.date).toLocaleDateString('fr-FR')}</td>
                  <td>${sale.id}</td>
                  <td>${sale.clientName}</td>
                  <td>${sale.totalVisitors}</td>
                  <td>${category}</td>
                  <td>${sale.finalAmount.toLocaleString()} FC</td>
                  <td>${isFree ? 'GRATUIT' : 'PAYANT'}</td>
                </tr>
              `}).join('')}
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
      alert('Aucune donnée à imprimer pour les critères sélectionnés');
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
            .free-category { background-color: #fff3cd; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Zoo de Kinshasa</h1>
            <h2>RAPPORT DÉTAILLÉ DES VISITEURS</h2>
            <div class="period">Période: ${getPeriodLabel()}</div>
            <div class="period">Catégorie: ${selectedCategory}</div>
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
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(stats.categoryBreakdown)
                .filter(([category]) => category !== 'Tout')
                .map(([category, count]) => {
                  const categoryRevenue = filteredSales
                    .filter(sale => sale.items.some(item => item.category === category))
                    .reduce((sum, sale) => sum + sale.finalAmount, 0);
                  const isFree = category === 'Diplomatique' || category === 'Scientifique';
                  
                  return `
                  <tr class="${isFree ? 'free-category' : ''}">
                    <td>${category}</td>
                    <td>${count}</td>
                    <td>${stats.totalVisitors > 0 ? ((count / stats.totalVisitors) * 100).toFixed(1) : 0}%</td>
                    <td>${categoryRevenue.toLocaleString()} FC</td>
                    <td>${isFree ? 'GRATUIT' : 'PAYANT'}</td>
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
                <th>Catégorie</th>
                <th>Prix unitaire</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSales.map(sale => {
                const category = sale.items[0].category;
                const isFree = category === 'Diplomatique' || category === 'Scientifique';
                return `
                <tr class="${isFree ? 'free-category' : ''}">
                  <td>${new Date(sale.date).toLocaleString('fr-FR')}</td>
                  <td>${sale.id}</td>
                  <td>${sale.clientName}</td>
                  <td>${sale.totalVisitors}</td>
                  <td>${category}</td>
                  <td>${sale.items[0].unitPrice.toLocaleString()} FC</td>
                  <td>${sale.finalAmount.toLocaleString()} FC</td>
                  <td>${isFree ? 'GRATUIT' : 'PAYANT'}</td>
                </tr>
              `}).join('')}
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
            Suivi des clients et statistiques de fréquentation - {getPeriodLabel()} - {selectedCategory}
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
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
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
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as VisitorCategory)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {categoryOptions.map((option) => (
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

        {/* Répartition par catégorie */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Répartition par catégorie de visiteur</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categoryOptions.map((category) => (
              <div 
                key={category.value} 
                className={`p-4 rounded-lg border ${
                  category.value === 'Diplomatique' || category.value === 'Scientifique' 
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' 
                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{category.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.categoryBreakdown[category.value as VisitorCategory]}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stats.totalVisitors > 0 ? 
                    ((stats.categoryBreakdown[category.value as VisitorCategory] / stats.totalVisitors) * 100).toFixed(1) 
                    : 0}%
                </div>
                {(category.value === 'Diplomatique' || category.value === 'Scientifique') && (
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium mt-1">
                    GRATUIT
                  </div>
                )}
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
                  Référence
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Billets
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSales.map((sale) => {
                const category = sale.items[0].category;
                const isFree = category === 'Diplomatique' || category === 'Scientifique';
                
                return (
                  <motion.tr 
                    key={sale.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      isFree ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sale.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                      {sale.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {sale.clientName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {sale.totalVisitors} billet(s)
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {sale.finalAmount.toLocaleString()} FC
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        isFree 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {isFree ? 'GRATUIT' : 'PAYANT'}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
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