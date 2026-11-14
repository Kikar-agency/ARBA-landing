-- ═══════════════════════════════════════════════════════════════
--  arba HOGAR — Productos reales (12 productos con fotos, precios del sheet)
--  · Borra los productos de muestra
--  · Carga productos, variantes y fotos (sillones: fotos A y B intercaladas en la galería)
--  · Precios del sheet "Carga de productos" (12-nov).
--  Se puede correr más de una vez.
-- ═══════════════════════════════════════════════════════════════
begin;

delete from public.productos where es_muestra;
-- Mesa Cubo: por ahora no se publica
delete from public.productos where slug = 'mesa-cubo';
-- Berlín, Berlín XL y Modular Doble: no van (no están en el sheet)
delete from public.productos where slug in ('berlin', 'berlin-xl', 'modular-doble');


-- Sillón Julieta
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'julieta', 'Sillón Julieta', c.id, 'Con puff · 3 almohadones de respaldo', 'Sillón de líneas rectas con puff independiente, que podés usar como apoyapiés o como asiento extra. Respaldo de tres almohadones sueltos, dos almohadones decorativos, brazos anchos y patas metálicas. Lo fabricamos en la tela y el color que elijas.', 469800, 611000, true,
  '[{"k": "Medidas", "v": "Esquinero 2,00 × 1,60 × 0,90 m"}, {"k": "Incluye", "v": "Sillón + puff + 2 almohadones decorativos"}, {"k": "Espuma", "v": "Alta densidad"}, {"k": "Patas", "v": "Cromadas"}, {"k": "Tela", "v": "Premium, a elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 1, 'Más vendido'
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'julieta');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'julieta');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/julieta-01.webp', 'Sillón Julieta', 0),
  ('https://arbahogar.com.ar/assets/productos/a/julieta-02.webp', 'Sillón Julieta', 1),
  ('https://arbahogar.com.ar/assets/productos/a/julieta-03.webp', 'Sillón Julieta', 2),
  ('https://arbahogar.com.ar/assets/productos/a/julieta-04.webp', 'Sillón Julieta', 3)) as v(url, alt, orden)
where p.slug = 'julieta';

-- Sillón esquinero Carol
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'carol', 'Sillón esquinero Carol', c.id, 'Esquinero con chaise · 1,80 / 2,17 / 2,50 m', 'Sillón esquinero con chaise, ideal para livings donde querés aprovechar el rincón. Almohadones de respaldo sueltos, almohadones decorativos y apoyabrazos con almohadón cilíndrico en la versión de 2,50 m. Viene en tres medidas y en la tela y el color que elijas.', null, null, true,
  '[{"k": "1,80 m", "v": "Esquinero de 1,80 m"}, {"k": "2,17 m", "v": "2,17 × 1,80 m, butacón de 90 cm de profundidad"}, {"k": "2,50 m", "v": "2,50 × 1,80 × 0,90 m, butacón con respaldo"}, {"k": "Patas", "v": "Metálicas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 2, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'carol');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'carol');
insert into public.variantes (producto_id, nombre, orden, disponible, precio, precio_lista)
select p.id, v.nombre, v.orden, true, v.precio, v.precio_lista from public.productos p,
 (values
  ('1,80 m', 0, 639900::numeric, 833220::numeric),
  ('2,17 m', 1, 721000::numeric, 995000::numeric),
  ('2,50 m con apoyabrazo', 2, 880000::numeric, 1218620::numeric)) as v(nombre, orden, precio, precio_lista)
where p.slug = 'carol';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/carol-01.webp', 'Sillón esquinero Carol · 2,50 m', 0),
  ('https://arbahogar.com.ar/assets/productos/a/carol-02.webp', 'Sillón esquinero Carol · 2,50 m', 1),
  ('https://arbahogar.com.ar/assets/productos/a/carol-03.webp', 'Sillón esquinero Carol · 2,17 m', 2),
  ('https://arbahogar.com.ar/assets/productos/a/carol-04.webp', 'Sillón esquinero Carol · 2,17 m', 3),
  ('https://arbahogar.com.ar/assets/productos/a/carol-05.webp', 'Sillón esquinero Carol · 2,50 m', 4),
  ('https://arbahogar.com.ar/assets/productos/a/carol-06.webp', 'Sillón esquinero Carol · 2,50 m', 5),
  ('https://arbahogar.com.ar/assets/productos/a/carol-07.webp', 'Sillón esquinero Carol · 2,17 m', 6),
  ('https://arbahogar.com.ar/assets/productos/a/carol-08.webp', 'Sillón esquinero Carol · 2,17 m', 7)) as v(url, alt, orden)
where p.slug = 'carol';

