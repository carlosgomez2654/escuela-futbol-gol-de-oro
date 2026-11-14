import { useAuth } from './authContexto';
import { CATEGORIAS, buscarCategoria, categoriasDeProfesor, type Categoria } from '../datos/categorias';
import { buscarJugador } from '../datos/jugadores';

// Devuelve las categorías que le corresponden al usuario que inició sesión:
// - Admin: todas
// - Profesor: las que entrena
// - Padre y jugador: la categoría del niño
export function useCategoriasDelUsuario(): Categoria[] {
  const { usuario } = useAuth();

  if (!usuario) return [];

  if (usuario.rol === 'admin') return CATEGORIAS;

  if (usuario.rol === 'profesor') {
    return usuario.profesorId !== undefined ? categoriasDeProfesor(usuario.profesorId) : [];
  }

  // Padre o jugador: buscamos al niño y luego su categoría
  const jugador = usuario.jugadorId !== undefined ? buscarJugador(usuario.jugadorId) : undefined;
  const categoria = jugador ? buscarCategoria(jugador.categoriaId) : undefined;
  return categoria ? [categoria] : [];
}
