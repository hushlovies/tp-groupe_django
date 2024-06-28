import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Configuration de l'instance Axios
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Ajout de l'intercepteur pour inclure le token dans les en-têtes
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        if (error.response && error.response.status === 401) {
            const navigate = useNavigate();
            navigate('/auth-error');
        }
        return Promise.reject(error);
    }
);

// Fonction générique pour gérer les erreurs d'Axios
const handleAxiosError = (error) => {
    console.error('Error:', error);
    throw error; // Relance l'erreur pour être gérée ailleurs
};

// Fonction pour récupérer les chercheurs et reste du CRUD
const fetchChercheurs = async () => {
    try {
        const response = await api.get('/chercheurs/');
        return response.data; // Retourne directement les données récupérées
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour récupérer un chercheur par ID
const fetchChercheurById = async (id) => {
    try {
        const response = await api.get(`/chercheurs/${id}/`);
        return response.data; // Retourne les données du chercheur
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour ajouter un chercheur
const addChercheur = async (chercheur) => {
    try {
        const response = await api.post('/chercheurs/', chercheur);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour mettre à jour un chercheur
const updateChercheur = async (id, chercheur) => {
    try {
        const response = await api.put(`/chercheurs/${id}/`, chercheur);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour supprimer un chercheur
const deleteChercheur = async (id) => {
    try {
        const response = await api.delete(`/chercheurs/${id}/`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour récupérer les projets et reste du CRUD
const fetchProjets = async () => {
    try {
        const response = await api.get('/projets/');
        return response.data; // Retourne directement les données récupérées
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour récupérer un projet par ID
const fetchProjetById = async (id) => {
    try {
        const response = await api.get(`/projets/${id}/`);
        return response.data; // Retourne les données du projet
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour ajouter un projet
const addProjet = async (projet) => {
    try {
        const response = await api.post('/projets/', projet);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour mettre à jour un projet
const updateProjet = async (id, projet) => {
    try {
        const response = await api.put(`/projets/${id}/`, projet);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour récupérer les publications et reste du CRUD
const fetchPublications = async () => {
    try {
        const response = await api.get('/publications/');
        return response.data; // Retourne directement les données récupérées
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour ajouter une publication
const addPublication = async (publication) => {
    try {
        const response = await api.post('/publications/', publication);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour mettre à jour une publication
const updatePublication = async (id, publication) => {
    try {
        const response = await api.put(`/publications/${id}/`, publication);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Fonction pour récupérer une publication par ID
const fetchPublicationById = async (id) => {
    try {
        const response = await api.get(`/publications/${id}/`);
        return response.data; // Retourne les données de la publication
    } catch (error) {
        handleAxiosError(error);
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
    addProjet, 
    updateProjet, 
    fetchPublications, 
    addPublication,
    updatePublication,
    fetchPublicationById 
};

export default api;
