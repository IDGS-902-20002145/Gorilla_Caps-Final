
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/HomePage";
import About from "./pages/About";
import Login from "./pages/Login";
import CatalogPage from "./pages/CatalogPage";
import RegisterUser from "./pages/RegisterUser";
import { useEffect, useState } from "react";
import VentasC from "./pages/VentasC";

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Borra los datos del Local Storage al cerrar sesión
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
    localStorage.removeItem("empleado");

    // Actualiza el estado de autenticación
    setAuthenticated(false);

    // Redirige al usuario a la página de inicio
    window.location.href = "/";
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Gorilla Caps
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/catalog">
                    Catalog
                  </Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-item" to="/comprasPedidos">
                  Mis Compras
                  </Link>
                </li>
                <li className="nav-item">
              {authenticated ? (
                <button className="nav-link" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              ) : (
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />

          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/comprasPedidos" element={<VentasC></VentasC>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
