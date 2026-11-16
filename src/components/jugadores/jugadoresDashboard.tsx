import { useState } from 'react';
import { Calendario } from '../compartidos/calendario/calendario';
import { PizarraTactica } from '../compartidos/pizarraTactica/pizarraTactica';
import { MenuDashboard, type OpcionMenu } from '../compartidos/menuDashboard/MenuDashboard';
import { useAuth } from '../../auth/authContexto';

type SeccionJugador = 'calendario' | 'pizarra';

const opciones: OpcionMenu<SeccionJugador>[] = [
  { seccion: 'calendario', texto: '📅 Calendario' },
  { seccion: 'pizarra', texto: '⚽ Posiciones' },
];

const JugadoresDashboard = () => {
  const { usuario } = useAuth();
  const [seccionActiva, setSeccionActiva] = useState<SeccionJugador>('calendario');

  return (
    <div>
      <MenuDashboard
        titulo="Panel de Jugador"
        opciones={opciones}
        seccionActiva={seccionActiva}
        onSeleccionar={setSeccionActiva}
      />

      <main>
        {seccionActiva === 'calendario' && <Calendario />}
        {seccionActiva === 'pizarra' && <PizarraTactica jugadorDestacadoId={usuario?.jugadorId} />}
      </main>
    </div>
  );
};

export default JugadoresDashboard;
