import React, { useState } from 'react';
import './Login.css'; // Agrega el archivo CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await fetch('https://localhost:5000/api/Login/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Habilitar credenciales
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('admin', data.user.admin);
        localStorage.setItem('empleado', data.user.empleado);
  
        // Redirige al usuario después de un inicio de sesión exitoso
        window.location.href = '/Catalog';
      } else {
        console.error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  return (
    <div className="login-form">
      <label>Email</label>
      <input type="text" name="email" value={formData.email} onChange={handleInputChange} />

      <label>Contraseña</label>
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

      <button onClick={handleLogin}>Iniciar sesión</button>

      {/* Enlace para navegar a /Catalogo */}
      <p>
        ¿No tienes una cuenta? Regístrate{' '}
        <a href="/Registro" style={{ color: 'blue' }}>
          aquí
        </a>
      </p>
    </div>
  );
};

export default Login;
