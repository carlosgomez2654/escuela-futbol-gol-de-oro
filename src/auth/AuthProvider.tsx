import { useState, type ReactNode } from 'react';
import { AuthContexto } from './authContexto';
import { buscarUsuario, type Usuario } from './usuariosPrueba';

const CLAVE_SESION = 'goldeoro_sesion';

function cargarSesion(): Usuario | null {
  const guardada = localStorage.getItem(CLAVE_SESION);
  return guardada ? JSON.parse(guardada) : null;
}

// Envuelve la app y comparte el usuario con todos los componentes
export function AuthProvider({ children }: { children: ReactNode }) {
  // Si había una sesión guardada, la recupera (así no se pierde al recargar la página)
  const [usuario, setUsuario] = useState<Usuario | null>(cargarSesion);

  const iniciarSesion = (email: string, password: string) => {
    const encontrado = buscarUsuario(email, password);
    if (encontrado) {
      setUsuario(encontrado);
      localStorage.setItem(CLAVE_SESION, JSON.stringify(encontrado));
    }
    return encontrado;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem(CLAVE_SESION);
  };

  return (
    <AuthContexto.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContexto.Provider>
  );
}