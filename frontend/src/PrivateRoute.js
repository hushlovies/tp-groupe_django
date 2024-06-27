import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem('token') !== null; // Check if user is authenticated

    return (
        <Route
            {...rest}
            element={isLoggedIn ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
