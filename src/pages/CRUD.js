import React from 'react';
import '../css/CRUD.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function CRUD(props) {
    return (
        <div>
            <h1 className="text-center">Mantenimiento de tabla Productos</h1>
            <div className="table-responsive mt-4">
                <table className="table ">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Precio</th>
                            <th colSpan="2" className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Monitor 144Hz</td>
                            <td>Monitor 4K 27'' Marca AOC</td>
                            <td>3</td>
                            <td>S/. 1500.50</td>
                            <td><button className="btn btn-info">Actualizar</button></td>
                            <td><button className="btn btn-danger">Eliminar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default CRUD;