-- ═══════════════════════════════════════════════════════════════
--  arba HOGAR — Productos reales (15 productos con fotos)
--  · Borra los productos de muestra
--  · Carga productos, variantes y fotos (sillones: fotos A y B intercaladas en la galería)
--  · Precios vacíos = "Consultá el precio" hasta cargarlos en el panel
--  Se puede correr más de una vez.
-- ═══════════════════════════════════════════════════════════════
begin;

delete from public.productos where es_muestra;


-- Sillón Julieta
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'julieta', 'Sillón Julieta', c.id, 'Con puff · 3 almohadones de respaldo', 'Sillón de líneas rectas con puff independiente, que podés usar como apoyapiés o como asiento extra. Respaldo de tres almohadones sueltos, dos almohadones decorativos, brazos anchos y patas metálicas. Lo fabricamos en la tela y el color que elijas.', null, null, true,
  '[{"k": "Incluye", "v": "Sillón + puff + 2 almohadones decorativos"}, {"k": "Patas", "v": "Metálicas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 1, 'Más vendido'
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'julieta');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'julieta');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/julieta-01.webp', 'Sillón Julieta', 0),
  ('https://arbahogar.com.ar/assets/productos/b/julieta-01.webp', 'Sillón Julieta', 1),
  ('https://arbahogar.com.ar/assets/productos/a/julieta-02.webp', 'Sillón Julieta', 2),
  ('https://arbahogar.com.ar/assets/productos/b/julieta-02.webp', 'Sillón Julieta', 3),
  ('https://arbahogar.com.ar/assets/productos/a/julieta-03.webp', 'Sillón Julieta', 4),
  ('https://arbahogar.com.ar/assets/productos/b/julieta-03.webp', 'Sillón Julieta', 5),
  ('https://arbahogar.com.ar/assets/productos/a/julieta-04.webp', 'Sillón Julieta', 6),
  ('https://arbahogar.com.ar/assets/productos/b/julieta-04.webp', 'Sillón Julieta', 7)) as v(url, alt, orden)
where p.slug = 'julieta';

-- Sillón esquinero Carol
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'carol', 'Sillón esquinero Carol', c.id, 'Esquinero con chaise · 1,80 / 2,17 / 2,50 m', 'Sillón esquinero con chaise, ideal para livings donde querés aprovechar el rincón. Almohadones de respaldo sueltos, almohadones decorativos y apoyabrazos con almohadón cilíndrico en la versión de 2,50 m. Viene en tres medidas y en la tela y el color que elijas.', null, null, true,
  '[{"k": "Medidas", "v": "1,80 m · 2,17 m · 2,50 m (con apoyabrazo)"}, {"k": "Patas", "v": "Metálicas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 2, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'carol');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'carol');
insert into public.variantes (producto_id, nombre, orden, disponible)
select p.id, v.nombre, v.orden, true from public.productos p,
 (values
  ('1,80 m', 0),
  ('2,17 m', 1),
  ('2,50 m con apoyabrazo', 2)) as v(nombre, orden)
where p.slug = 'carol';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/carol-01.webp', 'Sillón esquinero Carol · 2,50 m', 0),
  ('https://arbahogar.com.ar/assets/productos/b/carol-01.webp', 'Sillón esquinero Carol · 2,50 m', 1),
  ('https://arbahogar.com.ar/assets/productos/a/carol-02.webp', 'Sillón esquinero Carol · 2,50 m', 2),
  ('https://arbahogar.com.ar/assets/productos/b/carol-02.webp', 'Sillón esquinero Carol · 2,50 m', 3),
  ('https://arbahogar.com.ar/assets/productos/a/carol-03.webp', 'Sillón esquinero Carol · 2,17 m', 4),
  ('https://arbahogar.com.ar/assets/productos/b/carol-03.webp', 'Sillón esquinero Carol · 2,17 m', 5),
  ('https://arbahogar.com.ar/assets/productos/a/carol-04.webp', 'Sillón esquinero Carol · 2,17 m', 6),
  ('https://arbahogar.com.ar/assets/productos/b/carol-04.webp', 'Sillón esquinero Carol · 2,17 m', 7),
  ('https://arbahogar.com.ar/assets/productos/a/carol-05.webp', 'Sillón esquinero Carol · 2,50 m', 8),
  ('https://arbahogar.com.ar/assets/productos/b/carol-05.webp', 'Sillón esquinero Carol · 2,50 m', 9),
  ('https://arbahogar.com.ar/assets/productos/a/carol-06.webp', 'Sillón esquinero Carol · 2,50 m', 10),
  ('https://arbahogar.com.ar/assets/productos/b/carol-06.webp', 'Sillón esquinero Carol · 2,50 m', 11),
  ('https://arbahogar.com.ar/assets/productos/a/carol-07.webp', 'Sillón esquinero Carol · 2,17 m', 12),
  ('https://arbahogar.com.ar/assets/productos/b/carol-07.webp', 'Sillón esquinero Carol · 2,17 m', 13),
  ('https://arbahogar.com.ar/assets/productos/a/carol-08.webp', 'Sillón esquinero Carol · 2,17 m', 14),
  ('https://arbahogar.com.ar/assets/productos/b/carol-08.webp', 'Sillón esquinero Carol · 2,17 m', 15)) as v(url, alt, orden)
