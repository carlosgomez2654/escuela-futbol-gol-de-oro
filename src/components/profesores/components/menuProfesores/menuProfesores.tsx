import { BotonesSesion } from '../../../compartidos/botonesSesion/BotonesSesion';
import './menuProfesores.css';

interface MenuProfesoresProps {
  onSelectSection: (section: string) => void;
}

const MenuProfesores = ({ onSelectSection }: MenuProfesoresProps) => {
  return (
    <nav className="menu-profesores">
      <div className="menu-header">
        <h2>Panel de Profesor</h2>
      </div>
      <ul className="menu-list">
        <li className="menu-item" onClick={() => onSelectSection('categorias')}>
          Categorías
        </li>
        <li className="menu-item" onClick={() => onSelectSection('pizarraTactica')}>
          Posiciones
        </li>
        <li className="menu-item" onClick={() => onSelectSection('calendario')}>
          Calendario
        </li>
      </ul>
      <BotonesSesion />
    </nav>
  );
};

export default MenuProfesores;