import { createContext, useContext } from 'react';
import type { Usuario } from './usuariosPrueba';

// Lo que cualquier componente puede pedir sobre la sesión
export interface DatosAuth {
  usuario: Usuario | null;
  iniciarSesion: (email: string, password: string) => Usuario | null;
  cerrarSesion: () => void;
}

export const AuthContexto = createContext<DatosAuth | null>(null);

// Hook para usar la sesión desde cualquier componente
export function useAuth() {
  const datos = useContext(AuthContexto);
  if (!datos) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return datos;
}