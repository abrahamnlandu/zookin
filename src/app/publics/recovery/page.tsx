// app/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiCheck, FiArrowLeft, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'instructions' | 'link_expired'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulation d'envoi d'email - À remplacer par votre logique
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validation basique
      if (!email) {
        throw new Error('Veuillez entrer votre adresse email');
      }

      if (!email.includes('@')) {
        throw new Error('Adresse email invalide');
      }

      // Si tout est valide, passer à l'étape suivante
      setStep('instructions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Colonne de gauche - Illustration */}
      <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white p-12 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Centre Missionnaire</h1>
            <p className="text-blue-100 dark:text-blue-300">Récupération de compte administrateur</p>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h2 className="text-xl font-semibold mb-4">Problème de connexion ?</h2>
              <p className="text-blue-100 dark:text-blue-200 mb-4">
                Suivez les étapes pour réinitialiser votre mot de passe et retrouver l'accès à votre compte.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <FiArrowLeft className="animate-pulse" />
                <span>Retour à la page de connexion</span>
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
          {step === 'email' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mot de passe oublié</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Entrez votre adresse email pour recevoir les instructions de réinitialisation
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adresse email administrateur
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
                      className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all"
                      placeholder="admin@votreeglise.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all ${
                      isLoading
                        ? 'bg-blue-400 dark:bg-blue-700 cursor-not-allowed'
                        : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer les instructions'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/publics/login"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  <FiArrowLeft className="mr-1" />
                  Retour à la page de connexion
                </Link>
              </div>
            </>
          )}

          {step === 'instructions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                <FiCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Email envoyé !</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Nous avons envoyé un email à <span className="font-medium text-gray-900 dark:text-white">{email}</span> avec les instructions pour réinitialiser votre mot de passe.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">⚠️ Si vous ne recevez pas l'email :</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>- Vérifiez votre dossier spam/courrier indésirable</li>
                  <li>- Assurez-vous d'avoir entré la bonne adresse email</li>
                  <li>- Patientez quelques minutes</li>
                </ul>
              </div>
              <button
                onClick={() => setStep('email')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all"
              >
                Renvoyer l'email
              </button>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Le lien de réinitialisation expire dans 24 heures.</p>
              </div>
            </motion.div>
          )}

          {step === 'link_expired' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                <FiMail className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Lien expiré</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Le lien de réinitialisation a expiré. Veuillez demander un nouveau lien ci-dessous.
              </p>
              <button
                onClick={() => setStep('email')}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all"
              >
                Demander un nouveau lien
              </button>
              <div className="mt-6 text-center">
                <Link
                  href="/publics/login"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  <FiArrowLeft className="mr-1" />
                  Retour à la page de connexion
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}