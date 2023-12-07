// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Pagar.css";

const Pagar = () => {
  const cardHeaderStyle = {
    fontFamily: "'Times New Roman', Times, serif",
  };
  const [detProductos, setDetProductos] = useState([]);
  const [, setPedidos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const idUsuario = Number(localStorage.getItem("id"));
    //const carrito = localStorage.getItem("carrito");
    getPagarTodo(idUsuario);
  }, []);

  const getPagarTodo = async (idUsuario) => {
    try {
      const response = await fetch(`/api/Pedidos/PagarTodo/${idUsuario}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setDetProductos(data.detProductos);
      setPedidos(data.pedidos);
      setTotal(data.total);
    } catch (error) {
      // Manejar errores
      console.error(error);
    }
  };

  const fromB64 = (b64) => {
    return "data:image/jpeg;base64," + b64;
  };

  return (
    <div className="card">
      <div>
        <h1 className="card-header" style={cardHeaderStyle}>
          Confirmación de pago
        </h1>
      </div>
      <div className="row">
        <div className="col-md-8">
          {detProductos.map((producto, index) => (
            <div className="card mb-3" key={index}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    // @ts-ignore
                    src={fromB64(producto.imagen)}
                    className="card-img"
                    alt=""
                    style={{ height: "150px", width: "150px" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {
                        // @ts-ignore
                        producto.nombre
                      }
                    </h5>
                    <p className="card-text">
                      Modelo:{" "}
                      {
                        // @ts-ignore
                        producto.modelo
                      }
                    </p>
                    <p className="card-text">
                      Descripción:{" "}
                      {
                        // @ts-ignore
                        producto.descripcion
                      }
                    </p>
                    <p className="card-text">
                      Precio:{" "}
                      {
                        // @ts-ignore
                        producto.precio
                      }{" "}
                      | Cantidad:{" "}
                      {
                        // @ts-ignore
                        producto.cantidad
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <br />
              <h5 className="card-title">Resumen de Pago</h5>
              <p className="card-text">El total es ${total}</p>

              <form>
                <div className="form-group">
                  <label className="card-text" htmlFor="metodo_pago">
                    Seleccione método de pago:
                  </label>
                  <br />
                  <select
                    className="form-control"
                    id="metodo_pago"
                    name="metodo_pago"
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="hidden" name="id" value="" />
                  <br />
                  <br />
                  <br />
                  <button color="accent">Continuar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagar;
