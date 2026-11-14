// Categorías de la escuela. Cada una tiene UN profesor a cargo.

export interface Categoria {
  id: number;
  nombre: string;
  edadMin: number;
  edadMax: number;
  profesorId: number; // id en PROFESORES
}

export const CATEGORIAS: Categoria[] = [
  { id: 1, nombre: 'Sub-8', edadMin: 6, edadMax: 8, profesorId: 3 },
  { id: 2, nombre: 'Sub-10', edadMin: 9, edadMax: 10, profesorId: 2 },
  { id: 3, nombre: 'Sub-12', edadMin: 11, edadMax: 12, profesorId: 1 },
  { id: 4, nombre: 'Sub-15', edadMin: 13, edadMax: 15, profesorId: 1 },
];

export function buscarCategoria(id: number) {
  return CATEGORIAS.find((categoria) => categoria.id === id);
}

// Las categorías que entrena un profesor (un profesor puede tener varias)
export function categoriasDeProfesor(profesorId: number) {
  return CATEGORIAS.filter((categoria) => categoria.profesorId === profesorId);
}