where p.slug = 'carol';

-- Sillón esquinero Aron
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'aron', 'Sillón esquinero Aron', c.id, 'En L con chaise · Patas de madera', 'Sillón en L con chaise y tres almohadones de respaldo. Brazos rectos, asiento amplio y patas de madera. Una opción cómoda para el living familiar, en la tela y el color que elijas.', null, null, true,
  '[{"k": "Formato", "v": "En L con chaise"}, {"k": "Patas", "v": "Madera"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 3, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'aron');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'aron');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/aron-01.webp', 'Sillón esquinero Aron', 0),
  ('https://arbahogar.com.ar/assets/productos/b/aron-01.webp', 'Sillón esquinero Aron', 1),
  ('https://arbahogar.com.ar/assets/productos/a/aron-02.webp', 'Sillón esquinero Aron', 2),
  ('https://arbahogar.com.ar/assets/productos/b/aron-02.webp', 'Sillón esquinero Aron', 3),
  ('https://arbahogar.com.ar/assets/productos/a/aron-03.webp', 'Sillón esquinero Aron', 4),
  ('https://arbahogar.com.ar/assets/productos/b/aron-03.webp', 'Sillón esquinero Aron', 5),
  ('https://arbahogar.com.ar/assets/productos/a/aron-04.webp', 'Sillón esquinero Aron', 6),
  ('https://arbahogar.com.ar/assets/productos/b/aron-04.webp', 'Sillón esquinero Aron', 7)) as v(url, alt, orden)
where p.slug = 'aron';

-- Sillón Ameli
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'ameli', 'Sillón Ameli', c.id, 'Respaldo capitoné con botones · Con puff', 'Sillón de respaldo capitoné con botones, brazos redondeados y puff a juego. Un diseño clásico que suma calidez al living. Patas metálicas y tela y color a elección.', null, null, true,
  '[{"k": "Incluye", "v": "Sillón + puff"}, {"k": "Respaldo", "v": "Capitoné con botones"}, {"k": "Patas", "v": "Metálicas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 4, 'Nuevo'
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'ameli');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'ameli');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/ameli-01.webp', 'Sillón Ameli', 0),
  ('https://arbahogar.com.ar/assets/productos/b/ameli-01.webp', 'Sillón Ameli', 1),
  ('https://arbahogar.com.ar/assets/productos/a/ameli-02.webp', 'Sillón Ameli', 2),
  ('https://arbahogar.com.ar/assets/productos/b/ameli-02.webp', 'Sillón Ameli', 3),
  ('https://arbahogar.com.ar/assets/productos/a/ameli-03.webp', 'Sillón Ameli', 4),
  ('https://arbahogar.com.ar/assets/productos/b/ameli-03.webp', 'Sillón Ameli', 5),
  ('https://arbahogar.com.ar/assets/productos/a/ameli-04.webp', 'Sillón Ameli', 6),
  ('https://arbahogar.com.ar/assets/productos/b/ameli-04.webp', 'Sillón Ameli', 7)) as v(url, alt, orden)
where p.slug = 'ameli';

-- Sillón Justina
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'justina', 'Sillón Justina', c.id, '2 cuerpos · Almohadones de respaldo con botones', 'Sillón de 2 cuerpos con almohadones de respaldo con botones, brazos anchos y asiento firme. Compacto, ideal para livings chicos o departamentos. Patas metálicas y tela y color a elección.', null, null, true,
  '[{"k": "Cuerpos", "v": "2"}, {"k": "Patas", "v": "Metálicas"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 5, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'justina');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'justina');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/justina-01.webp', 'Sillón Justina', 0),
  ('https://arbahogar.com.ar/assets/productos/b/justina-01.webp', 'Sillón Justina', 1),
  ('https://arbahogar.com.ar/assets/productos/a/justina-02.webp', 'Sillón Justina', 2),
  ('https://arbahogar.com.ar/assets/productos/b/justina-02.webp', 'Sillón Justina', 3),
  ('https://arbahogar.com.ar/assets/productos/a/justina-03.webp', 'Sillón Justina', 4),
  ('https://arbahogar.com.ar/assets/productos/b/justina-03.webp', 'Sillón Justina', 5),
  ('https://arbahogar.com.ar/assets/productos/a/justina-04.webp', 'Sillón Justina', 6),
  ('https://arbahogar.com.ar/assets/productos/b/justina-04.webp', 'Sillón Justina', 7)) as v(url, alt, orden)
