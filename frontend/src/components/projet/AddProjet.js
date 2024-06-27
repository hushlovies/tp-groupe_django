import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { addProjet, fetchChercheurs } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AddProjet = () => {
    const navigate = useNavigate();

    const [projetData, setProjetData] = useState({
        titre: '',
        description: '',
        date_debut: '',
        date_fin_prevue: '',
        chef_de_projet: '', // ID du chef de projet sélectionné
        chercheurs: [], // Tableau d'IDs des chercheurs sélectionnés
    });

    const [chercheursOptions, setChercheursOptions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChercheursData = async () => {
            try {
                const data = await fetchChercheurs();
                const options = data.map(chercheur => ({
                    value: chercheur.id,
                    label: chercheur.nom,
                }));
                setChercheursOptions(options);
            } catch (error) {
                console.error('Error fetching chercheurs:', error);
                setError('Failed to fetch chercheurs.');
            }
        };

        fetchChercheursData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjetData({ ...projetData, [name]: value });
    };

    const handleChefDeProjetChange = (selectedOption) => {
        if (selectedOption) {
            setProjetData({ ...projetData, chef_de_projet: selectedOption.value });
        } else {
            setProjetData({ ...projetData, chef_de_projet: '' });
        }
    };

    const handleChercheurChange = (selectedOptions) => {
        const chercheurIds = selectedOptions.map(option => option.value);
        setProjetData({ ...projetData, chercheurs: chercheurIds });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProjet(projetData);
            alert('Projet ajouté avec succès !');
            navigate('/projets'); // Navigate to projets list using useNavigate
        } catch (error) {
            console.error('Error adding projet:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.detail || 'Failed to add projet.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="container mt-4">
            <h3>Ajouter Projet</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titre:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="titre"
                        value={projetData.titre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={projetData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de début:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date_debut"
                        value={projetData.date_debut}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de fin prévue:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date_fin_prevue"
                        value={projetData.date_fin_prevue}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Chef de Projet:</label>
                    <Select
                        options={chercheursOptions}
                        value={chercheursOptions.find(option => option.value === projetData.chef_de_projet)}
                        onChange={handleChefDeProjetChange}
                        placeholder="Sélectionner le chef de projet"
                        isClearable
                    />
                </div>
                <div className="form-group">
                    <label>Chercheurs:</label>
                    <Select
                        options={chercheursOptions}
                        value={chercheursOptions.filter(option => projetData.chercheurs.includes(option.value))}
                        onChange={handleChercheurChange}
                        isMulti
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
};

export default AddProjet;
