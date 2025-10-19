'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiPrinter, 
  FiEdit, 
  FiTrash2, 
  FiHeart, 
  FiCalendar,
  FiMapPin,
  FiUser,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';

interface Animal {
  id: string;
  name: string;
  species: string;
  enclosure: string;
  healthStatus: 'excellent' | 'bon' | 'modéré' | 'critique';
  lastCheckup: string;
  nextCheckup: string;
  isTreated: boolean;
  diet: string;
  caretaker: string;
  age: number;
  dateOfArrival: string;
  specialNeeds: string;
  notes: string;
}

export default function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [healthFilter, setHealthFilter] = useState<string>('all');
  const [treatmentFilter, setTreatmentFilter] = useState<string>('all');
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    enclosure: '',
    healthStatus: 'bon' as Animal['healthStatus'],
    lastCheckup: new Date().toISOString().split('T')[0],
    nextCheckup: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isTreated: false,
    diet: '',
    caretaker: '',
    age: 0,
    dateOfArrival: new Date().toISOString().split('T')[0],
    specialNeeds: '',
    notes: ''
  });

  // Espèces disponibles dans le zoo
  const species = [
    'Lion', 'Éléphant', 'Girafe', 'Zèbre', 'Hippopotame', 'Crocodile',
    'Chimpanzé', 'Gorille', 'Panthère', 'Antilope', 'Buffle', 'Rhinocéros',
    'Oiseaux', 'Reptiles', 'Amphibiens', 'Autres'
  ];

  // Enclos disponibles
  const enclosures = [
    'Savane Nord', 'Savane Sud', 'Forêt Tropicale', 'Zone Humide',
    'Enclos des Félins', 'Volière Principale', 'Reptilarium',
    'Enclos des Primates', 'Zone Aquatique', 'Quarantaine'
  ];

  // Soigneurs disponibles
  const caretakers = [
    'Jean Kabasele', 'Marie Lumbala', 'Paul Mbayo', 'Sophie Nkosi',
    'David Tshibanda', 'Lucie Kanda', 'Marc Kalala'
  ];

  // Données initiales
  useEffect(() => {
    const initialAnimals: Animal[] = [
      {
        id: '1',
        name: 'Simba',
        species: 'Lion',
        enclosure: 'Enclos des Félins',
        healthStatus: 'excellent',
        lastCheckup: '2024-01-15',
        nextCheckup: '2024-02-15',
        isTreated: true,
        diet: 'Viande (8kg/jour)',
        caretaker: 'Jean Kabasele',
        age: 5,
        dateOfArrival: '2020-03-10',
        specialNeeds: 'Aucun',
        notes: 'Très sociable, aime jouer avec les enrichissements'
      },
      {
        id: '2',
        name: 'Jumbo',
        species: 'Éléphant',
        enclosure: 'Savane Nord',
        healthStatus: 'bon',
        lastCheckup: '2024-01-10',
        nextCheckup: '2024-02-10',
        isTreated: true,
        diet: 'Herbe, fruits, légumes (200kg/jour)',
        caretaker: 'Marie Lumbala',
        age: 25,
        dateOfArrival: '2015-07-22',
        specialNeeds: 'Soins des pieds réguliers',
        notes: 'Calme et obéissant'
      },
      {
        id: '3',
        name: 'Zara',
        species: 'Girafe',
        enclosure: 'Savane Sud',
        healthStatus: 'modéré',
        lastCheckup: '2024-01-12',
        nextCheckup: '2024-01-26',
        isTreated: false,
        diet: 'Feuilles, foin (30kg/jour)',
        caretaker: 'Paul Mbayo',
        age: 8,
        dateOfArrival: '2019-11-05',
        specialNeeds: 'Surveillance articulations',
        notes: 'Nécessite un suivi vétérinaire rapproché'
      },
      {
        id: '4',
        name: 'Rocco',
        species: 'Rhinocéros',
        enclosure: 'Savane Nord',
        healthStatus: 'critique',
        lastCheckup: '2024-01-05',
        nextCheckup: '2024-01-20',
        isTreated: false,
        diet: 'Herbe, foin (50kg/jour)',
        caretaker: 'Sophie Nkosi',
        age: 12,
        dateOfArrival: '2018-09-14',
        specialNeeds: 'Traitement antibiotique',
        notes: 'État de santé préoccupant, isolement recommandé'
      }
    ];
    setAnimals(initialAnimals);
    setFilteredAnimals(initialAnimals);
  }, []);

  // Filtrage des animaux
  useEffect(() => {
    let result = animals;

    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.enclosure.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par état de santé
    if (healthFilter !== 'all') {
      result = result.filter(animal => animal.healthStatus === healthFilter);
    }

    // Filtre par traitement
    if (treatmentFilter !== 'all') {
      result = result.filter(animal => 
        treatmentFilter === 'treated' ? animal.isTreated : !animal.isTreated
      );
    }

    // Filtre par espèce
    if (speciesFilter !== 'all') {
      result = result.filter(animal => animal.species === speciesFilter);
    }

    setFilteredAnimals(result);
  }, [animals, searchTerm, healthFilter, treatmentFilter, speciesFilter]);

  const handleAddAnimal = () => {
    const animal: Animal = {
      ...newAnimal,
      id: Date.now().toString(),
      age: Number(newAnimal.age)
    };
    setAnimals([...animals, animal]);
    setShowAddModal(false);
    setNewAnimal({
      name: '',
      species: '',
      enclosure: '',
      healthStatus: 'bon',
      lastCheckup: new Date().toISOString().split('T')[0],
      nextCheckup: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isTreated: false,
      diet: '',
      caretaker: '',
      age: 0,
      dateOfArrival: new Date().toISOString().split('T')[0],
      specialNeeds: '',
      notes: ''
    });
  };

  const handleDeleteAnimal = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
      setAnimals(animals.filter(animal => animal.id !== id));
    }
  };

  const handleToggleTreatment = (id: string) => {
    setAnimals(animals.map(animal =>
      animal.id === id ? { ...animal, isTreated: !animal.isTreated } : animal
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  const getHealthStatusColor = (status: Animal['healthStatus']) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/50';
      case 'bon': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/50';
      case 'modéré': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50';
      case 'critique': return 'text-red-600 bg-red-100 dark:bg-red-900/50';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/50';
    }
  };

  const getHealthStatusIcon = (status: Animal['healthStatus']) => {
    switch (status) {
      case 'excellent': return <FiCheckCircle className="text-green-600" />;
      case 'bon': return <FiCheckCircle className="text-blue-600" />;
      case 'modéré': return <FiAlertTriangle className="text-yellow-600" />;
      case 'critique': return <FiXCircle className="text-red-600" />;
      default: return <FiHeart className="text-gray-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Animaux</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredAnimals.length} animal{filteredAnimals.length > 1 ? 'x' : ''} au Zoo de Kinshasa
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <FiPrinter className="text-lg" />
            <span className="hidden sm:inline">Imprimer</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FiPlus className="text-lg" />
            <span>Nouvel Animal</span>
          </motion.button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{animals.length}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total animaux</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {animals.filter(a => a.isTreated).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Soignés aujourd'hui</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {animals.filter(a => a.healthStatus === 'modéré').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Santé modérée</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {animals.filter(a => a.healthStatus === 'critique').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Cas critiques</div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un animal, espèce ou enclos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tous les états de santé</option>
              <option value="excellent">Excellent</option>
              <option value="bon">Bon</option>
              <option value="modéré">Modéré</option>
              <option value="critique">Critique</option>
            </select>

            <select
              value={treatmentFilter}
              onChange={(e) => setTreatmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tous les traitements</option>
              <option value="treated">Soignés</option>
              <option value="not-treated">Non soignés</option>
            </select>

            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Toutes les espèces</option>
              {species.map(sp => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des animaux */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Animal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Espèce
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  État de santé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Soigné
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dernier contrôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Soigneur
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAnimals.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {animal.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {animal.age} an{animal.age > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{animal.species}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FiMapPin className="text-xs" />
                      {animal.enclosure}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getHealthStatusColor(animal.healthStatus)}`}>
                      {getHealthStatusIcon(animal.healthStatus)}
                      {animal.healthStatus.charAt(0).toUpperCase() + animal.healthStatus.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleTreatment(animal.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        animal.isTreated
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {animal.isTreated ? <FiCheckCircle /> : <FiXCircle />}
                      {animal.isTreated ? 'Soigné' : 'À soigner'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="text-xs" />
                      {new Date(animal.lastCheckup).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {animal.caretaker}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedAnimal(animal);
                          setShowDetailModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <FiEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteAnimal(animal.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun animal trouvé</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Essayez de modifier vos critères de recherche ou ajoutez un nouvel animal.
            </p>
          </div>
        )}
      </div>

      {/* Modal d'ajout d'animal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ajouter un nouvel animal</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom de l'animal
                  </label>
                  <input
                    type="text"
                    value={newAnimal.name}
                    onChange={(e) => setNewAnimal({...newAnimal, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Espèce
                  </label>
                  <select
                    value={newAnimal.species}
                    onChange={(e) => setNewAnimal({...newAnimal, species: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Sélectionner une espèce</option>
                    {species.map(sp => (
                      <option key={sp} value={sp}>{sp}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Enclos
                  </label>
                  <select
                    value={newAnimal.enclosure}
                    onChange={(e) => setNewAnimal({...newAnimal, enclosure: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Sélectionner un enclos</option>
                    {enclosures.map(enc => (
                      <option key={enc} value={enc}>{enc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    État de santé
                  </label>
                  <select
                    value={newAnimal.healthStatus}
                    onChange={(e) => setNewAnimal({...newAnimal, healthStatus: e.target.value as Animal['healthStatus']})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="bon">Bon</option>
                    <option value="modéré">Modéré</option>
                    <option value="critique">Critique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Âge (années)
                  </label>
                  <input
                    type="number"
                    value={newAnimal.age}
                    onChange={(e) => setNewAnimal({...newAnimal, age: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Soigneur assigné
                  </label>
                  <select
                    value={newAnimal.caretaker}
                    onChange={(e) => setNewAnimal({...newAnimal, caretaker: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Sélectionner un soigneur</option>
                    {caretakers.map(ct => (
                      <option key={ct} value={ct}>{ct}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Régime alimentaire
                  </label>
                  <input
                    type="text"
                    value={newAnimal.diet}
                    onChange={(e) => setNewAnimal({...newAnimal, diet: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Viande (5kg/jour)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date d'arrivée
                  </label>
                  <input
                    type="date"
                    value={newAnimal.dateOfArrival}
                    onChange={(e) => setNewAnimal({...newAnimal, dateOfArrival: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Besoins spéciaux
                  </label>
                  <textarea
                    value={newAnimal.specialNeeds}
                    onChange={(e) => setNewAnimal({...newAnimal, specialNeeds: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Besoins médicaux ou comportementaux particuliers..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes supplémentaires
                  </label>
                  <textarea
                    value={newAnimal.notes}
                    onChange={(e) => setNewAnimal({...newAnimal, notes: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Informations complémentaires..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddAnimal}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Ajouter l'animal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Styles pour l'impression */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}