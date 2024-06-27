import React, { useState } from 'react';
import { addChercheur } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AddChercheur = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newChercheur = { nom, specialite };
            await addChercheur(newChercheur);
            setNom('');
            setSpecialite('');
            alert('Chercheur ajouté avec succès !');
            navigate('/chercheurs');
        } catch (error) {
            console.error('Error adding chercheur:', error);
            alert('Échec de l\'ajout du chercheur.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="mb-4">Ajouter un Chercheur</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nom">Nom :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nom"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="specialite">Spécialité :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="specialite"
                                        value={specialite}
                                        onChange={(e) => setSpecialite(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddChercheur;
