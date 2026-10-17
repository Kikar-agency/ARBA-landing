// ═══════════════════════════════════════════════════════════════
//  arba HOGAR — Configuración
// ═══════════════════════════════════════════════════════════════
window.ARBA_CFG = {

  // 1) Conexión a Supabase (Project Settings → API).
  //    Si quedan vacíos, la web funciona en MODO DEMO con productos
  //    de muestra y el panel guarda solo en el navegador.
  supabaseUrl: '',
  supabaseAnonKey: '',

  // 2) Valores por defecto del sitio. Una vez conectado Supabase,
  //    todo esto se edita desde el panel (Configuración) y lo que
  //    se guarde ahí pisa lo de acá.
  sitio: {
    whatsapp: '5493517712948',              // sin +, sin espacios
    whatsappVisible: '+54 9 351 771-2948',
    direccion: 'Lima 55, Centro, Córdoba',     // vacío = "Centro de Córdoba"
    horarios: ['Lunes a viernes · 9:30 a 18 h', 'Sábados · 9:30 a 14 h'],
    instagram: 'https://www.instagram.com/arbahogar/',
    facebook: 'https://www.facebook.com/profile.php?id=61580840611386',
    metaPixelId: '',
    catalogoActivo: false,                  // false = solo landing. Se prende desde el panel cuando estén cargados los productos reales
    pagosTexto: 'Efectivo, transferencia y tarjetas. 12 cuotas sin interés con Naranja. Consultanos por otros planes vigentes.',  // vacío = no se muestra
    entregaTexto: '',
    etiquetaPrecio: 'Efectivo / transferencia',
    etiquetaPrecioLista: 'Con tarjeta',
    // Planes de cuotas que se muestran en tarjetas, ficha y carrito.
    // base: 'lista' = se calcula sobre el precio con tarjeta · 'precio' = sobre el principal
    planes: [
      { nombre: 'Naranja', cuotas: 12, sinInteres: true, base: 'lista' }
    ],
    // Mensajes de la barra animada de arriba (modo tienda)
    mensajesBarra: [
      '12 cuotas sin interés con Naranja',
      'Mejor precio pagando en efectivo o transferencia',
      'Visitanos en Lima 55, Centro',
      'Atención personalizada por WhatsApp'
    ],
    // Video del hero (liviano, sin audio). Vacío = usa la foto.
    heroVideo: { src: 'videos/hero.mp4', poster: 'videos/recorrido-local.jpg' },
    // Videos verticales de la sección "Miralos en movimiento"
    videos: [
      { src: 'videos/recorrido-local.mp4',   poster: 'videos/recorrido-local.jpg',   titulo: 'Recorré el local' },
      { src: 'videos/sillones-living.mp4',   poster: 'videos/sillones-living.jpg',   titulo: 'Sillones para tu living' },
      { src: 'videos/sillones-elegir.mp4',   poster: 'videos/sillones-elegir.jpg',   titulo: '¿Cuál elegís?' },
      { src: 'videos/juego-comedor.mp4',     poster: 'videos/juego-comedor.jpg',     titulo: 'Juegos de comedor' },
      { src: 'videos/comedor-recuerdos.mp4', poster: 'videos/comedor-recuerdos.jpg', titulo: 'Más que muebles' },
      { src: 'videos/formas-de-pago.mp4',    poster: 'videos/formas-de-pago.jpg',    titulo: 'Formas de pago' }
    ]
  }
};
