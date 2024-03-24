import { Navigate } from 'react-router-dom';
import { useAuth } from './Usuario/UseAuth';

export default function PrivateRoute({ children, roles }) {
  const auth = useAuth();

  if (auth.loading) {
    return <div>Loading...</div>; // O cualquier otro componente de carga
  }

  if (!auth.isAuthenticated()) {
    // Usuario no está autenticado
    return <Navigate to="/Login" replace />;
  }

  if (roles && !roles.some(role => auth.hasRole(role))) {
    // Usuario no tiene el rol requerido
    return <Navigate to="/Home" replace />;
  }

  return children;
}
