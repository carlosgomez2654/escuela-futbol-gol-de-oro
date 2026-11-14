import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import InputForm from "./components/CustomInput"
import SelectForm from "./components/selectForm"
import TextAreaForm from "./components/textAreaForm" // Importas el nuevo textarea
import { schema, type FormValues } from "./models/form.model"
import './CustomForm.css' // Tu CSS personalizado para la tarjeta

const CustomForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Datos enviados:", data);
        alert("¡Solicitud enviada con éxito!");
    }

    const opcionesEdades = [
        { value: "6-8", label: "6 a 8 años" },
        { value: "9-11", label: "9 a 11 años" },
        { value: "12-15", label: "12 a 15 años" }
    ];
 
    return (
        <div className="form-container">
            <div className="form-header">
                <span className="form-subtitle">// FORMULARIO</span>
                <h2>SOLICITA INFORMACIÓN</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                <div className="col-md-6">
                    <InputForm name="nombrePadre" control={control} label='PADRE/MADRE' type="text" error={errors.nombrePadre} />
                </div>
                
                <div className="col-md-6">
                    <InputForm name="whatsapp" control={control} label='TELÉFONO / WHATSAPP' type="tel" error={errors.whatsapp} />
                </div>

                <div className="col-12">
                    <InputForm name="email" control={control} label='CORREO ELECTRÓNICO' type="email" error={errors.email} />
                </div>

                <div className="col-md-6">
                    <InputForm name="nombreNiño" control={control} label='NOMBRE DEL NIÑO/A' type="text" error={errors.nombreNiño} />
                </div>

                <div className="col-6">
                    <SelectForm name="edadNino" control={control} label='EDAD DEL NIÑO/A' options={opcionesEdades} error={errors.edadNino} />
                </div>

                <div className="col-12">
                    <TextAreaForm name="comentarios" control={control} label='¿ALGUNA PREGUNTA O COMENTARIO?' placeholder="Cuéntanos qué buscas en la academia..." error={errors.comentarios} />
                </div>

                <div className="col-12 mt-4">
                    <button type="submit" className="btn-submit">
                        SOLICITAR INFORMACIÓN GRATIS
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CustomForm;