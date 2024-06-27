import React, { useState } from 'react';
import { addChercheur } from '../../services/api';

const AddChercheur = () => {
    const [nom, setNom] = useState('');
    const [specialite, setSpecialite] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newChercheur = { nom, specialite };
            await addChercheur(newChercheur);
            setNom('');
            setSpecialite('');
            alert('Chercheur added successfully!');
            window.location.href = '/chercheurs';
        } catch (error) {
            console.error('Error adding chercheur:', error);
            alert('Failed to add chercheur.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nom">Nom:</label>
                <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="specialite">Spécialité:</label>
                <input type="text" className="form-control" id="specialite" value={specialite} onChange={(e) => setSpecialite(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Ajouter</button>
        </form>
    );
};

export default AddChercheur;
