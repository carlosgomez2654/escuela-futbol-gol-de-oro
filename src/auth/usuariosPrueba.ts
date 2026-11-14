// Usuarios de prueba mientras no hay backend.
// ⚠️ En una aplicación real las contraseñas NUNCA se escriben en el código del frontend:
// se guardan cifradas en la base de datos y las revisa el servidor (Fase 5).

export type Rol = 'admin' | 'profesor' | 'padre' | 'jugador';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
  jugadorId?: number; // Padre: id de su hijo. Jugador: su propio id (en JUGADORES_EQUIPO)
}

// Usuario + contraseña (solo existe aquí; la sesión guarda el Usuario SIN contraseña)
interface UsuarioConPassword extends Usuario {
  password: string;
}

export const USUARIOS_PRUEBA: UsuarioConPassword[] = [
  { id: 1, nombre: 'Administrador', email: 'admin@goldeoro.com', password: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'Prof. Alberto', email: 'profe@goldeoro.com', password: 'profe123', rol: 'profesor' },
  { id: 3, nombre: 'Carlos Gómez', email: 'padre@goldeoro.com', password: 'padre123', rol: 'padre', jugadorId: 10 },
  { id: 4, nombre: 'Santiago G.', email: 'jugador@goldeoro.com', password: 'jugador123', rol: 'jugador', jugadorId: 10 },
];

// A qué dashboard va cada rol después de iniciar sesión
export const RUTA_POR_ROL: Record<Rol, string> = {
  admin: '/admin',
  profesor: '/profesor',
  padre: '/padre',
  jugador: '/jugador',
};

// Devuelve el usuario (sin contraseña) si el correo y la contraseña coinciden; si no, null
export function buscarUsuario(email: string, password: string): Usuario | null {
  const encontrado = USUARIOS_PRUEBA.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password,
  );
  if (!encontrado) return null;

  // Devolvemos los datos del usuario SIN la contraseña
  return {
    id: encontrado.id,
    nombre: encontrado.nombre,
    email: encontrado.email,
    rol: encontrado.rol,
    jugadorId: encontrado.jugadorId,
  };
}