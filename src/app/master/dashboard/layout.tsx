'use client'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useState } from 'react'; // Assurez-vous d'importer useState
import Sidebar from '@/components/Dashboard/Sidebar';
import Header from '@/components/Dashboard/Header';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Accueil', path: '/master/dashboard' },
    { name: 'Événements', path: '/master/dashboard/programmes' },
    { name: 'Sermons', path: '/master/dashboard/sermons' },
    { name: 'Prédications', path: '/master/dashboard/preachings' },
    { name: 'Annonces', path: '/master/dashboard/announcements' },
    { name: 'Membres', path: '/master/dashboard/members' },
    { name: 'Finances', path: '/master/dashboard/finances' },
    { name: 'Paramètres', path: '/master/dashboard/settings' },
  ];

  return (
    <html>
      <body>
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          navItems={navItems} 
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
    </body>
    </html>
  );
}