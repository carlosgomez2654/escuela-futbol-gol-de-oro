import './precios.css';

export function Precios() {
  return (
    <section className="precios-container">
      <div className="container">
        
        {/* Título de la sección */}
        <h2 className="precios-titulo display-5">Precios y Matrículas</h2>

        {/* Grid de Bootstrap para organizar los bloques de costos */}
        <div className="row g-4">
          
          {/* Bloque 1: Inscripción */}
          <div className="col-md-6">
            <div className="tarjeta-precio">
              <h3>Inscripción Única</h3>
              <div className="monto">$460.000 COP</div>
              <p>
                Incluye el registro oficial en la escuela, seguro deportivo y el kit de bienvenida para el estudiante.
              </p>
            </div>
          </div>

          {/* Bloque 2: Mensualidad */}
          <div className="col-md-6">
            <div className="tarjeta-precio">
              <h3>Mensualidad</h3>
              <div className="monto">$120.000 COP</div>
              <p>
                Acceso completo a todas las sesiones de entrenamiento programadas durante el mes con entrenadores certificados.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}