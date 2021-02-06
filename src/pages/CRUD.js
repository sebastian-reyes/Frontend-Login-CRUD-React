import React, { useState, useEffect } from 'react';
import '../css/CRUD.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Swal from 'sweetalert2';

function CRUD(props) {
    const baseUrl = "https://localhost:44374/api/productos";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [prodSelect, setprodSelect] = useState({
        id_prod: '',
        nombre_prod: '',
        desc_prod: '',
        stock_min: '',
        stock_actual: '',
        precio: ''
    });

    const abrirCerrarModal = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const alertEliminar = (id) => {
        Swal.fire({
            title: 'Estás seguro de eliminar este producto?',
            text: "Los cambios son irreversibles",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimínalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteProducto(id);
                Swal.fire(
                    'Producto eliminado!',
                    'El producto fue eliminado.',
                    'success'
                );
            }
        });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setprodSelect({
            ...prodSelect,
            [name]: value
        });
    }

    //Petición GET
    const getProductos = async () => {
        await axios.get(baseUrl).then(response => {
            setData(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    //Petición POST
    const postProducto = async () => {

        //Convirtiendo valores de texto a int, o decimal
        prodSelect.id_prod = parseInt(prodSelect.id_prod);
        prodSelect.stock_min = parseInt(prodSelect.stock_min);
        prodSelect.stock_actual = parseInt(prodSelect.stock_actual);
        prodSelect.precio = parseFloat(prodSelect.precio);

        await axios.post(baseUrl, prodSelect).then(response => {
            setData(data.concat(response.data));
            abrirCerrarModal();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto registrado',
                showConfirmButton: false,
                timer: 1000
            });
        }).catch(error => {
            console.log(error);
        })
    }

    //Petición PUT
    const putProducto = async () => {

        //Convirtiendo valores de texto a int, o decimal
        prodSelect.id_prod = parseInt(prodSelect.id_prod);
        prodSelect.stock_min = parseInt(prodSelect.stock_min);
        prodSelect.stock_actual = parseInt(prodSelect.stock_actual);
        prodSelect.precio = parseFloat(prodSelect.precio);

        await axios.put(baseUrl + "/" + prodSelect.id_prod, prodSelect).then(response => {
            var respuesta = response.data;
            var dataAux = data;
            dataAux.map(producto => {
                if (producto.id_prod === respuesta.id_prod) {
                    producto.nombre_prod = respuesta.nombre_prod;
                    producto.desc_prod = respuesta.desc_prod;
                    producto.stock_min = respuesta.stock_min;
                    producto.stock_actual = respuesta.stock_actual;
                    producto.precio = respuesta.precio;
                }
                return producto;
            }); 
            abrirCerrarModalEditar();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto actualizado',
                showConfirmButton: false,
                timer: 1500
            });
        }).catch(error => {
            console.log(error);
        });
    }

    //Petición DELETE
    const DeleteProducto = async (id) => {
        await axios.delete(baseUrl + "/" + id).then(response => {
            setData(data.filter(producto=>producto.id_prod!==response.data));
        }).catch(error=>{
            console.log(error);
        })
    }

    const seleccionarProducto = (prod, caso) => {
        setprodSelect(prod);
        (caso === "editar") && abrirCerrarModalEditar();
    }

    useEffect(() => {
        getProductos();
    }, [])

    return (
        <div>
            <h1 className="text-center">Mantenimiento de tabla Productos</h1>
            <br />
            <button className="btn btn-success" onClick={() => abrirCerrarModal()}><i className="fa fa-plus mr-1" aria-hidden="true"></i>Nuevo Producto</button>
            <br />
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
                        {data.map(producto => (
                            <tr key={producto.id_prod}>
                                <th>{producto.id_prod}</th>
                                <td>{producto.nombre_prod}</td>
                                <td>{producto.desc_prod}.</td>
                                <td>{producto.stock_actual}</td>
                                <th>S/.{producto.precio}</th>
                                <td><button className="btn btn-info" onClick={() => seleccionarProducto(producto, "editar")}><i className="fa fa-pencil mr-1" aria-hidden="true"></i>Actualizar</button></td>
                                <td><button className="btn btn-danger" onClick={() => alertEliminar(producto.id_prod)}><i className="fa fa-trash-o mr-1" aria-hidden="true"></i>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalInsertar}>
                <ModalHeader className="bg-black text-white">
                    Registrar nuevo producto
                </ModalHeader>
                <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label>ID. Prod:</label>
                            <input type="number" className="form-control" placeholder="ID" name="id_prod" onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-9">
                            <label>Nombre:</label>
                            <input type="text" className="form-control" placeholder="Nombre del producto" name="nombre_prod" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea className="form-control" rows="4" name="desc_prod" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Stock Mínimo:</label>
                            <input type="number" className="form-control" placeholder="Stock mínimo" name="stock_min" onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Stock Actual:</label>
                            <input type="number" className="form-control" placeholder="Stock actual" name="stock_actual" onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">S/.</span>
                                </div>
                                <input type="number" className="form-control" placeholder="Precio" name="precio" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModal()}>Cancelar</button>{"   "}
                    <button className="btn btn-warning" onClick={() => postProducto()}>Crear</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    Editar nuevo producto
                </ModalHeader>
                <ModalBody>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label>ID. Prod:</label>
                            <input type="number" className="form-control" readOnly name="id_prod" value={prodSelect && prodSelect.id_prod} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-9">
                            <label>Nombre:</label>
                            <input type="text" className="form-control" name="nombre_prod" value={prodSelect && prodSelect.nombre_prod} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea className="form-control" rows="4" name="desc_prod" value={prodSelect && prodSelect.desc_prod} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Stock Mínimo:</label>
                            <input type="number" className="form-control" name="stock_min" value={prodSelect && prodSelect.stock_min} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Stock Actual:</label>
                            <input type="number" className="form-control" name="stock_actual" value={prodSelect && prodSelect.stock_actual} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">S/.</span>
                                </div>
                                <input type="number" className="form-control" name="precio" value={prodSelect && prodSelect.precio} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>{"   "}
                    <button className="btn btn-warning" onClick={() => putProducto()}>Editar</button>
                </ModalFooter>
            </Modal>

        </div>

    );
}

export default CRUD;