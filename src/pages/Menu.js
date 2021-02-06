import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/sin_flechas_input.css';
import Cookies from 'universal-cookie';
import CRUD from '../pages/CRUD';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const mostrarCRUD =(
    <CRUD></CRUD>   
)

function Menu(props) {

    const cookies = new Cookies();
    const cerrarSesion = () => {
        cookies.remove('id_user', { path: '/' });
        cookies.remove('apellido_paterno', { path: '/' });
        cookies.remove('apellido_materno', { path: '/' });
        cookies.remove('nombre', { path: '/' });
        cookies.remove('correo', { path: '/' });
        cookies.remove('username', { path: '/' });
        cookies.remove('password', { path: '/' });
        props.history.push('./');
    }

    useEffect(() => {
        if (!cookies.get('id_user')) {
            props.history.push('./');
        }
    });

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <div className="container">
                <Navbar.Brand>CRUD ASP .NET Core</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="https://github.com/sebastian-reyes/Backend_API_ASPNET-Core" target="_blank"><i className="fa fa-database mr-1" aria-hidden="true"></i>Backend</Nav.Link>
                        <Nav.Link href="https://github.com/sebastian-reyes/Fronend-Login-CRUD-React" target="_blank"><i className="fa fa-desktop mr-1" aria-hidden="true"></i>Frontend</Nav.Link>
                        <NavDropdown  title={cookies.get('username')}  id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => cerrarSesion()}><i className="fa fa-sign-out mr-1" aria-hidden="true"></i>Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </div>
            </Navbar>
            <div className="container mt-4 mb-2">
                {mostrarCRUD}
            </div>
            <br />
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container">
                    <ul className="navbar-nav ml-auto">
                        <span className="navbar-brand mb-0 h1 ">2021 Sebastián Reyes</span>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Menu;