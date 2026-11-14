import { useState } from 'react';
import { CATEGORIAS, buscarCategoria } from '../../../datos/categorias';
import { buscarProfesor } from '../../../datos/profesores';
import { JUGADORES } from '../../../datos/jugadores';

// Estructura del Jugador/Alumno, como la usa esta pantalla
export interface Alumno {
    id: number;
    nombreNino: string;
    edad: number;
    nombrePadre: string;
    whatsapp: string;
    eps: string;
    tipoSangre: string;
    categoria: string; // Nombre de la categoría (ej: "Sub-12")
}

// Convierte los jugadores de la fuente de datos al formato de esta pantalla
const alumnosIniciales: Alumno[] = JUGADORES.map((jugador) => ({
    id: jugador.id,
    nombreNino: jugador.nombre,
    edad: jugador.edad,
    nombrePadre: jugador.acudiente,
    whatsapp: jugador.whatsapp,
    eps: jugador.eps,
    tipoSangre: jugador.tipoSangre,
    categoria: buscarCategoria(jugador.categoriaId)?.nombre ?? '',
}));

const Categorias = () => {
    // 1. Las categorías vienen de la fuente de datos compartida
    const categorias = CATEGORIAS;

    // 2. Alumnos con estado reactivo (empiezan con los jugadores de la escuela)
    const [alumnos, setAlumnos] = useState<Alumno[]>(alumnosIniciales);


    // Estado para la categoría seleccionada en el filtro superior
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Sub-8');

    // Estados para controlar la edición de un alumno en línea
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [formEdicion, setFormEdicion] = useState<Partial<Alumno>>({});

    // Funciones de gestión de alumnos
    const handleEliminarAlumno = (id: number) => {
        setAlumnos(alumnos.filter(alumno => alumno.id !== id));
    };

    const handleIniciarEdicion = (alumno: Alumno) => {
        setEditandoId(alumno.id);
        setFormEdicion(alumno);
    };

    const handleGuardarEdicion = (id: number) => {
        setAlumnos(
            alumnos.map(item => 
                item.id === id ? { ...item, ...formEdicion } as Alumno : item
            )
        );
        setEditandoId(null);
        setFormEdicion({});
    };

    // Buscamos la info de la categoría actual y filtramos los alumnos
    const infoCategoriaActual = categorias.find(cat => cat.nombre === categoriaSeleccionada);
    const alumnosFiltrados = alumnos.filter(alumno => alumno.categoria === categoriaSeleccionada);

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4 fw-bold text-primary">⚽ Gestión de Alumnos por Categoría</h2>

            {/* Menú desplegable para filtrar categoría */}
            <div className="card shadow-sm p-4 mb-4 bg-white rounded">
                <div className="row align-items-center">
                    <div className="col-md-5">
                        <label className="form-label fw-bold text-secondary">🔍 Filtrar por Categoría:</label>
                        <select 
                            className="form-select form-select-lg"
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        >
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.nombre}>
                                    {cat.nombre} ({cat.edadMin}-{cat.edadMax} años)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Tarjeta del Profesor */}
            {infoCategoriaActual && (
                <div className="card shadow-sm p-4 mb-4 bg-light border-primary border-2 rounded">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                        <div>
                            <span className="text-muted text-uppercase small fw-bold">Profesor a cargo de la categoría {infoCategoriaActual.nombre}</span>
                            <h1 className="display-5 fw-bold text-primary mb-0 mt-1">
                                👨‍🏫 {buscarProfesor(infoCategoriaActual.profesorId)?.nombre}
                            </h1>
                        </div>
                        <div className="mt-3 mt-md-0">
                            <span className="badge bg-primary fs-6 px-3 py-2">
                                🎂 Rango de edad: {infoCategoriaActual.edadMin} a {infoCategoriaActual.edadMax} años
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla con los datos de los jugadores y menú de acciones */}
            <div className="card shadow-sm p-4 bg-white rounded">
                <h4 className="mb-3 text-dark fw-bold">Listado de Deportistas Inscritos</h4>
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre del Niño/a</th>
                                <th>Edad</th>
                                <th>Padre / Madre</th>
                                <th>Contacto</th>
                                <th>EPS</th>
                                <th>Tipo Sangre</th>
                                <th>Categoría</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumnosFiltrados.length > 0 ? (
                                alumnosFiltrados.map((alumno) => {
                                    const esEsteElQueSeEdita = editandoId === alumno.id;

                                    return (
                                        <tr key={alumno.id}>
                                            {/* Nombre Niño */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.nombreNino || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, nombreNino: e.target.value})}
                                                    />
                                                ) : (
                                                    <span className="fw-bold text-primary">{alumno.nombreNino}</span>
                                                )}
                                            </td>

                                            {/* Edad */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="number" 
                                                        className="form-control form-control-sm"
                                                        style={{ width: '80px' }}
                                                        value={formEdicion.edad || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, edad: Number(e.target.value)})}
                                                    />
                                                ) : (
                                                    <span className="badge bg-secondary">{alumno.edad} años</span>
                                                )}
                                            </td>

                                            {/* Padre / Madre */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.nombrePadre || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, nombrePadre: e.target.value})}
                                                    />
                                                ) : (
                                                    alumno.nombrePadre
                                                )}
                                            </td>

                                            {/* Contacto */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.whatsapp || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, whatsapp: e.target.value})}
                                                    />
                                                ) : (
                                                    <a href={`tel:${alumno.whatsapp}`} className="text-decoration-none fw-semibold text-dark">
                                                        📱 {alumno.whatsapp}
                                                    </a>
                                                )}
                                            </td>

                                            {/* EPS */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        value={formEdicion.eps || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, eps: e.target.value})}
                                                    />
                                                ) : (
                                                    alumno.eps
                                                )}
                                            </td>

                                            {/* Tipo Sangre */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm"
                                                        style={{ width: '70px' }}
                                                        value={formEdicion.tipoSangre || ''} 
                                                        onChange={(e) => setFormEdicion({...formEdicion, tipoSangre: e.target.value})}
                                                    />
                                                ) : (
                                                    <span className="badge bg-danger">{alumno.tipoSangre}</span>
                                                )}
                                            </td>

                                            {/* Categoría (Permite moverlo de categoría si se requiere) */}
                                            <td>
                                                {esEsteElQueSeEdita ? (
                                                    <select 
                                                        className="form-select form-select-sm"
                                                        value={formEdicion.categoria || ''}
                                                        onChange={(e) => setFormEdicion({...formEdicion, categoria: e.target.value})}
                                                    >
                                                        {categorias.map(cat => (
                                                            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="badge bg-info text-dark">{alumno.categoria}</span>
                                                )}
                                            </td>

                                            {/* Columna Acciones (Menú Desplegable o Botones de Guardar) */}
                                            <td className="text-center">
                                                {esEsteElQueSeEdita ? (
                                                    <div className="d-flex justify-content-center gap-1">
                                                        <button 
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => handleGuardarEdicion(alumno.id)}
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
                                                                    href={`https://wa.me/57${alumno.whatsapp}?text=Hola%20${encodeURIComponent(alumno.nombrePadre)},%20te%20contactamos%20de%20la%20Gol%20de%20Oro.`}
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
                                                                    onClick={() => handleIniciarEdicion(alumno)}
                                                                >
                                                                    ✏️ Editar datos
                                                                </button>
                                                            </li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li>
                                                                <button 
                                                                    className="dropdown-item text-danger fw-semibold"
                                                                    onClick={() => handleEliminarAlumno(alumno.id)}
                                                                >
                                                                    🗑️ Eliminar de la lista
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
                                    <td colSpan={8} className="text-center text-muted py-5">
                                        <h5>No hay niños registrados en esta categoría actualmente.</h5>
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

export default Categorias;