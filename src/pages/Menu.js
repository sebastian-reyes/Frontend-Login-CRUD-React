import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Cookies from 'universal-cookie';

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbottom" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbottom">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="btn btn-light" href="https://github.com/sebastian-reyes/Fronend-Login-CRUD-React"><i className="fa fa-github" aria-hidden="true"></i> Frontend <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-light ml-2" href="https://github.com/sebastian-reyes/API_Login_CRUD"><i className="fa fa-github" aria-hidden="true"></i> Backend <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Menu;