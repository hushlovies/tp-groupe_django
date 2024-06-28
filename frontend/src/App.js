import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Chercheurs from './components/chercheur/Chercheurs';
import AddChercheur from './components/chercheur/AddChercheur';
import EditChercheur from './components/chercheur/EditChercheur';
import Projets from './components/projet/Projets';
import AddProjet from './components/projet/AddProjet';
import EditProjet from './components/projet/EditProjet';
import Publications from './components/publication/Publications';
import AddPublication from './components/publication/AddPublication';
import EditPublication from './components/publication/EditPublication';
import Register from './pages/Register';
import Login from './pages/Login'
import AuthError from './pages/AuthError';

function App() {
    return (
        <Router>
            <div className="App container-fluid">
                {/* <Header /> */}
                <div className="row">
                    <div className="col-10">
                        <div className="content">
                            <Routes>
                                {/* auth */}
                                <Route path="/" element={<Login/>}/>
                                <Route path="login" element={<Login/>}/>
                                <Route path="register" element={<Register/>}/>
                                <Route path="/auth-error" element={<AuthError/>}/>
                                
                                {/* Chercheurs */}
                              
                                <Route path="/chercheurs" element={<Chercheurs />} />
                                <Route path="/add-chercheur" element={<AddChercheur />} />
                                <Route path="/chercheurs/:id" element={<EditChercheur />} />

                                {/* Projets */}
                                <Route path="/projets" element={<Projets />} />
                                <Route path="/add-projet" element={<AddProjet />} />
                                <Route path="/edit-projet/:id" element={<EditProjet />} />

                                {/* Publications */}
                                <Route path="/publications" element={<Publications />} />
                                <Route path="/add-publication" element={<AddPublication />} />
                                <Route path="/edit-publication/:id" element={<EditPublication />} />

                                {/* Dashboard */}
                                <Route path="/graphes" element={<Dashboard />}/>

                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
