import "./Button.css";

interface Props {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string; // Clase extra opcional
  parentMethod?: () => void;
}

export const Button = ({ 
  label, 
  variant = 'primary', 
  className = '', // Si no mandas nada, queda vacío
  parentMethod 
}: Props) => {
  return (
    <button 
      // Junta todas las clases con espacios
      className={`custom-button btn-${variant} ${className}`} 
      onClick={parentMethod}
    >
      {label}
    </button>
  );
};