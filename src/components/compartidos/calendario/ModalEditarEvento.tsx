import { useState, type FormEvent } from 'react';
import { ESTILO_POR_TIPO, EVENTO_VACIO, type EventoDia, type TipoEvento } from './calendarioUtils';

interface ModalEditarEventoProps {
  titulo: string;
  eventoInicial?: EventoDia; // Si el día ya tiene evento, llega aquí
  onGuardar: (evento: EventoDia) => void;
  onBorrar: () => void;
  onCerrar: () => void;
}

// Modal para CREAR o EDITAR un evento (solo profesores)
export function ModalEditarEvento({ titulo, eventoInicial, onGuardar, onBorrar, onCerrar }: ModalEditarEventoProps) {
  // Un solo estado con todo el formulario.
  // Si el día tenía evento, empieza con esos datos; si no, con los valores por defecto.
  const [formulario, setFormulario] = useState<EventoDia>(eventoInicial ?? EVENTO_VACIO);

  // Cambia solo un campo y deja los demás igual
  const cambiarCampo = (campo: keyof EventoDia, valor: string) => {
    setFormulario({ ...formulario, [campo]: valor });
  };

  const manejarSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGuardar(formulario);
  };

  return (
    <div className="modal show d-block calendario-modal-fondo" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">📌 Programar: {titulo}</h5>
            <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onCerrar}></button>
          </div>

          <form onSubmit={manejarSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="evento-titulo" className="form-label fw-semibold">Título del Evento / Partido:</label>
                <input
                  id="evento-titulo"
                  type="text"
                  className="form-control"
                  placeholder="Ej. Entrenamiento táctico o Partido vs Bogotá"
                  value={formulario.titulo}
                  onChange={(e) => cambiarCampo('titulo', e.target.value)}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="evento-tipo" className="form-label fw-semibold">Tipo:</label>
                  <select
                    id="evento-tipo"
                    className="form-select"
                    value={formulario.tipo}
                    onChange={(e) => cambiarCampo('tipo', e.target.value as TipoEvento)}
                  >
                    {Object.entries(ESTILO_POR_TIPO).map(([tipo, estilo]) => (
                      <option key={tipo} value={tipo}>
                        {estilo.icono} {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="evento-hora" className="form-label fw-semibold">Hora:</label>
                  <input
                    id="evento-hora"
                    type="time"
                    className="form-control"
                    value={formulario.hora}
                    onChange={(e) => cambiarCampo('hora', e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="evento-lugar" className="form-label fw-semibold">Lugar:</label>
                <input
                  id="evento-lugar"
                  type="text"
                  className="form-control"
                  placeholder="Ej. Cancha principal o Estadio El Campín"
                  value={formulario.lugar}
                  onChange={(e) => cambiarCampo('lugar', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modal-footer justify-content-between">
              {/* Borrar solo aparece si el día ya tenía evento */}
              {eventoInicial ? (
                <button type="button" className="btn btn-outline-danger fw-bold" onClick={onBorrar}>
                  🗑️ Borrar Evento
                </button>
              ) : (
                <div></div>
              )}

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCerrar}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success fw-bold">
                  💾 Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}