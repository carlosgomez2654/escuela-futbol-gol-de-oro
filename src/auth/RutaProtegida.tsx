import { Navigate, Outlet } from 'react-router';
import { useAuth } from './authContexto';
import { RUTA_POR_ROL, type Rol } from './usuariosPrueba';

interface RutaProtegidaProps {
  rolesPermitidos: Rol[];
}

// "Portero" de las rutas privadas: decide si dejas pasar o te manda a otro lado
export function RutaProtegida({ rolesPermitidos }: RutaProtegidaProps) {
  const { usuario } = useAuth();

  // 1. No ha iniciado sesión → al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Inició sesión, pero su rol no tiene permiso → a SU propio dashboard
  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to={RUTA_POR_ROL[usuario.rol]} replace />;
  }

  // 3. Todo bien → muestra la página que pidió
  return <Outlet />;
}