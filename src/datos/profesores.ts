// Profesores de la escuela (datos de ejemplo; después vendrán de la base de datos)

export interface Profesor {
  id: number;
  nombre: string;
}

export const PROFESORES: Profesor[] = [
  { id: 1, nombre: 'Andrés Rojas' },
  { id: 2, nombre: 'Laura Martínez' },
  { id: 3, nombre: 'Diego Herrera' },
];

export function buscarProfesor(id: number) {
  return PROFESORES.find((profesor) => profesor.id === id);
}
