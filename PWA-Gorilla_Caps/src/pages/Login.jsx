import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const url = "https://localhost:5000/api/Login/authenticate"; // Reemplaza con la URL correcta de tu backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Verifica si 'data' tiene la propiedad 'user'
        if (data.user) {
          // Aquí puedes manejar el token y redirigir al usuario a la página deseada
          console.log('Token:', data.token);
          // Ejemplo de redirección (necesitarás ajustar esto a tu enrutador y estructura)
          // history.push("/Catalogo");
        } else {
          console.error('Usuario o contraseña incorrectos');
        }
      } else {
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
