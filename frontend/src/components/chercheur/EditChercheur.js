import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChercheurById, updateChercheur } from '../../services/api';

const EditChercheur = () => {
    const { id } = useParams(); // Get id from URL params
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
            alert('Chercheur updated successfully!');
            window.location.href = '/chercheurs';
        } catch (error) {
            console.error('Error updating chercheur:', error);
            alert('Failed to update chercheur.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!chercheur) {
        return <div>Chercheur not found.</div>;
    }

    return (
        <div>
            <h2>Modifier Chercheur</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="specialite">Spécialité:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="specialite"
                        name="specialite"
                        value={formData.specialite}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    );
};

export default EditChercheur;
