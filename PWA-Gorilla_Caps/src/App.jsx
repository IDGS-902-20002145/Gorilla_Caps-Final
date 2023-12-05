// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "./App.css";

const App = () => {
  return (
    <nav className="navbar navbar-expand-lg" id="navdvar">
      <div className="container">
        <div className="navbarMenuHeroA">
          <ul className="navbar-nav ml-auto">
            <h2 className="titulo">Gorilla Caps</h2>
            {/* 
             <!-- Mostrar opciones para usuarios administradores -->
             */}
            <li className="nav-item">
              <a className="nav-link">
                <i className="fa-solid fa-person-dres"></i> Proveedores
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className=""></i>
              </a>
            </li>
            {/* Fin administrador  */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default App;
