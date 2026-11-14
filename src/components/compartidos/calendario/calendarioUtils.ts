// Tipos, constantes y funciones de ayuda del calendario.
// No tiene JSX: es lógica pura que usan los componentes del calendario.

export type TipoEvento = 'Entrenamiento' | 'Partido' | 'Torneo' | 'Reunión';

export interface EventoDia {
  titulo: string;
  tipo: TipoEvento;
  hora: string;
  lugar: string;
}

// Los eventos de un mes. La clave es el número del día: "1", "2", ... "31"
export type EventosDelMes = Record<string, EventoDia>;

export const NOMBRES_MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

// Color e ícono de cada tipo de evento, en un solo lugar
export const ESTILO_POR_TIPO: Record<TipoEvento, { clase: string; icono: string }> = {
  Entrenamiento: { clase: 'bg-success', icono: '⚽' },
  Partido: { clase: 'bg-danger', icono: '🏆' },
  Torneo: { clase: 'bg-warning text-dark', icono: '🥇' },
  Reunión: { clase: 'bg-info text-dark', icono: '🗣️' },
};

// Valores por defecto cuando se crea un evento nuevo
export const EVENTO_VACIO: EventoDia = {
  titulo: '',
  tipo: 'Entrenamiento',
  hora: '16:00',
  lugar: 'Cancha principal',
};

// ----- localStorage -----
// (Cuando tengas backend, solo cambias estas dos funciones por llamadas a la API)

// Cada categoría tiene su propio calendario, así que la clave incluye la categoría
const claveStorage = (categoriaId: number, ano: number, mes: number) =>
  `goldeoro_cal_${categoriaId}_${ano}_${mes}`;

export function cargarEventos(categoriaId: number, ano: number, mes: number): EventosDelMes {
  const guardados = localStorage.getItem(claveStorage(categoriaId, ano, mes));
  return guardados ? JSON.parse(guardados) : {};
}

export function guardarEventos(categoriaId: number, ano: number, mes: number, eventos: EventosDelMes) {
  localStorage.setItem(claveStorage(categoriaId, ano, mes), JSON.stringify(eventos));
}

// ----- Fechas -----

export function obtenerDiasDelMes(ano: number, mes: number) {
  return new Date(ano, mes + 1, 0).getDate();
}

// Cuántas casillas vacías van antes del día 1 (la semana empieza en lunes)
export function obtenerPrimerDiaSemana(ano: number, mes: number) {
  const dia = new Date(ano, mes, 1).getDay();
  return dia === 0 ? 6 : dia - 1;
}