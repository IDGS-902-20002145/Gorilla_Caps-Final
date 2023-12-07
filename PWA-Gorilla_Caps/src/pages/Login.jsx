// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar el CSS de Bootstrap
import "./Login.css"; // Asegúrate de importar el archivo CSS

// eslint-disable-next-line react/prop-types
const Login = ({ setAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/Login/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Habilitar credenciales
        body: JSON.stringify(formData), // Convertir a JSON y enviar en el cuerpo
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.user.id);
        localStorage.setItem("admin", data.user.admin);
        localStorage.setItem("empleado", data.user.empleado);
        // Actualiza el estado de autenticación a true
        setAuthenticated(true);

        // Muestra una alerta de éxito
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Redirigiendo a la página de catálogo...",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirige al usuario después de un inicio de sesión exitoso
        setTimeout(() => {
          window.location.href = "/Catalog";
        }, 1500);
      } else {
        // Muestra una alerta de error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario o contraseña incorrectos",
        });
      }
    } catch (error) {
      // Muestra una alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al realizar la solicitud: ${error.message}`,
      });
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="btn btn-primary btn-block"
                >
                  Iniciar sesión
                </button>
              </form>

              {/* Enlace para navegar a /Catalogo */}
              <p className="mt-3">
                ¿No tienes una cuenta? Regístrate{" "}
                <a href="/Register" className="link-primary">
                  aquí
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
