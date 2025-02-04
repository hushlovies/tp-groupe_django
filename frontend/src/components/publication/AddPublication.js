import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPublication, fetchProjets } from '../../services/api';
import Select from 'react-select';

const AddPublication = () => {
    const navigate = useNavigate();

    const [publicationData, setPublicationData] = useState({
        titre: '',
        resume: '',
        projet_associe: '',
        date_publication: ''
    });

    const [projets, setProjets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjetsData = async () => {
            try {
                const data = await fetchProjets();
                setProjets(data);
            } catch (error) {
                console.error('Error fetching projets:', error);
                setError('Failed to fetch projets.');
            }
        };

        fetchProjetsData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublicationData({ ...publicationData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPublication(publicationData);
            alert('Publication ajoutée avec succès !');
            navigate('/publications'); // Redirect to publications list
        } catch (error) {
            console.error('Error adding publication:', error);
            alert('Échec de l\'ajout de la publication.');
        }
    };

    return (
        <div className="container mt-4">
            <h3>Ajouter Publication</h3>
            {error && <div className="alert alert-danger">{error}</div>}
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
                    <label>Projet associé:</label>
                    <Select
                        options={projets.map(projet => ({ value: projet.id, label: projet.titre }))}
                        value={projets.find(projet => projet.id === publicationData.projet_associe)}
                        onChange={option => setPublicationData({ ...publicationData, projet_associe: option.value })}
                        placeholder="Sélectionner un projet"
                        isClearable
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de publication:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date_publication"
                        value={publicationData.date_publication}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
};

export default AddPublication;