-- Sillón esquinero Aron
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'aron', 'Sillón esquinero Aron', c.id, 'En L con chaise · Patas de madera', 'Sillón en L con chaise y tres almohadones de respaldo. Brazos rectos, asiento amplio y patas de madera. Una opción cómoda para el living familiar, en la tela y el color que elijas.', 399000, 518000, true,
  '[{"k": "Medidas", "v": "Esquinero 1,80 × 1,60 m (1,80 × 0,80 m más butacón con respaldo)"}, {"k": "Patas", "v": "Madera"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 3, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'aron');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'aron');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/aron-01.webp', 'Sillón esquinero Aron', 0),
  ('https://arbahogar.com.ar/assets/productos/a/aron-02.webp', 'Sillón esquinero Aron', 1),
  ('https://arbahogar.com.ar/assets/productos/a/aron-03.webp', 'Sillón esquinero Aron', 2),
  ('https://arbahogar.com.ar/assets/productos/a/aron-04.webp', 'Sillón esquinero Aron', 3)) as v(url, alt, orden)
where p.slug = 'aron';

-- Sillón Ameli
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'ameli', 'Sillón Ameli', c.id, 'Respaldo capitoné con botones · Con puff', 'Sillón de respaldo capitoné con botones, brazos redondeados y puff a juego. Un diseño clásico que suma calidez al living. Patas metálicas y tela y color a elección.', 259200, 336960, true,
  '[{"k": "Medidas", "v": "1,60 × 0,80 m"}, {"k": "Cuerpos", "v": "2"}, {"k": "Incluye", "v": "Sillón + puff"}, {"k": "Respaldo", "v": "Capitoné con botones"}, {"k": "Patas", "v": "Metálicas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 4, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'ameli');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'ameli');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/ameli-01.webp', 'Sillón Ameli', 0),
  ('https://arbahogar.com.ar/assets/productos/a/ameli-02.webp', 'Sillón Ameli', 1),
  ('https://arbahogar.com.ar/assets/productos/a/ameli-03.webp', 'Sillón Ameli', 2),
  ('https://arbahogar.com.ar/assets/productos/a/ameli-04.webp', 'Sillón Ameli', 3)) as v(url, alt, orden)
where p.slug = 'ameli';

-- Sillón Justina
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'justina', 'Sillón Justina', c.id, '2 cuerpos · Almohadones de respaldo con botones', 'Sillón de 2 cuerpos con almohadones de respaldo con botones, brazos anchos y asiento firme. Compacto, ideal para livings chicos o departamentos. Patas metálicas y tela y color a elección.', 292000, 404500, true,
  '[{"k": "Medidas", "v": "1,50 × 0,80 m"}, {"k": "Cuerpos", "v": "2"}, {"k": "Patas", "v": "Cromadas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 5, 'Más vendido'
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'justina');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'justina');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/justina-01.webp', 'Sillón Justina', 0),
  ('https://arbahogar.com.ar/assets/productos/a/justina-02.webp', 'Sillón Justina', 1),
  ('https://arbahogar.com.ar/assets/productos/a/justina-03.webp', 'Sillón Justina', 2),
  ('https://arbahogar.com.ar/assets/productos/a/justina-04.webp', 'Sillón Justina', 3)) as v(url, alt, orden)
where p.slug = 'justina';

-- Sillón Franchezca
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'franchezca', 'Sillón Franchezca', c.id, 'Doble o esquinero con chaise', 'Sillón de brazos rectos y almohadones de respaldo sueltos, simple y cómodo. Viene en versión doble (2 cuerpos) o esquinera con chaise, para aprovechar el rincón del living. Tela y color a elección.', null, null, true,
  '[{"k": "Doble", "v": "1,60 × 0,90 m"}, {"k": "Esquinero", "v": "2,30 × 1,90 m, con butacón separado (opción modulado)"}, {"k": "Relleno", "v": "Vellón siliconado"}, {"k": "Fundas", "v": "Desenfundables, con cierre"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 8, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'franchezca');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'franchezca');
insert into public.variantes (producto_id, nombre, orden, disponible, precio, precio_lista)
select p.id, v.nombre, v.orden, true, v.precio, v.precio_lista from public.productos p,
 (values
  ('Doble (2 cuerpos)', 0, 496000::numeric, 645000::numeric),
  ('Esquinero con chaise', 1, 722000::numeric, 1031000::numeric)) as v(nombre, orden, precio, precio_lista)
where p.slug = 'franchezca';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/franchezca-01.webp', 'Sillón Franchezca · Esquinero', 0),
  ('https://arbahogar.com.ar/assets/productos/franchezca-02.webp', 'Sillón Franchezca · Doble', 1)) as v(url, alt, orden)
where p.slug = 'franchezca';

