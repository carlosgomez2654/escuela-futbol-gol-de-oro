import { useState } from 'react';
import Categorias from '../compartidos/categorias/categorias';
import { PizarraTactica } from '../compartidos/pizarraTactica/pizarraTactica';
import { Calendario } from '../compartidos/calendario/calendario';
import { MenuDashboard, type OpcionMenu } from '../compartidos/menuDashboard/MenuDashboard';

type SeccionProfesor = 'categorias' | 'pizarra' | 'calendario';

const opciones: OpcionMenu<SeccionProfesor>[] = [
  { seccion: 'categorias', texto: '📁 Categorías' },
  { seccion: 'pizarra', texto: '⚽ Posiciones' },
  { seccion: 'calendario', texto: '📅 Calendario' },
];

const ProfesoresDashboard = () => {
  const [seccionActiva, setSeccionActiva] = useState<SeccionProfesor>('categorias');

  return (
    <div>
      <MenuDashboard
        titulo="Panel de Profesor"
        opciones={opciones}
        seccionActiva={seccionActiva}
        onSeleccionar={setSeccionActiva}
      />

      <main>
        {seccionActiva === 'categorias' && <Categorias />}
        {seccionActiva === 'pizarra' && <PizarraTactica editable />}
        {seccionActiva === 'calendario' && <Calendario editable />}
      </main>
    </div>
  );
};

export default ProfesoresDashboard;
