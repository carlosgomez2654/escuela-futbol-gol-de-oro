import { useState } from 'react';

// Estructura del Usuario
export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    whatsapp: string;
    rol: 'Profesor' | 'Padre' | 'Jugador';
    detallesExtra: string; // Ej: Categoría si es jugador/profesor, o EPS si aplica
}

const AdminUsuarios = () => {
    // 1. Datos de ejemplo para los usuarios
    const [usuarios, setUsuarios] = useState<Usuario[]>([
        { id: 1, nombre: 'Carlos Gómez', email: 'carlos@example.com', whatsapp: '3001234567', rol: 'Padre', detallesExtra: 'Hijo: Santiago G. (Sub-12)' },
        { id: 2, nombre: 'Andrés Rojas', email: 'andres@example.com', whatsapp: '3101112233', rol: 'Profesor', detallesExtra: 'Categorías Sub-12 y Sub-15' },
        { id: 3, nombre: 'Santiago G.', email: 'santiago@example.com', whatsapp: '3001234567', rol: 'Jugador', detallesExtra: 'Edad: 11 años - Sub-12' },
        { id: 4, nombre: 'Laura Martínez', email: 'laura@example.com', whatsapp: '3209998877', rol: 'Profesor', detallesExtra: 'Categoría Sub-10' },
    ]);

    // Estado para el menú desplegable del filtro de roles
    const [rolSeleccionado, setRolSeleccionado] = useState<'Profesor' | 'Padre' | 'Jugador'>('Padre');

    // Estados para controlar la edición en línea
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [formEdicion, setFormEdicion] = useState<Partial<Usuario>>({});

    // Funciones del CRUD
    const handleEliminarUsuario = (id: number) => {
        setUsuarios(usuarios.filter(user => user.id !== id));
    };

    const handleIniciarEdicion = (usuario: Usuario) => {
        setEditandoId(usuario.id);
        setFormEdicion(usuario);
    };

    const handleGuardarEdicion = (id: number) => {
        setUsuarios(
            usuarios.map(item => 
                item.id === id ? { ...item, ...formEdicion } as Usuario : item
            )
        );
        setEditandoId(null);
        setFormEdicion({});
    };

    // Filtrar los usuarios según el rol seleccionado en el desplegable
    const usuariosFiltrados = usuarios.filter(user => user.rol === rolSeleccionado);

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4 fw-bold text-primary">👥 Gestión General de Usuarios</h2>

            {/* Menú desplegable para filtrar por Rol */}
            <div className="card shadow-sm p-4 mb-4 bg-white rounded">
                <div className="row align-items-center">
                    <div className="col-md-5">
                        <label className="form-label fw-bold text-secondary">🔍 Filtrar por Tipo de Usuario:</label>
                        <select 
                            className="form-select form-select-lg"
                            value={rolSeleccionado}
                            onChange={(e) => setRolSeleccionado(e.target.value as 'Profesor' | 'Padre' | 'Jugador')}
                        >
                            <option value="Padre">👨‍👩‍👦 Padres / Acudientes</option>
                            <option value="Profesor">👨‍🏫 Profesores</option>
                            <option value="Jugador">⚽ Jugadores / Alumnos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="card shadow-sm p-4 bg-white rounded">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-dark fw-bold mb-0">Listado de {rolSeleccionado}s</h4>
                    <span className="badge bg-primary fs-6 px-3 py-2">Total: {usuariosFiltrados.length}</span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Correo Electrónico</th>
                                <th>WhatsApp</th>
                                <th>Rol</th>
                                <th>Detalles / Asignación</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.length > 0 ? (
                                usuariosFiltrados.map((user) => {
                                    const esEsteElQueSeEdita = editandoId === user.id;

                                    return (
                                        <tr key={user.id}>
                                            {/* Nombre */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.nombre || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, nombre: e.target.value})}
                                                    />
                                                ) : (
                                                    <span className="fw-bold text-primary">{user.nombre}</span>
                                                )}
                                            </td>

                                            {/* Email */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="email" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.email || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, email: e.target.value})}
                                                    />
                                                ) : (
                                                    user.email
                                                )}
                                            </td>

                                            {/* WhatsApp */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.whatsapp || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, whatsapp: e.target.value})}
                                                    />
                                                ) : (
                                                    <a href={`tel:${user.whatsapp}`} className="text-decoration-none fw-semibold text-dark">
                                                        📱 {user.whatsapp}
                                                    </a>
                                                )}
                                            </td>

                                            {/* Rol (Permite cambiar de rol si es necesario) */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <select 
                                                        className="form-select form-select-sm"
                                                        value={formEdicion.rol || ''}
                                                        onChange={(e) => setFormEdicion({...formEdicion, rol: e.target.value as Usuario['rol']})}
                                                    >
                                                        <option value="Padre">Padre</option>
                                                        <option value="Profesor">Profesor</option>
                                                        <option value="Jugador">Jugador</option>
                                                    </select>
                                                ) : (
                                                    <span className={`badge ${user.rol === 'Profesor' ? 'bg-success' : user.rol === 'Padre' ? 'bg-warning text-dark' : 'bg-info text-dark'}`}>
                                                        {user.rol}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Detalles Extra */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.detallesExtra || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, detallesExtra: e.target.value})}
                                                    />
                                                ) : (
                                                    <span className="text-muted small">{user.detallesExtra}</span>
                                                )}
                                            </td>

                                            {/* Columna Acciones */}
                                            <td className="text-center">
                                                {esEsteElQueSeEdita ? (
                                                    <div className="d-flex justify-content-center gap-1">
                                                        <button 
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => handleGuardarEdicion(user.id)}
                                                            title="Guardar"
                                                        >
                                                            💾
                                                        </button>
                                                        <button 
                                                            className="btn btn-secondary btn-sm"
                                                            onClick={() => setEditandoId(null)}
                                                            title="Cancelar"
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
                                                                    href={`https://wa.me/57${user.whatsapp}?text=Hola%20${encodeURIComponent(user.nombre)},%20te%20contactamos%20desde%20la%20administración%20de%20la%20Gol%20de%20Oro.`}
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
                                                                    onClick={() => handleIniciarEdicion(user)}
                                                                >
                                                                    ✏️ Editar usuario
                                                                </button>
                                                            </li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li>
                                                                <button 
                                                                    className="dropdown-item text-danger fw-semibold"
                                                                    onClick={() => handleEliminarUsuario(user.id)}
                                                                >
                                                                    🗑️ Eliminar usuario
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-5">
                                        <h5>No hay usuarios registrados con este rol actualmente.</h5>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsuarios;