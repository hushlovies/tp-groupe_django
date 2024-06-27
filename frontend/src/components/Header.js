import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <nav className="navbar navbar-light bg-light  p-3">
                <a className="navbar-brand" href="/chercheurs/">Lists</a>
                <form className="form-inline">
                
                    <button className="btn btn-outline-success my-2 my-sm-0">Logout</button>
                </form>
            </nav>
        </div>
    );
};

export default Header;
