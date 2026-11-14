import { ESTILO_POR_TIPO, type EventoDia } from './calendarioUtils';

interface ModalDetalleEventoProps {
  titulo: string;
  evento?: EventoDia; // Puede no haber evento ese día
  onCerrar: () => void;
}

// Modal de SOLO LECTURA (padres y jugadores)
export function ModalDetalleEvento({ titulo, evento, onCerrar }: ModalDetalleEventoProps) {
  return (
    <div className="modal show d-block calendario-modal-fondo" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title fw-bold">📆 {titulo}</h5>
            <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onCerrar}></button>
          </div>

          <div className="modal-body p-4">
            {evento ? (
              <div className="text-center">
                <span className={`badge mb-3 px-3 py-2 fs-6 ${ESTILO_POR_TIPO[evento.tipo].clase}`}>
                  {ESTILO_POR_TIPO[evento.tipo].icono} {evento.tipo}
                </span>

                <h4 className="fw-bold text-dark mb-3">{evento.titulo}</h4>

                <div className="row g-2 justify-content-center">
                  <div className="col-6">
                    <div className="p-2 bg-light rounded border">
                      <small className="text-muted d-block fw-semibold">Horario</small>
                      <span className="fw-bold text-dark fs-5">⏰ {evento.hora}</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 bg-light rounded border">
                      <small className="text-muted d-block fw-semibold">Lugar</small>
                      <span className="fw-bold text-dark fs-5">📍 {evento.lugar}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="fs-1 m-0">⚽</p>
                <p className="text-muted fw-semibold mt-2 mb-0">
                  No hay eventos o entrenamientos programados para este día.
                </p>
              </div>
            )}
          </div>

          <div className="modal-footer bg-light justify-content-center">
            <button type="button" className="btn btn-secondary px-4 fw-bold" onClick={onCerrar}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}