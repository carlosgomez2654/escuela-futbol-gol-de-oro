import './inscripcion.css';
import CustomForm from '../customForm/CustomForm';
import { enlaceWhatsapp } from '../../config/contacto';

export function Inscripcion() {
  return (
    <div className="inscripcion-wrapper container-fluid p-0">
      <div className="row g-0 w-100 align-items-stretch">
        
        {/* COLUMNA IZQUIERDA: Contáctanos */}
        <div className="col-lg-6 inscripcion-info-side text-white">
          <div>
            <span className="subtitulo-seccion text-info fw-bold">// Contáctanos</span>
            <h1 className="inscripcion-titulo-principal fw-bold display-5 my-3 text-white">
              Inscribe a tu hijo/a hoy mismo
            </h1>
            <p className="opacity-75 fs-6 mb-4">
              Rellena el formulario y nuestro equipo administrativo se pondrá en contacto contigo en menos de 24 horas para darte toda la información de pagos (efectivo o Nequi) y coordinar el ingreso.
            </p>

            <ul className="beneficios-lista list-unstyled lh-lg">
              <li>✓ Primera clase de cortesía sin compromiso</li>
              <li>✓ Programas formativos por categorías y edades</li>
              <li>✓ Entrenadores profesionales certificados</li>
              <li>✓ Metodología enfocada en valores y técnica</li>
              <li>✓ Seguimiento detallado del desarrollo integral</li>
            </ul>

            <div className="mt-4">
              <a
                href={enlaceWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success w-100 py-3 fw-bold"
              >
                💬 Contactar por WhatsApp Directo
              </a>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Formulario que cubre toda la mitad */}
        <div className="col-lg-6 bg-white d-flex align-items-center justify-content-center p-0">
          <CustomForm />
        </div>

      </div>
    </div>
  );
}