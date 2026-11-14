import { z } from "zod";

export const schema = z.object({
    nombrePadre: z.string().min(1, "El nombre del padre o madre es obligatorio"),
    whatsapp: z.string().min(10, "Ingresa un número de WhatsApp válido"),
    email: z.string().email("Correo electrónico inválido").min(1, "El correo es obligatorio"),
    nombreNiño: z.string().min(1, "El nombre del niño/a es obligatorio"),
    edadNino: z.string().min(1, "Debes seleccionar la edad del niño/a"),
    comentarios: z.string().optional() // Campo opcional para el textarea
});

export type FormValues = z.infer<typeof schema>;