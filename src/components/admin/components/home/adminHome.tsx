import './adminHome.css';

const AdminHome = () => {
    return (
        <div className="admin-home">
            <h2 className="mb-4">📊 Resumen General de la Academia</h2>

            {/* Tarjetas de Estadísticas */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary shadow-sm p-3">
                        <h6>Jugadores Activos</h6>
                        <h3>120</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success shadow-sm p-3">
                        <h6>Entrenadores</h6>
                        <h3>8</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-warning shadow-sm p-3">
                        <h6>Inscripciones Nuevas</h6>
                        <h3>5</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-info shadow-sm p-3">
                        <h6>Categorías</h6>
                        <h3>6</h3>
                    </div>
                </div>
            </div>

            {/* Sección de Actividad Reciente */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3">📥 Últimas Solicitudes de Inscripción</h5>
                        <p className="text-muted">Aquí verás un listado rápido de los aspirantes más recientes listos para ser gestionados.</p>
                        {/* Aquí luego montaremos la tabla de datos */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;