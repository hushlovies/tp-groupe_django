import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chercheurs from './components/chercheur/Chercheurs';
import AddChercheur from './components/chercheur/AddChercheur';
import EditChercheur from './components/chercheur/EditChercheur';
import Projets from './components/projet/Projets';
import AddProjet from './components/projet/AddProjet';
import EditProjet from './components/projet/EditProjet';
import Publications from './components/publication/Publications';
import AddPublication from './components/publication/AddPublication';
import EditPublication from './components/publication/EditPublication';
import Header from './components/Header';
import Home from "./pages/Home"
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login'

function App() {
    return (
        <Router>
            <div className="App container-fluid">
                {/* <Header /> */}
                <div className="row">
                   
                    <div className="container">
                        <div className="content">
                            <Routes>
                                {/* auth */}
                                <Route path="/" element={<Login/>}/>
                                <Route path="login" element={<Login/>}/>
                                <Route path="register" element={<Register/>}/>
                                {/* <Route path='/' element={<Layout/>}/> */}
                                {/* <Route index element={<Home/>}/> */}
                               
                                {/* Chercheurs */}
                               {/*  <Route index element={<Chercheurs />} /> */}
                                {/* <Route path="/" element={<Chercheurs />} /> */}
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
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
