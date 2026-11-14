import { BotonesSesion } from '../../../compartidos/botonesSesion/BotonesSesion';
import './AdminNav.css';
// Importamos el tipo compartido desde el Dashboard (o desde tu archivo de tipos si lo tienes aparte)
import type { AdminSection } from '../../../../Types/adminTypes';

interface Props {
    activeSection: AdminSection; // Usamos el tipo exacto en lugar de 'string'
    setActiveSection: (section: AdminSection) => void;
}

const AdminNav = ({ activeSection, setActiveSection }: Props) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container-fluid">
                {/* Marca o título del panel */}
                <span className="navbar-brand fw-bold text-primary">
                    ⚽ Panel Admin
                </span>

                {/* Botón hamburguesa para dispositivos móviles */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAdmin" 
                    aria-controls="navbarNavAdmin" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Enlaces de navegación del Administrador */}
                <div className="collapse navbar-collapse" id="navbarNavAdmin">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link border-0 ${activeSection === 'home' ? 'active fw-bold text-primary' : ''}`}
                                onClick={() => setActiveSection('home')}
                            >
                                📊 Resumen
                            </button>
                        </li>

                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link border-0 ${activeSection === 'inscripciones' ? 'active fw-bold text-primary' : ''}`}
                                onClick={() => setActiveSection('inscripciones')}
                            >
                                📥 Inscripciones
                            </button>
                        </li>

                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link border-0 ${activeSection === 'categorias' ? 'active fw-bold text-primary' : ''}`}
                                onClick={() => setActiveSection('categorias')}
                            >
                                📁 Categorías
                            </button>
                        </li>

                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link border-0 ${activeSection === 'usuarios' ? 'active fw-bold text-primary' : ''}`}
                                onClick={() => setActiveSection('usuarios')}
                            >
                                👥 Usuarios
                            </button>
                        </li>

                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link border-0 ${activeSection === 'pagos' ? 'active fw-bold text-primary' : ''}`}
                                onClick={() => setActiveSection('pagos')}
                            >
                                💳 Pagos
                            </button>
                        </li>

                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link border-0 ${activeSection === 'configuracion' ? 'active fw-bold text-primary' : ''}`}
                                onClick={() => setActiveSection('configuracion')}
                            >
                                ⚙️ Configuración
                            </button>
                        </li>
                    </ul>
                    <BotonesSesion />
                </div>
            </div>
        </nav>
    );
};

export default AdminNav;