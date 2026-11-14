import { useState } from "react";
import { Calendario } from "../compartidos/calendario/calendario";
import MenuJugadores from "./menuJugadores/menuJugadores";
import { PizarraTactica } from "../compartidos/pizarraTactica/pizarraTactica"; 
import { useAuth } from "../../auth/authContexto";

import "./jugadoresDashboard.css";

const JugadoresDashboard = () => {
  // Estado para controlar qué sección está activa actualmente
  const { usuario } = useAuth();
  const [activeSection, setActiveSection] = useState<string>(
    "CalendarioJugadores",
  );

  return (
    <div className="Jugadores-dashboard">
      {/* Menú lateral de navegación */}
      <MenuJugadores onSelectSection={setActiveSection} />

      {/* Área de contenido principal */}
      <main className="dashboard-main">
        {activeSection === "CalendarioJugadores" && <Calendario />}
        {activeSection === "pizarraTactica" && <PizarraTactica jugadorDestacadoId={usuario?.jugadorId} />}
      </main>
    </div>
  );
};

export default JugadoresDashboard;
