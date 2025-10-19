'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSave, 
  FiBell, 
  FiGlobe, 
  FiLock, 
  FiUser, 
  FiDatabase, 
  FiShield, 
  FiCreditCard, 
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiImage,
  FiCalendar,
  FiBarChart2
} from 'react-icons/fi';

export default function ZooSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Informations générales
    zooName: 'Zoo de Kinshasa',
    zooEmail: 'contact@zookinshasa.cd',
    zooPhone: '+243 81 234 5678',
    zooAddress: 'Avenue du Zoo, Kinshasa, République Démocratique du Congo',
    
    // Horaires
    openingTime: '09:00',
    closingTime: '18:00',
    workingDays: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    
    // Tarification
    adultTicketPrice: 15,
    childTicketPrice: 8,
    seniorTicketPrice: 10,
    groupDiscount: 10,
    
    // Paramètres système
    currency: 'USD',
    language: 'fr',
    timezone: 'Africa/Kinshasa',
    dateFormat: 'dd/MM/yyyy',
    
    // Notifications
    notifications: {
      email: true,
      sms: false,
      push: true,
      animalHealthAlerts: true,
      maintenanceAlerts: true,
      visitorAlerts: false,
      financialAlerts: true
    },
    
    // Sécurité
    security: {
      sessionTimeout: 30,
      passwordExpiry: 90,
      twoFactorAuth: false,
      loginAlerts: true
    },
    
    // Confidentialité
    privacy: {
      dataSharing: false,
      analytics: true,
      visitorDataRetention: 365,
      employeeDataRetention: 730
    }
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: <FiGlobe /> },
    { id: 'schedule', label: 'Horaires', icon: <FiClock /> },
    { id: 'pricing', label: 'Tarification', icon: <FiDollarSign /> },
    { id: 'notifications', label: 'Alertes', icon: <FiBell /> },
    { id: 'security', label: 'Sécurité', icon: <FiLock /> },
    { id: 'privacy', label: 'Confidentialité', icon: <FiShield /> },
    { id: 'appearance', label: 'Apparence', icon: <FiImage /> },
    { id: 'advanced', label: 'Avancé', icon: <FiDatabase /> },
  ];

  const daysOfWeek = [
    { id: 'lundi', label: 'Lundi' },
    { id: 'mardi', label: 'Mardi' },
    { id: 'mercredi', label: 'Mercredi' },
    { id: 'jeudi', label: 'Jeudi' },
    { id: 'vendredi', label: 'Vendredi' },
    { id: 'samedi', label: 'Samedi' },
    { id: 'dimanche', label: 'Dimanche' }
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'CDF', label: 'CDF (FC)' },
    { value: 'XAF', label: 'XAF (FCFA)' }
  ];

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'sw', label: 'Swahili' },
    { value: 'ln', label: 'Lingala' }
  ];

  const handleSaveSettings = () => {
    console.log('Zoo settings saved:', settings);
    // Logique pour sauvegarder les paramètres
    alert('Paramètres du zoo sauvegardés avec succès!');
  };

  const toggleWorkingDay = (day: string) => {
    const currentDays = [...settings.workingDays];
    if (currentDays.includes(day)) {
      setSettings({
        ...settings,
        workingDays: currentDays.filter(d => d !== day)
      });
    } else {
      setSettings({
        ...settings,
        workingDays: [...currentDays, day]
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Informations du zoo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom du zoo
                  </label>
                  <input
                    type="text"
                    value={settings.zooName}
                    onChange={(e) => setSettings({...settings, zooName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.zooEmail}
                    onChange={(e) => setSettings({...settings, zooEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={settings.zooPhone}
                    onChange={(e) => setSettings({...settings, zooPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Devise
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    {currencies.map(currency => (
                      <option key={currency.value} value={currency.value}>
                        {currency.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Adresse
                </label>
                <textarea
                  value={settings.zooAddress}
                  onChange={(e) => setSettings({...settings, zooAddress: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Préférences système</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Langue
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Format de date
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="dd/MM/yyyy">JJ/MM/AAAA</option>
                    <option value="MM/dd/yyyy">MM/JJ/AAAA</option>
                    <option value="yyyy-MM-dd">AAAA-MM-JJ</option>
                    <option value="dd MMM yyyy">JJ MMM AAAA</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Horaires d'ouverture</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Heure d'ouverture
                </label>
                <input
                  type="time"
                  value={settings.openingTime}
                  onChange={(e) => setSettings({...settings, openingTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Heure de fermeture
                </label>
                <input
                  type="time"
                  value={settings.closingTime}
                  onChange={(e) => setSettings({...settings, closingTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Jours d'ouverture
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {daysOfWeek.map(day => (
                  <label key={day.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.workingDays.includes(day.id)}
                      onChange={() => toggleWorkingDay(day.id)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {day.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'pricing':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tarification des billets</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Adulte ({settings.currency})
                </label>
                <input
                  type="number"
                  value={settings.adultTicketPrice}
                  onChange={(e) => setSettings({...settings, adultTicketPrice: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Enfant ({settings.currency})
                </label>
                <input
                  type="number"
                  value={settings.childTicketPrice}
                  onChange={(e) => setSettings({...settings, childTicketPrice: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Senior ({settings.currency})
                </label>
                <input
                  type="number"
                  value={settings.seniorTicketPrice}
                  onChange={(e) => setSettings({...settings, seniorTicketPrice: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Remise groupe (%)
                </label>
                <input
                  type="number"
                  value={settings.groupDiscount}
                  onChange={(e) => setSettings({...settings, groupDiscount: Number(e.target.value)})}
                  min="0"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Alertes et notifications</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Notifications par email</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir des rapports quotidiens par email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => setSettings({
                      ...settings, 
                      notifications: {...settings.notifications, email: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Alertes santé animale</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Alertes concernant la santé des animaux</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.animalHealthAlerts}
                    onChange={(e) => setSettings({
                      ...settings, 
                      notifications: {...settings.notifications, animalHealthAlerts: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Alertes maintenance</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Alertes de maintenance des enclos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.maintenanceAlerts}
                    onChange={(e) => setSettings({
                      ...settings, 
                      notifications: {...settings.notifications, maintenanceAlerts: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Alertes financières</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rapports financiers et alertes de caisse</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.financialAlerts}
                    onChange={(e) => setSettings({
                      ...settings, 
                      notifications: {...settings.notifications, financialAlerts: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Paramètres de sécurité</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Délai d'expiration de session (minutes)
                </label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings, 
                    security: {...settings.security, sessionTimeout: Number(e.target.value)}
                  })}
                  min="5"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiration du mot de passe (jours)
                </label>
                <input
                  type="number"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => setSettings({
                    ...settings, 
                    security: {...settings.security, passwordExpiry: Number(e.target.value)}
                  })}
                  min="30"
                  max="365"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Authentification à deux facteurs</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sécurité renforcée pour les comptes administrateur</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => setSettings({
                      ...settings, 
                      security: {...settings.security, twoFactorAuth: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Confidentialité et données</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Analytiques</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Collecte de données anonymisées pour améliorer les services</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.analytics}
                    onChange={(e) => setSettings({
                      ...settings, 
                      privacy: {...settings.privacy, analytics: e.target.checked}
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rétention données visiteurs (jours)
                </label>
                <input
                  type="number"
                  value={settings.privacy.visitorDataRetention}
                  onChange={(e) => setSettings({
                    ...settings, 
                    privacy: {...settings.privacy, visitorDataRetention: Number(e.target.value)}
                  })}
                  min="30"
                  max="1095"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rétention données employés (jours)
                </label>
                <input
                  type="number"
                  value={settings.privacy.employeeDataRetention}
                  onChange={(e) => setSettings({
                    ...settings, 
                    privacy: {...settings.privacy, employeeDataRetention: Number(e.target.value)}
                  })}
                  min="365"
                  max="1825"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        );
      
      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Apparence et thème</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Thème de l'interface
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-left hover:border-green-500 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white">Clair</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Interface en mode clair</div>
                  </button>
                  <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-left hover:border-green-500 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white">Sombre</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Interface en mode sombre</div>
                  </button>
                  <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-left hover:border-green-500 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white">Auto</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Basé sur les préférences système</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Logo du zoo
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                    <FiImage className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Changer le logo
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      PNG, JPG jusqu'à 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Les paramètres avancés seront disponibles prochainement.
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres du Zoo</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configurez les paramètres généraux du Zoo de Kinshasa
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveSettings}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiSave className="text-lg" />
              <span>Sauvegarder les paramètres</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}