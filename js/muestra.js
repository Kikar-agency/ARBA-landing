// ═══════════════════════════════════════════════════════════════
//  Datos de MUESTRA — solo para el modo demo y la carga inicial.
//  Nombres, precios y medidas son ilustrativos: no corresponden a
//  productos reales. Se reemplazan con la carga real desde el panel.
// ═══════════════════════════════════════════════════════════════
window.ARBA_MUESTRA = (function () {
  const C = (id, slug, nombre, descripcion, icono, orden) => ({ id, slug, nombre, descripcion, icono, orden, activo: true });
  const categorias = [
    C('c1', 'sillones', 'Sillones', 'Sofás de 2 y 3 cuerpos, esquineros, sillones individuales y butacas.', 'sillones', 1),
    C('c2', 'comedor', 'Juegos de comedor', 'Mesas con sillas para comedor y cocina, en distintas medidas y terminaciones.', 'comedor', 2),
    C('c3', 'roperos', 'Roperos', 'Roperos y placares de 2, 3 y más puertas, con cajoneras y estantes.', 'roperos', 3),
    C('c4', 'melamina', 'Melamina para armar', 'Muebles de dormitorio y cocina: alacenas, bajo mesadas, cómodas y más.', 'melamina', 4),
    C('c5', 'sommiers', 'Sommiers', 'Sommiers y colchones de 1, 1½ y 2 plazas, queen y king.', 'sommiers', 5),
    C('c6', 'respaldos', 'Respaldos', 'Respaldos tapizados para cama de distintas medidas, telas y colores.', 'respaldos', 6),
  ];

  let n = 0;
  const V = (nombre, color_hex, precio = null, disponible = true) => ({ id: 'v' + (++n), nombre, color_hex, precio, precio_lista: null, disponible, orden: n });
  const P = (id, categoria_id, nombre, resumen, precio, extra = {}) => Object.assign({
    id, slug: nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    nombre, categoria_id, resumen, descripcion: '', precio, precio_lista: Math.round(precio * 1.25 / 100) * 100,
    mostrar_precio: true, specs: [], destacado: false, etiqueta: '', publicado: true, es_muestra: true, orden: 0,
    imagenes: [], variantes: []
  }, extra);

  const productos = [
    P('p1', 'c1', 'Sofá Nube 3 cuerpos', 'Tela pana · Respaldo alto', 480000, {
      destacado: true, orden: 1, etiqueta: 'Más vendido',
      descripcion: 'Sofá de tres cuerpos con almohadones de respaldo sueltos y asiento firme. Producto de muestra para ver cómo se presenta el catálogo.',
      specs: [{ k: 'Medidas', v: '210 × 90 × 85 cm' }, { k: 'Estructura', v: 'Madera y caño' }, { k: 'Tapizado', v: 'Pana antimanchas' }],
      variantes: [V('Gris topo', '#8C857B'), V('Verde salvia', '#8A9A7E'), V('Arena', '#C9B79F'), V('Azul noche', '#26304A', null, false)]
    }),
    P('p2', 'c1', 'Esquinero Bruma', 'Rinconero en L · Tela a elección', 720000, {
      destacado: true, orden: 2,
      descripcion: 'Esquinero en L de gran tamaño, ideal para livings amplios. Producto de muestra.',
      specs: [{ k: 'Medidas', v: '260 × 180 cm' }, { k: 'Lado del módulo', v: 'Izquierdo o derecho' }],
      variantes: [V('Lado izquierdo', null), V('Lado derecho', null)]
    }),
    P('p3', 'c2', 'Juego de comedor Roble · 6 sillas', 'Mesa 160 cm + 6 sillas tapizadas', 650000, {
      destacado: true, orden: 3, etiqueta: 'Últimas unidades',
      descripcion: 'Mesa rectangular con seis sillas de asiento tapizado. Producto de muestra.',
      specs: [{ k: 'Mesa', v: '160 × 90 cm' }, { k: 'Sillas', v: '6 unidades' }],
      variantes: [V('Roble claro', '#C8A27A'), V('Nogal', '#6B4A33')]
    }),
    P('p4', 'c2', 'Mesa redonda Alba + 4 sillas', 'Ideal para cocina o espacios chicos', 390000, {
      orden: 4, descripcion: 'Mesa redonda de 100 cm con cuatro sillas. Producto de muestra.',
      specs: [{ k: 'Mesa', v: 'Ø 100 cm' }]
    }),
    P('p5', 'c3', 'Ropero Lino 3 puertas', 'Con cajonera y barral', 420000, {
      destacado: true, orden: 5, descripcion: 'Ropero de tres puertas con cajonera interna, estantes y barral. Producto de muestra.',
      specs: [{ k: 'Medidas', v: '135 × 50 × 182 cm' }, { k: 'Material', v: 'Melamina 18 mm' }],
      variantes: [V('Blanco', '#F3F1EC'), V('Roble', '#B98F62')]
    }),
    P('p6', 'c3', 'Placard Duna 6 puertas', 'Con espejo central', 610000, {
      orden: 6, descripcion: 'Placard de seis puertas con espejo central. Producto de muestra.',
      specs: [{ k: 'Medidas', v: '180 × 52 × 190 cm' }]
    }),
    P('p7', 'c4', 'Alacena melamina 120 cm', 'Para armar · 2 puertas', 120000, {
      orden: 7, descripcion: 'Alacena de pared de 120 cm para armar. Producto de muestra.',
      specs: [{ k: 'Medidas', v: '120 × 30 × 60 cm' }, { k: 'Armado', v: 'Incluye herrajes e instructivo' }],
      variantes: [V('Blanco', '#F3F1EC'), V('Gris grafito', '#4B4E55')]
    }),
    P('p8', 'c4', 'Cómoda 4 cajones', 'Para armar · Dormitorio', 150000, {
      destacado: true, orden: 8, etiqueta: 'Nuevo', descripcion: 'Cómoda de cuatro cajones con correderas metálicas. Producto de muestra.',
      specs: [{ k: 'Medidas', v: '80 × 40 × 90 cm' }]
    }),
    P('p9', 'c5', 'Sommier Descanso 2 plazas', 'Resortes · Pillow top', 560000, {
      destacado: true, orden: 9, descripcion: 'Conjunto de sommier y colchón de resortes con pillow top. Producto de muestra.',
      specs: [{ k: 'Altura del colchón', v: '28 cm' }, { k: 'Soporte', v: 'Hasta 110 kg por plaza' }],
      variantes: [V('140 × 190', null), V('160 × 200 (Queen)', null, 690000), V('200 × 200 (King)', null, 880000)]
    }),
    P('p10', 'c5', 'Sommier Simple 1 plaza', 'Espuma alta densidad', 260000, {
      orden: 10, descripcion: 'Sommier de una plaza con colchón de espuma. Producto de muestra.',
      variantes: [V('80 × 190', null), V('100 × 200 (1½)', null, 310000)]
    }),
    P('p11', 'c6', 'Respaldo Capitoné', 'Tapizado con botones', 180000, {
      destacado: true, orden: 11, descripcion: 'Respaldo capitoné tapizado. Producto de muestra.',
      variantes: [V('2 plazas', null), V('Queen', null, 210000), V('King', null, 240000)]
    }),
    P('p12', 'c6', 'Respaldo Arco liso', 'Forma curva · Pana', 160000, {
      orden: 12, mostrar_precio: false, descripcion: 'Respaldo de forma curva en pana. Producto de muestra (precio a consultar).',
      variantes: [V('Arena', '#C9B79F'), V('Gris', '#8C857B'), V('Terracota', '#B5674D')]
    }),
  ];

  const hoy = new Date();
  const enDias = (d) => { const x = new Date(hoy.getTime() + d * 864e5 - hoy.getTimezoneOffset() * 6e4); return x.toISOString().slice(0, 10); };
  const promos = [
    { id: 'pr1', titulo: 'Semana del descanso', tipo: 'porcentaje', valor: 10, categoria_id: 'c5', producto_ids: [], desde: enDias(-1), hasta: enDias(14), activa: true, banner: true },
  ];

  return { categorias, productos, promos };
})();
