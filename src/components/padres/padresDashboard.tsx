import { useState } from 'react';
import { Calendario } from '../compartidos/calendario/calendario';
import { Pagos } from './components/pagos/pagos';
import { PizarraTactica } from '../compartidos/pizarraTactica/pizarraTactica';
import { MenuDashboard, type OpcionMenu } from '../compartidos/menuDashboard/MenuDashboard';
import { useAuth } from '../../auth/authContexto';

// Las secciones del panel (TypeScript avisa si escribes una mal)
type SeccionPadre = 'calendario' | 'pagos' | 'pizarra';

const opciones: OpcionMenu<SeccionPadre>[] = [
  { seccion: 'calendario', texto: '📅 Calendario' },
  { seccion: 'pagos', texto: '💳 Pagos' },
  { seccion: 'pizarra', texto: '⚽ Posiciones' },
];

const PadresDashboard = () => {
  const { usuario } = useAuth();
  const [seccionActiva, setSeccionActiva] = useState<SeccionPadre>('calendario');

  return (
    <div>
      <MenuDashboard
        titulo="Panel de Padre"
        opciones={opciones}
        seccionActiva={seccionActiva}
        onSeleccionar={setSeccionActiva}
      />

      <main>
        {seccionActiva === 'calendario' && <Calendario />}
        {seccionActiva === 'pagos' && <Pagos />}
        {seccionActiva === 'pizarra' && <PizarraTactica jugadorDestacadoId={usuario?.jugadorId} />}
      </main>
    </div>
  );
};

export default PadresDashboard;
