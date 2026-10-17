# arba HOGAR — web + catálogo + panel

## Qué hay en la carpeta

| | |
|---|---|
| `index.html` | Landing (inicio). Funciona sola, sin base de datos |
| `catalogo.html`, `producto.html` | Catálogo y ficha de producto. Se ven recién cuando el catálogo está activado |
| `admin/` | Panel para cargar productos, variantes, precios, promos, fotos y datos del local |
| `js/config.js` | Conexión a Supabase y datos por defecto del sitio |
| `supabase/` | `schema.sql` (tablas y permisos) y `seed-muestra.sql` (rubros + 12 productos de muestra) |
| `videos/` | Videos verticales comprimidos para web (~3-4 MB c/u) |

## Paso 1 — Publicar la landing (hoy)

1. Entrar a **app.netlify.com/drop** y arrastrar la carpeta `arba-hogar` entera.
2. Listo: queda un link público. En *Domain settings* se le conecta el dominio.

Así como está, la web es la landing: el catálogo está apagado y todos los botones van al WhatsApp. No se muestra ningún producto de muestra.

## Paso 2 — Conectar la base de datos (Supabase)

1. Crear un proyecto nuevo en supabase.com (región São Paulo).
2. **SQL Editor** → pegar `supabase/schema.sql` → *Run*. Después `supabase/seed-muestra.sql` → *Run*.
3. **Authentication → Users → Add user**: crear el usuario de ARBA (email + contraseña) y el nuestro.
4. Darles permiso de admin (SQL Editor, cambiando los emails):
   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email in ('arba@...', 'benja@...');
   ```
5. En la configuración de Authentication, desactivar *Allow new users to sign up*. Es una capa extra: aunque alguien se registre, sin estar en `admins` no puede tocar nada.
6. **Project Settings → API**: copiar *Project URL* y la *anon public key* en `js/config.js` (`supabaseUrl` y `supabaseAnonKey`).
7. Volver a subir la carpeta a Netlify (mejor: conectar el repo de GitHub para que publique solo con cada cambio).

## Paso 3 — Carga y lanzamiento del catálogo

1. Entrar a `tudominio/admin` con el usuario.
2. Cargar los productos reales (nombre, categoría, precio, variantes, fotos, medidas).
3. Botón **"Borrar los de muestra"** en Productos.
4. **Configuración → Mostrar el catálogo en la web** → Guardar. Desde ese momento el inicio pasa a modo tienda y aparecen el catálogo y el carrito.

## Ver la tienda antes de publicarla

Abrir `index.html?demo=1` (o cualquier página con `?demo=1`). Prende el catálogo con los productos de muestra solo en esa pestaña, sin tocar lo publicado.

## Cómo funciona

- **Sin base conectada** el panel entra en *modo demo*: anda todo, pero guarda solo en ese navegador. Sirve para mostrárselo a ARBA antes de conectar.
- **Precio**: principal (efectivo/transferencia) + opcional con tarjeta. Cada variante puede tener su propio precio. Se puede ocultar ("Consultá el precio").
- **Promos**: % de descuento o precio fijo, por categoría o productos puntuales, con fechas. Opcional: franja arriba de la web.
- **Fotos**: se achican y pasan a WEBP en el navegador antes de subir. La primera es la portada.
- **Carrito**: cantidades, total en efectivo y con tarjeta, cuota mensual, retiro o envío y forma de pago. El pedido sale armado por WhatsApp (no se cobra en la web).
- **Cuotas**: los planes se cargan en Configuración (hoy: 12 sin interés con Naranja, sobre el precio con tarjeta). Se muestran en cada tarjeta, en la ficha y en el carrito.
- **Inicio en modo tienda**: barra animada con mensajes editables, promo con cuenta regresiva, beneficios, rubros con precio "desde", carruseles de destacados, ofertas y por rubro, y sección de formas de pago.
- **Etiqueta por producto**: "Más vendido", "Nuevo", "Últimas unidades"… aparece sobre la foto.
- **WhatsApp**: cada botón manda un mensaje armado (rubro, producto, variante, precio y link).
- **Pixel de Meta** (se pega el ID en Configuración): `PageView`, `ViewContent` (con valor), `Search`, `AddToCart`, `ViewCart`, `InitiateCheckout` (al enviar el pedido, con el total), `Contact` (cada clic a WhatsApp, con el rubro) y `Lead` (consulta rápida).

## Videos

Los originales están en `ARBA/Finales`. Para sumar o cambiar videos: comprimirlos a 720×1280 y listarlos en `videos` dentro de `js/config.js`. Quedaron afuera *ARBA Days* y *Día de la Madre* por ser de fecha.