where p.slug = 'justina';

-- Sillón Berlín
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'berlin', 'Sillón Berlín', c.id, '3 cuerpos con puff · Patas de madera', 'Sillón de tres cuerpos con puff grande y patas de madera. Almohadones de respaldo sueltos y almohadones decorativos. El puff se puede usar como apoyapiés o pegado al sillón como chaise. Tela y color a elección.', null, null, true,
  '[{"k": "Incluye", "v": "Sillón + puff"}, {"k": "Patas", "v": "Madera"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 6, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'berlin');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'berlin');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/berlin-01.webp', 'Sillón Berlín', 0),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-01.webp', 'Sillón Berlín', 1),
  ('https://arbahogar.com.ar/assets/productos/a/berlin-02.webp', 'Sillón Berlín', 2),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-02.webp', 'Sillón Berlín', 3),
  ('https://arbahogar.com.ar/assets/productos/a/berlin-03.webp', 'Sillón Berlín', 4),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-03.webp', 'Sillón Berlín', 5),
  ('https://arbahogar.com.ar/assets/productos/a/berlin-04.webp', 'Sillón Berlín', 6),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-04.webp', 'Sillón Berlín', 7)) as v(url, alt, orden)
where p.slug = 'berlin';

-- Sillón esquinero Berlín XL
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'berlin-xl', 'Sillón esquinero Berlín XL', c.id, 'Esquinero grande · Almohadones y apoyabrazos cilíndricos', 'Versión esquinera del Berlín, pensada para livings grandes. Muchos almohadones, apoyabrazos con almohadón cilíndrico y patas de madera. Tela y color a elección.', null, null, true,
  '[{"k": "Formato", "v": "Esquinero"}, {"k": "Patas", "v": "Madera"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 7, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'berlin-xl');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'berlin-xl');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/berlin-xl-01.webp', 'Sillón esquinero Berlín XL', 0),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-xl-01.webp', 'Sillón esquinero Berlín XL', 1),
  ('https://arbahogar.com.ar/assets/productos/a/berlin-xl-02.webp', 'Sillón esquinero Berlín XL', 2),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-xl-02.webp', 'Sillón esquinero Berlín XL', 3),
  ('https://arbahogar.com.ar/assets/productos/a/berlin-xl-03.webp', 'Sillón esquinero Berlín XL', 4),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-xl-03.webp', 'Sillón esquinero Berlín XL', 5),
  ('https://arbahogar.com.ar/assets/productos/a/berlin-xl-04.webp', 'Sillón esquinero Berlín XL', 6),
  ('https://arbahogar.com.ar/assets/productos/b/berlin-xl-04.webp', 'Sillón esquinero Berlín XL', 7)) as v(url, alt, orden)
where p.slug = 'berlin-xl';

-- Sillón Franchezca
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'franchezca', 'Sillón Franchezca', c.id, 'Doble o esquinero con chaise', 'Sillón de brazos rectos y almohadones de respaldo sueltos, simple y cómodo. Viene en versión doble (2 cuerpos) o esquinera con chaise, para aprovechar el rincón del living. Tela y color a elección.', null, null, true,
  '[{"k": "Versiones", "v": "Doble (2 cuerpos) o esquinero con chaise"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 8, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'franchezca');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'franchezca');
insert into public.variantes (producto_id, nombre, orden, disponible)
select p.id, v.nombre, v.orden, true from public.productos p,
 (values
  ('Doble (2 cuerpos)', 0),
  ('Esquinero con chaise', 1)) as v(nombre, orden)
where p.slug = 'franchezca';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/franchezca-01.webp', 'Sillón Franchezca · Esquinero', 0),
  ('https://arbahogar.com.ar/assets/productos/franchezca-02.webp', 'Sillón Franchezca · Doble', 1)) as v(url, alt, orden)
where p.slug = 'franchezca';

