import { CONTACTO, enlaceWhatsapp } from '../../config/contacto';
import './footer.css';

export function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">

          {/* Columna 1: Marca */}
          <div className="col-md-4">
            <div className="footer-marca">⚽ Gol de Oro</div>
            <p className="mb-1 fw-semibold">Escuela de Fútbol Infantil</p>
            <p className="small">
              Formamos deportistas y personas con valores, disciplina y amor por el fútbol.
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div className="col-md-4">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>📍 {CONTACTO.direccion}</li>
              <li>
                <a href={enlaceWhatsapp} target="_blank" rel="noopener noreferrer">
                  📱 {CONTACTO.whatsappVisible}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTO.email}`}>✉️ {CONTACTO.email}</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes y horarios */}
          <div className="col-md-4">
            <h5>Síguenos</h5>
            <ul className="list-unstyled">
              {CONTACTO.instagram && (
                <li>
                  <a href={CONTACTO.instagram} target="_blank" rel="noopener noreferrer">📸 Instagram</a>
                </li>
              )}
              {CONTACTO.facebook && (
                <li>
                  <a href={CONTACTO.facebook} target="_blank" rel="noopener noreferrer">👍 Facebook</a>
                </li>
              )}
            </ul>

            <h5 className="mt-4">Horarios</h5>
            <ul className="list-unstyled small">
              <li>Jueves y Viernes · 4:00 – 6:00 PM</li>
              <li>Sábados y Domingos · 8:00 – 10:00 AM</li>
            </ul>
          </div>
        </div>

        {/* Mapa: solo aparece si pusiste mapaUrl en contacto.ts */}
        {CONTACTO.mapaUrl && (
          <div className="footer-mapa mt-4">
            <iframe
              src={CONTACTO.mapaUrl}
              title="Ubicación de la Escuela de Fútbol Gol de Oro"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}

        <div className="footer-copy">
          © {anioActual} Escuela de Fútbol Gol de Oro · Proyecto de portafolio: la escuela y sus datos son ficticios.
        </div>
      </div>
    </footer>
  );
}