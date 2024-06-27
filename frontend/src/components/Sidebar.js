import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar mt-5">
      <div className="list-group">
        <Link
          to="/chercheurs"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Chercheurs
        </Link>
        <Link to="/projets" className="list-group-item list-group-item-action">
          Projets
        </Link>
        <Link
          to="/publications"
          className="list-group-item list-group-item-action"
        >
          Publications
        </Link>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
