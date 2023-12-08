// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar el CSS de Bootstrap
import "./Registro.css"; // Asegúrate de importar el archivo CSS

const RegisterUser = () => {
  const [verificarPassword, setVerificarPassword] = useState("");

  const [usuarioNuevo, setUsuarioNuevo] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    active: true,
    confirmed_at: new Date(),
    admin: false,
    empleado: false,
    roles: [],
  });

  const verificarCont = () => {
    if (usuarioNuevo.password !== verificarPassword) {
      mostrarSweetAlert("Error", "Las contraseñas no coinciden", "error");
    } else {
      agregarUsuario();
    }
  };

  const agregarUsuario = async () => {
    if (!verificarVacios()) {
      try {
        // Lógica de registro con la API (utilizando fetch)
        const response = await fetch("/api/Login/Registrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioNuevo),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Mostrar alerta de éxito
        mostrarSweetAlert(
          "Te has registrado correctamente",
          `Bienvenido ${usuarioNuevo.name} a GorillaCaps`,
          "success"
        );

        // Limpiar el estado y redirigir al usuario a la página de inicio de sesión
        setUsuarioNuevo({
          id: 0,
          name: "",
          email: "",
          password: "",
          active: true,
          confirmed_at: new Date(),
          admin: false,
          empleado: false,
          roles: [],
        });

        // Utilizar window.location para redirigir
        // Redirige al usuario después de un inicio de sesión exitoso
        setTimeout(() => {
          window.location.href = "/Login";
        }, 1500);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
        mostrarSweetAlert("Error", "Hubo un problema al registrarse", "error");
      }
    } else {
      mostrarSweetAlert("Error", "No puede haber campos vacíos", "error");
    }
  };

  const mostrarSweetAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "Ok",
    });
  };

  const verificarVacios = () => {
    return (
      usuarioNuevo.name === "" ||
      usuarioNuevo.email === "" ||
      usuarioNuevo.password === ""
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioNuevo({
      ...usuarioNuevo,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
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
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={usuarioNuevo.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="text"
                  name="email"
                  value={usuarioNuevo.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Correo electrónico"
                />
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={usuarioNuevo.password}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Contraseña"
                />
              </div>

              <div className="form-group">
                <label>Repita la contraseña</label>
                <input
                  type="password"
                  name="verificar"
                  value={verificarPassword}
                  onChange={(e) => setVerificarPassword(e.target.value)}
                  className="form-control"
                  placeholder="Repita la contraseña"
                />
              </div>

              <button
                onClick={verificarCont}
                className="btn btn-primary btn-block"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
