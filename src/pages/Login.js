import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css'

function Login(props) {

    const baseUrl = "https://localhost:44374/api/usuarios";
    const cookies = new Cookies();

    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    useEffect(()=>{
        if(cookies.get('id_user')){
            props.history.push('/menu');
        }
    });

    const iniciarSesion = async () => {
        await axios.get(baseUrl + `/${form.username}/${form.password}`)
            .then(response => {
                return response.data;
            }).then(response => {
                if (response.length > 0) {
                    var respuesta = response[0];
                    cookies.set('id_user', respuesta.id_user, {path: '/'});
                    cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: '/'});
                    cookies.set('apellido_materno', respuesta.apellido_materno, {path: '/'});
                    cookies.set('nombre', respuesta.nombre, {path: '/'});
                    cookies.set('correo', respuesta.correo, {path: '/'});
                    cookies.set('username', respuesta.ussername, {path: '/'});
                    cookies.set('password', respuesta.password, {path: '/'});
                    alert("Bienvenido: "+respuesta.nombre+" "+respuesta.apellido_paterno);
                    props.history.push('/menu');
                } else {
                    alert("El usuario o contraseña es incorrecto");
                }
            }).catch(error => {
                console.log(error);
            });
    }

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
                            <input type="text" className="form-control" placeholder="Usuario" name="username"
                                onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" placeholder="Contraseña" name="password"
                                onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-black" onClick={() => iniciarSesion()}>Login</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;