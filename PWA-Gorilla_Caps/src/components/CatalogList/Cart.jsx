/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Cart.css";
// eslint-disable-next-line no-unused-vars
import React from "react";
import Swal from "sweetalert2";

const Cart = ({ carrito, setCarrito }) => {
  //State para contraer o expandir el carrito
  const [cartOpen, setCartOpen] = useState(false);

  // Función para inicializar el carrito desde localStorage
  const init = () => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  // Cargar el carrito inicial al montar el componente
  useEffect(() => {
    setCarrito(init());
    if (cartOpen === true) {
      const cartContainer = document.querySelector(".floating-cart");
      // @ts-ignore
      cartContainer.style.width = "350px";
    } else {
      const cartContainer = document.querySelector(".floating-cart");
      // @ts-ignore
      cartContainer.style.width = "50px";
    }
  }, [setCarrito, cartOpen]);

  // Manejar la eliminación de productos del carrito
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
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

  const getTotalQuantity = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const sweetAlert = () => {
    Swal.fire({
      title: "Inicia sesión para comprar",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Iniciar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/login";
      }
    });
  };

  const passToOrders = () => {
    console.log("Ir a pedidos");
    //Pasamos el carrito a pedidos si el usuario está autenticado
    if (localStorage.getItem("token") != null) {
      carrito.forEach((producto) => {
        //Construimos el producto para el pedido
        const product = {
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock_existencia: producto.stock_existencia,
          imagen: producto.imagen,
          modelo: producto.modelo,
          color: producto.color,
          estatus: producto.estatus,
        };
        //Construimos el objeto pedidoProducto por cada producto en el carrito

        const pedidoProducto = {
          id: 0,
          UserId: localStorage.getItem("id"),
          fecha: new Date(),
          estatus: 1,
          cantidad: producto.cantidad,
          producto: product,
        };
        console.log(pedidoProducto);
        //Enviamos el pedidoProducto a la API
        fetch("/api/Pedidos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(pedidoProducto),
        })
          .then((res) => res.json())
          .then(() => {
            //Limpiamos el carrito
            setCarrito([]);

            //LLevamos a /Carrito
            window.location.href = "/Carrito";
          });
      });
    } else {
      sweetAlert();
    }
  };

  return (
    <div className="cart-component">
      <div className="cart-header">
        <button className="cart-button" onClick={() => setCartOpen(!cartOpen)}>
          {carrito.length > 0 && (
            <div className="cart-counter">{getTotalQuantity()}</div>
          )}
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
      {cartOpen && (
        <div className="cart-container">
          {carrito && carrito.length > 0 ? (
            <div className="cart-items">
              <div className="row">
                <button className="cartToPay" onClick={passToOrders}>
                  Comprar carrito
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th className="th-cantidad">Cantidad</th>
                    <th>Agregar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((product) => (
                    <tr key={product.id} className="cart-product">
                      <td>
                        <img
                          src={fromB64(product.imagen)}
                          alt={product.nombre}
                          className="cart-image"
                        />
                      </td>
                      <td>{product.nombre}</td>
                      <td>${product.precio}</td>
                      <td>{product.cantidad}</td>
                      <td>
                        <div className="row marg">
                          <div className="col-2">
                            <button
                              className="btn btn-info btn-sm cart-add"
                              onClick={() => addQuantity(product.id)}
                            >
                              <b>
                                <i className="fa-solid fa-angle-up"></i>
                              </b>
                            </button>
                          </div>
                          <div className="col-2">
                            <button
                              className="btn btn-info btn-sm cart-remove"
                              onClick={() => removeQuantity(product.id)}
                            >
                              <b>
                                <i className="fa-solid fa-angle-down"></i>
                              </b>
                            </button>
                          </div>
                        </div>
                      </td>

                      <td>
                        <button
                          className="cart-delete-item"
                          onClick={() => eliminarProducto(product.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
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
  );
};

export default Cart;
