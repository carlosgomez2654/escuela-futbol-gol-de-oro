import { type Control, type FieldError, Controller, type FieldValues, type Path } from "react-hook-form";


interface OptionItem {
    value: string | number;
    label: string;
}

// 1. Asegúrate de declarar <T extends FieldValues> aquí:
interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    options: OptionItem[];
    error?: FieldError;
}

// 2. Y pásale el genérico <T> a la función del componente:
const SelectForm = <T extends FieldValues>({ name, control, label, options, error }: Props<T>) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            <Controller 
                name={name}
                control={control} 
                render={({ field }) => (
                    <select 
                        id={name} 
                        {...field} 
                        className={`form-select ${error ? "is-invalid" : ""}`}
                    >
                        <option value="">Selecciona una opción...</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                )} 
            />
            {error && <p className="error text-danger small mt-1">{error.message}</p>}
        </div> 
    )
}

export default SelectForm;