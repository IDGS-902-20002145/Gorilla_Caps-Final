/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = ({ carrito, setCarrito }) => {
    //State para contraer o expandir el carrito
    const [cartOpen, setCartOpen] = useState(false);

    // Función para inicializar el carrito desde localStorage
    const init = () => {
        const storedCart = localStorage.getItem("carrito");
        return storedCart ? JSON.parse(storedCart) : [];
    }

    // Cargar el carrito inicial al montar el componente
    useEffect(() => {
        setCarrito(init());
        if (cartOpen === true) {
            const cartContainer = document.querySelector('.floating-cart');
            cartContainer.style.width = '350px';
        } else {
            const cartContainer = document.querySelector('.floating-cart');
            cartContainer.style.width = '50px';
        }
    }, [setCarrito, cartOpen]);

    // Manejar la eliminación de productos del carrito
    const eliminarProducto = (id) => {
        const nuevoCarrito = carrito.filter(producto => producto.id !== id);
        setCarrito(nuevoCarrito);
    };

    //Función para decodificar la imagen que viene en base64
    const fromB64 = (b64) => {
        return "data:image/jpeg;base64," + b64;
    };

    const addQuantity = (id) => {
        const nuevoCarrito = carrito.map((producto) => {
            if (producto.id === id && producto.cantidad < producto.stock_existencia) {
                return { ...producto, cantidad: producto.cantidad + 1 };
            } else {
                return producto;
            }
        });
        setCarrito(nuevoCarrito);
    };

    const removeQuantity = (id) => {
        const nuevoCarrito = carrito.map((producto) => {
            if (producto.id === id && producto.cantidad > 1) {
                return { ...producto, cantidad: producto.cantidad - 1 };
            } else {
                return producto;
            }
        });
        setCarrito(nuevoCarrito);
    };

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);


    return (
        <div className="cart-component">
            <div className="cart-header">
                <button className="cart-button"
                    onClick={() => setCartOpen(!cartOpen)}
                ><i className="fa-solid fa-cart-shopping"></i></button>
            </div>
            {cartOpen && (
                <div className="cart-container">
                    <div className="row">
                        <Link to="/Carrito" className="cartToPay btn btn-outline-primary">Comprar carrito</Link>
                    </div>
                    {carrito && carrito.length > 0 ? (
                        <div className="cart-items">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Agregar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map((product) => (

                                        <tr key={product.id} className="cart-product">
                                            <td><img src={fromB64(product.imagen)} alt={product.nombre} className="cart-image" /></td>
                                            <td>{product.nombre}</td>
                                            <td>${product.precio}</td>
                                            <td>{product.cantidad}</td>
                                            <td>
                                                <div className="row marg">
                                                    <div className="col-2">
                                                        <button className="btn btn-info btn-sm cart-add" onClick={() => addQuantity(product.id)}><b>
                                                            <i className="fa-solid fa-angle-up"></i></b></button>
                                                    </div>
                                                    <div className="col-2">
                                                        <button className="btn btn-info btn-sm cart-remove" onClick={() => removeQuantity(product.id)}>
                                                            <b><i className="fa-solid fa-angle-down"></i></b>
                                                        </button>
                                                    </div>
                                                </div>


                                            </td>

                                            <td><button className="cart-delete-item"
                                                onClick={() => eliminarProducto(product.id)}
                                            >Eliminar</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No hay productos en el carrito</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Cart;
