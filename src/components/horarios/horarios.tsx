import './horarios.css';

export function Horarios() {
  return (
    <section className="horarios-container">
      <div className="container">
        
        {/* Título de la sección */}
        <h2 className="horarios-titulo display-5">Horarios de Entrenamiento</h2>

        {/* Grid de Bootstrap para organizar los bloques */}
        <div className="row g-4">
          
          {/* Bloque 1: Entre semana */}
          <div className="col-md-6">
            <div className="tarjeta-horario">
              <h3>Días de Semana</h3>
              <div className="hora">Jueves y Viernes</div>
              <p>
                <strong>4:00 PM – 6:00 PM</strong><br />
                Práctica enfocada en técnica individual, control de balón, fundamentos tácticos y preparación física general.
              </p>
            </div>
          </div>

          {/* Bloque 2: Fin de semana */}
          <div className="col-md-6">
            <div className="tarjeta-horario">
              <h3>Fines de Semana</h3>
              <div className="hora">Sábados y Domingos</div>
              <p>
                <strong>8:00 AM – 10:00 PM</strong> (8:00 AM – 10:00 AM)<br />
                Sesiones orientadas a partidos formativos, jugadas en equipo, posicionamiento en cancha y dinámicas de juego competitivas.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}