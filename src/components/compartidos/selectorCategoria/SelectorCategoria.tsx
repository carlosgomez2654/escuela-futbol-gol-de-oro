import type { Categoria } from '../../../datos/categorias';

interface SelectorCategoriaProps {
  categorias: Categoria[];
  categoriaId: number;
  onCambiar: (categoriaId: number) => void;
}

// Si hay varias categorías, muestra un menú para elegir.
// Si hay una sola, solo muestra su nombre.
export function SelectorCategoria({ categorias, categoriaId, onCambiar }: SelectorCategoriaProps) {
  if (categorias.length <= 1) {
    return (
      <span className="badge bg-primary fs-6 px-3 py-2">
        Categoría {categorias[0]?.nombre}
      </span>
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
