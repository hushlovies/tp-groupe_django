import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublications, fetchProjets } from '../../services/api';
import ExportButton from '../ExportButton';

const Publications = () => {
    const [projets, setProjets] = useState([]);
    const [publications, setPublications] = useState([]);
    const [filteredPublications, setFilteredPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterTitre, setFilterTitre] = useState('');
    const [filterResume, setFilterResume] = useState('');
    const [filterDatePublication, setFilterDatePublication] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const publicationsData = await fetchPublications();
                setPublications(publicationsData);
                setFilteredPublications(publicationsData); // Initially set filtered publications to all publications

                const projetsData = await fetchProjets();
                setProjets(projetsData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Erreur lors du chargement des publications.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getProjetTitle = (projetId) => {
        const projet = projets.find(projet => projet.id === projetId);
        return projet ? projet.titre : '';
    };

    const handleDelete = async (id) => {
        try {
            // Perform delete operation here (implementation depends on your API)
            const response = await fetch(`http://localhost:8000/api/publications/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary headers (e.g., authorization)
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete publication');
            }
            // Update state after successful deletion
            setPublications(publications.filter(pub => pub.id !== id));
            setFilteredPublications(filteredPublications.filter(pub => pub.id !== id));
            alert('Publication deleted successfully!');
        } catch (error) {
            console.error('Error deleting publication:', error);
            alert('Failed to delete publication.');
        }
    };

    const handleFilterTitreChange = (e) => {
        const { value } = e.target;
        setFilterTitre(value);
        filterPublications(value, filterResume, filterDatePublication);
    };

    const handleFilterResumeChange = (e) => {
        const { value } = e.target;
        setFilterResume(value);
        filterPublications(filterTitre, value, filterDatePublication);
    };

    const handleFilterDatePublicationChange = (e) => {
        const { value } = e.target;
        setFilterDatePublication(value);
        filterPublications(filterTitre, filterResume, value);
    };

    const filterPublications = (titre, resume, datePublication) => {
        let filtered = publications.filter(pub => {
            let titreMatch = true;
            let resumeMatch = true;
            let datePublicationMatch = true;

            if (titre) {
                titreMatch = pub.titre.toLowerCase().includes(titre.toLowerCase());
            }
            if (resume) {
                resumeMatch = pub.resume.toLowerCase().includes(resume.toLowerCase());
            }
            if (datePublication) {
                datePublicationMatch = pub.date_publication.toLowerCase().includes(datePublication.toLowerCase());
            }

            return titreMatch && resumeMatch && datePublicationMatch;
        });

        setFilteredPublications(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Liste des Publications</h3>
                <div>
                    <ExportButton url="/api/export/publications/" filename="publications.csv" />
                </div>
                <div>
                    <Link to="/add-publication">
                        <button className="btn btn-outline-success mx-2">Ajouter une pblication</button>
                    </Link>
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
                        placeholder="Résumé"
                        value={filterResume}
                        onChange={handleFilterResumeChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Date de Publication"
                        value={filterDatePublication}
                        onChange={handleFilterDatePublicationChange}
                    />
                </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Résumé</th>
                        <th scope="col">Projet Associé</th>
                        <th scope="col">Date de Publication</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPublications.map(publication => (
                        <tr key={publication.id}>
                            <td>{publication.titre}</td>
                            <td>{publication.resume}</td>
                            <td>{getProjetTitle(publication.projet_associe)}</td>
                            <td>{publication.date_publication}</td>
                            <td>
                                <Link to={`/edit-publication/${publication.id}`}>
                                    <button className="btn btn-outline-primary mx-1">Modifier</button>
                                </Link>
                                <button
                                    className="btn btn-outline-danger mx-1"
                                    onClick={() => handleDelete(publication.id)}
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

export default Publications;
