import { useState } from 'react';
import { BotonesSesion } from '../botonesSesion/BotonesSesion';

// Una opción del menú: el nombre interno de la sección y el texto que se ve
export interface OpcionMenu<T extends string> {
  seccion: T;
  texto: string;
}

interface MenuDashboardProps<T extends string> {
  titulo: string;
  opciones: OpcionMenu<T>[];
  seccionActiva: T;
  onSeleccionar: (seccion: T) => void;
}

// Menú de los 4 paneles: horizontal en computador y con botón hamburguesa en celular
export function MenuDashboard<T extends string>({ titulo, opciones, seccionActiva, onSeleccionar }: MenuDashboardProps<T>) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Con muchas opciones (admin) el menú horizontal necesita más espacio:
  // se muestra completo desde pantallas muy grandes (xxl, 1400px) y antes con hamburguesa
  const expandir = opciones.length > 4 ? 'navbar-expand-xxl' : 'navbar-expand-lg';

  // Al elegir una sección: la muestra y cierra el menú (en celular)
  const seleccionar = (seccion: T) => {
    onSeleccionar(seccion);
    setMenuAbierto(false);
  };

  return (
    <nav className={`navbar ${expandir} bg-body-tertiary border-bottom shadow-sm px-3`}>
      <div className="container-fluid">
        <span className="navbar-brand fw-bold text-primary">⚽ {titulo}</span>

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
          <ul className="navbar-nav mx-auto">
            {opciones.map((opcion) => (
              <li className="nav-item" key={opcion.seccion}>
                <button
                  type="button"
                  className={`nav-link btn btn-link border-0 text-start text-nowrap ${
                    opcion.seccion === seccionActiva ? 'active fw-bold text-primary' : ''
                  }`}
                  onClick={() => seleccionar(opcion.seccion)}
                >
                  {opcion.texto}
                </button>
              </li>
            ))}
          </ul>

          {/* Usuario, volver al inicio y cerrar sesión */}
          <div className="py-2">
            <BotonesSesion />
          </div>
        </div>
      </div>
    </nav>
  );
}
