import { useState } from 'react';
import { Calendario } from '../compartidos/calendario/calendario';
import  MenuPadres  from './components/menuPadres/menuPadres';
import { Pagos }  from './components/pagos/pagos'
import { PizarraTactica } from '../compartidos/pizarraTactica/pizarraTactica';  
import { useAuth } from '../../auth/authContexto';

import './padresDashboard.css';

const PadresDashboard = () => {
  const { usuario } = useAuth();
  // Estado para controlar qué sección está activa actualmente
  const [activeSection, setActiveSection] = useState<string>('CalendarioPadres');

  return (
    <div className="padres-dashboard">
      {/* Menú lateral de navegación */}
      <MenuPadres onSelectSection={setActiveSection} />

      {/* Área de contenido principal */}
      <main className="dashboard-main">       
        {activeSection === 'CalendarioPadres' && <Calendario />}
        {activeSection === 'Pagos' && <Pagos />}
        {activeSection === 'pizarraTactica' && <PizarraTactica jugadorDestacadoId={usuario?.jugadorId} />}

      </main>
    </div>
  );
};

export default PadresDashboard;