import { FORMACIONES, buscarJugador, type Alineacion } from './pizarraUtils';

interface CanchaProps {
  alineacion: Alineacion;
  jugadorDestacadoId?: number;                 // Se resalta con ⭐ (el hijo del padre, o el propio jugador)
  onClickPosicion?: (indice: number) => void;  // Solo llega si la cancha es editable
}

// Dibuja la cancha con los jugadores en sus posiciones
export function Cancha({ alineacion, jugadorDestacadoId, onClickPosicion }: CanchaProps) {
  const posiciones = FORMACIONES[alineacion.formacion].posiciones;
  const editable = onClickPosicion !== undefined;

  return (
    <div className="soccer-field shadow-lg mx-auto rounded-3 border border-3 border-white">
      <div className="center-line"></div>
      <div className="center-circle"></div>
      <div className="penalty-box-top"></div>
      <div className="penalty-box-bottom"></div>

      {posiciones.map((posicion, indice) => {
        const idJugador = alineacion.asignaciones[indice];
        const jugador = idJugador !== undefined ? buscarJugador(idJugador) : undefined;
        const esDestacado = jugador !== undefined && jugador.id === jugadorDestacadoId;

        // Clase de la etiqueta con el nombre, según el caso
        let claseNombre = 'bg-secondary';
        if (esDestacado) claseNombre = 'bg-warning text-dark fw-bold border border-dark';
        else if (jugador) claseNombre = 'bg-success';

        return (
          <button
            type="button"
            key={indice}
            className={`player-token d-flex flex-column align-items-center ${editable ? 'editable' : ''}`}
            style={{ top: posicion.top, left: posicion.left }}
            onClick={() => onClickPosicion?.(indice)}
            disabled={!editable}
            title={jugador ? jugador.nombre : 'Posición libre'}
          >
            <span
              className={`badge-player rounded-circle shadow d-flex justify-content-center align-items-center fw-bold ${
                esDestacado ? 'destacado bg-warning text-dark' : 'bg-dark text-white'
              }`}
            >
              {posicion.etiqueta}
            </span>

            <span className={`badge nombre-jugador mt-1 px-2 py-1 shadow-sm ${claseNombre}`}>
              {jugador ? `${esDestacado ? '⭐ ' : ''}${jugador.nombre}` : editable ? 'Libre' : 'Por asignar'}
            </span>
          </button>
        );
      })}
    </div>
  );
}