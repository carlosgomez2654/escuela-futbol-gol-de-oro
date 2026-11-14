import { Link } from 'react-router';
import { useAuth } from '../../../auth/authContexto';

// Nombre del usuario + botones para volver al inicio y cerrar sesión.
// Se usa en el menú de los 4 dashboards.
export function BotonesSesion() {
  const { usuario, cerrarSesion } = useAuth();

  return (
    <div className="d-flex align-items-center gap-2 flex-wrap">
      {usuario && <span className="small text-muted me-1">👤 {usuario.nombre}</span>}

      <Link to="/" className="btn btn-sm btn-outline-primary">
        🏠 Inicio
      </Link>

      {/* No hace falta navegar: al quedar sin sesión, RutaProtegida nos manda al login */}
      <button type="button" className="btn btn-sm btn-outline-danger" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
}