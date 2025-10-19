'use client';

import { useState } from 'react';
import { FiPlus, FiTrash2, FiChevronRight, FiChevronLeft, FiUpload, FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Horaire = {
  jour: string;
  ouverture: string;
  fermeture: string;
};

type Service = {
  nom: string;
  selected: boolean;
};

export default function ZooEnclosurePage() {
  const [step, setStep] = useState(1);
  const [horaires, setHoraires] = useState<Horaire[]>([{ jour: '', ouverture: '', fermeture: '' }]);
  const [colors, setColors] = useState({
    primary: '#1a5632',
    secondary: '#e67e22',
    neutral: '#f5f5f5'
  });
  const [nombreServices, setNombreServices] = useState(1);
  const [services, setServices] = useState<Service[]>([
    { nom: 'Visite guidée', selected: true },
    { nom: 'Nourissage public', selected: false },
    { nom: 'Spectacle d\'oiseaux', selected: false },
    { nom: 'Tour en petit train', selected: false },
    { nom: 'Atelier éducatif', selected: false },
    { nom: 'Rencontre avec soigneur', selected: false },
    { nom: 'Photos avec animaux', selected: false },
    { nom: 'Restauration', selected: false },
    { nom: 'Boutique souvenir', selected: false }
  ]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const addHoraire = () => {
    setHoraires([...horaires, { jour: '', ouverture: '', fermeture: '' }]);
  };

  const removeHoraire = (index: number) => {
    const newHoraires = [...horaires];
    newHoraires.splice(index, 1);
    setHoraires(newHoraires);
  };

  const handleHoraireChange = (index: number, field: keyof Horaire, value: string) => {
    const newHoraires = [...horaires];
    newHoraires[index][field] = value;
    setHoraires(newHoraires);
  };

  const handleColorChange = (colorType: string, value: string) => {
    setColors({ ...colors, [colorType]: value });
  };

  const handleServiceChange = (index: number) => {
    const newServices = [...services];
    newServices[index].selected = !newServices[index].selected;
    
    const count = newServices.filter(s => s.selected).length;
    
    if (count > nombreServices) {
      newServices[index].selected = false;
    } else {
      setServices(newServices);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-emerald-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        {/* Progress Bar */}
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4">
          <div className="flex justify-between items-center mb-2 text-sm font-medium">
            <span className={`${step >= 1 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
              Informations
            </span>
            <span className={`${step >= 2 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
              Description
            </span>
            <span className={`${step >= 3 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
              Services
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-green-600 dark:bg-green-400 h-2 rounded-full" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Nouvel Espace Animalier</h2>
                <p className="text-gray-600 dark:text-gray-300">Renseignez les informations de base de l'enclos ou habitat</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de l'espace *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Volière des perroquets"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type d'habitat *
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all">
                    <option value="">Sélectionnez un type</option>
                    <option value="savane">Savane</option>
                    <option value="foret">Forêt tropicale</option>
                    <option value="aquatique">Espace aquatique</option>
                    <option value="desert">Désert</option>
                    <option value="montagne">Zone montagneuse</option>
                    <option value="voliere">Volière</option>
                    <option value="reptiles">Terrarium reptiles</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Charte graphique de l'espace</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Couleur principale
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="ml-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Couleur secondaire
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="ml-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Couleur neutre
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={colors.neutral}
                        onChange={(e) => handleColorChange('neutral', e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.neutral}
                        onChange={(e) => handleColorChange('neutral', e.target.value)}
                        className="ml-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo de l'espace
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 dark:text-gray-300">
                      <label className="relative cursor-pointer rounded-md font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                        <span>Téléverser une photo</span>
                        <input type="file" className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF jusqu'à 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  Suivant <FiChevronRight className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Description de l'espace</h2>
                <p className="text-gray-600 dark:text-gray-300">Décrivez l'habitat et ses caractéristiques</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description de l'habitat *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Décrivez l'environnement, la végétation, les aménagements..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Espèces hébergées *
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Listez les animaux présents dans cet espace..."
                  required
                />
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Informations techniques</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Superficie (m²) *
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 250"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Capacité maximale
                    </label>
                    <input
                      type="number"
                      placeholder="Nombre de visiteurs"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Température moyenne
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 25-30°C"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Niveau d'accès
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all">
                      <option value="libre">Accès libre</option>
                      <option value="guide">Visite guidée uniquement</option>
                      <option value="restreint">Accès restreint</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  <FiChevronLeft className="mr-1" /> Précédent
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  Suivant <FiChevronRight className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Services & Horaires */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Services et horaires</h2>
                <p className="text-gray-600 dark:text-gray-300">Configurez les services et horaires de cet espace</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre de services proposés *
                </label>
                <input
                  type="number"
                  min="1"
                  max={services.length}
                  value={nombreServices}
                  onChange={(e) => setNombreServices(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sélectionnez les services (max {nombreServices})
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={service.selected}
                        onChange={() => handleServiceChange(index)}
                        disabled={!service.selected && services.filter(s => s.selected).length >= nombreServices}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {service.nom}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Horaires d'ouverture *</h3>
                
                {horaires.map((horaire, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end">
                    <div className="md:col-span-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Jour
                      </label>
                      <select
                        value={horaire.jour}
                        onChange={(e) => handleHoraireChange(index, 'jour', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      >
                        <option value="">Sélectionnez un jour</option>
                        <option value="Lundi">Lundi</option>
                        <option value="Mardi">Mardi</option>
                        <option value="Mercredi">Mercredi</option>
                        <option value="Jeudi">Jeudi</option>
                        <option value="Vendredi">Vendredi</option>
                        <option value="Samedi">Samedi</option>
                        <option value="Dimanche">Dimanche</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ouverture
                      </label>
                      <input
                        type="time"
                        value={horaire.ouverture}
                        onChange={(e) => handleHoraireChange(index, 'ouverture', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Fermeture
                      </label>
                      <input
                        type="time"
                        value={horaire.fermeture}
                        onChange={(e) => handleHoraireChange(index, 'fermeture', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2 flex items-end h-full">
                      {index === 0 ? (
                        <button
                          type="button"
                          onClick={addHoraire}
                          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg shadow hover:shadow-md transition-all font-medium"
                        >
                          <FiPlus className="mr-1" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeHoraire(index)}
                          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg shadow hover:shadow-md transition-all font-medium"
                        >
                          <FiTrash2 className="mr-1" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Informations de sécurité</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Niveau de danger
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all">
                      <option value="faible">Faible</option>
                      <option value="moyen">Moyen</option>
                      <option value="eleve">Élevé</option>
                      <option value="critique">Critique</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Restrictions
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Interdit aux enfants < 12 ans"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  <FiChevronLeft className="mr-1" /> Précédent
                </button>
                <button
                  type="submit"
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow hover:shadow-md transition-all font-medium"
                >
                  Créer l'espace <FiUpload className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Login Link */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-center border-t border-gray-200 dark:border-gray-600">
          <a 
            href="/publics/login" 
            className="flex items-center justify-center text-green-600 dark:text-green-400 hover:underline"
          >
            <FiLogIn className="mr-2" />
            Déjà un compte ? Se connecter
          </a>
        </div>
      </motion.div>
    </div>
  );
}