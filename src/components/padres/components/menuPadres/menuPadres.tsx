import { BotonesSesion } from '../../../compartidos/botonesSesion/BotonesSesion';
import './menuPadres.css';

interface MenuPadresProps {
  onSelectSection: (section: string) => void;
}

const MenuPadres = ({ onSelectSection }: MenuPadresProps) => {
  return (
    <nav className="menu-padres">
      <div className="menu-header">
        <h2>Panel de Padre</h2>
      </div>
      <ul className="menu-list">
        <li className="menu-item" onClick={() => onSelectSection('CalendarioPadres')}>
          Calendario
        </li>
        <li className="menu-item" onClick={() => onSelectSection('Pagos')}>
          Pagos
        </li>
        <li className="menu-item" onClick={() => onSelectSection('pizarraTactica')}>
          posiciones
        </li>

      </ul>
      <BotonesSesion />
    </nav>
  );
};

export default MenuPadres;