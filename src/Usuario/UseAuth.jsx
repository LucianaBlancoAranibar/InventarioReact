import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto de autenticación
const AuthContext = createContext(null);

// Provee el hook useAuth para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de contexto que envuelve tu aplicación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carga el usuario al iniciar la aplicación si existe un token almacenado
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Configura el token en los headers de axios si existe
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
        try {
          const response = await axios.get('/api/Usuarios/validate-token');
          setUser(response.data); 
        } catch (error) {
          console.log('Error al validar el token', error);
          logout(); // Si el token no es válido, se cierra la sesión automáticamente
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/Usuarios/login', { Email: email, Contraseña: password });
      const { token, user } = response.data; // Ajusta según la respuesta de tu API

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error; // Lanza el error para manejarlo en el componente de login
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user && user.roles && user.roles.includes(role); 
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={contextValue}>{!loading && children}</AuthContext.Provider>;
};
