import { BotonesSesion } from '../../compartidos/botonesSesion/BotonesSesion';
import './menuJugadores.css';

interface MenuJugadoresProps {
  onSelectSection: (section: string) => void;
}

const MenuJugadores = ({ onSelectSection }: MenuJugadoresProps) => {
  return (
    <nav className="menu-jugadores">
      <div className="menu-header">
        <h2>Panel de Jugador</h2>
      </div>
      <ul className="menu-list">
        <li className="menu-item" onClick={() => onSelectSection('CalendarioJugadores')}>
          Calendario
        </li>
        <li className="menu-item" onClick={() => onSelectSection('pizarraTactica')}>
          posiciones
        </li>

      </ul>
      <BotonesSesion />
    </nav>
  );
};

export default MenuJugadores;