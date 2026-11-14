import './beneficios.css';

export function Beneficios() {
  return (
    <section className="beneficios-container">
      {/* Título Principal en Azul */}
      <h2 className="beneficios-titulo-principal">Beneficios del Fútbol</h2>

      {/* 1. Bloque Blanco */}
      <div className="beneficio-bloque bloque-blanco">
        <h3>Despierta el corazón</h3>
        <p>Mejoramos la respiración, la circulación y el sistema cardiovascular, fortaleciendo el corazón y los músculos.</p>
      </div>

      {/* 2. Bloque Azul */}
      <div className="beneficio-bloque bloque-azul">
        <h3>Crea amistad</h3>
        <p>Desarrollamos la empatía, la colaboración y la resolución de conflictos, fomentando una comunidad de amistad.</p>
      </div>

      {/* 3. Bloque Blanco (alternando de nuevo) */}
      <div className="beneficio-bloque bloque-blanco">
        <h3>Despierta la mente</h3>
        <p>Mejoramos la concentración, la atención y la resolución de problemas, fortaleciendo el razonamiento crítico.</p>
      </div>
    </section>
  );
}