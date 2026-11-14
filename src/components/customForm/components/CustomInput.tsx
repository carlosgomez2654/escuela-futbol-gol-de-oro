import { type Control, type FieldError, Controller, type FieldValues, type Path } from "react-hook-form";


// Usamos <T extends FieldValues> para que se adapte dinámicamente a cualquier formulario
interface Props<T extends FieldValues> {
    name: Path<T>;          // Cambiado de string a Path<T> para que valide los nombres válidos del formulario
    control: Control<T>;    // Cambiado de Control<any> a Control<T>
    label: string;
    type?: string; 
    error?: FieldError;  
}

// Le pasamos el genérico también a la función del componente
const InputForm = <T extends FieldValues>({ name, control, label, type = "text", error }: Props<T>) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Controller 
                name={name}
                control={control} 
                render={({ field }) => 
                    // Cambié type={type} por seguridad ya que "string" no existe en HTML nativo
                    <input id={name} type={type} {...field} className={`form-control ${error ? "is-invalid" : ""}`} />
                } 
            />
            {error && <p className="error">{error.message}</p>}
        </div> 
    )
}

export default InputForm;