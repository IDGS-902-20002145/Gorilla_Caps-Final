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
          window.location.href = "/Catalogo";
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
    <div className="container my-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card login-form">
            <div className="card-body">
              <img
                src="../../public/logoD.jpg"
                alt="GorillaCaps"
                className="imagen-cabecera"
              />
              <br />
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Ingrese su email"
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
                  placeholder="Ingrese su contraseña"
                />
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={handleLogin}
              >
                Iniciar sesión
              </button>

              <div className="register-link">
                ¿No tienes una cuenta?{" "}
                <a href="/register" className="link-primary">
                  Regístrate aquí
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