-- Sillón Modular
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'modular', 'Sillón Modular', c.id, '2 o 5 cuerpos · Armalo a tu medida', 'Sillón modular de líneas rectas, con almohadones de respaldo sueltos. Se arma en 2 cuerpos o en 5 cuerpos (en U, con dos módulos chaise), según el espacio que tengas. Tela y color a elección.', null, null, true,
  '[{"k": "2 cuerpos", "v": "2,05 × 1,00 m, con butaca"}, {"k": "5 cuerpos", "v": "2,55 × 1,80 × 0,90 m"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 9, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'modular');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'modular');
insert into public.variantes (producto_id, nombre, orden, disponible, precio, precio_lista)
select p.id, v.nombre, v.orden, true, v.precio, v.precio_lista from public.productos p,
 (values
  ('2 cuerpos', 0, 620000::numeric, 806000::numeric),
  ('5 cuerpos', 1, 1227121::numeric, 1595257::numeric)) as v(nombre, orden, precio, precio_lista)
where p.slug = 'modular';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-01.webp', 'Sillón Modular · 2 cuerpos', 0),
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-02.webp', 'Sillón Modular · 2 cuerpos', 1),
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-03.webp', 'Sillón Modular · 2 cuerpos', 2),
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-04.webp', 'Sillón Modular · 2 cuerpos', 3),
  ('https://arbahogar.com.ar/assets/productos/modular-02.webp', 'Sillón Modular · 5 cuerpos', 4),
  ('https://arbahogar.com.ar/assets/productos/modular-03.webp', 'Sillón Modular', 5)) as v(url, alt, orden)
where p.slug = 'modular';

-- Sillón esquinero Charles
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'charles', 'Sillón esquinero Charles', c.id, 'Esquinero con chaise · 2,10 m', 'Sillón esquinero con chaise, almohadones de respaldo sueltos y brazos anchos y rectos. Espuma soft y vellón siliconado, para un asiento cómodo y mullido. Tela y color a elección.', 1105000, 1446585, true,
  '[{"k": "Medidas", "v": "Esquinero 2,10 × 1,70 m"}, {"k": "Espuma", "v": "Soft"}, {"k": "Relleno", "v": "Vellón siliconado"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 10, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'charles');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'charles');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/charles-01.webp', 'Sillón esquinero Charles', 0),
  ('https://arbahogar.com.ar/assets/productos/charles-02.webp', 'Sillón esquinero Charles', 1),
  ('https://arbahogar.com.ar/assets/productos/charles-03.webp', 'Sillón esquinero Charles', 2)) as v(url, alt, orden)
where p.slug = 'charles';

-- Sofá cama Plus
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'sofa-cama-plus', 'Sofá cama Plus', c.id, '1,60 m · Se abre en cama', 'Sofá de día y cama de noche: se abre y queda una cama amplia para las visitas o para el monoambiente. Almohadones de respaldo sueltos y brazos rectos. Mide 1,60 m y lo hacemos en la tela y el color que elijas.', 530000, 693000, true,
  '[{"k": "Medida", "v": "1,60 m"}, {"k": "Sistema", "v": "Se abre en cama"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 11, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'sofa-cama-plus');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'sofa-cama-plus');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-01.webp', 'Sofá cama Plus', 0),
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-02.webp', 'Sofá cama Plus', 1),
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-03.webp', 'Sofá cama Plus', 2),
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-04.webp', 'Sofá cama Plus', 3)) as v(url, alt, orden)
where p.slug = 'sofa-cama-plus';

-- Sofá cama Lenny
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'sofa-cama-lenny', 'Sofá cama Lenny', c.id, '1,00 / 1,40 / 1,70 m · Capitoné', 'Sofá cama con asiento y respaldo capitoné que se abre en un solo movimiento y queda como cama tapizada completa. Tres medidas: 1,00, 1,40 y 1,70 m. En las fotos, el de 1,40 m en negro y el de 1,70 m en azul. Tela y color a elección.', null, null, true,
  '[{"k": "Medidas", "v": "1,00 m · 1,40 m · 1,70 m"}, {"k": "1,00 m", "v": "Abierto, cama de 0,80 × 1,90 m"}, {"k": "Sistema", "v": "Se abre en cama"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 12, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'sofa-cama-lenny');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'sofa-cama-lenny');
insert into public.variantes (producto_id, nombre, orden, disponible, precio, precio_lista)
select p.id, v.nombre, v.orden, true, v.precio, v.precio_lista from public.productos p,
 (values
  ('1,00 m', 0, 250000::numeric, 325000::numeric),
  ('1,40 m', 1, 389000::numeric, 510000::numeric),
  ('1,70 m', 2, 445000::numeric, 577000::numeric)) as v(nombre, orden, precio, precio_lista)
