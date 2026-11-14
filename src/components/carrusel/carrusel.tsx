import { Link } from 'react-router';
import foto1 from '../../assets/carrusel-1.jpg';
import foto2 from '../../assets/carrusel-2.jpg';
import foto3 from '../../assets/carrusel-3.jpg';
import './carrusel.css';

// Fotos del carrusel con su descripción (el "alt" es para lectores de pantalla y Google)
const fotos = [
  { src: foto1, alt: 'Balones de fútbol listos para el entrenamiento' },
  { src: foto2, alt: 'Jugador conduciendo el balón en la cancha' },
  { src: foto3, alt: 'Guayos naranjas en la esquina de una cancha' },
];

export function Carrusel() {
  return (
    <div id="carruselGolDeOro" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {fotos.map((foto, index) => (
          <div key={foto.src} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img src={foto.src} className="d-block w-100" alt={foto.alt} />
          </div>
        ))}
      </div>

      {/* Título y botón: van UNA sola vez, encima de todas las fotos */}
      <div className="carrusel-contenido">
        <p className="carrusel-subtitulo">Escuela de Fútbol</p>
        <h1 className="carrusel-titulo">⚽ Gol de Oro</h1>
        <p className="carrusel-lema">Formamos deportistas y personas con valores</p>
        <Link to="/inscripcion" className="btn btn-primary btn-lg px-4 shadow">
          Unirme ahora
        </Link>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carruselGolDeOro" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carruselGolDeOro" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}