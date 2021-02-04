import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css'

function Login(props) {
    return (
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>CRUD en ASP.NET Core + React</h2>
                    <p>Ingrese su usuario y contraseña</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-4 col-sm-12">
                    <div className="login-form">
                        <h3>Login</h3>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input type="text" className="form-control" placeholder="Usuario" />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña" />
                        </div>
                        <button type="submit" class="btn btn-black">Login</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;