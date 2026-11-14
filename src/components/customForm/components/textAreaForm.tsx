import { type Control, type FieldError, Controller, type FieldValues, type Path } from "react-hook-form";


interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
    error?: FieldError;
}

const TextAreaForm = <T extends FieldValues>({ name, control, label, placeholder, error }: Props<T>) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            <Controller 
                name={name}
                control={control} 
                render={({ field }) => (
                    <textarea 
                        id={name} 
                        {...field} 
                        placeholder={placeholder}
                        rows={4}
                        className={`form-control ${error ? "is-invalid" : ""}`}
                    />
                )} 
            />
            {error && <p className="error text-danger small mt-1">{error.message}</p>}
        </div> 
    )
}

export default TextAreaForm;