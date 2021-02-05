import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Cookies from 'universal-cookie';
import CRUD from '../pages/CRUD';

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">CRUD ASP. NET Core</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navtop" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navtop">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {cookies.get('username')}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button className="dropdown-item" onClick={() => cerrarSesion()}>Cerrar Sesion</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <CRUD />
            </div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-bottom bg-black">
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