import { useState } from 'react';

// Estructura del Pago
export interface Pago {
    id: number;
    nombrePadre: string;
    nombreNino: string;
    categoria: string;
    mes: string; // Ej: 'Octubre 2026'
    monto: number;
    comprobanteUrl: string; // Aquí irá la URL de la foto que suba el padre (simulada por ahora)
    estado: 'Pendiente' | 'Pagado';
}

const AdminPagos = () => {
    // 1. Lista de pagos de ejemplo
    const [pagos, setPagos] = useState<Pago[]>([
        { 
            id: 1, 
            nombrePadre: 'Carlos Gómez', 
            nombreNino: 'Mateo Gómez', 
            categoria: 'Sub-8', 
            mes: 'Octubre 2026', 
            monto: 60000, 
            comprobanteUrl: 'https://via.placeholder.com/300x400.png?text=Comprobante+Nequi', 
            estado: 'Pendiente' 
        },
        { 
            id: 2, 
            nombrePadre: 'Andrés Pérez', 
            nombreNino: 'Lucas Pérez', 
            categoria: 'Sub-8', 
            mes: 'Octubre 2026', 
            monto: 60000, 
            comprobanteUrl: 'https://via.placeholder.com/300x400.png?text=Recibo+Bancolombia', 
            estado: 'Pendiente' 
        },
        { 
            id: 3, 
            nombrePadre: 'María Ruiz', 
            nombreNino: 'Sofía Ruiz', 
            categoria: 'Sub-6', 
            mes: 'Septiembre 2026', 
            monto: 60000, 
            comprobanteUrl: 'https://via.placeholder.com/300x400.png?text=Comprobante+Pagado', 
            estado: 'Pagado' 
        },
    ]);

    // Estados para los filtros (Mes y Estado de pago)
    const [mesSeleccionado, setMesSeleccionado] = useState<string>('Octubre 2026');
    const [filtroEstado, setFiltroEstado] = useState<'Pendiente' | 'Pagado'>('Pendiente');

    // Estado para ver la imagen del comprobante en grande (Modal simulado o simple alerta/zoom)
    const [comprobanteActivo, setComprobanteActivo] = useState<string | null>(null);

    // Función para aprobar el pago (pasa de Pendiente a Pagado)
    const handleConfirmarPago = (id: number) => {
        setPagos(
            pagos.map(pago => 
                pago.id === id ? { ...pago, estado: 'Pagado' } : pago
            )
        );
    };

    // Función para rechazar o borrar un registro erróneo de pago
    const handleEliminarPago = (id: number) => {
        setPagos(pagos.filter(pago => pago.id !== id));
    };

    // Filtrar los pagos según el mes y si están pendientes o ya pagados
    const pagosFiltrados = pagos.filter(
        pago => pago.mes === mesSeleccionado && pago.estado === filtroEstado
    );

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4 fw-bold text-primary">💳 Gestión y Control de Pagos</h2>

            {/* Barra de Filtros (Mes y Pestañas de Pendientes/Pagados) */}
            <div className="card shadow-sm p-4 mb-4 bg-white rounded">
                <div className="row align-items-center g-3">
                    {/* Selector de Mes */}
                    <div className="col-md-4">
                        <label className="form-label fw-bold text-secondary">📅 Seleccionar Mes:</label>
                        <select 
                            className="form-select"
                            value={mesSeleccionado}
                            onChange={(e) => setMesSeleccionado(e.target.value)}
                        >
                            <option value="Octubre 2026">Octubre 2026</option>
                            <option value="Septiembre 2026">Septiembre 2026</option>
                            <option value="Agosto 2026">Agosto 2026</option>
                        </select>
                    </div>

                    {/* Botones de Pestañas para alternar entre Pendientes y Pagados */}
                    <div className="col-md-8 d-flex align-items-end justify-content-md-end gap-2">
                        <button 
                            className={`btn ${filtroEstado === 'Pendiente' ? 'btn-warning fw-bold text-dark shadow-sm' : 'btn-outline-secondary'}`}
                            onClick={() => setFiltroEstado('Pendiente')}
                        >
                            ⏳ Por Confirmar (Pendientes)
                        </button>
                        <button 
                            className={`btn ${filtroEstado === 'Pagado' ? 'btn-success fw-bold text-white shadow-sm' : 'btn-outline-secondary'}`}
                            onClick={() => setFiltroEstado('Pagado')}
                        >
                            ✅ Historial (Pagados)
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabla de Pagos */}
            <div className="card shadow-sm p-4 bg-white rounded">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-dark fw-bold mb-0">
                        {filtroEstado === 'Pendiente' ? '⚠️ Pagos pendientes de revisión para' : '📁 Historial de pagos confirmados de'} {mesSeleccionado}
                    </h4>
                    <span className={`badge fs-6 px-3 py-2 ${filtroEstado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        Total: {pagosFiltrados.length}
                    </span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Padre / Acudiente</th>
                                <th>Nombre del Niño/a</th>
                                <th>Categoría</th>
                                <th>Monto</th>
                                <th>Comprobante (Nequi/Recibo)</th>
                                <th>Estado</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagosFiltrados.length > 0 ? (
                                pagosFiltrados.map((pago) => (
                                    <tr key={pago.id}>
                                        <td className="fw-bold">{pago.nombrePadre}</td>
                                        <td>{pago.nombreNino}</td>
                                        <td><span className="badge bg-secondary">{pago.categoria}</span></td>
                                        <td className="fw-semibold text-success">${pago.monto.toLocaleString()} COP</td>
                                        
                                        {/* Botón para ver la foto del comprobante */}
                                        <td>
                                            <button 
                                                className="btn btn-outline-info btn-sm fw-semibold"
                                                onClick={() => setComprobanteActivo(pago.comprobanteUrl)}
                                            >
                                                👁️ Ver Comprobante
                                            </button>
                                        </td>

                                        <td>
                                            <span className={`badge ${pago.estado === 'Pagado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                {pago.estado}
                                            </span>
                                        </td>

                                        {/* Columna Acciones */}
                                        <td className="text-center">
                                            <div className="dropdown">
                                                <button 
                                                    className="btn btn-secondary btn-sm dropdown-toggle" 
                                                    type="button" 
                                                    data-bs-toggle="dropdown" 
                                                    aria-expanded="false"
                                                >
                                                    ⚙️ Acciones
                                                </button>
                                                <ul className="dropdown-menu shadow">
                                                    {/* Si está pendiente, mostrar la opción de confirmar pago */}
                                                    {pago.estado === 'Pendiente' && (
                                                        <li>
                                                            <button 
                                                                className="dropdown-item text-success fw-semibold"
                                                                onClick={() => handleConfirmarPago(pago.id)}
                                                            >
                                                                ✅ Confirmar y Aprobar Pago
                                                            </button>
                                                        </li>
                                                    )}
                                                    <li>
                                                        <a 
                                                            href={`https://wa.me/573001234567?text=Hola%20${encodeURIComponent(pago.nombrePadre)},%20te%20contactamos%20de%20la%20Escuela%20sobre%20tu%20pago%20de%20${pago.mes}.`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="dropdown-item text-primary fw-semibold"
                                                        >
                                                            💬 Contactar por WhatsApp
                                                        </a>
                                                    </li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li>
                                                        <button 
                                                            className="dropdown-item text-danger fw-semibold"
                                                            onClick={() => handleEliminarPago(pago.id)}
                                                        >
                                                            🗑️ Eliminar registro
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center text-muted py-5">
                                        <h5>No hay registros de pagos {filtroEstado.toLowerCase()}s para el mes de {mesSeleccionado}.</h5>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal simple para ver la foto del comprobante si el admin hace clic */}
            {comprobanteActivo && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">🧾 Comprobante de Pago</h5>
                                <button type="button" className="btn-close" onClick={() => setComprobanteActivo(null)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img src={comprobanteActivo} alt="Comprobante de pago" className="img-fluid rounded shadow" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setComprobanteActivo(null)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPagos; // (nota: asegúrate de usar export default AdminPagos)