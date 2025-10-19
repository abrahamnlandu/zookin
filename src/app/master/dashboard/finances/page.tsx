'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPrinter, FiDollarSign, FiUsers, FiFileText, FiPlus, FiMinus, FiShoppingCart, FiUser } from 'react-icons/fi';

// Types
type VisitorCategory = 'National' | 'Expatrié' | 'Diplomatique' | 'Scientifique';
type TicketType = 'Adulte' | 'Enfant';

interface SaleItem {
  category: VisitorCategory;
  type: TicketType;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface DailySale {
  id: string;
  date: string;
  clientName: string;
  items: SaleItem[];
  totalAmount: number;
  totalVisitors: number;
  discount: number;
  finalAmount: number;
}

export default function CaissePage() {
  const [sales, setSales] = useState<SaleItem[]>([
    { category: 'National', type: 'Adulte', quantity: 0, unitPrice: 2500, total: 0 },
    { category: 'National', type: 'Enfant', quantity: 0, unitPrice: 1000, total: 0 },
    { category: 'Expatrié', type: 'Adulte', quantity: 0, unitPrice: 5000, total: 0 },
    { category: 'Expatrié', type: 'Enfant', quantity: 0, unitPrice: 2000, total: 0 },
    { category: 'Diplomatique', type: 'Adulte', quantity: 0, unitPrice: 0, total: 0 },
    { category: 'Diplomatique', type: 'Enfant', quantity: 0, unitPrice: 0, total: 0 },
    { category: 'Scientifique', type: 'Adulte', quantity: 0, unitPrice: 0, total: 0 },
    { category: 'Scientifique', type: 'Enfant', quantity: 0, unitPrice: 0, total: 0 },
  ]);

  const [dailySales, setDailySales] = useState<DailySale[]>([]);
  const [currentSaleId, setCurrentSaleId] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');

  // Prix fixes
  const prices = {
    'National': { 'Adulte': 2500, 'Enfant': 1000 },
    'Expatrié': { 'Adulte': 5000, 'Enfant': 2000 },
    'Diplomatique': { 'Adulte': 0, 'Enfant': 0 },
    'Scientifique': { 'Adulte': 0, 'Enfant': 0 },
  };

  // Calcul des totaux
  const totals = {
    totalVisitors: sales.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: sales.reduce((sum, item) => sum + item.total, 0),
    discount: 0,
    finalAmount: 0
  };

  // Appliquer réduction de 10% pour groupes de plus de 100 visiteurs
  if (totals.totalVisitors >= 100) {
    totals.discount = totals.totalAmount * 0.1;
    totals.finalAmount = totals.totalAmount - totals.discount;
  } else {
    totals.finalAmount = totals.totalAmount;
  }

  // Mettre à jour les totaux des items
  useEffect(() => {
    const updatedSales = sales.map(item => ({
      ...item,
      total: item.quantity * item.unitPrice
    }));
    setSales(updatedSales);
  }, [sales.map(item => item.quantity).join(',')]);

  // Générer un ID de vente unique
  useEffect(() => {
    setCurrentSaleId(`SALE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const updateQuantity = (index: number, change: number) => {
    const newSales = [...sales];
    const newQuantity = Math.max(0, newSales[index].quantity + change);
    newSales[index].quantity = newQuantity;
    newSales[index].total = newQuantity * newSales[index].unitPrice;
    setSales(newSales);
  };

  const handleQuantityChange = (index: number, value: string) => {
    const newSales = [...sales];
    const newQuantity = Math.max(0, parseInt(value) || 0);
    newSales[index].quantity = newQuantity;
    newSales[index].total = newQuantity * newSales[index].unitPrice;
    setSales(newSales);
  };

  const processSale = () => {
    if (totals.totalVisitors === 0) {
      alert('Veuillez ajouter au moins un visiteur');
      return;
    }

    if (!clientName.trim()) {
      alert('Veuillez saisir le nom du client');
      return;
    }

    const newSale: DailySale = {
      id: currentSaleId,
      date: new Date().toISOString(),
      clientName: clientName.trim(),
      items: sales.filter(item => item.quantity > 0),
      totalAmount: totals.totalAmount,
      totalVisitors: totals.totalVisitors,
      discount: totals.discount,
      finalAmount: totals.finalAmount
    };

    setDailySales(prev => [...prev, newSale]);
    resetSale();
    alert('Vente enregistrée avec succès!');
  };

  const resetSale = () => {
    setSales(sales.map(item => ({ ...item, quantity: 0, total: 0 })));
    setClientName('');
    setCurrentSaleId(`SALE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  };

  const printReceipt = () => {
    if (totals.totalVisitors === 0) {
      alert('Aucune vente à imprimer');
      return;
    }

    if (!clientName.trim()) {
      alert('Veuillez saisir le nom du client avant d\'imprimer le reçu');
      return;
    }

    const receiptContent = `
      <html>
        <head>
          <title>Reçu - Zoo Kinshasa</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; max-width: 400px; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #1a5632; padding-bottom: 10px; }
            h1 { color: #1a5632; margin: 0; font-size: 24px; }
            h2 { color: #333; margin: 5px 0; font-size: 18px; }
            .receipt-info { margin: 10px 0; font-size: 14px; }
            .client-info { background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #1a5632; color: white; }
            .total-row { font-weight: bold; background-color: #f0f0f0; }
            .discount { color: #e53e3e; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .thank-you { text-align: center; margin: 20px 0; font-style: italic; color: #1a5632; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Zoo de Kinshasa</h1>
            <h2>REÇU DE VENTE</h2>
            <div class="receipt-info">
              <div>Référence: ${currentSaleId}</div>
              <div>Date: ${new Date().toLocaleString('fr-FR')}</div>
            </div>
          </div>

          <div class="client-info">
            <strong>Client:</strong> ${clientName}
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Type</th>
                <th>Qté</th>
                <th>Prix U.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${sales
                .filter(item => item.quantity > 0)
                .map(item => `
                  <tr>
                    <td>${item.category}</td>
                    <td>${item.type}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unitPrice.toLocaleString()} FC</td>
                    <td>${item.total.toLocaleString()} FC</td>
                  </tr>
                `).join('')}
            </tbody>
          </table>

          <div style="text-align: right; margin-top: 15px;">
            <div>Sous-total: <strong>${totals.totalAmount.toLocaleString()} FC</strong></div>
            ${totals.discount > 0 ? `
              <div class="discount">Réduction 10%: -${totals.discount.toLocaleString()} FC</div>
            ` : ''}
            <div style="font-size: 18px; margin-top: 10px; border-top: 1px solid #333; padding-top: 5px;">
              TOTAL: <strong>${totals.finalAmount.toLocaleString()} FC</strong>
            </div>
          </div>

          <div class="thank-you">
            <p>Merci ${clientName} pour votre visite !</p>
          </div>

          <div class="footer">
            <p>Zoo de Kinshasa - BP 1234 Kinshasa</p>
            <p>Tél: +243 81 123 4567</p>
            <p>www.zookinshasa.cd</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Veuillez autoriser les fenêtres pop-up pour imprimer le reçu.');
    }
  };

  const printDailyReport = () => {
    if (dailySales.length === 0) {
      alert('Aucune vente enregistrée aujourd\'hui');
      return;
    }

    const dailyTotal = dailySales.reduce((sum, sale) => sum + sale.finalAmount, 0);
    const dailyVisitors = dailySales.reduce((sum, sale) => sum + sale.totalVisitors, 0);
    const dailyDiscount = dailySales.reduce((sum, sale) => sum + sale.discount, 0);

    const reportContent = `
      <html>
        <head>
          <title>Rapport Journalier - Caisse Zoo Kinshasa</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1a5632; padding-bottom: 15px; }
            h1 { color: #1a5632; margin: 0; }
            h2 { color: #333; margin: 10px 0; }
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
            <h2>RAPPORT JOURNALIER DE CAISSE</h2>
            <div>Date: ${new Date().toLocaleDateString('fr-FR')}</div>
          </div>

          <div class="summary">
            <h3>Résumé de la journée</h3>
            <div>Total des ventes: ${dailySales.length}</div>
            <div>Total des visiteurs: ${dailyVisitors}</div>
            <div>Total des recettes: ${dailyTotal.toLocaleString()} FC</div>
            <div>Total des réductions: ${dailyDiscount.toLocaleString()} FC</div>
          </div>

          <h3>Détail des ventes</h3>
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Client</th>
                <th>Heure</th>
                <th>Visiteurs</th>
                <th>Montant</th>
                <th>Réduction</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              ${dailySales.map(sale => `
                <tr>
                  <td>${sale.id}</td>
                  <td>${sale.clientName}</td>
                  <td>${new Date(sale.date).toLocaleTimeString('fr-FR')}</td>
                  <td>${sale.totalVisitors}</td>
                  <td>${sale.totalAmount.toLocaleString()} FC</td>
                  <td>${sale.discount.toLocaleString()} FC</td>
                  <td>${sale.finalAmount.toLocaleString()} FC</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3">TOTAL JOURNALIER</td>
                <td>${dailyVisitors}</td>
                <td>${dailySales.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()} FC</td>
                <td>${dailyDiscount.toLocaleString()} FC</td>
                <td>${dailyTotal.toLocaleString()} FC</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p>Rapport généré le ${new Date().toLocaleString('fr-FR')}</p>
            <p>Zoo de Kinshasa - Service de Caisse</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportContent);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Caisse du Zoo</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gestion des ventes de billets et édition de reçus</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={printReceipt}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPrinter className="text-lg" />
            <span>Imprimer reçu</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={printDailyReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiFileText className="text-lg" />
            <span>Rapport journalier</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau de vente */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FiShoppingCart className="mr-2 text-green-600" />
            Nouvelle Vente
          </h2>

          {/* Champ nom du client */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiUser className="inline mr-2" />
              Nom du client *
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ex: Jean Kamba ou Entreprise XYZ"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-colors"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Saisissez le nom de la personne ou de l'organisation qui paie
            </p>
          </div>

          <div className="space-y-4">
            {sales.map((item, index) => (
              <motion.div
                key={`${item.category}-${item.type}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.category} - {item.type}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.unitPrice > 0 ? `${item.unitPrice.toLocaleString()} FC` : 'Gratuit'}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(index, -1)}
                    className="p-1 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-800/50"
                  >
                    <FiMinus className="text-sm" />
                  </motion.button>

                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-16 text-center border border-gray-300 dark:border-gray-600 rounded-lg py-1 px-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(index, 1)}
                    className="p-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-800/50"
                  >
                    <FiPlus className="text-sm" />
                  </motion.button>

                  <div className="w-20 text-right">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.total.toLocaleString()} FC
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Informations de réduction */}
          {totals.totalVisitors >= 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiUsers className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    Réduction de groupe appliquée !
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                    Réduction de 10% pour {totals.totalVisitors} visiteurs
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Total et actions */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Sous-total:</span>
                <span className="font-medium">{totals.totalAmount.toLocaleString()} FC</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-red-600 dark:text-red-400">
                  <span>Réduction 10%:</span>
                  <span>-{totals.discount.toLocaleString()} FC</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-600 pt-2">
                <span>Total à payer:</span>
                <span>{totals.finalAmount.toLocaleString()} FC</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={processSale}
                disabled={!clientName.trim() || totals.totalVisitors === 0}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  !clientName.trim() || totals.totalVisitors === 0
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Enregistrer la vente
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetSale}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Réinitialiser
              </motion.button>
            </div>
          </div>
        </div>

        {/* Panneau des statistiques */}
        <div className="space-y-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ventes aujourd'hui</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{dailySales.length}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <FiDollarSign className="text-2xl text-green-600 dark:text-green-400" />
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dailySales.reduce((sum, sale) => sum + sale.finalAmount, 0).toLocaleString()} FC
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <FiUsers className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Dernières ventes</h3>
            <div className="space-y-3">
              {dailySales.slice(-5).reverse().map((sale) => (
                <div key={sale.id} className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">{sale.clientName}</div>
                    <div className="text-gray-500">{sale.totalVisitors} visiteurs • {sale.finalAmount.toLocaleString()} FC</div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(sale.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
              {dailySales.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  Aucune vente aujourd'hui
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}