'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiBook, FiMic, FiBell, FiUsers, FiDollarSign, FiSettings, FiLogOut, FiX, FiMap, FiHeart, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Tableau de bord', icon: <FiHome />, path: '/master/dashboard' },
    { name: 'Animaux', icon: <FiHeart />, path: '/master/dashboard/animaux' },
    { name: 'Tickets', icon: <FiCalendar />, path: '/master/dashboard/programmes' },
    { name: 'Visiteurs', icon: <FiUsers />, path: '/master/dashboard/visiteurs' },
    { name: 'Personnel', icon: <FiShield />, path: '/master/dashboard/members' },
    { name: 'Finances', icon: <FiDollarSign />, path: '/master/dashboard/finances' },
    { name: 'Annonces', icon: <FiBell />, path: '/master/dashboard/announcements' },
    { name: 'Paramètres', icon: <FiSettings />, path: '/master/dashboard/settings' },
  ];

  const handleLogout = () => {
    console.log('Déconnexion effectuée');
  };

  return (
    <>
      {/* Menu latéral - Version desktop */}
      <motion.div 
        initial={{ x: 0 }}
        className="hidden md:flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-lg"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ rotate: 5 }}
              className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold"
            >
              ZK
            </motion.div>
            <div>
              <h1 className="font-bold text-gray-800 dark:text-white">Zoo Kinshasa</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gestion du zoo</p>
            </div>
          </div>
        </motion.div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <motion.span 
                  animate={{ rotate: pathname === item.path ? [0, 5, 0] : 0 }}
                  className="text-lg"
                >
                  {item.icon}
                </motion.span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
          >
            <motion.span
              animate={{ x: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FiLogOut />
            </motion.span>
            <span>Déconnexion</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl md:hidden"
        >
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex justify-between items-center">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                ZK
              </div>
              <h1 className="font-bold text-gray-800 dark:text-white">Zoo Kinshasa</h1>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-1 text-gray-500 dark:text-gray-400"
            >
              <FiX className="text-xl" />
            </motion.button>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === item.path
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-4 border-t border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
            >
              <FiLogOut />
              <span>Déconnexion</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}