import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import CatalogPage from "./pages/CatalogPage";
import CatalogDetail from "./pages/CatalogDetail";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Pagar from "./pages/pagar/Pagar";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg" id="navdvar">
        <div className="container">
          <div className="navbarMenuHeroA">
            {authenticated ? (
              <ul className="navbar-nav ml-auto">
                <h2 className="titulo">Gorilla Caps</h2>
                {localStorage.getItem("admin") === "true" ? (
                  // Opciones para usuarios administradores
                  <React.Fragment>
                    <li className="nav-item">
                      <Link className="nav-link" to="">
                        <i className="fas fa-person-dress"></i> Proveedor
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="">
                        <i className="fa-regular fa-circle-user fa-lg"></i>{" "}
                        Usuarios
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="">
                        <i className="fa-solid fa-boxes-stacked fa-lg"></i>{" "}
                        Materias Primas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="">
                        <i className="fa-solid fa-money-check-dollar fa-lg"></i>{" "}
                        Compras
                      </Link>
                    </li>
                  </React.Fragment>
                ) : localStorage.getItem("empleado") === "true" ? (
                  // Opciones para empleados
                  <React.Fragment>{/* ... */}</React.Fragment>
                ) : (
                  // Opciones para clientes
                  <React.Fragment>
                    <li>
                      <Link className="nav-link" to="/Catalogo">
                        <i className="fa-brands fa-redhat"></i> Productos
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/Carrito">
                        <i className="fa-solid fa-shopping-cart"></i> Carrito
                      </Link>
                    </li>
                  </React.Fragment>
                )}
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            ) : (
              // Usuario no autenticado
              <ul className="navbar-nav ml-auto">
                <h2 className="titulo2">Gorilla Caps</h2>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home"></i> Página Principal
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/Catalogo">
                    <i className="fa-brands fa-redhat"></i> Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-lock-open"></i>Iniciar sesión
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/Catalogo" element={<CatalogPage />} />
        <Route path="/Catalogo/:id" element={<CatalogDetail />} />
        <Route path="/Carrito" element={<ShoppingCartPage />} />
        <Route path="/PagarTodo/:id" element={<Pagar />} />
        {/* Otras rutas */}
        {/* ... */}
      </Routes>
    </Router>
  );
};

export default App;
