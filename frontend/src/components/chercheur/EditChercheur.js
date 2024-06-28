import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChercheurById, updateChercheur } from '../../services/api';

const EditChercheur = () => {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate();
    const [chercheur, setChercheur] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        specialite: ''
    });

    useEffect(() => {
        const fetchChercheurData = async () => {
            try {
                const data = await fetchChercheurById(id);
                setChercheur(data);
                setFormData({
                    nom: data.nom,
                    specialite: data.specialite
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chercheur:', error);
                setError('Erreur lors du chargement du chercheur.');
                setLoading(false);
            }
        };

        if (id) {
            fetchChercheurData();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedChercheur = {
                nom: formData.nom,
                specialite: formData.specialite
            };
            await updateChercheur(id, updatedChercheur);
            alert('Chercheur mis à jour avec succès !');
            navigate('/chercheurs'); // Navigate to chercheurs list using useNavigate
        } catch (error) {
            console.error('Error updating chercheur:', error);
            alert('Échec de la mise à jour du chercheur.');
        }
    };

    const handleReturn = () => {
        // Go back to the previous page
        navigate(-1);
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5">{error}</div>;
    }

    if (!chercheur) {
        return <div className="container mt-5">Chercheur non trouvé.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="mb-4">Modifier Chercheur</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nom">Nom :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="specialite">Spécialité :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="specialite"
                                        name="specialite"
                                        value={formData.specialite}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3 my-4 ">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        Enregistrer
                                    </button>
                                    <button type="button" className="btn btn-secondary ml-4" onClick={handleReturn}>
                                        Retour
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditChercheur;
