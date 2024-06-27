import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { fetchProjetById, updateProjet, fetchChercheurs } from '../../services/api';

const EditProjet = () => {
    const { id } = useParams(); // Get id from URL params
    const [projetData, setProjetData] = useState({
        titre: '',
        description: '',
        date_debut: '',
        date_fin_prevue: '',
        chef_de_projet: null,
        chercheurs: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chercheursOptions, setChercheursOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProjetById(id);
                setProjetData({
                    titre: data.titre,
                    description: data.description,
                    date_debut: data.date_debut,
                    date_fin_prevue: data.date_fin_prevue,
                    chef_de_projet: { value: data.chef_de_projet.id, label: data.chef_de_projet.nom },
                    chercheurs: data.chercheurs.map(chercheur => ({ value: chercheur.id, label: chercheur.nom })),
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projet:', error);
                setError('Erreur lors du chargement du projet.');
                setLoading(false);
            }
        };
        fetchData();

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
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjetData({ ...projetData, [name]: value });
    };

    const handleChefDeProjetChange = (selectedOption) => {
        setProjetData({ ...projetData, chef_de_projet: selectedOption });
    };

    const handleChercheursChange = (selectedOptions) => {
        setProjetData({ ...projetData, chercheurs: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projetToUpdate = {
                ...projetData,
                chef_de_projet: projetData.chef_de_projet.value, // Sending the ID of chef_de_projet
                chercheurs: projetData.chercheurs.map(chercheur => chercheur.value), // Sending IDs of chercheurs
            };
            await updateProjet(id, projetToUpdate);
            alert('Projet updated successfully!');
            window.location.href = '/projets';
        } catch (error) {
            console.error('Error updating projet:', error);
            alert('Failed to update projet.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h3>Modifier Projet</h3>
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
                        value={projetData.chef_de_projet}
                        onChange={handleChefDeProjetChange}
                        placeholder="Sélectionner le chef de projet"
                        isClearable
                    />
                </div>
                <div className="form-group">
                    <label>Chercheurs:</label>
                    <Select
                        options={chercheursOptions}
                        value={projetData.chercheurs}
                        onChange={handleChercheursChange}
                        placeholder="Sélectionner les chercheurs"
                        isMulti
                    />
                </div>
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>
        </div>
    );
};

export default EditProjet;