where p.slug = 'sofa-cama-lenny';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/lenny-01.webp', 'Sofá cama Lenny · 1,40 m', 0),
  ('https://arbahogar.com.ar/assets/productos/lenny-02.webp', 'Sofá cama Lenny · 1,40 m', 1),
  ('https://arbahogar.com.ar/assets/productos/lenny-03.webp', 'Sofá cama Lenny · 1,70 m', 2),
  ('https://arbahogar.com.ar/assets/productos/lenny-04.webp', 'Sofá cama Lenny · 1,70 m', 3)) as v(url, alt, orden)
where p.slug = 'sofa-cama-lenny';

-- Juego de comedor Germán
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'juego-comedor-german', 'Juego de comedor Germán', c.id, 'Mesa 1,30 con 4 sillas o 1,70 con 6 sillas', 'Mesa de madera de líneas clásicas con sillas a elección: Joaquina, Guadalupe o Ariela. Viene en dos medidas, 1,30 m con 4 sillas o 1,70 m con 6 sillas, y en tres terminaciones: roble, caoba o negro.', null, null, true,
  '[{"k": "Medidas", "v": "1,30 m (4 sillas) · 1,70 m (6 sillas)"}, {"k": "Sillas", "v": "Joaquina, Guadalupe o Ariela"}, {"k": "Color", "v": "Roble, caoba o negro"}]'::jsonb, true, true, false, 1, ''
from public.categorias c where c.slug = 'comedor'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'juego-comedor-german');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'juego-comedor-german');
insert into public.variantes (producto_id, nombre, orden, disponible, precio, precio_lista)
select p.id, v.nombre, v.orden, true, v.precio, v.precio_lista from public.productos p,
 (values
  ('1,30 m + 4 sillas Joaquina', 0, 746000::numeric, 1020000::numeric),
  ('1,30 m + 4 sillas Guadalupe', 1, 720000::numeric, 975000::numeric),
  ('1,30 m + 4 sillas Ariela', 2, 740000::numeric, 999000::numeric),
  ('1,70 m + 6 sillas Joaquina', 3, 999000::numeric, 1375218::numeric),
  ('1,70 m + 6 sillas Guadalupe', 4, 999000::numeric, 1319619::numeric),
  ('1,70 m + 6 sillas Ariela', 5, 999000::numeric, 1375218::numeric)) as v(nombre, orden, precio, precio_lista)
where p.slug = 'juego-comedor-german';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/german-01.webp', 'Juego de comedor Germán · 4 sillas', 0),
  ('https://arbahogar.com.ar/assets/productos/german-02.webp', 'Juego de comedor Germán · 6 sillas', 1),
  ('https://arbahogar.com.ar/assets/productos/german-03.webp', 'Juego de comedor Germán', 2),
  ('https://arbahogar.com.ar/assets/productos/german-04.webp', 'Juego de comedor Germán', 3),
  ('https://arbahogar.com.ar/assets/productos/german-05.webp', 'Juego de comedor Germán', 4)) as v(url, alt, orden)
where p.slug = 'juego-comedor-german';

-- Juego de comedor Lis (mesa MDF)
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'mesa-mdf-con-sillas', 'Juego de comedor Lis (mesa MDF)', c.id, 'Mesa de MDF con sillas tapizadas', 'Mesa con tapa de MDF y patas de madera, con sillas tapizadas en tres modelos: con costuras, capitoné o lisas. Una opción práctica para cocina o comedor diario. Tela y color de las sillas a elección.', null, null, true,
  '[{"k": "Mesa", "v": "Tapa de MDF, patas de madera"}, {"k": "Sillas", "v": "Con costuras, capitoné o lisas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 2, ''
from public.categorias c where c.slug = 'comedor'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, precio = excluded.precio, precio_lista = excluded.precio_lista, mostrar_precio = true, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'mesa-mdf-con-sillas');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'mesa-mdf-con-sillas');
insert into public.variantes (producto_id, nombre, orden, disponible, precio, precio_lista)
select p.id, v.nombre, v.orden, true, v.precio, v.precio_lista from public.productos p,
 (values
  ('Mesa diseño + sillas con costuras', 0, 730000::numeric, 987000::numeric),
  ('Mesa + sillas capitoné', 1, 766000::numeric, 1056000::numeric),
  ('Mesa pata 3×3 + sillas lisas', 2, 639000::numeric, 869800::numeric)) as v(nombre, orden, precio, precio_lista)
where p.slug = 'mesa-mdf-con-sillas';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-01.webp', 'Juego de comedor Lis (mesa MDF) · sillas lisas', 0),
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-02.webp', 'Juego de comedor Lis (mesa MDF)', 1),
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-03.webp', 'Juego de comedor Lis (mesa MDF)', 2),
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-04.webp', 'Juego de comedor Lis (mesa MDF)', 3)) as v(url, alt, orden)
where p.slug = 'mesa-mdf-con-sillas';

commit;
