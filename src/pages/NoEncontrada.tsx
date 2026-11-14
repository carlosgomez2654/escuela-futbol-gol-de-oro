import { Link } from 'react-router';

export function NoEncontrada() {
  return (
    <div className="container text-center py-5">
      <p className="display-1 m-0">⚽</p>
      <h1 className="fw-bold">Página no encontrada</h1>
      <p className="text-muted">El balón se fue por fuera: esta dirección no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}