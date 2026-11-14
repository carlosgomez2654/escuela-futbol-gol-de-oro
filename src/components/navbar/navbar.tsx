import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../auth/authContexto';
import { RUTA_POR_ROL } from '../../auth/usuariosPrueba';

// Opciones del menú: texto y dirección (ruta)
const opcionesMenu = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/horarios', texto: 'Horario' },
  { ruta: '/precios', texto: 'Precios' },
  { ruta: '/inscripcion', texto: 'Inscripción' },
];

export function Navbar() {
  // ¿El menú del celular está abierto?
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  const { usuario, cerrarSesion } = useAuth();

  const salir = () => {
    cerrarSesion();
    cerrarMenu();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 px-lg-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold" onClick={cerrarMenu}>
          ⚽ Gol de Oro
        </Link>

        {/* Botón hamburguesa (solo se ve en celular) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-expanded={menuAbierto}
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto gap-lg-3">
            {opcionesMenu.map((opcion) => (
              <li className="nav-item" key={opcion.ruta}>
                {/* NavLink agrega la clase "active" cuando estás en esa ruta */}
                <NavLink to={opcion.ruta} end className="nav-link" onClick={cerrarMenu}>
                  {opcion.texto}
                </NavLink>
              </li>
            ))}

            {/* Con sesión: ir al panel y cerrar sesión. Sin sesión: iniciar sesión */}
            {usuario ? (
              <>
                <li className="nav-item">
                  <Link to={RUTA_POR_ROL[usuario.rol]} className="btn btn-light text-primary fw-semibold px-3 mt-2 mt-lg-0" onClick={cerrarMenu}>
                    Mi panel
                  </Link>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-outline-light px-3 mt-2 mt-lg-0" onClick={salir}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="btn btn-light text-primary fw-semibold px-3 mt-2 mt-lg-0" onClick={cerrarMenu}>
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}