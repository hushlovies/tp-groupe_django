import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-light bg-light p-3">
        <Link className="navbar-brand" to="/chercheurs/">Lists</Link>
        <Link className="navbar-brand" to="/graphes/">Graphiques</Link>
        <form className="form-inline">
          <button className="btn btn-outline-success my-2 my-sm-0">Logout</button>
        </form>
      </nav>
    </div>
  );
};

export default Header;
