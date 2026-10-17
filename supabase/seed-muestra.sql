-- ═══════════════════════════════════════════════════════════════
--  arba HOGAR — Carga inicial: categorías, configuración y
--  12 productos de MUESTRA (nombres y precios ilustrativos).
--  Correr DESPUÉS de schema.sql. Para sacar las muestras más
--  adelante: botón "Borrar los de muestra" en el panel.
-- ═══════════════════════════════════════════════════════════════
begin;

-- Categorías
insert into public.categorias (id, slug, nombre, descripcion, icono, orden, activo) values
  ('1807b5dc-3b18-4e97-97e7-9a4f87afbb49', 'sillones', 'Sillones', 'Sofás de 2 y 3 cuerpos, esquineros, sillones individuales y butacas.', 'sillones', 1, true),
  ('b9a2f9d0-a691-443f-9b82-0e8b77f49f44', 'comedor', 'Juegos de comedor', 'Mesas con sillas para comedor y cocina, en distintas medidas y terminaciones.', 'comedor', 2, true),
  ('0f56770f-9361-46bc-9c69-f09391fbb2f9', 'roperos', 'Roperos', 'Roperos y placares de 2, 3 y más puertas, con cajoneras y estantes.', 'roperos', 3, true),
  ('bde77f27-c84e-479c-94d1-dd8918a11c4a', 'melamina', 'Melamina para armar', 'Muebles de dormitorio y cocina: alacenas, bajo mesadas, cómodas y más.', 'melamina', 4, true),
  ('b1548305-786d-4cf6-a03c-d2bc7f62789d', 'sommiers', 'Sommiers', 'Sommiers y colchones de 1, 1½ y 2 plazas, queen y king.', 'sommiers', 5, true),
  ('5c73916c-00db-4ab3-9a7a-032fd2378821', 'respaldos', 'Respaldos', 'Respaldos tapizados para cama de distintas medidas, telas y colores.', 'respaldos', 6, true)
on conflict (slug) do nothing;

-- Configuración del sitio
insert into public.config (key, value) values
  ('whatsapp', '"5493517712948"'::jsonb),
  ('whatsappVisible', '"+54 9 351 771-2948"'::jsonb),
  ('direccion', '"Lima 55, Centro, Córdoba"'::jsonb),
  ('horarios', '["Lunes a viernes · 9:30 a 18 h","Sábados · 9:30 a 14 h"]'::jsonb),
  ('instagram', '"https://www.instagram.com/arbahogar/"'::jsonb),
  ('facebook', '"https://www.facebook.com/profile.php?id=61580840611386"'::jsonb),
  ('metaPixelId', '""'::jsonb),
  ('catalogoActivo', 'false'::jsonb),
  ('pagosTexto', '"Efectivo, transferencia y tarjetas. 12 cuotas sin interés con Naranja. Consultanos por otros planes vigentes."'::jsonb),
  ('entregaTexto', '""'::jsonb),
  ('etiquetaPrecio', '"Efectivo / transferencia"'::jsonb),
  ('etiquetaPrecioLista', '"Con tarjeta"'::jsonb),
  ('planes', '[{"nombre":"Naranja","cuotas":12,"sinInteres":true,"base":"lista"}]'::jsonb),
  ('mensajesBarra', '["12 cuotas sin interés con Naranja","Mejor precio pagando en efectivo o transferencia","Visitanos en Lima 55, Centro","Atención personalizada por WhatsApp"]'::jsonb)
on conflict (key) do nothing;

