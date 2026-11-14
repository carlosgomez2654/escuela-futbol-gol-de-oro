import './zonaPadres.css';

export function ZonaPadres() {
  return (
    <section className="zona-padres-container">
      <div className="container">
        
        {/* Título Principal */}
        <h2 className="zona-padres-titulo display-5">Zona para Padres</h2>

        {/* Tarjetas en Grid de Bootstrap */}
        <div className="row g-4">
          
          {/* Tarjeta 1: Alimentación */}
          <div className="col-md-4">
            <div className="tarjeta-padres text-start">
              <h3>Alimentación</h3>
              <p>
                Optimiza el rendimiento de tus hijos con una nutrición equilibrada y rica en carbohidratos complejos, proteínas magras y vitaminas esenciales para el fútbol.
              </p>
            </div>
          </div>

          {/* Tarjeta 2: Seguridad */}
          <div className="col-md-4">
            <div className="tarjeta-padres text-start">
              <h3>Seguridad</h3>
              <p>
                Seguridad absoluta en cada entrenamiento. Nosotros garantizamos el uso de equipo de protección de grado deportivo y supervisión constante por parte de entrenadores certificados.
              </p>
            </div>
          </div>

          {/* Tarjeta 3: Valores */}
          <div className="col-md-4">
            <div className="tarjeta-padres text-start">
              <h3>Valores</h3>
              <p>
                Fomentamos la integridad y el respeto. En Gol de Oro, el fútbol es un puente para el desarrollo personal, enseñando a los niños a respetar reglas y compañeros.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}