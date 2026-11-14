import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Cada vez que cambia la ruta, sube al principio de la página
export function ScrollAlInicio() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No dibuja nada
}