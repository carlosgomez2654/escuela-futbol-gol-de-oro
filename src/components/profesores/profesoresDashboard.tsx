import { useState } from 'react';
import MenuProfesores from './components/menuProfesores/menuProfesores';
import Categorias from '../compartidos/categorias/categorias';
import { Lugar } from './components/lugar/lugar';
import { PizarraTactica } from '../compartidos/pizarraTactica/pizarraTactica';  // Ajusta la ruta según dónde hayas guardado el archivo
import { Calendario } from '../compartidos/calendario/calendario';
import './profesoresDashboard.css';

const ProfesoresDashboard = () => {
  // Estado para controlar qué sección está activa actualmente
  const [activeSection, setActiveSection] = useState<string>('categorias');

  return (
    <div className="profesores-dashboard">
      {/* Menú lateral de navegación */}
      <MenuProfesores onSelectSection={setActiveSection} />

      {/* Área de contenido principal */}
      <main className="dashboard-main">
        {activeSection === 'categorias' && <Categorias />}
        {activeSection === 'lugar' && <Lugar />}
        {activeSection === 'pizarraTactica' && <PizarraTactica editable={true} /> }
        {activeSection === 'calendario' && <Calendario editable={true} />}
      </main>
    </div>
  );
};

export default ProfesoresDashboard;