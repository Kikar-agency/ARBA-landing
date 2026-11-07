// ═══════════════════════════════════════════════════════════════
//  arba HOGAR — Capa de datos
//  Dos motores con la misma interfaz:
//   · Supabase (producción)
//   · Local / demo (localStorage + productos de muestra)
// ═══════════════════════════════════════════════════════════════
(function () {
  const CFG = window.ARBA_CFG;
  const DEMO = !CFG.supabaseUrl || !CFG.supabaseAnonKey;
  const LS_KEY = 'arba_demo_v1';

  const slugify = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'producto';
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2));
  const byOrden = (a, b) => (a.orden ?? 0) - (b.orden ?? 0);
  const num = (v) => (v === '' || v === null || v === undefined || isNaN(Number(v))) ? null : Number(v);
  const clone = (o) => JSON.parse(JSON.stringify(o));

  const hoyLocal = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
  function promoVigente(pr, hoy = hoyLocal()) {
    return pr.activa && (!pr.desde || pr.desde <= hoy) && (!pr.hasta || pr.hasta >= hoy);
  }

  function normProducto(p) {
    return {
      ...p,
      precio: num(p.precio), precio_lista: num(p.precio_lista),
      specs: Array.isArray(p.specs) ? p.specs : [],
      imagenes: (p.imagenes || []).slice().sort(byOrden),
      variantes: (p.variantes || []).map(v => ({ ...v, precio: num(v.precio), precio_lista: num(v.precio_lista) })).sort(byOrden),
    };
  }

  // ─────────────────────────── LOCAL ───────────────────────────
  const Local = {
    db() {
      try { const s = localStorage.getItem(LS_KEY); if (s) return JSON.parse(s); } catch (e) {}
      return { ...clone(window.ARBA_MUESTRA), config: {} };
    },
    save(db) {
      try { localStorage.setItem(LS_KEY, JSON.stringify(db)); }
      catch (e) { throw new Error('Se llenó el espacio del navegador (modo demo). Probá con menos fotos o más livianas.'); }
    },
    async config() { return Local.db().config || {}; },
    async catalogo({ todo = false } = {}) {
      const db = Local.db();
      return {
        categorias: db.categorias.filter(c => todo || c.activo).sort(byOrden),
        productos: db.productos.filter(p => todo || p.publicado).map(normProducto).sort(byOrden),
        promos: db.promos.filter(p => todo || promoVigente(p)),
      };
    },
    // admin
    async session() { return sessionStorage.getItem('arba_demo_sesion') ? { email: 'demo@arba' } : null; },
    async login() { sessionStorage.setItem('arba_demo_sesion', '1'); return { email: 'demo@arba' }; },
    async logout() { sessionStorage.removeItem('arba_demo_sesion'); },
    async saveProducto(p) {
      const db = Local.db();
      const row = clone(p);
      row.id = row.id || uid();
      row.variantes = (row.variantes || []).map((v, i) => ({ ...v, id: (!v.id || String(v.id).startsWith('tmp')) ? uid() : v.id, orden: i }));
      row.imagenes = (row.imagenes || []).map((im, i) => ({ ...im, orden: i }));
      const i = db.productos.findIndex(x => x.id === row.id);
      if (i >= 0) db.productos[i] = row; else db.productos.push(row);
      Local.save(db);
      return normProducto(row);
    },
    async deleteProducto(id) { const db = Local.db(); db.productos = db.productos.filter(p => p.id !== id); Local.save(db); },
    async uploadImagen(productoId, blob) {
      const url = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });
      const db = Local.db();
      const p = db.productos.find(x => x.id === productoId);
      const img = { id: uid(), url, path: null, alt: '', orden: (p?.imagenes || []).length };
      if (p) { p.imagenes = p.imagenes || []; p.imagenes.push(img); Local.save(db); }
      return img;
    },
    async deleteImagen(img, productoId) {
      const db = Local.db(); const p = db.productos.find(x => x.id === productoId);
      if (p) { p.imagenes = (p.imagenes || []).filter(i => i.id !== img.id); Local.save(db); }
    },
    async ordenarImagenes(productoId, imgs) {
      const db = Local.db(); const p = db.productos.find(x => x.id === productoId);
      if (p) { p.imagenes = imgs.map((im, i) => ({ ...im, orden: i })); Local.save(db); }
    },
    async saveCategoria(c) {
      const db = Local.db(); const row = { ...c, id: c.id || uid() };
      const i = db.categorias.findIndex(x => x.id === row.id); if (i >= 0) db.categorias[i] = row; else db.categorias.push(row);
      Local.save(db); return row;
    },
    async deleteCategoria(id) {
      const db = Local.db(); db.categorias = db.categorias.filter(c => c.id !== id);
      db.productos.forEach(p => { if (p.categoria_id === id) p.categoria_id = null; });
      db.promos = db.promos.filter(p => p.categoria_id !== id); Local.save(db);
    },
    async savePromo(pr) {
      const db = Local.db(); const row = { ...pr, id: pr.id || uid() };
      const i = db.promos.findIndex(x => x.id === row.id); if (i >= 0) db.promos[i] = row; else db.promos.push(row);
      Local.save(db); return row;
    },
    async deletePromo(id) { const db = Local.db(); db.promos = db.promos.filter(p => p.id !== id); Local.save(db); },
    async saveConfig(obj) { const db = Local.db(); db.config = { ...(db.config || {}), ...obj }; Local.save(db); },
    async resetDemo() { localStorage.removeItem(LS_KEY); },
  };

  // ────────────────────────── SUPABASE ─────────────────────────
  const base = (CFG.supabaseUrl || '').replace(/\/$/, '');
  async function rest(path) {
    const r = await fetch(`${base}/rest/v1/${path}`, { headers: { apikey: CFG.supabaseAnonKey, Authorization: `Bearer ${CFG.supabaseAnonKey}` } });
    if (!r.ok) throw new Error('No se pudo cargar el catálogo (' + r.status + ')');
    return r.json();
  }
  let _sb = null;
  function sb() {
    if (!_sb) {
      if (!window.supabase) throw new Error('Falta cargar supabase-js');
      _sb = window.supabase.createClient(base, CFG.supabaseAnonKey);
    }
    return _sb;
  }
  const chk = ({ data, error }) => { if (error) throw new Error(error.message); return data; };
  const PROD_COLS = ['slug', 'nombre', 'categoria_id', 'resumen', 'descripcion', 'precio', 'precio_lista', 'mostrar_precio', 'specs', 'destacado', 'publicado', 'es_muestra', 'orden', 'etiqueta'];

  const Supa = {
    async config() {
      const rows = await rest('config?select=key,value');
      return Object.fromEntries(rows.map(r => [r.key, r.value]));
    },
    async catalogo({ todo = false } = {}) {
      if (todo) {
        const [categorias, productos, promos] = await Promise.all([
          sb().from('categorias').select('*').order('orden').then(chk),
          sb().from('productos').select('*,imagenes(*),variantes(*)').order('orden').then(chk),
          sb().from('promos').select('*').order('created_at', { ascending: false }).then(chk),
        ]);
        return { categorias, productos: productos.map(normProducto), promos };
      }
      const [categorias, productos, promos] = await Promise.all([
        rest('categorias?select=*&order=orden.asc'),
        rest('productos?select=*,imagenes(*),variantes(*)&publicado=eq.true&order=orden.asc'),
        rest('promos?select=*'),
      ]);
      return { categorias, productos: productos.map(normProducto), promos: promos.filter(p => promoVigente(p)) };
    },
    async session() {
      const { data } = await sb().auth.getSession();
      const s = data.session; if (!s) return null;
      const adm = await sb().from('admins').select('user_id').eq('user_id', s.user.id).maybeSingle();
      if (!adm.data) { await sb().auth.signOut(); throw new Error('Este usuario no tiene permiso de administrador.'); }
      return { email: s.user.email };
    },
    async login(email, password) {
      chk(await sb().auth.signInWithPassword({ email, password }));
      return Supa.session();
    },
    async logout() { await sb().auth.signOut(); },
    async saveProducto(p) {
      const row = {}; PROD_COLS.forEach(k => row[k] = p[k] ?? null);
      row.specs = p.specs || []; row.mostrar_precio = !!p.mostrar_precio; row.destacado = !!p.destacado;
      row.publicado = !!p.publicado; row.es_muestra = !!p.es_muestra; row.orden = p.orden || 0;
      row.resumen = p.resumen || ''; row.descripcion = p.descripcion || ''; row.etiqueta = p.etiqueta || '';
      let id = p.id;
      if (id) chk(await sb().from('productos').update(row).eq('id', id));
      else id = chk(await sb().from('productos').insert(row).select('id').single()).id;

      // variantes: borrar las quitadas, actualizar las existentes, insertar las nuevas
      const vars = (p.variantes || []).map((v, i) => ({
        id: v.id, producto_id: id, nombre: v.nombre || 'Variante', color_hex: v.color_hex || null,
        precio: num(v.precio), precio_lista: num(v.precio_lista), disponible: v.disponible !== false, orden: i
      }));
      const esNueva = (v) => !v.id || String(v.id).startsWith('tmp');
      const existentes = chk(await sb().from('variantes').select('id').eq('producto_id', id)).map(x => x.id);
      const quedan = vars.filter(v => !esNueva(v)).map(v => v.id);
      const borrar = existentes.filter(x => !quedan.includes(x));
      if (borrar.length) chk(await sb().from('variantes').delete().in('id', borrar));
      const viejas = vars.filter(v => !esNueva(v));
      if (viejas.length) chk(await sb().from('variantes').upsert(viejas));
      const nuevas = vars.filter(esNueva).map(({ id: _, ...r }) => r);
      if (nuevas.length) chk(await sb().from('variantes').insert(nuevas));

      const full = chk(await sb().from('productos').select('*,imagenes(*),variantes(*)').eq('id', id).single());
      return normProducto(full);
    },
    async deleteProducto(id) {
      const imgs = chk(await sb().from('imagenes').select('path').eq('producto_id', id)).map(i => i.path).filter(Boolean);
      if (imgs.length) await sb().storage.from('productos').remove(imgs);
      chk(await sb().from('productos').delete().eq('id', id));
    },
    async uploadImagen(productoId, blob) {
      const path = `${productoId}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.webp`;
      chk(await sb().storage.from('productos').upload(path, blob, { contentType: blob.type || 'image/webp', cacheControl: '31536000', upsert: false }));
      const url = sb().storage.from('productos').getPublicUrl(path).data.publicUrl;
      const count = chk(await sb().from('imagenes').select('id').eq('producto_id', productoId)).length;
      return chk(await sb().from('imagenes').insert({ producto_id: productoId, url, path, orden: count }).select().single());
    },
    async deleteImagen(img) {
      if (img.path) await sb().storage.from('productos').remove([img.path]);
      chk(await sb().from('imagenes').delete().eq('id', img.id));
    },
    async ordenarImagenes(productoId, imgs) {
      await Promise.all(imgs.map((im, i) => sb().from('imagenes').update({ orden: i }).eq('id', im.id).then(chk)));
    },
    async saveCategoria(c) {
      const row = { slug: c.slug, nombre: c.nombre, descripcion: c.descripcion || '', icono: c.icono || 'generico', orden: c.orden || 0, activo: c.activo !== false };
      if (c.id) return chk(await sb().from('categorias').update(row).eq('id', c.id).select().single());
      return chk(await sb().from('categorias').insert(row).select().single());
    },
    async deleteCategoria(id) { chk(await sb().from('categorias').delete().eq('id', id)); },
    async savePromo(pr) {
      const row = { titulo: pr.titulo, tipo: pr.tipo, valor: num(pr.valor) || 0, categoria_id: pr.categoria_id || null,
        producto_ids: pr.producto_ids || [], desde: pr.desde || null, hasta: pr.hasta || null, activa: !!pr.activa, banner: !!pr.banner };
      if (pr.id) return chk(await sb().from('promos').update(row).eq('id', pr.id).select().single());
      return chk(await sb().from('promos').insert(row).select().single());
    },
    async deletePromo(id) { chk(await sb().from('promos').delete().eq('id', id)); },
    async saveConfig(obj) {
      const rows = Object.entries(obj).map(([key, value]) => ({ key, value }));
      chk(await sb().from('config').upsert(rows));
    },
  };

  const B = DEMO ? Local : Supa;

  // ───────────────────────── API pública ───────────────────────
  let _cat = null, _cfg = null;
  window.ArbaAPI = {
    DEMO, slugify, uid, promoVigente, hoyLocal,
    async config() {
      if (!_cfg) _cfg = B.config().catch(() => ({})).then(c => {
        const site = { ...CFG.sitio, ...c };
        // Vista previa del catálogo: abrir cualquier página con ?demo=1 (queda prendido en esa pestaña)
        {
          try {
            if (new URLSearchParams(location.search).has('demo')) sessionStorage.setItem('arba_preview', '1');
            if (sessionStorage.getItem('arba_preview')) site.catalogoActivo = true;
          } catch (e) {}
        }
        return site;
      });
      return _cfg;
    },
    async catalogo() { if (!_cat) _cat = B.catalogo(); return _cat; },
    async producto(slug) { const c = await this.catalogo(); return c.productos.find(p => p.slug === slug) || null; },
  };
  window.ArbaAdminAPI = { DEMO, ...B, catalogo: () => B.catalogo({ todo: true }), configRaw: () => B.config() };
})();
