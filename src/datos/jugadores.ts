// Jugadores de la escuela. Cada uno pertenece a UNA categoría.

export interface Jugador {
  id: number;
  nombre: string;
  posicion: string;
  categoriaId: number; // id en CATEGORIAS
  edad: number;
  acudiente: string;   // Padre, madre o persona a cargo
  whatsapp: string;
  eps: string;
  tipoSangre: string;
}

export const JUGADORES: Jugador[] = [
  // ----- Sub-12 (categoriaId: 3) -----
  { id: 1, nombre: 'Andrés C.', posicion: 'Arquero', categoriaId: 3, edad: 12, acudiente: 'Marta Castro', whatsapp: '3001112233', eps: 'Sura', tipoSangre: 'O+' },
  { id: 2, nombre: 'Carlos M.', posicion: 'Defensa', categoriaId: 3, edad: 11, acudiente: 'Jorge Méndez', whatsapp: '3002223344', eps: 'Sanitas', tipoSangre: 'A+' },
  { id: 3, nombre: 'Felipe R.', posicion: 'Defensa', categoriaId: 3, edad: 12, acudiente: 'Paola Ríos', whatsapp: '3003334455', eps: 'Compensar', tipoSangre: 'O+' },
  { id: 4, nombre: 'Daniel P.', posicion: 'Defensa', categoriaId: 3, edad: 11, acudiente: 'Luis Pardo', whatsapp: '3004445566', eps: 'Nueva EPS', tipoSangre: 'B+' },
  { id: 5, nombre: 'Esteban L.', posicion: 'Defensa', categoriaId: 3, edad: 12, acudiente: 'Diana López', whatsapp: '3005556677', eps: 'Sura', tipoSangre: 'O-' },
  { id: 6, nombre: 'Juanito R.', posicion: 'Mediocampista', categoriaId: 3, edad: 11, acudiente: 'Camilo Ruiz', whatsapp: '3006667788', eps: 'Famisanar', tipoSangre: 'A+' },
  { id: 7, nombre: 'Mateo S.', posicion: 'Mediocampista', categoriaId: 3, edad: 12, acudiente: 'Sandra Suárez', whatsapp: '3007778899', eps: 'Sanitas', tipoSangre: 'O+' },
  { id: 8, nombre: 'Samuel T.', posicion: 'Mediocampista', categoriaId: 3, edad: 11, acudiente: 'Ricardo Torres', whatsapp: '3008889900', eps: 'Compensar', tipoSangre: 'AB+' },
  { id: 9, nombre: 'David V.', posicion: 'Mediocampista', categoriaId: 3, edad: 12, acudiente: 'Natalia Vargas', whatsapp: '3009990011', eps: 'Sura', tipoSangre: 'O+' },
  { id: 10, nombre: 'Santiago G.', posicion: 'Delantero', categoriaId: 3, edad: 11, acudiente: 'Carlos Gómez', whatsapp: '3001234567', eps: 'Sanitas', tipoSangre: 'O+' },
  { id: 11, nombre: 'Lucas B.', posicion: 'Delantero', categoriaId: 3, edad: 12, acudiente: 'Andrea Bernal', whatsapp: '3011112233', eps: 'Nueva EPS', tipoSangre: 'A-' },
  { id: 12, nombre: 'Alejandro Torres', posicion: 'Mediocampista', categoriaId: 3, edad: 11, acudiente: 'Ricardo Torres', whatsapp: '3008889900', eps: 'Compensar', tipoSangre: 'O+' },
  { id: 13, nombre: 'Mateo Pérez', posicion: 'Delantero', categoriaId: 3, edad: 12, acudiente: 'Gloria Pérez', whatsapp: '3012223344', eps: 'Famisanar', tipoSangre: 'B+' },
  { id: 14, nombre: 'Samuel Rojas', posicion: 'Arquero', categoriaId: 3, edad: 11, acudiente: 'Héctor Rojas', whatsapp: '3013334455', eps: 'Sura', tipoSangre: 'O+' },

  // ----- Sub-15 (categoriaId: 4) -----
  { id: 15, nombre: 'Julián O.', posicion: 'Arquero', categoriaId: 4, edad: 14, acudiente: 'Beatriz Ortiz', whatsapp: '3014445566', eps: 'Sanitas', tipoSangre: 'A+' },
  { id: 16, nombre: 'Sebastián N.', posicion: 'Defensa', categoriaId: 4, edad: 15, acudiente: 'Mauricio Niño', whatsapp: '3015556677', eps: 'Compensar', tipoSangre: 'O+' },
  { id: 17, nombre: 'Tomás A.', posicion: 'Mediocampista', categoriaId: 4, edad: 13, acudiente: 'Liliana Arias', whatsapp: '3016667788', eps: 'Sura', tipoSangre: 'O-' },
  { id: 18, nombre: 'Nicolás F.', posicion: 'Mediocampista', categoriaId: 4, edad: 14, acudiente: 'Fernando Forero', whatsapp: '3017778899', eps: 'Nueva EPS', tipoSangre: 'B+' },
  { id: 19, nombre: 'Emiliano C.', posicion: 'Delantero', categoriaId: 4, edad: 15, acudiente: 'Adriana Cruz', whatsapp: '3018889900', eps: 'Famisanar', tipoSangre: 'A+' },

  // ----- Sub-10 (categoriaId: 2) -----
  { id: 20, nombre: 'Martín H.', posicion: 'Arquero', categoriaId: 2, edad: 9, acudiente: 'Carolina Hurtado', whatsapp: '3019990011', eps: 'Sura', tipoSangre: 'O+' },
  { id: 21, nombre: 'Gabriel E.', posicion: 'Defensa', categoriaId: 2, edad: 10, acudiente: 'Oscar Espinosa', whatsapp: '3021112233', eps: 'Sanitas', tipoSangre: 'A+' },
  { id: 22, nombre: 'Valentina Q.', posicion: 'Mediocampista', categoriaId: 2, edad: 9, acudiente: 'Juliana Quintero', whatsapp: '3022223344', eps: 'Compensar', tipoSangre: 'O+' },
  { id: 23, nombre: 'Miguel D.', posicion: 'Delantero', categoriaId: 2, edad: 10, acudiente: 'Andrés Díaz', whatsapp: '3023334455', eps: 'Nueva EPS', tipoSangre: 'B-' },

  // ----- Sub-8 (categoriaId: 1) -----
  { id: 24, nombre: 'Jerónimo L.', posicion: 'Arquero', categoriaId: 1, edad: 7, acudiente: 'Paula Lozano', whatsapp: '3024445566', eps: 'Famisanar', tipoSangre: 'O+' },
  { id: 25, nombre: 'Isabella M.', posicion: 'Defensa', categoriaId: 1, edad: 6, acudiente: 'Germán Mora', whatsapp: '3025556677', eps: 'Sura', tipoSangre: 'A+' },
  { id: 26, nombre: 'Emmanuel V.', posicion: 'Mediocampista', categoriaId: 1, edad: 8, acudiente: 'Rosa Valencia', whatsapp: '3026667788', eps: 'Sanitas', tipoSangre: 'O+' },
  { id: 27, nombre: 'Simón P.', posicion: 'Delantero', categoriaId: 1, edad: 7, acudiente: 'Iván Peña', whatsapp: '3027778899', eps: 'Compensar', tipoSangre: 'AB-' },
];

export function buscarJugador(id: number) {
  return JUGADORES.find((jugador) => jugador.id === id);
}

export function jugadoresDeCategoria(categoriaId: number) {
  return JUGADORES.filter((jugador) => jugador.categoriaId === categoriaId);
}
