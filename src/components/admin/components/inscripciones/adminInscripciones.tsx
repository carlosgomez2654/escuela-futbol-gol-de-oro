import { useState } from 'react';
import './adminInscripciones.css';

export interface Inscripcion {
    id: number;
    nombrePadre: string;
    whatsapp: string;
    email: string;
    nombreNiño: string;
    edadNino: string;
    comentarios: string;
    estado: 'Pendiente' | 'Inscrito';
}

const AdminInscripciones = () => {
    const [inscripciones, setInscripciones] = useState<Inscripcion[]>([
        {
            id: 1,
            nombrePadre: 'Carlos Gómez',
            whatsapp: '3001234567',
            email: 'carlos@example.com',
            nombreNiño: 'Juan Gómez',
            edadNino: '8-10 años',
            comentarios: 'Quiero saber los horarios de entrenamiento.',
            estado: 'Pendiente'
        }
    ]);

    // Estados para controlar la edición
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [formEdicion, setFormEdicion] = useState<Partial<Inscripcion>>({});

    // Función para borrar una inscripción
    const handleEliminar = (id: number) => {
        setInscripciones(inscripciones.filter(item => item.id !== id));
    };

    // Función para cambiar el estado a "Inscrito"
    const handleInscribir = (id: number) => {
        setInscripciones(
            inscripciones.map(item => 
                item.id === id ? { ...item, estado: 'Inscrito' } : item
            )
        );
    };

    // Iniciar el modo de edición cargando los datos actuales
    const handleIniciarEdicion = (item: Inscripcion) => {
        setEditandoId(item.id);
        setFormEdicion(item);
    };

    // Guardar los cambios realizados
    const handleGuardarEdicion = (id: number) => {
        setInscripciones(
            inscripciones.map(item => 
                item.id === id ? { ...item, ...formEdicion } as Inscripcion : item
            )
        );
        setEditandoId(null);
        setFormEdicion({});
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4 fw-bold text-primary">📥 Solicitudes de Inscripción</h2>
            
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th>Padre / Madre</th>
                            <th>WhatsApp</th>
                            <th>Correo</th>
                            <th>Nombre del Niño/a</th>
                            <th>Edad Niño/a</th>
                            <th>Comentarios</th>
                            <th>Estado</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inscripciones.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-muted">
                                    No hay solicitudes pendientes por ahora.
                                </td>
                            </tr>
                        ) : (
                            inscripciones.map((item) => {
                                const esEsteElQueSeEdita = editandoId === item.id;

                                return (
                                    <tr key={item.id}>
                                        {/* Columna Padre/Madre */}
                                        <td>
                                            {esEsteElQueSeEdita ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm"
                                                    value={formEdicion.nombrePadre || ''} 
                                                    onChange={(e) => setFormEdicion({...formEdicion, nombrePadre: e.target.value})}
                                                />
                                            ) : (
                                                <span className="fw-semibold">{item.nombrePadre}</span>
                                            )}
                                        </td>

                                        {/* Columna WhatsApp */}
                                        <td>
                                            {esEsteElQueSeEdita ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm"
                                                    value={formEdicion.whatsapp || ''} 
                                                    onChange={(e) => setFormEdicion({...formEdicion, whatsapp: e.target.value})}
                                                />
                                            ) : (
                                                <a href={`tel:${item.whatsapp}`} className="text-decoration-none text-dark">
                                                    {item.whatsapp}
                                                </a>
                                            )}
                                        </td>

                                        {/* Columna Correo */}
                                        <td>
                                            {esEsteElQueSeEdita ? (
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-sm"
                                                    value={formEdicion.email || ''} 
                                                    onChange={(e) => setFormEdicion({...formEdicion, email: e.target.value})}
                                                />
                                            ) : (
                                                item.email
                                            )}
                                        </td>

                                        {/* Columna Nombre Niño/a */}
                                        <td>
                                            {esEsteElQueSeEdita ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm"
                                                    value={formEdicion.nombreNiño || ''} 
                                                    onChange={(e) => setFormEdicion({...formEdicion, nombreNiño: e.target.value})}
                                                />
                                            ) : (
                                                item.nombreNiño
                                            )}
                                        </td>

                                        {/* Columna Edad */}
                                        <td>
                                            {esEsteElQueSeEdita ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm"
                                                    value={formEdicion.edadNino || ''} 
                                                    onChange={(e) => setFormEdicion({...formEdicion, edadNino: e.target.value})}
                                                />
                                            ) : (
                                                <span className="badge bg-secondary">{item.edadNino}</span>
                                            )}
                                        </td>

                                        {/* Columna Comentarios */}
                                        <td>
                                            {esEsteElQueSeEdita ? (
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm"
                                                    value={formEdicion.comentarios || ''} 
                                                    onChange={(e) => setFormEdicion({...formEdicion, comentarios: e.target.value})}
                                                />
                                            ) : (
                                                <span className="text-muted small">{item.comentarios || 'Sin comentarios'}</span>
                                            )}
                                        </td>

                                        {/* Columna Estado */}
                                        <td>
                                            <span className={`badge ${item.estado === 'Inscrito' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                {item.estado}
                                            </span>
                                        </td>

                                        {/* Columna Acciones (Menú Desplegable o Botones de Guardar/Cancelar) */}
                                        <td className="text-center">
                                            {esEsteElQueSeEdita ? (
                                                <div className="d-flex justify-content-center gap-1">
                                                    <button 
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleGuardarEdicion(item.id)}
                                                        title="Guardar cambios"
                                                    >
                                                        💾 Guardar
                                                    </button>
                                                    <button 
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => setEditandoId(null)}
                                                        title="Cancelar edición"
                                                    >
                                                        ❌
                                                    </button>
                                                </div>
                                            ) : (
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
                                                        <li>
                                                            <a 
                                                                href={`https://wa.me/57${item.whatsapp}?text=Hola%20${encodeURIComponent(item.nombrePadre)},%20te%20contactamos%20de%20la%20Gol%20de%20Oro%2520sobre%20tu%20solicitud.`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="dropdown-item text-success fw-semibold"
                                                            >
                                                                💬 Contactar WhatsApp
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                className="dropdown-item text-warning fw-semibold"
                                                                onClick={() => handleIniciarEdicion(item)}
                                                            >
                                                                ✏️ Editar datos
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                className={`dropdown-item fw-semibold ${item.estado === 'Inscrito' ? 'text-muted' : 'text-primary'}`}
                                                                onClick={() => handleInscribir(item.id)}
                                                                disabled={item.estado === 'Inscrito'}
                                                            >
                                                                ✅ {item.estado === 'Inscrito' ? 'Ya inscrito' : 'Inscribir'}
                                                            </button>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li>
                                                            <button 
                                                                className="dropdown-item text-danger fw-semibold"
                                                                onClick={() => handleEliminar(item.id)}
                                                            >
                                                                🗑️ Borrar solicitud
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminInscripciones;