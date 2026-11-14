// Tipos, datos y funciones de ayuda de la pizarra táctica (sin JSX).

export interface Jugador {
  id: number;
  nombre: string;
  posicion: string;
}

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

// Todos los jugadores del equipo (cuando tengas backend, vendrán de la base de datos)
export const JUGADORES_EQUIPO: Jugador[] = [
  { id: 1, nombre: 'Andrés C.', posicion: 'Arquero' },
  { id: 2, nombre: 'Carlos M.', posicion: 'Defensa' },
  { id: 3, nombre: 'Felipe R.', posicion: 'Defensa' },
  { id: 4, nombre: 'Daniel P.', posicion: 'Defensa' },
  { id: 5, nombre: 'Esteban L.', posicion: 'Defensa' },
  { id: 6, nombre: 'Juanito R.', posicion: 'Mediocampista' },
  { id: 7, nombre: 'Mateo S.', posicion: 'Mediocampista' },
  { id: 8, nombre: 'Samuel T.', posicion: 'Mediocampista' },
  { id: 9, nombre: 'David V.', posicion: 'Mediocampista' },
  { id: 10, nombre: 'Santiago G.', posicion: 'Delantero' },
  { id: 11, nombre: 'Lucas B.', posicion: 'Delantero' },
  { id: 12, nombre: 'Alejandro Torres', posicion: 'Mediocampista' },
  { id: 13, nombre: 'Mateo Pérez', posicion: 'Delantero' },
  { id: 14, nombre: 'Samuel Rojas', posicion: 'Arquero' },
];

// La alineación que se muestra si el profesor todavía no ha guardado ninguna
const ALINEACION_INICIAL: Alineacion = {
  formacion: '4-4-2',
  asignaciones: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11 },
};

export function buscarJugador(id: number) {
  return JUGADORES_EQUIPO.find((jugador) => jugador.id === id);
}

// ----- localStorage -----
// (Cuando tengas backend, solo cambias estas dos funciones por llamadas a la API)

const CLAVE_STORAGE = 'goldeoro_alineacion';

export function cargarAlineacion(): Alineacion {
  const guardada = localStorage.getItem(CLAVE_STORAGE);
  return guardada ? JSON.parse(guardada) : ALINEACION_INICIAL;
}

export function guardarAlineacion(alineacion: Alineacion) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(alineacion));
}