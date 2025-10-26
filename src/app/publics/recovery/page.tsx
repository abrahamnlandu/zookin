// app/admin/recovery/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function RecoveryPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulation d'envoi d'email de réinitialisation
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validation basique
      if (!email) {
        throw new Error('Veuillez saisir votre adresse email');
      }

      if (!email.includes('@')) {
        throw new Error('Adresse email invalide');
      }

      // Simulation d'envoi réussi
      setSuccess(true);
      
      // Redirection automatique après succès
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Colonne de gauche - Illustration */}
      <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-emerald-800 dark:from-green-900 dark:to-emerald-950 text-white p-12 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Zoo de Kinshasa</h1>
            <p className="text-green-100 dark:text-green-300">Système de gestion des visites</p>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h2 className="text-xl font-semibold mb-4">Récupération de compte</h2>
              <p className="text-green-100 dark:text-green-200 mb-4">
                Entrez votre email professionnel pour recevoir les instructions de réinitialisation de votre mot de passe.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <FiCheckCircle className="animate-pulse" />
                <span>Processus sécurisé et confidentiel</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Colonne de droite - Formulaire */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link
              href="/publics/login"
              className="inline-flex items-center text-sm text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 mb-6"
            >
              <FiArrowLeft className="mr-2" />
              Retour à la connexion
            </Link>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {success ? 'Email envoyé !' : 'Mot de passe oublié'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {success 
                ? 'Consultez votre boîte email pour réinitialiser votre mot de passe'
                : 'Entrez votre email pour récupérer votre compte'
              }
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800"
            >
              {error}
            </motion.div>
          )}

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Vérifiez votre email
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Un lien de réinitialisation a été envoyé à <strong>{email}</strong>
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 <strong>Astuce :</strong> Vérifiez également votre dossier spam si vous ne voyez pas l'email.
                </p>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Redirection automatique dans 3 secondes...
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email professionnel
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600 transition-all"
                    placeholder="prenom.nom@zookinshasa.cd"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  🔒 Un lien de réinitialisation vous sera envoyé par email. Ce lien expirera dans 1 heure pour des raisons de sécurité.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-900 transition-all ${
                    isLoading
                      ? 'bg-green-400 dark:bg-green-700 cursor-not-allowed'
                      : 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer le lien de réinitialisation'
                  )}
                </button>
              </div>
            </form>
          )}

          {!success && (
            <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>Si vous rencontrez des problèmes, contactez l'administrateur système du zoo.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}