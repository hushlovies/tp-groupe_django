import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjets, fetchChercheurs } from '../../services/api';
import Header from '../Header';

const Projets = () => {
    const navigate = useNavigate();

    const [projets, setProjets] = useState([]);
    const [chercheurs, setChercheurs] = useState([]);
    const [filteredProjets, setFilteredProjets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterTitre, setFilterTitre] = useState('');
    const [filterDateDebut, setFilterDateDebut] = useState('');
    const [filterDateFin, setFilterDateFin] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projetsData = await fetchProjets();
                setProjets(projetsData);
                setFilteredProjets(projetsData); // Initially set filtered projects to all projects

                const chercheursData = await fetchChercheurs();
                setChercheurs(chercheursData);

                setLoading(false);
            } catch (error) {
                console.error('Erreur :', error);
                setError('Erreur lors du chargement des projets.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getChefDeProjetName = (chefDeProjetId) => {
        const chefDeProjet = chercheurs.find(chercheur => chercheur.id === chefDeProjetId);
        return chefDeProjet ? chefDeProjet.nom : 'Inconnu';
    };

    const getChercheursNames = (chercheurIds) => {
        const chercheursNames = chercheurs.filter(chercheur => chercheurIds.includes(chercheur.id))
                                           .map(chercheur => chercheur.nom);
        return chercheursNames.join(', ');
    };

    const handleDelete = async (id) => {
        try {
            // Perform delete operation here (implementation depends on your API)
            const response = await fetch(`http://localhost:8000/api/projets/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary headers (e.g., authorization)
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete projet');
            }
            // Update state after successful deletion
            setProjets(projets.filter(projet => projet.id !== id));
            setFilteredProjets(filteredProjets.filter(projet => projet.id !== id));
            alert('Projet supprimé avec succès !');
        } catch (error) {
            console.error('Error deleting projet:', error);
            alert('Échec de la suppression du projet.');
        }
    };

    const handleFilterTitreChange = (e) => {
        const { value } = e.target;
        setFilterTitre(value);
        filterProjets(value, filterDateDebut, filterDateFin);
    };

    const handleFilterDateDebutChange = (e) => {
        const { value } = e.target;
        setFilterDateDebut(value);
        filterProjets(filterTitre, value, filterDateFin);
    };

    const handleFilterDateFinChange = (e) => {
        const { value } = e.target;
        setFilterDateFin(value);
        filterProjets(filterTitre, filterDateDebut, value);
    };

    const filterProjets = (titre, dateDebut, dateFin) => {
        let filtered = projets.filter(projet => {
            let titreMatch = true;
            let dateDebutMatch = true;
            let dateFinMatch = true;

            if (titre) {
                titreMatch = projet.titre.toLowerCase().includes(titre.toLowerCase());
            }
            if (dateDebut) {
                dateDebutMatch = projet.date_debut.toLowerCase().includes(dateDebut.toLowerCase());
            }
            if (dateFin) {
                dateFinMatch = projet.date_fin_prevue.toLowerCase().includes(dateFin.toLowerCase());
            }

            return titreMatch && dateDebutMatch && dateFinMatch;
        });

        setFilteredProjets(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
             <Header/>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Liste des Projets</h3>
                <div>
                    <button
                        className="btn btn-outline-success mx-2"
                        onClick={() => navigate('/add-projet')}
                    >
                        Ajouter Projet
                    </button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Titre"
                        value={filterTitre}
                        onChange={handleFilterTitreChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Date Début"
                        value={filterDateDebut}
                        onChange={handleFilterDateDebutChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Date Fin Prévue"
                        value={filterDateFin}
                        onChange={handleFilterDateFinChange}
                    />
                </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date Début</th>
                        <th scope="col">Date Fin Prévue</th>
                        <th scope="col">Chef de Projet</th>
                        <th scope="col">Chercheurs</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjets.map(projet => (
                        <tr key={projet.id}>
                            <td>{projet.titre}</td>
                            <td>{projet.description}</td>
                            <td>{projet.date_debut}</td>
                            <td>{projet.date_fin_prevue}</td>
                            <td>{getChefDeProjetName(projet.chef_de_projet)}</td>
                            <td>{getChercheursNames(projet.chercheurs)}</td>
                            <td>
                                <button
                                    className="btn btn-outline-primary mx-1"
                                    onClick={() => navigate(`/edit-projet/${projet.id}`)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn btn-outline-danger mx-1"
                                    onClick={() => handleDelete(projet.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Projets;
