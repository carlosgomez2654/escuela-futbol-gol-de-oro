import { z } from 'zod';

// Reglas de validación del formulario de login
export const esquemaLogin = z.object({
  email: z.string().min(1, 'Escribe tu correo').email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// El tipo se crea automáticamente a partir de las reglas
export type DatosLogin = z.infer<typeof esquemaLogin>;