import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPublicationById, updatePublication, fetchProjets } from '../../services/api';

const EditPublication = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [publicationData, setPublicationData] = useState({
        titre: '',
        resume: '',
        projet_associe: '',
        date_publication: ''
    });

    const [projets, setProjets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const publication = await fetchPublicationById(id);
                setPublicationData(publication);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors du chargement de la publication:', error);
                setError('Erreur lors du chargement de la publication.');
                setLoading(false);
            }

            try {
                const projetsData = await fetchProjets();
                setProjets(projetsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublicationData({ ...publicationData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePublication(id, publicationData);
            alert('Publication modifiée avec succès !');
            navigate('/publications'); // Redirect to the publications list
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la publication:', error);
            alert('Échec de la mise à jour de la publication.');
        }
    };

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h3>Modifier Publication</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titre:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="titre"
                        value={publicationData.titre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Résumé:</label>
                    <textarea
                        className="form-control"
                        name="resume"
                        value={publicationData.resume}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Projet Associé:</label>
                    <select
                        className="form-control"
                        name="projet_associe"
                        value={publicationData.projet_associe}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionner un projet</option>
                        {projets.map(projet => (
                            <option key={projet.id} value={projet.id}>{projet.titre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date de Publication:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date_publication"
                        value={publicationData.date_publication}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>
        </div>
    );
};

export default EditPublication;
