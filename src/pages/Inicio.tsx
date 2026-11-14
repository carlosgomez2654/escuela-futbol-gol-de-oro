import { Carrusel } from '../components/carrusel/carrusel';
import { Beneficios } from '../components/beneficios/beneficios';
import { ZonaPadres } from '../components/ZonaPadres/zonaPadres';

export function Inicio() {
  return (
    <>
      <Carrusel />
      <hr className="border border-primary border-3 opacity-75 my-0" />
      <Beneficios />
      <hr className="border border-primary border-3 opacity-75 my-0" />
      <ZonaPadres />
    </>
  );
}