-- Sillón Modular
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'modular', 'Sillón Modular', c.id, '2 o 5 cuerpos · Armalo a tu medida', 'Sillón modular de líneas rectas, con almohadones de respaldo sueltos y costuras con vivo. Se arma en 2 cuerpos o en 5 cuerpos (en U, con dos módulos chaise), según el espacio que tengas. Tela y color a elección.', null, null, true,
  '[{"k": "Cuerpos", "v": "2 o 5"}, {"k": "Terminación", "v": "Costuras con vivo"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 9, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'modular');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'modular');
insert into public.variantes (producto_id, nombre, orden, disponible)
select p.id, v.nombre, v.orden, true from public.productos p,
 (values
  ('2 cuerpos', 0),
  ('5 cuerpos', 1)) as v(nombre, orden)
where p.slug = 'modular';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/modular-01.webp', 'Sillón Modular · 2 cuerpos', 0),
  ('https://arbahogar.com.ar/assets/productos/modular-02.webp', 'Sillón Modular · 5 cuerpos', 1),
  ('https://arbahogar.com.ar/assets/productos/modular-03.webp', 'Sillón Modular', 2)) as v(url, alt, orden)
where p.slug = 'modular';

-- Sillón Modular Doble
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'modular-doble', 'Sillón Modular Doble', c.id, 'Con puff · Patas de madera', 'Sillón de dos cuerpos con puff a juego, almohadones de respaldo sueltos, brazos rectos y patas de madera. Tela y color a elección.', null, null, true,
  '[{"k": "Incluye", "v": "Sillón + puff"}, {"k": "Patas", "v": "Madera"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 10, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'modular-doble');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'modular-doble');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-01.webp', 'Sillón Modular Doble', 0),
  ('https://arbahogar.com.ar/assets/productos/b/modular-doble-01.webp', 'Sillón Modular Doble', 1),
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-02.webp', 'Sillón Modular Doble', 2),
  ('https://arbahogar.com.ar/assets/productos/b/modular-doble-02.webp', 'Sillón Modular Doble', 3),
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-03.webp', 'Sillón Modular Doble', 4),
  ('https://arbahogar.com.ar/assets/productos/b/modular-doble-03.webp', 'Sillón Modular Doble', 5),
  ('https://arbahogar.com.ar/assets/productos/a/modular-doble-04.webp', 'Sillón Modular Doble', 6),
  ('https://arbahogar.com.ar/assets/productos/b/modular-doble-04.webp', 'Sillón Modular Doble', 7)) as v(url, alt, orden)
where p.slug = 'modular-doble';

-- Sofá cama Plus
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'sofa-cama-plus', 'Sofá cama Plus', c.id, '1,60 m · Se abre en cama', 'Sofá de día y cama de noche: se abre y queda una cama amplia para las visitas o para el monoambiente. Almohadones de respaldo sueltos y brazos rectos. Mide 1,60 m y lo hacemos en la tela y el color que elijas.', null, null, true,
  '[{"k": "Medida", "v": "1,60 m"}, {"k": "Sistema", "v": "Se abre en cama"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, true, true, false, 11, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'sofa-cama-plus');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'sofa-cama-plus');
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-01.webp', 'Sofá cama Plus', 0),
  ('https://arbahogar.com.ar/assets/productos/b/sofa-cama-plus-01.webp', 'Sofá cama Plus', 1),
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-02.webp', 'Sofá cama Plus', 2),
  ('https://arbahogar.com.ar/assets/productos/b/sofa-cama-plus-02.webp', 'Sofá cama Plus', 3),
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-03.webp', 'Sofá cama Plus', 4),
  ('https://arbahogar.com.ar/assets/productos/b/sofa-cama-plus-03.webp', 'Sofá cama Plus', 5),
  ('https://arbahogar.com.ar/assets/productos/a/sofa-cama-plus-04.webp', 'Sofá cama Plus', 6),
  ('https://arbahogar.com.ar/assets/productos/b/sofa-cama-plus-04.webp', 'Sofá cama Plus', 7)) as v(url, alt, orden)
where p.slug = 'sofa-cama-plus';

-- Sofá cama Lenny
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'sofa-cama-lenny', 'Sofá cama Lenny', c.id, '1,00 / 1,40 / 1,70 m · Capitoné', 'Sofá cama con asiento y respaldo capitoné que se abre en un solo movimiento y queda como cama tapizada completa. Tres medidas: 1,00, 1,40 y 1,70 m. En las fotos, el de 1,40 m en negro y el de 1,70 m en azul. Tela y color a elección.', null, null, true,
  '[{"k": "Medidas", "v": "1,00 m · 1,40 m · 1,70 m"}, {"k": "Sistema", "v": "Se abre en cama"}, {"k": "Tela", "v": "A elección (consultanos el muestrario)"}, {"k": "Color", "v": "A elección"}]'::jsonb, false, true, false, 12, ''
