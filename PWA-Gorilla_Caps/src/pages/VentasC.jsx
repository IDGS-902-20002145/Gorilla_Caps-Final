import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./VentasC.css"; // Asegúrate de importar el archivo CSS

const VentasC = () => {
  const [ventasPorAprobar, setVentasPorAprobar] = useState([]);
  const [ventasAprobadas, setVentasAprobadas] = useState([]);
  const [mostrarPendientes, setMostrarPendientes] = useState(true);
  const [mostrarEnCamino, setMostrarEnCamino] = useState(false);
  const idUsuario = Number(localStorage.getItem("id"));

  useEffect(() => {
    getCompras();
  }, []);

  const getCompras = async () => {
    try {
      const response = await fetch(`/api/VentasC/MisCompras/${idUsuario}`);
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} - ${response.statusText}`
        );
      }
      const data = await response.json();
      if (data) {
        setVentasPorAprobar(data.ventasPA || []);
        setVentasAprobadas(data.ventasA || []);
      } else {
        setVentasPorAprobar([]);
        setVentasAprobadas([]);
      }
    } catch (error) {
      console.error(`Error al obtener las compras: ${error.message}`);
    }
  };

  const cambiarVista = (vista) => {
    if (vista === "pendientes") {
      setMostrarPendientes(true);
      setMostrarEnCamino(false);
    } else {
      setMostrarPendientes(false);
      setMostrarEnCamino(true);
    }
  };

  const getImageUrl = (base64Image) => {
    if (base64Image) {
      return `data:image/jpeg;base64,${base64Image}`;
    }
    return "./assets/default.jpg";
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-12 mb-4 text-center">
          {/* Botones de selección */}
          <div className="card border-primary">
            <div className="card-body">
              <h5 className="card-titulo">
                <i className="fas fa-truck"></i> Compras en camino
              </h5>
              <p className="card-text">Revisa el estado de tus compras en camino</p>
              <button
                className={`btn btn-primary ${
                  mostrarEnCamino ? "active" : ""
                }`}
                onClick={() => cambiarVista("enCamino")}
              >
                Ver compras en camino
              </button>
            </div>
          </div>
          <br />
          <br />
          <div className="card border-primary">
            <div className="card-body">
              <h5 className="card-titulo">
                <i className="fas fa-shopping-bag"></i> Compras pendientes
              </h5>
              <p className="card-text">
                Revisa tus compras pendientes de envío
              </p>
              <button
                className={`btn btn-primary ${
                  mostrarPendientes ? "active" : ""
                }`}
                onClick={() => cambiarVista("pendientes")}
              >
                Ver compras pendientes
              </button>
            </div>
          </div>
          {/* Contenido de compras */}
          <div className="container my-12">
            <div className="row">
              <div className="col-md-11">
                {/* Ventas pendientes */}
                {mostrarPendientes && (
                  <div className="card mb-11">
                    <div className="card-header bg-primary text-white">
                      <h2 className="mb-0">Pendientes de Envío</h2>
                    </div>
                    <div>
                      {ventasPorAprobar.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-striped">
                            {/* Estructura de la tabla */}
                            <thead>
                              <tr className="header-row">
                                <th scope="col">Fecha</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Imagen</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio unitario</th>
                                <th scope="col">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Mapeo de las ventas */}
                              {ventasPorAprobar.map((venta) => (
                                Object.keys(venta.productos).map((fecha) =>
                                  Object.keys(venta.productos[fecha]).map(
                                    (productoKey) => (
                                      <tr key={productoKey}>
                                        <td>{venta.fecha}</td>
                                        <td>{productoKey}</td>
                                        <td>
                                          <img
                                            src={getImageUrl(
                                              venta.productos[fecha][
                                                productoKey
                                              ].imagen
                                            )}
                                            alt=""
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                            }}
                                          />
                                        </td>
                                        <td>
                                          {venta.productos[fecha][productoKey]
                                            .cantidad}
                                        </td>
                                        <td>
                                          ${
                                            venta.productos[fecha][productoKey]
                                              .precio
                                          }
                                        </td>
                                        <td>
                                          ${
                                            venta.productos[fecha][productoKey]
                                              .cantidad *
                                            venta.productos[fecha][productoKey]
                                              .precio
                                          }
                                        </td>
                                      </tr>
                                    )
                                  )
                                )
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-center">
                          No hay compras pendientes por aprobar.
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {/* Ventas en camino */}
                {mostrarEnCamino && (
                  <div className="card mb-11">
                    <div className="card-header bg-primary text-white">
                      <h2 className="mb-0">En Camino</h2>
                    </div>
                    <div>
                      {ventasAprobadas.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-striped">
                            {/* Estructura de la tabla */}
                            <thead>
                              <tr className="header-row">
                                <th scope="col">Fecha</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Imagen</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio unitario</th>
                                <th scope="col">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Mapeo de las ventas */}
                              {ventasAprobadas.map((venta) => (
                                Object.keys(venta.productos).map((fecha) =>
                                  Object.keys(venta.productos[fecha]).map(
                                    (productoKey) => (
                                      <tr key={productoKey}>
                                        <td>{venta.fecha}</td>
                                        <td>{productoKey}</td>
                                        <td>
                                          <img
                                            src={getImageUrl(
                                              venta.productos[fecha][
                                                productoKey
                                              ].imagen
                                            )}
                                            alt=""
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                            }}
                                          />
                                        </td>
                                        <td>
                                          {venta.productos[fecha][productoKey]
                                            .cantidad}
                                        </td>
                                        <td>
                                          ${
                                            venta.productos[fecha][productoKey]
                                              .precio
                                          }
                                        </td>
                                        <td>
                                          ${
                                            venta.productos[fecha][productoKey]
                                              .cantidad *
                                            venta.productos[fecha][productoKey]
                                              .precio
                                          }
                                        </td>
                                      </tr>
                                    )
                                  )
                                )
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-center">
                          Aún no ha realizado una compra o aún no ha sido
                          aprobada.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentasC;