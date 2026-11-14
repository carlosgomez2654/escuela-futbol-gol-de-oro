// Datos de contacto de la escuela.
// Si algo cambia, solo se modifica aquí.

export const CONTACTO = {
  whatsapp: '573001234567',            // Número de ejemplo (proyecto ficticio)
  whatsappVisible: '300 123 4567',     // Como se muestra en pantalla
  mensajeWhatsapp: 'Hola, quiero información sobre la Escuela de Fútbol Gol de Oro ⚽',
  email: 'contacto@goldeoro.com',      // Correo de ejemplo
  direccion: 'Bogotá, Colombia',      // Ubicación de ejemplo
  instagram: 'https://instagram.com/', // 👈 enlace real o déjalo vacío: ''
  facebook: 'https://facebook.com/',   // 👈 enlace real o déjalo vacío: ''
  mapaUrl: '',                         // 👈 opcional, mira el Paso 5
};

// Arma el enlace de WhatsApp con el número y el mensaje
export const enlaceWhatsapp = `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(CONTACTO.mensajeWhatsapp)}`;