from public.categorias c where c.slug = 'sillones'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'sofa-cama-lenny');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'sofa-cama-lenny');
insert into public.variantes (producto_id, nombre, orden, disponible)
select p.id, v.nombre, v.orden, true from public.productos p,
 (values
  ('1,00 m', 0),
  ('1,40 m', 1),
  ('1,70 m', 2)) as v(nombre, orden)
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
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'juego-comedor-german');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'juego-comedor-german');
insert into public.variantes (producto_id, nombre, orden, disponible)
select p.id, v.nombre, v.orden, true from public.productos p,
 (values
  ('1,30 m + 4 sillas Joaquina', 0),
  ('1,30 m + 4 sillas Guadalupe', 1),
  ('1,30 m + 4 sillas Ariela', 2),
  ('1,70 m + 6 sillas Joaquina', 3),
  ('1,70 m + 6 sillas Guadalupe', 4),
  ('1,70 m + 6 sillas Ariela', 5)) as v(nombre, orden)
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
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'mesa-mdf-con-sillas');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'mesa-mdf-con-sillas');
insert into public.variantes (producto_id, nombre, orden, disponible)
select p.id, v.nombre, v.orden, true from public.productos p,
 (values
  ('Sillas con costuras', 0),
  ('Sillas capitoné', 1),
  ('Sillas lisas', 2)) as v(nombre, orden)
where p.slug = 'mesa-mdf-con-sillas';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-01.webp', 'Juego de comedor Lis (mesa MDF) · lisas', 0),
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-02.webp', 'Juego de comedor Lis (mesa MDF)', 1),
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-03.webp', 'Juego de comedor Lis (mesa MDF)', 2),
  ('https://arbahogar.com.ar/assets/productos/mesa-mdf-lis-04.webp', 'Juego de comedor Lis (mesa MDF)', 3)) as v(url, alt, orden)
where p.slug = 'mesa-mdf-con-sillas';

-- Mesa Cubo
insert into public.productos (slug, nombre, categoria_id, resumen, descripcion, precio, precio_lista, mostrar_precio, specs, destacado, publicado, es_muestra, orden, etiqueta)
select 'mesa-cubo', 'Mesa Cubo', c.id, 'Base cubo · 1,20 / 1,40 / 2,00 × 1,00 m', 'Mesa de comedor con base cubo central, que deja lugar libre para las piernas y suma sillas sin patas en el medio. Tres medidas y dos terminaciones: color o lisa.', null, null, true,
  '[{"k": "Medidas", "v": "1,20 m · 1,40 m · 2,00 × 1,00 m"}, {"k": "Terminación", "v": "Color o lisa"}]'::jsonb, false, true, false, 3, ''
from public.categorias c where c.slug = 'comedor'
on conflict (slug) do update set nombre = excluded.nombre, categoria_id = excluded.categoria_id, resumen = excluded.resumen,
  descripcion = excluded.descripcion, specs = excluded.specs, destacado = excluded.destacado, publicado = true,
  es_muestra = false, orden = excluded.orden, etiqueta = excluded.etiqueta;
delete from public.variantes where producto_id = (select id from public.productos where slug = 'mesa-cubo');
delete from public.imagenes  where producto_id = (select id from public.productos where slug = 'mesa-cubo');
insert into public.variantes (producto_id, nombre, orden, disponible)
select p.id, v.nombre, v.orden, true from public.productos p,
 (values
  ('1,20 m · color', 0),
  ('1,20 m · lisa', 1),
  ('1,40 m · color', 2),
  ('1,40 m · lisa', 3),
  ('2,00 × 1,00 m · color', 4),
  ('2,00 × 1,00 m · lisa', 5)) as v(nombre, orden)
where p.slug = 'mesa-cubo';
insert into public.imagenes (producto_id, url, alt, orden)
select p.id, v.url, v.alt, v.orden from public.productos p,
 (values
  ('https://arbahogar.com.ar/assets/productos/mesa-cubo-01.webp', 'Mesa Cubo', 0),
  ('https://arbahogar.com.ar/assets/productos/mesa-cubo-02.webp', 'Mesa Cubo', 1),
  ('https://arbahogar.com.ar/assets/productos/mesa-cubo-03.webp', 'Mesa Cubo', 2),
  ('https://arbahogar.com.ar/assets/productos/mesa-cubo-04.webp', 'Mesa Cubo', 3)) as v(url, alt, orden)
where p.slug = 'mesa-cubo';

commit;
