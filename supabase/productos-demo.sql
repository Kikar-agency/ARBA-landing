-- ═══════════════════════════════════════════════════════════════
--  arba HOGAR — 3 productos demo con fotos y fichas reales
--  (los mismos productos que vende Blessing Hogar)
--  · Borra los 12 productos de muestra sin foto
--  · Carga Comedor Mediterráneo, Conjunto Illusion King y Sofá Charles
--  Las fotos están en la web: /assets/productos/
--  Se puede correr más de una vez.
-- ═══════════════════════════════════════════════════════════════
begin;

-- 1) Fuera los productos de muestra viejos (sin foto)
delete from public.productos
where es_muestra and slug not in ('juego-de-comedor-mediterraneo-x6-sillas','conjunto-illusion-king-180x200','sofa-esquinero-charles');

-- 2) Productos
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'sofa-esquinero-charles', 'Sofá esquinero Charles', c.id,
  '3 cuerpos + butacón · Costura reforzada',
  'Sillón esquinero de 3 cuerpos, moderno y versátil, con costura reforzada. Incluye un butacón que permite armar la distribución del living como más te convenga, y almohadones intercambiables para renovar el ambiente.',
  1123333, 1604762, true,
  '[{"k":"Medidas","v":"2,10 m × 1,70 m · profundidad 0,90 m"},{"k":"Espuma","v":"23 kg, densidad soft"},{"k":"Estructura","v":"Madera de pino misionero secada a horno"},{"k":"Costura","v":"Doble costura reforzada"},{"k":"Almohadones","v":"Vellón siliconado"},{"k":"Telas","v":"Rústico, Talampaya o pana"},{"k":"Fabricación","v":"15 días"}]'::jsonb,
  true, true, true, 1, 'Más vendido'
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, specs = excluded.specs,
  destacado = excluded.destacado, publicado = excluded.publicado, es_muestra = excluded.es_muestra, orden = excluded.orden, etiqueta = excluded.etiqueta;

insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'juego-de-comedor-mediterraneo-x6-sillas', 'Juego de comedor Mediterráneo x6 sillas', c.id,
  'Mesa rectangular + 6 sillas tapizadas',
  'Juego de comedor Mediterráneo: mesa rectangular de líneas simples y 6 sillas con asiento tapizado. Terminación oscura que combina con cualquier ambiente.',
  1156709, 1652442, true,
  '[{"k":"Incluye","v":"Mesa + 6 sillas"},{"k":"Sillas","v":"Asiento tapizado"}]'::jsonb,
  true, true, true, 2, 'Últimas unidades'
from public.categorias c where c.slug = 'comedor'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, specs = excluded.specs,
  destacado = excluded.destacado, publicado = excluded.publicado, es_muestra = excluded.es_muestra, orden = excluded.orden, etiqueta = excluded.etiqueta;

insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'conjunto-illusion-king-180x200', 'Conjunto Illusion King 180×200', c.id,
  'Colchón Taurus Illusion + base · 2 almohadas',
  'Conjunto de sommier King con colchón Taurus Illusion de espuma de alta densidad y placa superior viscoelástica, tapizado en tejido de punto con sistema Non Turn. Base tapizada en eco cuero. Incluye 2 almohadas.',
  1386784, 1981121, true,
  '[{"k":"Medida","v":"180 × 200 cm (King)"},{"k":"Altura del colchón","v":"28 cm"},{"k":"Espuma","v":"Alta densidad 37 kg/m³"},{"k":"Placa superior","v":"Viscoelástica 76 kg/m³"},{"k":"Tapizado","v":"Tejido de punto · Non Turn"},{"k":"Base","v":"Tapizada en eco cuero"},{"k":"Incluye","v":"2 almohadas"}]'::jsonb,
  true, true, true, 3, 'Nuevo'
from public.categorias c where c.slug = 'sommiers'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, specs = excluded.specs,
  destacado = excluded.destacado, publicado = excluded.publicado, es_muestra = excluded.es_muestra, orden = excluded.orden, etiqueta = excluded.etiqueta;

-- 3) Variantes (telas del Charles)
delete from public.variantes where producto_id in (select id from public.productos where slug in ('sofa-esquinero-charles','juego-de-comedor-mediterraneo-x6-sillas','conjunto-illusion-king-180x200'));
insert into public.variantes (producto_id, nombre, color_hex, disponible, orden)
select p.id, v.nombre, v.hex, true, v.orden from public.productos p,
  (values ('Rústico gris', '#7E8085', 0), ('Rústico beige', '#D9CDB8', 1), ('Talampaya', '#B39A80', 2), ('Pana', '#8C857B', 3)) as v(nombre, hex, orden)
where p.slug = 'sofa-esquinero-charles';

-- 4) Fotos
delete from public.imagenes where producto_id in (select id from public.productos where slug in ('sofa-esquinero-charles','juego-de-comedor-mediterraneo-x6-sillas','conjunto-illusion-king-180x200'));
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, 'https://arbahogar.com.ar/assets/productos/' || f.archivo, p.nombre, f.orden
from public.productos p join (values
  ('sofa-esquinero-charles', 'sofa-esquinero-charles-01.webp', 0),
  ('sofa-esquinero-charles', 'sofa-esquinero-charles-02.webp', 1),
  ('sofa-esquinero-charles', 'sofa-esquinero-charles-03.webp', 2),
  ('sofa-esquinero-charles', 'sofa-esquinero-charles-04.webp', 3),
  ('sofa-esquinero-charles', 'sofa-esquinero-charles-05.webp', 4),
  ('juego-de-comedor-mediterraneo-x6-sillas', 'comedor-mediterraneo-01.webp', 0),
  ('juego-de-comedor-mediterraneo-x6-sillas', 'comedor-mediterraneo-02.webp', 1),
  ('juego-de-comedor-mediterraneo-x6-sillas', 'comedor-mediterraneo-03.webp', 2),
  ('conjunto-illusion-king-180x200', 'conjunto-illusion-king-01.webp', 0),
  ('conjunto-illusion-king-180x200', 'conjunto-illusion-king-02.webp', 1),
  ('conjunto-illusion-king-180x200', 'conjunto-illusion-king-03.webp', 2),
  ('conjunto-illusion-king-180x200', 'conjunto-illusion-king-04.webp', 3)
) as f(slug, archivo, orden) on f.slug = p.slug;

commit;
