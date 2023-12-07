import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./ShoppingCartPage.css";
// eslint-disable-next-line no-unused-vars
import React from "react";

const ShoppingCartPage = () => {
  // Método para obtener los productos del carrito del localStorage
  const getProducts = () => {
    // @ts-ignore
    const products = JSON.parse(localStorage.getItem("carrito"));
    return products || [];
  };

  const [products, setProducts] = useState(getProducts());

  const fromB64 = (b64) => {
    return "data:image/jpeg;base64," + b64;
  };

  const addQuantity = (id) => {
    const updatedProducts = products.map((producto) => {
      if (producto.id === id && producto.cantidad < producto.stock_existencia) {
        return { ...producto, cantidad: producto.cantidad + 1 };
      } else {
        return producto;
      }
    });
    setProducts(updatedProducts);
  };

  const removeQuantity = (id) => {
    const updatedProducts = products.map((producto) => {
      if (producto.id === id && producto.cantidad > 1) {
        return { ...producto, cantidad: producto.cantidad - 1 };
      } else {
        return producto;
      }
    });
    setProducts(updatedProducts);
  };

  const eliminarProducto = (id) => {
    const updatedProducts = products.filter((producto) => producto.id !== id);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(products));
  }, [products]);

  const getTotalQuantity = () => {
    return products.reduce((total, producto) => total + producto.cantidad, 0);
  };

  // Función para calcular el subtotal de todos los productos en el carrito
  const getSubtotal = () => {
    const subtotal = products.reduce(
      (subtotal, producto) => subtotal + producto.precio * producto.cantidad,
      0
    );
    return subtotal.toFixed(2);
  };

  //FUNCION QUE OBTIENE EL CARRITO DEL LOCALSTORAGE Y LO ENVIA A LA API
  const handleConfirmOrder = () => {
    //Hacemos vaciado de carrito a la bd
    if (localStorage.getItem("token") != null) {
      products.forEach((producto) => {
        //Construimos el objeto pedidoProducto por cada producto en el carrito
        const pedidoProducto = {
          id: 0,
          UserId: localStorage.getItem("id"),
          fecha: new Date(),
          estatus: 0,
          cantidad: producto.cantidad,
          producto: producto,
        };
        fetch("/api/Pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          //agregamos el token de autenticacion
          // @ts-ignore
          authorization: `Bearer ${localStorage.getItem("token")}`,
          body: JSON.stringify(pedidoProducto),
        });
      });
    } else {
      //Redireccionamos a login
      return <Navigate to="/login" />;
    }
  };
  /*-----------------------------------------------------------------------*/

  return (
    <div className="cartPage-containerPrincipal">
      <div className="row cartPage-header">
        <div className="col-2">
          <Link to="/Catalogo" className="btn btn-primary mb-3">
            <i className="fa-solid fa-arrow-left"></i>
            <label className="p-volver"></label>
          </Link>
        </div>
        <div className="col-8">
          <h1>Carrito de compras</h1>
        </div>
      </div>

      {products && products.length > 0 ? (
        <div className="container-comprar-flotante">
          {localStorage.getItem("token") != null ? (
            <Link to="/PagarTodo/:id">
              <button className="btn-comprar">
                <i className="fa-solid fa-dolly"></i>Comprar
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn-comprar" onClick={handleConfirmOrder}>
                <i className="fa-solid fa-lock-open"></i> Confirmar pedido
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="container-comprar-flotante">
          <button className="btn-comprar" hidden>
            Comprar
          </button>
        </div>
      )}
      <table className="cartPage-table">
        <thead>
          <tr className="cartPage-tr">
            <th className="cartPage-th">Imagen</th>
            <th className="cartPage-th">Nombre</th>
            <th className="cartPage-th">Precio</th>
            <th className="cartPage-th th-cantidad">Cantidad</th>
            <th className="cartPage-th">Agregar</th>
            <th className="cartPage-th">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((producto) => (
              <tr className="cartPage-tr" key={producto.id}>
                <td className="cartPage-td">
                  <img
                    src={fromB64(producto.imagen)}
                    alt={producto.nombre}
                    className="cartPage-images"
                  />
                  <label className="mobile-cantidad">{producto.cantidad}</label>
                </td>
                <td className="cartPage-td">{producto.nombre}</td>
                <td className="cartPage-td">${producto.precio}</td>
                <td className="cartPage-td td-cantidad">{producto.cantidad}</td>
                <td className="cartPage-td td-wd">
                  <button
                    className="quantity-buttons"
                    onClick={() => addQuantity(producto.id)}
                  >
                    +
                  </button>
                  <button
                    className="quantity-buttons"
                    onClick={() => removeQuantity(producto.id)}
                  >
                    -
                  </button>
                </td>
                <td className="cartPage-td">
                  <button
                    className="cartPage-delete-item"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="cartPage-tr">
              <td
                className="cartPage-td"
                // @ts-ignore
                colSpan="6"
              >
                No hay productos en el carrito
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="cartPage-tr">
            <td
              className="cartPage-td"
              // @ts-ignore
              colSpan="3"
            ></td>
            <td className="cartPage-td">
              <b>Total:</b> {getTotalQuantity()} productos
            </td>
            <td className="cartPage-td">
              <b>Subtotal:</b> ${getSubtotal()}
            </td>
            <td className="cartPage-td"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ShoppingCartPage;
