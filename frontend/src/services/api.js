import axios from 'axios';

// Configuration de l'instance Axios
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Ajout de l'intercepteur pour inclure le token dans les en-têtes
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Fonction pour récupérer les chercheurs et reste du CRUD
const fetchChercheurs = async () => {
    try {
        const response = await api.get('/chercheurs/');
        return response.data;  // Retourne directement les données récupérées
    } catch (error) {
        console.error('Erreur lors de la récupération des chercheurs :', error);
        throw error;  // Relance l'erreur pour être gérée ailleurs
    }
};

// Fonction pour récupérer un chercheur par ID
const fetchChercheurById = async (id) => {
    try {
        const response = await api.get(`/chercheurs/${id}/`);
        return response.data; // Ensure response.data is returned correctly
    } catch (error) {
        console.error(`Error fetching chercheur with ID ${id}:`, error);
        throw error;
    }
};

// Fonction pour ajouter un chercheur
const addChercheur = async (chercheur) => {
    const response = await api.post('/chercheurs/', chercheur);
    return response.data;
};

// Fonction pour mettre à jour un chercheur
const updateChercheur = async (id, chercheur) => {
    const response = await api.put(`/chercheurs/${id}/`, chercheur);
    return response.data;
};

// Fonction pour supprimer un chercheur
const deleteChercheur = async (id) => {
    const response = await api.delete(`/chercheurs/${id}/`);
    return response.data;
};

// Fonction pour récupérer les projets et reste du CRUD
const fetchProjets = async () => {
    try {
        const response = await api.get('/projets/');
        return response.data;  // Retourne directement les données récupérées
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        throw error;  // Relance l'erreur pour être gérée ailleurs
    }
};

// Fonction pour récupérer un projet par ID
const fetchProjetById = async (id) => {
    try {
        const response = await api.get(`/projets/${id}/`);
        return response.data;  // Retourne les données du projet
    } catch (error) {
        console.error(`Erreur lors de la récupération du projet avec l'ID ${id} :`, error);
        throw error;  // Relance l'erreur pour être gérée ailleurs
    }
};

// Fonction pour ajouter un projet
const addProjet = async (projets) => {
    const response = await api.post('/projets/', projets);
    return response.data;
};

// Fonction pour mettre à jour un projet
const updateProjet = async (id, projets) => {
    const response = await api.put(`/projets/${id}/`, projets);
    return response.data;
};

// Fonction pour récupérer les publications et reste du CRUD
const fetchPublications = async () => {
    try {
        const response = await api.get('/publications/');
        return response.data;  // Retourne directement les données récupérées
    } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
        throw error;  // Relance l'erreur pour être gérée ailleurs
    }
};

const addPublication = async (publications) => {
    const response = await api.post('/publications/', publications);
    return response.data;
};
const updatePublication = async (id, publications) => {
    const response = await api.put(`/publications/${id}/`, publications);
    return response.data;
};

// Fonction pour récupérer une publication par ID
const fetchPublicationById = async (id) => {
    try {
        const response = await api.get(`/publications/${id}/`);
        return response.data;  // Retourne les données de la publication
    } catch (error) {
        console.error(`Erreur lors de la récupération de la publication avec l'ID ${id} :`, error);
        throw error;  // Relance l'erreur pour être gérée ailleurs
    }
};

// Exportation des fonctions et de l'instance Axios configurée
export { 
    fetchChercheurs, 
    fetchChercheurById, 
    addChercheur, 
    updateChercheur, 
    deleteChercheur, 
    fetchProjets, 
    fetchProjetById, 
    addProjet,  // Ajout de la fonction addProjet
    updateProjet,  // Ajout de la fonction updateProjet
    fetchPublications, 
    addPublication,
    updatePublication,
    fetchPublicationById 
};
export default api;
