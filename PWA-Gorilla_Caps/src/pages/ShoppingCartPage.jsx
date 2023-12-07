import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShoppingCartPage.css";
// eslint-disable-next-line no-unused-vars
import React from "react";

const ShoppingCartPage = () => {
  const [products, setProducts] = useState([]);

  // @ts-ignore
  const initialCart = JSON.parse(localStorage.getItem("carrito")) || [];

  const dropCart = () => {
    //Si hay productos en el carrito los agregamos a pedidos

    //Si initialCart tiene productos duplicados los eliminamos
    const uniqueCart = initialCart.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    if (localStorage.getItem("carrito") != null) {
      uniqueCart.forEach((producto) => {
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
            localStorage.removeItem("carrito");
            getPedidos();
          });
      });
    }
  };

  //Metodo para obtener los pedidos del api del usuario
  const getPedidos = async () => {
    const response = await fetch(`/api/Pedidos/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  const fromB64 = (b64) => {
    return "data:image/jpeg;base64," + b64;
  };

  useEffect(() => {
    getPedidos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteItem = async (id) => {
    // Hacemos un DELETE a la bd
    fetch(`/api/Pedidos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(() => {
        //Actualizamos la lista de pedidos
        getPedidos();
      })
      .catch((err) => console.log(err));
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
        <div className="col-2">
          {initialCart.length > 0 ? (
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                dropCart();
              }}
            >
              <i className="fa-solid fa-dolly"></i>
              <label className="p-volver">
                Agregar productos pendientes {initialCart.length}
              </label>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {products && products.length > 0 ? (
        <div className="container-comprar-flotante">
          {localStorage.getItem("token") != null ? (
            <Link to={`/PagarTodo/${localStorage.getItem("id")}`}>
              <button className="btn-comprar">
                <i className="fa-solid fa-dolly"></i>Comprar
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="container-comprar-flotante">
          <button className="btn-comprar" hidden>
            Comprar
          </button>
        </div>
      )}
      {}
      <table className="cartPage-table">
        <thead>
          <tr className="cartPage-tr">
            <th className="cartPage-th">Imagen</th>
            <th className="cartPage-th">Nombre</th>
            <th className="cartPage-th">Precio</th>
            <th className="cartPage-th th-cantidad">Cantidad</th>
            <th className="cartPage-th">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((pedido) => (
              <tr
                className="cartPage-tr"
                key={
                  // @ts-ignore
                  pedido.id
                }
              >
                <td className="cartPage-td">
                  <img
                    // @ts-ignore
                    src={fromB64(pedido.producto.imagen)}
                    // @ts-ignore
                    alt={pedido.producto.nombre}
                    className="cartPage-images"
                  />
                  <label className="mobile-cantidad">
                    {
                      // @ts-ignore
                      pedido.cantidad
                    }
                  </label>
                </td>
                <td className="cartPage-td">
                  {
                    // @ts-ignore
                    pedido.producto.nombre
                  }
                </td>
                <td className="cartPage-td">
                  $
                  {
                    // @ts-ignore
                    pedido.producto.precio
                  }
                </td>
                <td className="cartPage-td td-cantidad">
                  {
                    // @ts-ignore
                    pedido.cantidad
                  }
                </td>
                <td className="cartPage-td">
                  <button
                    className="cartPage-delete-item"
                    // @ts-ignore
                    onClick={() => handleDeleteItem(pedido.id)}
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
      </table>
    </div>
  );
};

export default ShoppingCartPage;
