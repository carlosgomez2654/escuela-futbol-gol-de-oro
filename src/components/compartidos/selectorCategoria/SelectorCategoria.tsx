import { buscarProfesor } from '../../../datos/profesores';
import type { Categoria } from '../../../datos/categorias';

interface SelectorCategoriaProps {
  categorias: Categoria[];
  categoriaId: number;
  onCambiar: (categoriaId: number) => void;
}

// Si hay varias categorías (profesor), muestra un menú para elegir.
// Si hay una sola (padre o jugador), muestra la categoría con su profesor y edades.
export function SelectorCategoria({ categorias, categoriaId, onCambiar }: SelectorCategoriaProps) {
  if (categorias.length <= 1) {
    const categoria = categorias[0];
    const profesor = categoria ? buscarProfesor(categoria.profesorId) : undefined;

    return (
      <div className="d-flex flex-wrap align-items-center gap-2 bg-white border rounded shadow-sm px-3 py-2">
        <span className="badge bg-primary fs-6">⚽ Categoría {categoria?.nombre}</span>
        {profesor && (
          <span className="fw-semibold text-secondary">👨‍🏫 Profesor: {profesor.nombre}</span>
        )}
        {categoria && (
          <span className="text-muted small">
            🎂 {categoria.edadMin} a {categoria.edadMax} años
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="selector-categoria" className="fw-semibold text-secondary text-nowrap">
        Categoría:
      </label>
      <select
        id="selector-categoria"
        className="form-select w-auto"
        value={categoriaId}
        onChange={(e) => onCambiar(Number(e.target.value))}
      >
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}