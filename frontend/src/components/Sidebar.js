import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar mt-5">

            <div class="list-group">
            <Link to="/chercheurs" className="list-group-item list-group-item-action" aria-current="true">
                Chercheurs
            </Link>
            <Link to="/projets" className="list-group-item list-group-item-action">
                Projets
            </Link>
            <Link to="/publications" className="list-group-item list-group-item-action">
                Publications
            </Link>
            </div>
        </div>
        
    );
};

export default Sidebar;
