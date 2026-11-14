import { useEffect, useState } from 'react';

interface Resultado<T> {
  url: string; // De qué URL es este resultado
  data: T | null;
  error: Error | null;
}

// Pide datos a una URL y devuelve { data, loading, error }
export function useFetch<T>(url: string) {
  const [resultado, setResultado] = useState<Resultado<T> | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al pedir los datos`);
        return respuesta.json() as Promise<T>;
      })
      .then((data) => setResultado({ url, data, error: null }))
      .catch((error: Error) => {
        // Si se canceló (porque cambió la URL o se cerró el componente), no hacemos nada
        if (!controller.signal.aborted) setResultado({ url, data: null, error });
      });

    // Al cambiar la URL o desmontar el componente, cancela la petición anterior
    return () => controller.abort();
  }, [url]);

  // "Cargando" = todavía no hay resultado para la URL actual (se calcula, no es un estado)
  const listo = resultado !== null && resultado.url === url;

  return {
    data: listo ? resultado.data : null,
    loading: !listo,
    error: listo ? resultado.error : null,
  };
}