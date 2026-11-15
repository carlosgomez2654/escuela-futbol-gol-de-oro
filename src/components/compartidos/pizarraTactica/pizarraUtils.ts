// Tipos, datos y funciones de ayuda de la pizarra táctica (sin JSX).

import { jugadoresDeCategoria } from '../../../datos/jugadores';



// Una posición dentro de la cancha (en porcentaje, para que se adapte al tamaño)
export interface PosicionCancha {
  etiqueta: string;
  top: string;
  left: string;
}

export type Formacion = '4-4-2' | '4-3-3';

// Qué jugador está en cada posición: índice de la posición → id del jugador
export type Asignaciones = Record<number, number>;

export interface Alineacion {
  formacion: Formacion;
  asignaciones: Asignaciones;
}

export const FORMACIONES: Record<Formacion, { nombre: string; posiciones: PosicionCancha[] }> = {
  '4-4-2': {
    nombre: '4-4-2 Tradicional',
    posiciones: [
      { etiqueta: 'POR', top: '85%', left: '48%' },
      { etiqueta: 'LD', top: '65%', left: '80%' },
      { etiqueta: 'DFC', top: '68%', left: '60%' },
      { etiqueta: 'DFC', top: '68%', left: '36%' },
      { etiqueta: 'LI', top: '65%', left: '16%' },
      { etiqueta: 'MD', top: '40%', left: '80%' },
      { etiqueta: 'MC', top: '45%', left: '60%' },
      { etiqueta: 'MC', top: '45%', left: '36%' },
      { etiqueta: 'MI', top: '40%', left: '16%' },
      { etiqueta: 'DC', top: '20%', left: '58%' },
      { etiqueta: 'DC', top: '20%', left: '38%' },
    ],
  },
  '4-3-3': {
    nombre: '4-3-3 Ofensivo',
    posiciones: [
      { etiqueta: 'POR', top: '85%', left: '48%' },
      { etiqueta: 'LD', top: '65%', left: '80%' },
      { etiqueta: 'DFC', top: '68%', left: '60%' },
      { etiqueta: 'DFC', top: '68%', left: '36%' },
      { etiqueta: 'LI', top: '65%', left: '16%' },
      { etiqueta: 'MCD', top: '55%', left: '48%' },
      { etiqueta: 'MC', top: '38%', left: '65%' },
      { etiqueta: 'MC', top: '38%', left: '31%' },
      { etiqueta: 'ED', top: '20%', left: '80%' },
      { etiqueta: 'DC', top: '15%', left: '48%' },
      { etiqueta: 'EI', top: '20%', left: '16%' },
    ],
  },
};

// La alineación de una categoría cuando el profesor todavía no ha guardado ninguna:
// los primeros 11 jugadores de esa categoría, en orden.
function alineacionInicial(categoriaId: number): Alineacion {
  const asignaciones: Asignaciones = {};
  jugadoresDeCategoria(categoriaId)
    .slice(0, 11)
    .forEach((jugador, indice) => {
      asignaciones[indice] = jugador.id;
    });

  return { formacion: '4-4-2', asignaciones };
}

// ----- localStorage -----
// (Cuando tengas backend, solo cambias estas dos funciones por llamadas a la API)

// Cada categoría tiene su propia alineación
const claveStorage = (categoriaId: number) => `goldeoro_alineacion_${categoriaId}`;

export function cargarAlineacion(categoriaId: number): Alineacion {
  const guardada = localStorage.getItem(claveStorage(categoriaId));
  return guardada ? JSON.parse(guardada) : alineacionInicial(categoriaId);
}

export function guardarAlineacion(categoriaId: number, alineacion: Alineacion) {
  localStorage.setItem(claveStorage(categoriaId), JSON.stringify(alineacion));
}
