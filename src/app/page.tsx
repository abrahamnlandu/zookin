'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-emerald-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-12 text-center">
          {/* Icône animale */}
          <div className="mb-8 flex justify-center">
            <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>

          {/* Titre et description */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-green-600 dark:text-green-400">Zoo</span> Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto">
            Système de gestion des visites et exploration de la biodiversité d'un jardin zoologique
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/publics/signup"
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:-translate-y-0.5 text-lg"
            >
              S'inscrire
            </Link>
            <Link
              href="/publics/login"
              className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-green-600 dark:text-green-300 px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium border border-gray-200 dark:border-gray-600 hover:-translate-y-0.5 text-lg"
            >
              Se connecter
            </Link>
          </div>

          {/* Informations supplémentaires */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">Kinshasa, RDC</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">Ouvert 7j/7</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300">Animaux protégés</span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Accueillant plus de <span className="font-bold text-green-600 dark:text-green-400">50,000 visiteurs</span> annuellement
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}