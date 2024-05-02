import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, roles }) {
  const userToken = localStorage.getItem('userToken');
  const userRole = parseInt(localStorage.getItem('userRole'), 10);

  if (!userToken) {
    // Si no hay token, redirigir al login
    return <Navigate to="/" replace />;
  } else if (roles && !roles.includes(userRole)) {
    // Si el rol no es adecuado, redirigir a una página de no autorizado
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo está correcto, renderizar los children pasados al componente
  return children;
}

export default PrivateRoute;
