import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';

const Chercheurs = () => {
    const [chercheurs, setChercheurs] = useState([]);
    const [filteredChercheurs, setFilteredChercheurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterNom, setFilterNom] = useState('');
    const [filterSpecialite, setFilterSpecialite] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    // Redirect to login if token is not present
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://127.0.0.1:8000/api/chercheurs/', config);
                setChercheurs(response.data);
                setFilteredChercheurs(response.data); // Initially set filtered data to all chercheurs
                setLoading(false);
            } catch (error) {
                console.error('Erreur :', error);
                setError('Erreur lors du chargement des chercheurs.');
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this chercheur?')) {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    // Redirect to login if token is not present
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                await axios.delete(`http://127.0.0.1:8000/api/chercheurs/${id}/`, config);
                alert('Delete successfully');
                fetchChercheursData();
            } catch (error) {
                console.error('Erreur lors de la suppression du chercheur :', error);
            }
        }
    };

    const fetchChercheursData = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                // Redirect to login if token is not present
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get('http://127.0.0.1:8000/api/chercheurs/', config);
            setChercheurs(response.data);
            applyFilters(response.data); // Reapply filters after fetching fresh data
        } catch (error) {
            console.error('Erreur :', error);
        }
    };

    const filterByNom = (nom) => {
        const filtered = chercheurs.filter(chercheur =>
            chercheur.nom.toLowerCase().includes(nom.toLowerCase())
        );
        setFilteredChercheurs(filtered);
        setFilterNom(nom);
    };

    const filterBySpecialite = (specialite) => {
        const filtered = chercheurs.filter(chercheur =>
            chercheur.specialite.toLowerCase().includes(specialite.toLowerCase())
        );
        setFilteredChercheurs(filtered);
        setFilterSpecialite(specialite);
    };

    const clearFilters = () => {
        setFilterNom('');
        setFilterSpecialite('');
        setFilteredChercheurs(chercheurs);
    };

    const applyFilters = (data) => {
        let filtered = [...data];
        if (filterNom) {
            filtered = filtered.filter(chercheur =>
                chercheur.nom.toLowerCase().includes(filterNom.toLowerCase())
            );
        }
        if (filterSpecialite) {
            filtered = filtered.filter(chercheur =>
                chercheur.specialite.toLowerCase().includes(filterSpecialite.toLowerCase())
            );
        }
        setFilteredChercheurs(filtered);
    };

    const handleChangeNom = (e) => {
        const { value } = e.target;
        filterByNom(value);
    };

    const handleChangeSpecialite = (e) => {
        const { value } = e.target;
        filterBySpecialite(value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <Header/>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Liste des Chercheurs</h3>
                <div>
                    <Link to="/add-chercheur">
                        <button className="btn btn-outline-success my-2 my-sm-0">Ajouter un chercheur</button>
                    </Link>
                </div>
            </div>

            <div className="row border my-3 mx-1 py-3">
                <div className="col-md-5">
                    <div className="">
                        <div className="form-group mx-2">
                            <input
                                placeholder='Nom'
                                type="text"
                                className="form-control"
                                id="nom"
                                value={filterNom}
                                onChange={handleChangeNom}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="">
                        <div className="form-group mx-2">
                            <input
                                placeholder='Spécialité'
                                type="text"
                                className="form-control"
                                id="specialite"
                                value={filterSpecialite}
                                onChange={handleChangeSpecialite}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-1">
                    <div className="">
                        <button className="btn btn-outline-secondary mx-2" onClick={clearFilters}>Effacer</button>
                    </div>
                </div>
            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Spécialité</th>
                        <th scope="col" className="text-center" style={{ width: '270px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredChercheurs.map(chercheur => (
                        <tr key={chercheur.id}>
                            <td>{chercheur.nom}</td>
                            <td>{chercheur.specialite}</td>
                            <td className="text-center">
                                <Link to={`/chercheurs/${chercheur.id}`}>
                                    <button className="btn btn-outline-success mx-1">Modifier</button>
                                </Link>
                                <button className="btn btn-outline-danger mx-1" onClick={() => handleDelete(chercheur.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Chercheurs;
