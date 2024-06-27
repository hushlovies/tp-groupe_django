import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/accounts/user/", config);
                    setLoggedIn(true);
                    setUsername(response.data.username);
                } else {
                    setLoggedIn(false);
                    setUsername('');
                }
            } catch (error) {
                console.error('Error checking logged in user:', error);
                setLoggedIn(false);
                setUsername('');
            }
        };
        checkLoggedInUser();
    }, []);

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (accessToken && refreshToken) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                };
                await axios.post("http://127.0.0.1:8000/api/accounts/logout/", { refresh: refreshToken }, config);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setLoggedIn(false);
                setUsername('');
                console.log("Logout successful!");
                // Redirect to the login page
                navigate('/login');
            }
        } catch (error) {
            console.error("Failed to logout", error.response?.data || error.message);
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="mb-3">
            <Navbar.Brand href="/chercheurs/">Lists</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/chercheurs">Chercheurs</Nav.Link>
                    <Nav.Link as={Link} to="/projets">Projets</Nav.Link>
                    <Nav.Link as={Link} to="/publications">Publications</Nav.Link>
                </Nav>
                {isLoggedIn ? (
                    <Nav>
                        <NavDropdown title={<FontAwesomeIcon icon={faUser} />}>
                            <NavDropdown.Item disabled>Hi, {username}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                ) : (
                    <p>Please log in</p>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
