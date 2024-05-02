import React from 'react';
import LoginForm from './LoginForm';
import axios from '../axiosConfig';

function LoginContainer() {
  const handleLogin = async (email, contraseña) => {
    try {
      const response = await axios.post('/Usuarios/login', {
        email: email,
        contraseña: contraseña
      });

      const { token, rol } = response.data;
      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', rol);
      window.location.href = '/Home';  // Redirige a la página principal después del login
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : 'Unknown error');
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginContainer;
