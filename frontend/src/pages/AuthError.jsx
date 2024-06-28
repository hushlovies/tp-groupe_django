import React from 'react';
import { Link } from 'react-router-dom';

const AuthError = () => {
    return (
        <div className="container mt-4">
            <h3>Authentication Error</h3>
            <p>You need to log in to access this page.</p>
            <Link to="/login">
                <button className="btn btn-primary">Go to Login</button>
            </Link>
        </div>
    );
};

export default AuthError;