-- Productos de muestra
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '974ff24b-94ff-4139-9517-d11929a3857a', 'sofa-nube-3-cuerpos', 'Sofá Nube 3 cuerpos', c.id, 'Tela pana · Respaldo alto', 'Sofá de tres cuerpos con almohadones de respaldo sueltos y asiento firme. Producto de muestra para ver cómo se presenta el catálogo.', 480000, 600000, true, '[{"k":"Medidas","v":"210 × 90 × 85 cm"},{"k":"Estructura","v":"Madera y caño"},{"k":"Tapizado","v":"Pana antimanchas"}]'::jsonb, true, true, true, 1, 'Más vendido'
  from public.categorias c where c.slug = 'sillones'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('Gris topo', '#8C857B', null::numeric, null::numeric, true, 0), ('Verde salvia', '#8A9A7E', null::numeric, null::numeric, true, 1), ('Arena', '#C9B79F', null::numeric, null::numeric, true, 2), ('Azul noche', '#26304A', null::numeric, null::numeric, false, 3)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'sofa-nube-3-cuerpos' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '43942648-e2d5-4052-a062-57cab06e31a0', 'esquinero-bruma', 'Esquinero Bruma', c.id, 'Rinconero en L · Tela a elección', 'Esquinero en L de gran tamaño, ideal para livings amplios. Producto de muestra.', 720000, 900000, true, '[{"k":"Medidas","v":"260 × 180 cm"},{"k":"Lado del módulo","v":"Izquierdo o derecho"}]'::jsonb, true, true, true, 2, ''
  from public.categorias c where c.slug = 'sillones'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('Lado izquierdo', null, null::numeric, null::numeric, true, 0), ('Lado derecho', null, null::numeric, null::numeric, true, 1)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'esquinero-bruma' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '813e7b81-3e61-48a7-8095-8cd8826ca2e1', 'juego-de-comedor-roble-6-sillas', 'Juego de comedor Roble · 6 sillas', c.id, 'Mesa 160 cm + 6 sillas tapizadas', 'Mesa rectangular con seis sillas de asiento tapizado. Producto de muestra.', 650000, 812500, true, '[{"k":"Mesa","v":"160 × 90 cm"},{"k":"Sillas","v":"6 unidades"}]'::jsonb, true, true, true, 3, 'Últimas unidades'
  from public.categorias c where c.slug = 'comedor'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('Roble claro', '#C8A27A', null::numeric, null::numeric, true, 0), ('Nogal', '#6B4A33', null::numeric, null::numeric, true, 1)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'juego-de-comedor-roble-6-sillas' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '47f536ef-1fa4-4326-ba8c-ec50dbf61e3e', 'mesa-redonda-alba-4-sillas', 'Mesa redonda Alba + 4 sillas', c.id, 'Ideal para cocina o espacios chicos', 'Mesa redonda de 100 cm con cuatro sillas. Producto de muestra.', 390000, 487500, true, '[{"k":"Mesa","v":"Ø 100 cm"}]'::jsonb, false, true, true, 4, ''
  from public.categorias c where c.slug = 'comedor'
  on conflict (slug) do nothing;
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select 'd028c473-caac-4a10-a525-5eec047d36e6', 'ropero-lino-3-puertas', 'Ropero Lino 3 puertas', c.id, 'Con cajonera y barral', 'Ropero de tres puertas con cajonera interna, estantes y barral. Producto de muestra.', 420000, 525000, true, '[{"k":"Medidas","v":"135 × 50 × 182 cm"},{"k":"Material","v":"Melamina 18 mm"}]'::jsonb, true, true, true, 5, ''
  from public.categorias c where c.slug = 'roperos'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('Blanco', '#F3F1EC', null::numeric, null::numeric, true, 0), ('Roble', '#B98F62', null::numeric, null::numeric, true, 1)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'ropero-lino-3-puertas' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select 'e5a89777-d84c-4824-a54a-6d51b1811f70', 'placard-duna-6-puertas', 'Placard Duna 6 puertas', c.id, 'Con espejo central', 'Placard de seis puertas con espejo central. Producto de muestra.', 610000, 762500, true, '[{"k":"Medidas","v":"180 × 52 × 190 cm"}]'::jsonb, false, true, true, 6, ''
  from public.categorias c where c.slug = 'roperos'
  on conflict (slug) do nothing;
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '8aa6107d-dde3-4180-9810-00fab97b3668', 'alacena-melamina-120-cm', 'Alacena melamina 120 cm', c.id, 'Para armar · 2 puertas', 'Alacena de pared de 120 cm para armar. Producto de muestra.', 120000, 150000, true, '[{"k":"Medidas","v":"120 × 30 × 60 cm"},{"k":"Armado","v":"Incluye herrajes e instructivo"}]'::jsonb, false, true, true, 7, ''
  from public.categorias c where c.slug = 'melamina'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('Blanco', '#F3F1EC', null::numeric, null::numeric, true, 0), ('Gris grafito', '#4B4E55', null::numeric, null::numeric, true, 1)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'alacena-melamina-120-cm' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '409d321e-bd6d-49d4-bcf2-9335d4f5d6e7', 'comoda-4-cajones', 'Cómoda 4 cajones', c.id, 'Para armar · Dormitorio', 'Cómoda de cuatro cajones con correderas metálicas. Producto de muestra.', 150000, 187500, true, '[{"k":"Medidas","v":"80 × 40 × 90 cm"}]'::jsonb, true, true, true, 8, 'Nuevo'
  from public.categorias c where c.slug = 'melamina'
  on conflict (slug) do nothing;
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '7844f0e3-984b-414f-8629-1351c79b071a', 'sommier-descanso-2-plazas', 'Sommier Descanso 2 plazas', c.id, 'Resortes · Pillow top', 'Conjunto de sommier y colchón de resortes con pillow top. Producto de muestra.', 560000, 700000, true, '[{"k":"Altura del colchón","v":"28 cm"},{"k":"Soporte","v":"Hasta 110 kg por plaza"}]'::jsonb, true, true, true, 9, ''
  from public.categorias c where c.slug = 'sommiers'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('140 × 190', null, null::numeric, null::numeric, true, 0), ('160 × 200 (Queen)', null, 690000, null::numeric, true, 1), ('200 × 200 (King)', null, 880000, null::numeric, true, 2)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'sommier-descanso-2-plazas' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '70f43ec0-5736-469e-9028-465ddad2fb53', 'sommier-simple-1-plaza', 'Sommier Simple 1 plaza', c.id, 'Espuma alta densidad', 'Sommier de una plaza con colchón de espuma. Producto de muestra.', 260000, 325000, true, '[]'::jsonb, false, true, true, 10, ''
  from public.categorias c where c.slug = 'sommiers'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('80 × 190', null, null::numeric, null::numeric, true, 0), ('100 × 200 (1½)', null, 310000, null::numeric, true, 1)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'sommier-simple-1-plaza' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select '4ee0528f-0533-4f10-ae2f-f2e23fe0efff', 'respaldo-capitone', 'Respaldo Capitoné', c.id, 'Tapizado con botones', 'Respaldo capitoné tapizado. Producto de muestra.', 180000, 225000, true, '[]'::jsonb, true, true, true, 11, ''
  from public.categorias c where c.slug = 'respaldos'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('2 plazas', null, null::numeric, null::numeric, true, 0), ('Queen', null, 210000, null::numeric, true, 1), ('King', null, 240000, null::numeric, true, 2)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'respaldo-capitone' and not exists (select 1 from public.variantes x where x.producto_id = p.id);
insert into public.productos (id, slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
  select 'd9942fa5-27cc-4ba6-bdf7-b1795441f349', 'respaldo-arco-liso', 'Respaldo Arco liso', c.id, 'Forma curva · Pana', 'Respaldo de forma curva en pana. Producto de muestra (precio a consultar).', 160000, 200000, false, '[]'::jsonb, false, true, true, 12, ''
  from public.categorias c where c.slug = 'respaldos'
  on conflict (slug) do nothing;
insert into public.variantes (producto_id, nombre, color_hex, precio, precio_lista, disponible, orden)
  select p.id, v.nombre, v.color_hex, v.precio, v.precio_lista, v.disponible, v.orden from public.productos p,
  (values ('Arena', '#C9B79F', null::numeric, null::numeric, true, 0), ('Gris', '#8C857B', null::numeric, null::numeric, true, 1), ('Terracota', '#B5674D', null::numeric, null::numeric, true, 2)) as v(nombre, color_hex, precio, precio_lista, disponible, orden)
  where p.slug = 'respaldo-arco-liso' and not exists (select 1 from public.variantes x where x.producto_id = p.id);

commit;
