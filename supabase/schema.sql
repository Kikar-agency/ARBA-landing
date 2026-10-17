-- ═══════════════════════════════════════════════════════════════
--  arba HOGAR — Base de datos del catálogo
--  Pegar entero en Supabase → SQL Editor → Run. Se puede correr
--  más de una vez sin romper nada.
-- ═══════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ── Administradores ────────────────────────────────────────────
-- Solo los usuarios que estén en esta tabla pueden editar.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email   text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ── Categorías (rubros) ────────────────────────────────────────
create table if not exists public.categorias (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  nombre      text not null,
  descripcion text not null default '',
  icono       text not null default 'generico',
  orden       int  not null default 0,
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ── Productos ──────────────────────────────────────────────────
create table if not exists public.productos (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  nombre         text not null,
  categoria_id   uuid references public.categorias(id) on delete set null,
  resumen        text not null default '',          -- línea corta bajo el nombre
  descripcion    text not null default '',
  precio         numeric(12,2),                     -- precio principal (contado / transferencia)
  precio_lista   numeric(12,2),                     -- precio con tarjeta / financiado (opcional)
  mostrar_precio boolean not null default true,     -- false = "Consultá el precio"
  specs          jsonb   not null default '[]'::jsonb,  -- [{"k":"Medidas","v":"210 x 90 cm"}]
  destacado      boolean not null default false,
  publicado      boolean not null default false,
  es_muestra     boolean not null default false,
  orden          int     not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists productos_categoria_idx on public.productos(categoria_id);
alter table public.productos add column if not exists etiqueta text not null default '';  -- "Más vendido", "Nuevo", "Últimas unidades"…

-- ── Variantes (tela, color, medida…) ───────────────────────────
create table if not exists public.variantes (
  id           uuid primary key default gen_random_uuid(),
  producto_id  uuid not null references public.productos(id) on delete cascade,
  nombre       text not null,                       -- "Gris topo · 3 cuerpos"
  color_hex    text,                                -- opcional, para mostrar el circulito
  precio       numeric(12,2),                       -- vacío = usa el del producto
  precio_lista numeric(12,2),
  disponible   boolean not null default true,
  orden        int not null default 0
);
create index if not exists variantes_producto_idx on public.variantes(producto_id);

-- ── Imágenes ───────────────────────────────────────────────────
create table if not exists public.imagenes (
  id          uuid primary key default gen_random_uuid(),
  producto_id uuid not null references public.productos(id) on delete cascade,
  url         text not null,
  path        text,                                 -- ruta en Storage (para borrar)
  alt         text not null default '',
  orden       int  not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists imagenes_producto_idx on public.imagenes(producto_id);

-- ── Promociones ────────────────────────────────────────────────
create table if not exists public.promos (
  id           uuid primary key default gen_random_uuid(),
  titulo       text not null,                       -- "Semana del sillón"
  tipo         text not null default 'porcentaje' check (tipo in ('porcentaje','precio')),
  valor        numeric(12,2) not null default 0,    -- 15 = 15% · o precio final fijo
  categoria_id uuid references public.categorias(id) on delete cascade,  -- toda una categoría
  producto_ids uuid[] not null default '{}',        -- o productos puntuales
  desde        date,
  hasta        date,
  activa       boolean not null default true,
  banner       boolean not null default false,      -- mostrar franja en la web
  created_at   timestamptz not null default now()
);

-- ── Configuración del sitio (clave / valor) ────────────────────
create table if not exists public.config (
  key   text primary key,
  value jsonb not null
);

-- ── updated_at automático ──────────────────────────────────────
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists productos_touch on public.productos;
create trigger productos_touch before update on public.productos
  for each row execute function public.touch_updated_at();

-- ═══════════════════════════════════════════════════════════════
--  Seguridad (RLS): el público solo LEE lo publicado.
--  Escriben solo los admins.
-- ═══════════════════════════════════════════════════════════════
alter table public.admins     enable row level security;
alter table public.categorias enable row level security;
alter table public.productos  enable row level security;
alter table public.variantes  enable row level security;
alter table public.imagenes   enable row level security;
alter table public.promos     enable row level security;
alter table public.config     enable row level security;

do $$ declare t text; begin
  foreach t in array array['categorias','productos','variantes','imagenes','promos','config','admins'] loop
    execute format('drop policy if exists "%1$s_admin_all" on public.%1$s', t);
    execute format('create policy "%1$s_admin_all" on public.%1$s for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists categorias_public on public.categorias;
create policy categorias_public on public.categorias for select using (activo);

drop policy if exists productos_public on public.productos;
create policy productos_public on public.productos for select using (publicado);

drop policy if exists variantes_public on public.variantes;
create policy variantes_public on public.variantes for select
  using (exists (select 1 from public.productos p where p.id = producto_id and p.publicado));

drop policy if exists imagenes_public on public.imagenes;
create policy imagenes_public on public.imagenes for select
  using (exists (select 1 from public.productos p where p.id = producto_id and p.publicado));

drop policy if exists promos_public on public.promos;
create policy promos_public on public.promos for select
  using (activa and (desde is null or desde <= current_date) and (hasta is null or hasta >= current_date));

drop policy if exists config_public on public.config;
create policy config_public on public.config for select using (true);

drop policy if exists admins_self on public.admins;
create policy admins_self on public.admins for select to authenticated using (user_id = auth.uid());

grant usage on schema public to anon, authenticated;
grant select on public.categorias, public.productos, public.variantes, public.imagenes, public.promos, public.config to anon;
grant select, insert, update, delete on public.categorias, public.productos, public.variantes, public.imagenes, public.promos, public.config, public.admins to authenticated;

-- ═══════════════════════════════════════════════════════════════
--  Storage: bucket público "productos" para las fotos
-- ═══════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do update set public = true;

drop policy if exists "fotos_lectura_publica" on storage.objects;
create policy "fotos_lectura_publica" on storage.objects for select
  using (bucket_id = 'productos');

drop policy if exists "fotos_admin_escribe" on storage.objects;
create policy "fotos_admin_escribe" on storage.objects for insert to authenticated
  with check (bucket_id = 'productos' and public.is_admin());

drop policy if exists "fotos_admin_modifica" on storage.objects;
create policy "fotos_admin_modifica" on storage.objects for update to authenticated
  using (bucket_id = 'productos' and public.is_admin());

drop policy if exists "fotos_admin_borra" on storage.objects;
create policy "fotos_admin_borra" on storage.objects for delete to authenticated
  using (bucket_id = 'productos' and public.is_admin());
