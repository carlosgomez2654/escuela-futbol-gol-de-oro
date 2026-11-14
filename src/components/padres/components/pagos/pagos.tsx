import React, { useState } from 'react';
import './pagos.css'; // Importante: Importamos los estilos personalizados

export const Pagos: React.FC = () => {
  const [mes, setMes] = useState<string>('Marzo 2026');
  const [categoria, setCategoria] = useState<string>('Sub-12');
  const [referencia, setReferencia] = useState<string>('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
  const [enviado, setEnviado] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArchivo(file);
      setVistaPrevia(URL.createObjectURL(file));
      setEnviado(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) return;

    console.log({ mes, categoria, referencia, archivo });
    setEnviado(true);
  };

  return (
    <div className="container py-4 pagos-container">
      {/* Encabezado */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="header-icon">
          <i className="bi bi-credit-card-2-front fs-4"></i>
        </div>
        <div>
          <h2 className="fw-bold text-dark mb-0">Reportar Pago de Mensualidad</h2>
          <p className="text-muted small mb-0">
            Adjunta la foto de la transferencia realizada para actualizar la mensualidad en el sistema.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-12 col-lg-7">
          <div className="card payment-card shadow-sm rounded-4 p-4">
            {enviado && (
              <div className="alert alert-success alert-fade-in d-flex align-items-center rounded-3 mb-4" role="alert">
                <i className="bi bi-check-circle-fill fs-4 me-3 text-success"></i>
                <div>
                  <strong className="d-block">¡Comprobante enviado con éxito!</strong>
                  <span className="small">El administrador validará la información pronto.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="mes" className="form-label fw-semibold text-secondary small">
                    Mes a Cancelar
                  </label>
                  <select
                    id="mes"
                    className="form-select custom-input rounded-3 py-2"
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                  >
                    <option value="Enero 2026">Enero 2026</option>
                    <option value="Febrero 2026">Febrero 2026</option>
                    <option value="Marzo 2026">Marzo 2026</option>
                    <option value="Abril 2026">Abril 2026</option>
                    <option value="Mayo 2026">Mayo 2026</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="categoria" className="form-label fw-semibold text-secondary small">
                    Categoría
                  </label>
                  <input
                    type="text"
                    id="categoria"
                    className="form-control custom-input rounded-3 py-2"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mt-3">
                <label htmlFor="referencia" className="form-label fw-semibold text-secondary small">
                  N° de Transacción / Aprobación (Opcional)
                </label>
                <input
                  type="text"
                  id="referencia"
                  className="form-control custom-input rounded-3 py-2"
                  placeholder="Ej. N° Nequi, Daviplata o Aprobación Bancaria"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                />
              </div>

              {/* Input personalizado de subida */}
              <div className="mt-3">
                <label className="form-label fw-semibold text-secondary small">
                  Foto del Comprobante
                </label>
                <label htmlFor="formFile" className="dropzone-label">
                  <i className="bi bi-cloud-arrow-up dropzone-icon"></i>
                  <span className="fw-semibold text-dark mb-1">
                    {archivo ? archivo.name : 'Haz clic para subir o arrastra la foto'}
                  </span>
                  <span className="text-muted small">Formatos permitidos: JPG, PNG, WEBP</span>
                </label>
                <input
                  type="file"
                  id="formFile"
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-submit-payment w-100 rounded-pill py-2.5 mt-4 shadow-sm"
                disabled={!archivo}
              >
                <i className="bi bi-send me-2"></i> Registrar Comprobante
              </button>
            </form>
          </div>
        </div>

        {/* Panel Vista Previa */}
        <div className="col-12 col-lg-5">
          <div className="card payment-card shadow-sm rounded-4 p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold text-dark mb-0">Vista Previa</h5>
                <span className="badge bg-primary-subtle text-primary rounded-pill px-3">
                  {archivo ? 'Archivo Cargado' : 'Esperando Foto'}
                </span>
              </div>

              <div className="preview-box p-3">
                {vistaPrevia ? (
                  <img
                    src={vistaPrevia}
                    alt="Comprobante"
                    className="preview-img shadow-sm"
                  />
                ) : (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-receipt-cutoff fs-1 d-block mb-2 text-secondary opacity-25"></i>
                    <p className="mb-0 small">La foto subida se mostrará aquí para validación visual.</p>
                  </div>
                )}
              </div>
            </div>

            {vistaPrevia && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm rounded-pill mt-3 w-100"
                onClick={() => {
                  setArchivo(null);
                  setVistaPrevia(null);
                }}
              >
                <i className="bi bi-trash3 me-1"></i> Eliminar Selección
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};