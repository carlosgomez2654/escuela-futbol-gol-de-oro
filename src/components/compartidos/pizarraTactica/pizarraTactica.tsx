import { useState } from 'react';
import { Cancha } from './Cancha';
import { buscarJugador, jugadoresDeCategoria } from '../../../datos/jugadores';
import {
  FORMACIONES,
  cargarAlineacion,
  guardarAlineacion,
  type Alineacion,
  type Formacion,
} from './pizarraUtils';
import './pizarraTactica.css';

interface PizarraTacticaProps {
  editable?: boolean;          // true = profesor (arma la alineación), false = padres y jugadores (solo ver)
  jugadorDestacadoId?: number; // id del jugador a resaltar (cuando haya login, vendrá del usuario)
}

export function PizarraTactica({ editable = false, jugadorDestacadoId }: PizarraTacticaProps) {
  const [alineacion, setAlineacion] = useState<Alineacion>(() => cargarAlineacion());
  const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);

  // Jugadores que NO están en la cancha
  const idsEnCancha = Object.values(alineacion.asignaciones);
    // Por ahora, solo la Sub-12 (id 3). En el paso 7.3 la categoría la elegirá el profesor.
  const banca = jugadoresDeCategoria(3).filter((jugador) => !idsEnCancha.includes(jugador.id));
  const jugadorSeleccionado = idSeleccionado !== null ? buscarJugador(idSeleccionado) : undefined;

  // Guarda en el estado Y en localStorage al mismo tiempo
  const actualizarAlineacion = (nueva: Alineacion) => {
    setAlineacion(nueva);
    guardarAlineacion(nueva);
  };

  const cambiarFormacion = (formacion: Formacion) => {
    // Los jugadores se quedan en el mismo número de posición; solo cambia el dibujo
    actualizarAlineacion({ ...alineacion, formacion });
  };

  const manejarClickPosicion = (indice: number) => {
    const asignaciones = { ...alineacion.asignaciones };

    if (idSeleccionado === null) {
      // Sin jugador seleccionado: si la posición está ocupada, ese jugador vuelve a la banca
      if (asignaciones[indice] === undefined) return;
      delete asignaciones[indice];
    } else {
      // Con jugador seleccionado: se ubica en esta posición
      asignaciones[indice] = idSeleccionado;
      setIdSeleccionado(null);
    }

    actualizarAlineacion({ ...alineacion, asignaciones });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-success fw-bold mb-2">
        {editable ? '⚽ Pizarra Táctica y Alineación' : '📋 Convocatoria y Formación Titular'}
      </h2>

      {/* Profesor: elige formación. Los demás: solo la ven */}
      {editable ? (
        <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-wrap">
          <label htmlFor="formacion" className="fw-semibold text-secondary">Formación:</label>
          <select
            id="formacion"
            className="form-select w-auto"
            value={alineacion.formacion}
            onChange={(e) => cambiarFormacion(e.target.value as Formacion)}
          >
            {Object.entries(FORMACIONES).map(([clave, formacion]) => (
              <option key={clave} value={clave}>{formacion.nombre}</option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-center text-muted mb-3">
          Formación: <span className="badge bg-primary">{FORMACIONES[alineacion.formacion].nombre}</span>
        </p>
      )}

      {/* Mensaje de ayuda para el profesor */}
      {editable && (
        <div className={`alert ${jugadorSeleccionado ? 'alert-warning' : 'alert-light border'} text-center py-2 mb-3 small`}>
          {jugadorSeleccionado ? (
            <>⚠️ <strong>{jugadorSeleccionado.nombre}</strong> seleccionado. Haz clic en una posición de la cancha para ubicarlo.</>
          ) : (
            <>💡 Selecciona un jugador de la banca y luego una posición. Haz clic en un jugador de la cancha para devolverlo a la banca.</>
          )}
        </div>
      )}

      <div className="row g-4">
        {/* Cancha */}
        <div className="col-lg-8">
          <Cancha
            alineacion={alineacion}
            jugadorDestacadoId={jugadorDestacadoId}
            onClickPosicion={editable ? manejarClickPosicion : undefined}
          />
        </div>

        {/* Banca */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-3 bg-light border-0 h-100">
            <h4 className="text-dark fw-bold mb-3">👥 Banca / Suplentes</h4>

            {banca.length === 0 && <p className="text-muted small">Todos los jugadores están en la cancha.</p>}

            <ul className="list-group">
              {banca.map((jugador) => {
                const estaSeleccionado = jugador.id === idSeleccionado;

                return (
                  <li
                    key={jugador.id}
                    className={`list-group-item d-flex justify-content-between align-items-center border-0 shadow-sm mb-2 rounded ${
                      estaSeleccionado ? 'bg-warning bg-opacity-25' : 'bg-white'
                    }`}
                  >
                    <div>
                      <span className="fw-semibold d-block">
                        {jugador.id === jugadorDestacadoId && '⭐ '}
                        {jugador.nombre}
                      </span>
                      <small className="text-muted">{jugador.posicion}</small>
                    </div>

                    {editable ? (
                      <button
                        className={`btn btn-sm ${estaSeleccionado ? 'btn-warning' : 'btn-outline-success'}`}
                        onClick={() => setIdSeleccionado(estaSeleccionado ? null : jugador.id)}
                      >
                        {estaSeleccionado ? 'Seleccionado 🎯' : 'Seleccionar'}
                      </button>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary border">Suplente</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}