import React, { useState, useEffect } from 'react';
import { addPublication, fetchChercheurs } from '../../services/api';

const AddPublication = () => {
    const [titre, setTitre] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [chercheur, setChercheur] = useState('');

    const [chercheurs, setChercheurs] = useState([]);

    useEffect(() => {
        const fetchChercheursData = async () => {
            try {
                const data = await fetchChercheurs();
                setChercheurs(data);
            } catch (error) {
                console.error('Error fetching chercheurs:', error);
            }
        };

        fetchChercheursData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const publicationData = { titre, date, description, chercheur };
            await addPublication(publicationData);
            alert('Publication added successfully!');
            window.location.href = '/publications'; // Redirect to publications list
        } catch (error) {
            console.error('Error adding publication:', error);
            alert('Failed to add publication.');
        }
    };

    return (
        <div className="container mt-4">
            <h3>Ajouter Publication</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titre:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Chercheur:</label>
                    <select
                        className="form-control"
                        value={chercheur}
                        onChange={(e) => setChercheur(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner un chercheur</option>
                        {chercheurs.map(chercheur => (
                            <option key={chercheur.id} value={chercheur.id}>{chercheur.nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
};

export default AddPublication;
