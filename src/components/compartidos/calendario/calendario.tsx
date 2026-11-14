import { useState } from 'react';
import {
  DIAS_SEMANA,
  ESTILO_POR_TIPO,
  NOMBRES_MESES,
  cargarEventos,
  guardarEventos,
  obtenerDiasDelMes,
  obtenerPrimerDiaSemana,
  type EventoDia,
  type EventosDelMes,
} from './calendarioUtils';
import { useCategoriasDelUsuario } from '../../../auth/useCategoriasDelUsuario';
import { SelectorCategoria } from '../selectorCategoria/SelectorCategoria';
import { ModalDetalleEvento } from './ModalDetalleEvento';
import { ModalEditarEvento } from './ModalEditarEvento';
import './calendario.css';

interface CalendarioProps {
  editable?: boolean; // true = profesor (puede editar), false = padres y jugadores (solo ver)
}

export function Calendario({ editable = false }: CalendarioProps) {
  // Profesor: sus categorías. Padre y jugador: la del niño.
  const categorias = useCategoriasDelUsuario();
  const [categoriaId, setCategoriaId] = useState(() => categorias[0]?.id ?? 0);

  const hoy = new Date();
  const [ano, setAno] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());
  const [eventos, setEventos] = useState<EventosDelMes>(() => cargarEventos(categoriaId, ano, mes));
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);

  // cantidad: -1 = mes anterior, +1 = mes siguiente
  const cambiarMes = (cantidad: number) => {
    // new Date se encarga solo de pasar de diciembre a enero (y al revés)
    const nuevaFecha = new Date(ano, mes + cantidad, 1);
    const nuevoAno = nuevaFecha.getFullYear();
    const nuevoMes = nuevaFecha.getMonth();

    setAno(nuevoAno);
    setMes(nuevoMes);
    setEventos(cargarEventos(categoriaId, nuevoAno, nuevoMes));
  };

  // Al cambiar de categoría se cargan los eventos de ESA categoría (mismo mes)
  const cambiarCategoria = (nuevaCategoriaId: number) => {
    setCategoriaId(nuevaCategoriaId);
    setEventos(cargarEventos(nuevaCategoriaId, ano, mes));
  };

  const cerrarModal = () => setDiaSeleccionado(null);

  // Guarda en el estado Y en localStorage al mismo tiempo
  const actualizarEventos = (nuevosEventos: EventosDelMes) => {
    setEventos(nuevosEventos);
    guardarEventos(categoriaId, ano, mes, nuevosEventos);
    cerrarModal();
  };

  const guardarEvento = (evento: EventoDia) => {
    if (!diaSeleccionado) return;
    actualizarEventos({ ...eventos, [diaSeleccionado]: evento });
  };

  const borrarEvento = () => {
    if (!diaSeleccionado) return;
    const nuevosEventos = { ...eventos };
    delete nuevosEventos[diaSeleccionado];
    actualizarEventos(nuevosEventos);
  };

  const espaciosVacios = Array.from({ length: obtenerPrimerDiaSemana(ano, mes) }, (_, i) => i);
  const diasDelMes = Array.from({ length: obtenerDiasDelMes(ano, mes) }, (_, i) => i + 1);
  const nombreCategoria = categorias.find((c) => c.id === categoriaId)?.nombre;
  const tituloModal = `Día ${diaSeleccionado} de ${NOMBRES_MESES[mes]} · ${nombreCategoria}`;

  // Va después de todos los hooks (la regla de los hooks)
  if (categorias.length === 0) {
    return <p className="text-center text-muted my-5">No tienes categorías asignadas.</p>;
  }

  return (
    <div className="container my-4">
      {/* Cabecera y controles de meses */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold text-success m-0">
            📅 {editable ? 'Gestión de Calendario' : 'Calendario de Actividades'}
          </h2>
          <p className="text-muted m-0">
            {editable
              ? 'Programa entrenamientos y partidos para la escuela'
              : 'Consulta los horarios de entrenamientos, partidos y eventos'}
          </p>
        </div>

        <div className="d-flex align-items-center gap-2 bg-white p-2 rounded shadow-sm border">
          <button className="btn btn-outline-success btn-sm fw-bold" onClick={() => cambiarMes(-1)}>
            ◀ Anterior
          </button>
          <span className="fw-bold fs-5 px-2 text-dark">
            {NOMBRES_MESES[mes]} {ano}
          </span>
          <button className="btn btn-outline-success btn-sm fw-bold" onClick={() => cambiarMes(1)}>
            Siguiente ▶
          </button>
        </div>
      </div>

      {/* Selector de categoría (o el nombre, si solo hay una) */}
      <div className="mb-3">
        <SelectorCategoria categorias={categorias} categoriaId={categoriaId} onCambiar={cambiarCategoria} />
      </div>

      <div className={`alert ${editable ? 'alert-success' : 'alert-info'} py-2 text-center small shadow-sm`}>
        {editable
          ? '💡 Haz clic en cualquier día del mes para agregar o editar actividades.'
          : 'ℹ️ Haz clic en cualquier día para ver el detalle de la actividad programada.'}
      </div>

      {/* Nombres de los días */}
      <div className="calendario-grid calendario-encabezado text-center fw-bold bg-dark text-white py-2 rounded-top">
        {DIAS_SEMANA.map((dia) => (
          <div key={dia}>{dia}</div>
        ))}
      </div>

      {/* Casillas del mes */}
      <div className="calendario-grid bg-light border border-top-0 p-2 rounded-bottom shadow-sm">
        {espaciosVacios.map((i) => (
          <div key={`vacio-${i}`} className="calendario-dia bg-secondary-subtle rounded border opacity-25"></div>
        ))}

        {diasDelMes.map((diaNum) => {
          const evento = eventos[String(diaNum)];

          return (
            <button
              type="button"
              key={diaNum}
              onClick={() => setDiaSeleccionado(String(diaNum))}
              className="calendario-dia p-2 rounded border bg-white shadow-sm d-flex flex-column justify-content-between text-start"
            >
              <span className="fw-bold text-secondary">{diaNum}</span>

              {evento ? (
                <div className={`calendario-evento p-1 rounded text-white ${ESTILO_POR_TIPO[evento.tipo].clase}`} title={evento.titulo}>
                  <div className="calendario-evento-texto fw-bold">{evento.hora}</div>
                  <div className="calendario-evento-texto text-truncate">{evento.titulo}</div>
                </div>
              ) : (
                <div className="calendario-evento-texto text-muted align-self-end opacity-50">
                  {editable ? '+ Agregar' : ''}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Modal: el profesor edita, los demás solo ven */}
      {diaSeleccionado && editable && (
        <ModalEditarEvento
          titulo={tituloModal}
          eventoInicial={eventos[diaSeleccionado]}
          onGuardar={guardarEvento}
          onBorrar={borrarEvento}
          onCerrar={cerrarModal}
        />
      )}

      {diaSeleccionado && !editable && (
        <ModalDetalleEvento
          titulo={tituloModal}
          evento={eventos[diaSeleccionado]}
          onCerrar={cerrarModal}
        />
      )}
    </div>
  );
}