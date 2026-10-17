// ═══════════════════════════════════════════════════════════════
//  arba HOGAR — Panel de administración
// ═══════════════════════════════════════════════════════════════
(function () {
  const API = window.ArbaAdminAPI, U = window.ArbaUI, esc = U.esc, money = U.money;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const view = $('#view');

  let DB = { categorias: [], productos: [], promos: [] };
  let SITE = {};
  let tab = 'productos';
  let dirty = false;
  const filtros = { q: '', cat: '', estado: '' };

  document.querySelectorAll('[data-logo]').forEach(el => el.innerHTML = U.LOGO);

  // ── utilidades ──
  function toast(msg, err = false) {
    const t = $('#toast'); t.textContent = msg; t.classList.toggle('err', err); t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), err ? 5000 : 2400);
  }
  async function run(btn, fn, okMsg) {
    const txt = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Guardando…'; }
    try { const r = await fn(); if (okMsg) toast(okMsg); return r; }
    catch (e) { console.error(e); toast(e.message || 'Algo salió mal', true); throw e; }
    finally { if (btn) { btn.disabled = false; btn.innerHTML = txt; } }
  }
  const catNombre = (id) => DB.categorias.find(c => c.id === id)?.nombre || 'Sin categoría';
  const icono = (id) => U.ICONOS[DB.categorias.find(c => c.id === id)?.icono] || U.ICONOS.generico;
  const numOrNull = (v) => { if (v === '' || v == null) return null; const n = Number(String(v).replace(/\./g, '').replace(',', '.')); return isNaN(n) ? null : n; };
  const fmtNum = (n) => n == null ? '' : String(n);
  function slugUnico(nombre, id) {
    const base = API.slugify ? API.slugify(nombre) : ArbaAPI.slugify(nombre);
    let s = base, i = 2;
    while (DB.productos.some(p => p.slug === s && p.id !== id)) s = `${base}-${i++}`;
    return s;
  }
  const estadoPromo = (pr) => {
    const hoy = ArbaAPI.hoyLocal();
    if (!pr.activa) return ['Pausada', ''];
    if (pr.hasta && pr.hasta < hoy) return ['Vencida', 'mal'];
    if (pr.desde && pr.desde > hoy) return ['Programada', 'prog'];
    return ['Activa', 'ok'];
  };

  // Redimensiona y comprime la foto en el navegador antes de subirla
  async function comprimir(file) {
    const max = API.DEMO ? 900 : 1600, q = API.DEMO ? 0.72 : 0.85;
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    let blob = await new Promise(r => c.toBlob(r, 'image/webp', q));
    if (!blob || blob.type !== 'image/webp') blob = await new Promise(r => c.toBlob(r, 'image/jpeg', q));
    return blob;
  }

  window.addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
  function confirmarSalida() { return !dirty || confirm('Tenés cambios sin guardar. ¿Salir igual?'); }

  // ═════════════════ LOGIN ═════════════════
  async function start() {
    if (API.DEMO) { $('#demoNote').hidden = false; $$('[data-real]').forEach(e => e.hidden = true); $('#loginBtn').textContent = 'Entrar al panel (demo)'; $('#demoBar').hidden = false; }
    let s = null;
    try { s = await API.session(); } catch (e) { $('#loginErr').textContent = e.message; }
    if (s) enter(s); else $('#login').hidden = false;
  }
  $('#loginForm').addEventListener('submit', async e => {
    e.preventDefault(); $('#loginErr').textContent = '';
    const f = new FormData(e.target);
    try { const s = await API.login(f.get('email'), f.get('password')); enter(s); }
    catch (err) { $('#loginErr').textContent = /Invalid login/i.test(err.message) ? 'Email o contraseña incorrectos.' : err.message; }
  });
  $('#logout').onclick = async () => { if (!confirmarSalida()) return; await API.logout(); location.reload(); };
  $('#resetDemo').onclick = async () => { if (!confirm('Se borra todo lo cargado en este navegador y vuelven los productos de muestra. ¿Seguimos?')) return; await API.resetDemo(); dirty = false; location.reload(); };

  async function enter(s) {
    $('#login').hidden = true; $('#app').hidden = false; $('#userEmail').textContent = s.email || '';
    await recargar();
    go('productos');
  }
  async function recargar() {
    DB = await API.catalogo();
    SITE = { ...window.ARBA_CFG.sitio, ...(await API.configRaw().catch(() => ({}))) };
  }
  $$('#tabs button').forEach(b => b.onclick = () => { if (confirmarSalida()) go(b.dataset.tab); });
  function go(t) {
    tab = t; dirty = false;
    $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
    ({ productos: vProductos, promos: vPromos, categorias: vCategorias, config: vConfig })[t]();
    window.scrollTo(0, 0);
  }

  // ═════════════════ PRODUCTOS: LISTA ═════════════════
  function vProductos() {
    const muestras = DB.productos.filter(p => p.es_muestra).length;
    view.innerHTML = `
      <div class="head"><div><h1>Productos</h1><p>${DB.productos.length} productos · ${DB.productos.filter(p => p.publicado).length} publicados</p></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${muestras ? `<button class="b b-danger b-sm" id="delMuestras">Borrar los ${muestras} de muestra</button>` : ''}
          <button class="b b-primary" id="nuevo">+ Nuevo producto</button></div></div>
      <div class="filters">
        <input id="fq" placeholder="Buscar por nombre…" value="${esc(filtros.q)}">
        <select id="fcat"><option value="">Todas las categorías</option>${DB.categorias.map(c => `<option value="${c.id}"${filtros.cat === c.id ? ' selected' : ''}>${esc(c.nombre)}</option>`).join('')}<option value="__none"${filtros.cat === '__none' ? ' selected' : ''}>Sin categoría</option></select>
        <select id="fest"><option value="">Todos</option><option value="pub">Publicados</option><option value="bor">Borradores</option><option value="dest">Destacados</option><option value="mue">De muestra</option></select>
      </div>
      <div class="list" id="plist"></div>`;
    $('#fest').value = filtros.estado;
    $('#nuevo').onclick = () => vEditor(null);
    $('#fq').oninput = e => { filtros.q = e.target.value; lista(); };
    $('#fcat').onchange = e => { filtros.cat = e.target.value; lista(); };
    $('#fest').onchange = e => { filtros.estado = e.target.value; lista(); };
    if ($('#delMuestras')) $('#delMuestras').onclick = async (e) => {
      if (!confirm(`Se van a borrar ${muestras} productos de muestra (con sus fotos). Los productos reales no se tocan. ¿Seguimos?`)) return;
      await run(e.target, async () => { for (const p of DB.productos.filter(x => x.es_muestra)) await API.deleteProducto(p.id); await recargar(); }, 'Productos de muestra borrados');
      vProductos();
    };
    lista();
  }
  function lista() {
    const q = filtros.q.trim() ? ArbaAPI.slugify(filtros.q).replace(/-/g, ' ') : '';
    let items = DB.productos.slice().sort((a, b) => (a.orden - b.orden) || a.nombre.localeCompare(b.nombre));
    if (q) items = items.filter(p => ArbaAPI.slugify(p.nombre + ' ' + p.resumen).replace(/-/g, ' ').includes(q));
    if (filtros.cat) items = items.filter(p => filtros.cat === '__none' ? !p.categoria_id : p.categoria_id === filtros.cat);
    if (filtros.estado === 'pub') items = items.filter(p => p.publicado);
    if (filtros.estado === 'bor') items = items.filter(p => !p.publicado);
    if (filtros.estado === 'dest') items = items.filter(p => p.destacado);
    if (filtros.estado === 'mue') items = items.filter(p => p.es_muestra);
    $('#plist').innerHTML = !items.length ? '<div class="empty">No hay productos con ese filtro.</div>' :
      `<div class="row hd"><span></span><span>Producto</span><span>Categoría</span><span>Precio</span><span>Publicado</span><span>Destacado</span><span></span></div>` +
      items.map(p => `<div class="row" data-id="${p.id}">
        <div class="th">${p.imagenes[0] ? `<img src="${esc(p.imagenes[0].url)}" alt="">` : icono(p.categoria_id)}</div>
        <div style="min-width:0"><div class="nm" data-edit>${esc(p.nombre)}${p.etiqueta ? `<span class="tag prog">${esc(p.etiqueta)}</span>` : ''}${p.es_muestra ? '<span class="tag">muestra</span>' : ''}${!p.publicado ? '<span class="tag">borrador</span>' : ''}</div>
          <div class="sub">${esc(p.resumen || '')}${p.variantes.length ? ` · ${p.variantes.length} variantes` : ''}${!p.imagenes.length ? ' · sin fotos' : ''}</div></div>
        <div class="c-cat sub">${esc(catNombre(p.categoria_id))}</div>
        <div class="c-price">${p.precio != null ? money(p.precio) : '<span class="muted">—</span>'}${p.mostrar_precio === false ? '<div class="muted">oculto</div>' : ''}</div>
        <div class="c-tg"><label class="sw"><input type="checkbox" data-t="publicado"${p.publicado ? ' checked' : ''}><i></i><small>Publicado</small></label></div>
        <div class="c-tg"><label class="sw"><input type="checkbox" data-t="destacado"${p.destacado ? ' checked' : ''}><i></i><small>Destacado</small></label></div>
        <div class="c-act" style="display:flex;gap:6px;justify-content:flex-end"><button class="b b-ghost b-sm" data-edit>Editar</button></div>
      </div>`).join('');
    $$('#plist [data-edit]').forEach(el => el.onclick = () => vEditor(DB.productos.find(p => p.id === el.closest('.row').dataset.id)));
    $$('#plist [data-t]').forEach(el => el.onchange = async () => {
      const p = DB.productos.find(x => x.id === el.closest('.row').dataset.id);
      const prev = p[el.dataset.t]; p[el.dataset.t] = el.checked;
      try { const saved = await API.saveProducto(p); Object.assign(p, saved); toast(el.dataset.t === 'publicado' ? (el.checked ? 'Publicado en la web' : 'Oculto de la web') : (el.checked ? 'Marcado como destacado' : 'Ya no es destacado')); }
      catch (e) { p[el.dataset.t] = prev; el.checked = prev; toast(e.message, true); }
    });
  }

  // ═════════════════ PRODUCTOS: EDITOR ═════════════════
  function vEditor(orig, semilla) {
    const p = semilla || (orig ? JSON.parse(JSON.stringify(orig)) : {
      id: null, nombre: '', slug: '', categoria_id: filtros.cat && filtros.cat !== '__none' ? filtros.cat : (DB.categorias[0]?.id || null),
      resumen: '', descripcion: '', precio: null, precio_lista: null, mostrar_precio: true, specs: [], destacado: false,
      publicado: true, es_muestra: false, orden: (Math.max(0, ...DB.productos.map(x => x.orden || 0)) + 1), imagenes: [], variantes: []
    });
    dirty = false;
    const tmp = () => 'tmp-' + Math.random().toString(36).slice(2, 9);

    view.innerHTML = `
      <div class="head"><div><button class="b b-link" id="back">← Volver a productos</button><h1 style="margin-top:6px">${orig ? esc(orig.nombre) : (semilla ? 'Copia de producto' : 'Nuevo producto')}</h1></div>
        ${orig && orig.publicado ? `<a class="b b-ghost b-sm" href="../producto.html?p=${encodeURIComponent(orig.slug)}" target="_blank">Ver en la web ↗</a>` : ''}</div>
      <div class="ed">
        <div>
          <section class="card">
            <h2>Datos del producto</h2><p class="hint">Lo que ve el cliente en la tarjeta y en la ficha.</p>
            <label class="f">Nombre *<input id="e_nombre" value="${esc(p.nombre)}" placeholder="Ej: Sofá Milán 3 cuerpos" maxlength="90"></label>
            <div class="g2">
              <label class="f">Categoría<select id="e_cat"><option value="">Sin categoría</option>${DB.categorias.map(c => `<option value="${c.id}"${p.categoria_id === c.id ? ' selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select></label>
              <label class="f">Línea corta (opcional)<input id="e_resumen" value="${esc(p.resumen)}" placeholder="Ej: Tela pana · Respaldo alto" maxlength="70"></label>
            </div>
            <label class="f">Descripción<textarea id="e_desc" placeholder="Contá cómo es, materiales, para qué espacio sirve…">${esc(p.descripcion)}</textarea></label>
          </section>

          <section class="card">
            <h2>Precio</h2><p class="hint">Si una variante tiene otro precio, se carga en la variante. Las promos se aplican solas desde "Promociones".</p>
            <div class="g2">
              <label class="f">${esc(SITE.etiquetaPrecio || 'Precio')} <span class="money"><input id="e_precio" inputmode="numeric" value="${fmtNum(p.precio)}" placeholder="480000"></span></label>
              <label class="f">${esc(SITE.etiquetaPrecioLista || 'Precio con tarjeta')} (opcional)<span class="money"><input id="e_lista" inputmode="numeric" value="${fmtNum(p.precio_lista)}" placeholder="600000"></span></label>
            </div>
            <label class="sw"><input type="checkbox" id="e_mostrar"${p.mostrar_precio !== false ? ' checked' : ''}><i></i>Mostrar el precio en la web <span class="muted">(apagado = "Consultá el precio")</span></label>
          </section>

          <section class="card">
            <h2>Variantes</h2><p class="hint">Telas, colores o medidas. Dejá el precio vacío si es el mismo que el del producto. Apagá "Hay" si no hay stock.</p>
            <div id="vars"></div>
            <button class="b b-ghost b-sm" id="addVar" style="margin-top:12px">+ Agregar variante</button>
          </section>

          <section class="card">
            <h2>Fotos</h2><p class="hint">La primera es la portada. Se achican solas antes de subirse. Ideal: fotos verticales u horizontales con buena luz.</p>
            <div class="drop" id="drop"><b>Arrastrá las fotos acá</b> o tocá para elegirlas<br><span class="muted">JPG, PNG o WEBP · podés elegir varias</span></div>
            <input type="file" id="file" accept="image/*" multiple hidden>
            <div class="photos" id="photos"></div>
          </section>

          <section class="card">
            <h2>Medidas y características</h2><p class="hint">Aparecen como tabla en la ficha.</p>
            <div id="specs"></div>
            <div class="chips" id="specChips">${['Medidas', 'Material', 'Tela', 'Estructura', 'Garantía', 'Armado'].map(k => `<button type="button" data-k="${k}">+ ${k}</button>`).join('')}</div>
          </section>
        </div>

        <div>
          <section class="card">
            <h2>Estado</h2>
            <div class="stack" style="margin-top:12px">
              <label class="sw"><input type="checkbox" id="e_pub"${p.publicado ? ' checked' : ''}><i></i>Publicado en la web</label>
              <label class="sw"><input type="checkbox" id="e_dest"${p.destacado ? ' checked' : ''}><i></i>Destacado en el inicio</label>
              <label class="sw"><input type="checkbox" id="e_mue"${p.es_muestra ? ' checked' : ''}><i></i>Es de muestra</label>
              <label class="f" style="margin:4px 0 0">Etiqueta en la foto (opcional)<input id="e_etq" list="etqList" value="${esc(p.etiqueta || '')}" placeholder="Ej: Más vendido" maxlength="22"></label>
              <datalist id="etqList"><option>Más vendido</option><option>Nuevo</option><option>Últimas unidades</option><option>Entrega inmediata</option><option>Oferta</option></datalist>
              <label class="f" style="margin:4px 0 0">Orden (menor = aparece primero)<input id="e_orden" type="number" value="${p.orden || 0}"></label>
            </div>
          </section>
          <section class="card" id="preview"></section>
        </div>
      </div>
      <div class="savebar">
        ${orig ? '<button class="b b-danger" id="del">Eliminar</button><button class="b b-ghost" id="dup">Duplicar</button>' : ''}
        <span class="sp"></span><span class="dirty" id="dirtyTxt"></span>
        <button class="b b-ghost" id="cancel">Cancelar</button>
        <button class="b b-primary" id="save">Guardar</button>
      </div>`;

    const marcar = () => { dirty = true; $('#dirtyTxt').textContent = 'Cambios sin guardar'; preview(); };
    view.querySelectorAll('input,select,textarea').forEach(el => el.addEventListener('input', marcar));

    // variantes
    function vars() {
      $('#vars').innerHTML = !p.variantes.length ? '<p class="muted">Sin variantes. Si el producto viene en una sola versión, no hace falta cargar nada.</p>' :
        `<div class="vrow vhd"><span>Nombre</span><span>Color</span><span>Precio</span><span>Con tarjeta</span><span>Hay</span><span></span></div>` +
        p.variantes.map((v, i) => `<div class="vrow" data-i="${i}">
          <div class="v-name" data-lbl="Nombre"><input type="text" data-f="nombre" value="${esc(v.nombre)}" placeholder="Ej: Gris topo · 3 cuerpos"></div>
          <div class="col" data-lbl="Color"><input type="color" data-f="color_hex" value="${esc(v.color_hex || '#C9B79F')}" class="${v.color_hex ? '' : 'off'}" title="Elegir color"><button type="button" class="b-link b" data-nocolor style="font-size:12px">${v.color_hex ? 'quitar' : 'sin color'}</button></div>
          <div data-lbl="Precio"><input type="number" data-f="precio" value="${fmtNum(v.precio)}" placeholder="= producto"></div>
          <div data-lbl="Con tarjeta"><input type="number" data-f="precio_lista" value="${fmtNum(v.precio_lista)}" placeholder="= producto"></div>
          <div data-lbl="Hay stock"><label class="sw"><input type="checkbox" data-f="disponible"${v.disponible !== false ? ' checked' : ''}><i></i></label></div>
          <div class="acts"><button type="button" class="b-icon b" data-up title="Subir">↑</button><button type="button" class="b-icon b" data-dn title="Bajar">↓</button><button type="button" class="b-icon b" data-rm title="Quitar">✕</button></div>
        </div>`).join('');
      $$('#vars .vrow[data-i]').forEach(row => {
        const i = +row.dataset.i, v = p.variantes[i];
        row.querySelectorAll('[data-f]').forEach(inp => inp.addEventListener('input', () => {
          const f = inp.dataset.f;
          if (f === 'disponible') v.disponible = inp.checked;
          else if (f === 'color_hex') { v.color_hex = inp.value; inp.classList.remove('off'); row.querySelector('[data-nocolor]').textContent = 'quitar'; }
          else if (f === 'precio' || f === 'precio_lista') v[f] = numOrNull(inp.value);
          else v[f] = inp.value;
          marcar();
        }));
        row.querySelector('[data-nocolor]').onclick = () => { v.color_hex = v.color_hex ? null : '#C9B79F'; vars(); marcar(); };
        row.querySelector('[data-up]').onclick = () => { if (i > 0) { [p.variantes[i - 1], p.variantes[i]] = [p.variantes[i], p.variantes[i - 1]]; vars(); marcar(); } };
        row.querySelector('[data-dn]').onclick = () => { if (i < p.variantes.length - 1) { [p.variantes[i + 1], p.variantes[i]] = [p.variantes[i], p.variantes[i + 1]]; vars(); marcar(); } };
        row.querySelector('[data-rm]').onclick = () => { p.variantes.splice(i, 1); vars(); marcar(); };
      });
    }
    $('#addVar').onclick = () => { p.variantes.push({ id: tmp(), nombre: '', color_hex: null, precio: null, precio_lista: null, disponible: true }); vars(); marcar(); $$('#vars [data-f=nombre]').pop()?.focus(); };

    // specs
    function specs() {
      $('#specs').innerHTML = p.specs.map((s, i) => `<div class="srow" data-i="${i}"><input data-k value="${esc(s.k)}" placeholder="Ej: Medidas"><input data-v value="${esc(s.v)}" placeholder="Ej: 210 × 90 × 85 cm"><button type="button" class="b b-icon" data-rm>✕</button></div>`).join('');
      $$('#specs .srow').forEach(r => {
        const s = p.specs[+r.dataset.i];
        r.querySelector('[data-k]').oninput = e => { s.k = e.target.value; marcar(); };
        r.querySelector('[data-v]').oninput = e => { s.v = e.target.value; marcar(); };
        r.querySelector('[data-rm]').onclick = () => { p.specs.splice(+r.dataset.i, 1); specs(); marcar(); };
      });
    }
    $$('#specChips button').forEach(b => b.onclick = () => { p.specs.push({ k: b.dataset.k, v: '' }); specs(); marcar(); $$('#specs [data-v]').pop()?.focus(); });

    // fotos
    function fotos() {
      $('#photos').innerHTML = p.imagenes.map((im, i) => `<div class="photo" data-i="${i}"><img src="${esc(im.url)}" alt="">${i === 0 ? '<span class="cover">Portada</span>' : ''}
        <div class="ov"><span><button type="button" data-l title="Mover a la izquierda">←</button> <button type="button" data-r title="Mover a la derecha">→</button></span><button type="button" data-x title="Borrar">🗑</button></div></div>`).join('');
      $$('#photos .photo').forEach(ph => {
        const i = +ph.dataset.i;
        const mover = async (j) => {
          if (j < 0 || j >= p.imagenes.length) return;
          [p.imagenes[i], p.imagenes[j]] = [p.imagenes[j], p.imagenes[i]]; fotos(); preview();
          try { await API.ordenarImagenes(p.id, p.imagenes); sync(); } catch (e) { toast(e.message, true); }
        };
        ph.querySelector('[data-l]').onclick = () => mover(i - 1);
        ph.querySelector('[data-r]').onclick = () => mover(i + 1);
        ph.querySelector('[data-x]').onclick = async () => {
          if (!confirm('¿Borrar esta foto?')) return;
          const [im] = p.imagenes.splice(i, 1); fotos(); preview();
          try { await API.deleteImagen(im, p.id); await API.ordenarImagenes(p.id, p.imagenes); sync(); toast('Foto borrada'); } catch (e) { toast(e.message, true); }
        };
      });
    }
    function sync() { const i = DB.productos.findIndex(x => x.id === p.id); if (i >= 0) DB.productos[i].imagenes = p.imagenes.slice(); }
    async function subir(files) {
      files = Array.from(files).filter(f => f.type.startsWith('image/'));
      if (!files.length) return;
      const eraNuevo = !p.id;
      if (eraNuevo) {   // producto nuevo: se guarda primero para poder asociar las fotos
        if (!leer()) return;
        try { await guardar(true); } catch (e) { return; }
      }
      for (const f of files) {
        const ph = document.createElement('div'); ph.className = 'photo loading'; ph.textContent = 'Subiendo…'; $('#photos').appendChild(ph);
        try { const blob = await comprimir(f); const im = await API.uploadImagen(p.id, blob); p.imagenes.push(im); sync(); }
        catch (e) { toast('No se pudo subir ' + f.name + ': ' + e.message, true); }
        fotos(); preview();
      }
      toast(files.length > 1 ? 'Fotos subidas' : 'Foto subida');
      if (eraNuevo) vEditor(DB.productos.find(x => x.id === p.id) || p);
    }
    const drop = $('#drop');
    drop.onclick = () => $('#file').click();
    $('#file').onchange = e => { subir(e.target.files); e.target.value = ''; };
    ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', e => subir(e.dataTransfer.files));

    function leer() {
      p.nombre = $('#e_nombre').value.trim();
      if (!p.nombre) { toast('Falta el nombre del producto', true); $('#e_nombre').focus(); return false; }
      p.categoria_id = $('#e_cat').value || null;
      p.resumen = $('#e_resumen').value.trim();
      p.descripcion = $('#e_desc').value.trim();
      p.precio = numOrNull($('#e_precio').value);
      p.precio_lista = numOrNull($('#e_lista').value);
      p.mostrar_precio = $('#e_mostrar').checked;
      p.publicado = $('#e_pub').checked; p.destacado = $('#e_dest').checked; p.es_muestra = $('#e_mue').checked;
      p.orden = parseInt($('#e_orden').value) || 0;
      p.etiqueta = $('#e_etq').value.trim();
      p.specs = p.specs.filter(s => s.k.trim() || s.v.trim()).map(s => ({ k: s.k.trim(), v: s.v.trim() }));
      p.variantes = p.variantes.filter(v => (v.nombre || '').trim()).map(v => ({ ...v, nombre: v.nombre.trim() }));
      if (p.publicado && p.mostrar_precio && p.precio == null && !p.variantes.some(v => v.precio != null)) {
        toast('Cargá un precio o apagá "Mostrar el precio en la web"', true); $('#e_precio').focus(); return false;
      }
      p.slug = slugUnico(p.nombre, p.id);
      return true;
    }
    async function guardar(silencioso = false) {
      const saved = await run(silencioso ? null : $('#save'), () => API.saveProducto(p), silencioso ? null : 'Producto guardado');
      const nuevo = !p.id;
      Object.assign(p, saved);
      const i = DB.productos.findIndex(x => x.id === saved.id);
      if (i >= 0) DB.productos[i] = saved; else DB.productos.push(saved);
      dirty = false; $('#dirtyTxt').textContent = '';
      if (nuevo && !silencioso) { vEditor(saved); return saved; }
      vars(); specs(); fotos(); preview();
      return saved;
    }
    $('#save').onclick = async () => { if (!leer()) return; try { await guardar(); } catch (e) {} };
    $('#cancel').onclick = $('#back').onclick = () => { if (confirmarSalida()) { dirty = false; vProductos(); } };
    if ($('#del')) $('#del').onclick = async (e) => {
      if (!confirm(`¿Eliminar "${p.nombre}" con sus fotos? No se puede deshacer.`)) return;
      await run(e.target, () => API.deleteProducto(p.id), 'Producto eliminado');
      DB.productos = DB.productos.filter(x => x.id !== p.id); dirty = false; vProductos();
    };
    if ($('#dup')) $('#dup').onclick = () => {
      if (!confirmarSalida()) return;
      if (!leer()) return;
      const copia = JSON.parse(JSON.stringify(p));
      Object.assign(copia, { id: null, nombre: p.nombre + ' (copia)', publicado: false, destacado: false, imagenes: [],
        orden: (Math.max(0, ...DB.productos.map(x => x.orden || 0)) + 1), variantes: copia.variantes.map(v => ({ ...v, id: tmp() })) });
      vEditor(null, copia);
      toast('Copia lista: revisala y guardala (las fotos no se copian)');
    };

    function preview() {
      const tmpP = { ...p, nombre: $('#e_nombre').value || 'Nombre del producto', resumen: $('#e_resumen').value, precio: numOrNull($('#e_precio').value),
        precio_lista: numOrNull($('#e_lista').value), mostrar_precio: $('#e_mostrar').checked, categoria_id: $('#e_cat').value || null, es_muestra: $('#e_mue').checked, etiqueta: $('#e_etq').value.trim() };
      const cat = DB.categorias.find(c => c.id === tmpP.categoria_id);
      const activas = DB.promos.filter(pr => ArbaAPI.promoVigente(pr));
      const card = U.card(tmpP, cat, activas).replace(/href="[^"]*"/, 'href="javascript:void 0"');
      $('#preview').innerHTML = `<h2>Así se ve en la web</h2><p class="hint">Vista previa de la tarjeta.</p><div class="pv">${card}</div>`;
    }
    vars(); specs(); fotos(); preview();
  }

  // ═════════════════ PROMOS ═════════════════
  function vPromos() {
    view.innerHTML = `<div class="head"><div><h1>Promociones</h1><p>Descuentos por categoría o por producto. Se aplican solos en la web mientras estén vigentes.</p></div>
      <button class="b b-primary" id="nueva">+ Nueva promo</button></div>
      <div class="list">${!DB.promos.length ? '<div class="empty">Todavía no hay promociones.</div>' : DB.promos.map(pr => {
        const [st, cls] = estadoPromo(pr);
        const alcance = pr.categoria_id ? `Toda la categoría ${catNombre(pr.categoria_id)}` : `${(pr.producto_ids || []).length} producto(s)`;
        const val = pr.tipo === 'porcentaje' ? `${Number(pr.valor)}% OFF` : `Precio final ${money(pr.valor)}`;
        const fechas = [pr.desde && 'desde ' + pr.desde.split('-').reverse().join('/'), pr.hasta && 'hasta ' + pr.hasta.split('-').reverse().join('/')].filter(Boolean).join(' ');
        return `<div class="pcard"><div><h3>${esc(pr.titulo)} <span class="tag ${cls}">${st}</span>${pr.banner ? '<span class="tag">franja</span>' : ''}</h3>
          <p>${esc(val)} · ${esc(alcance)}${fechas ? ' · ' + fechas : ''}</p></div>
          <div style="display:flex;gap:6px"><button class="b b-ghost b-sm" data-ed="${pr.id}">Editar</button></div></div>`;
      }).join('')}</div>`;
    $('#nueva').onclick = () => modalPromo(null);
    $$('[data-ed]').forEach(b => b.onclick = () => modalPromo(DB.promos.find(x => x.id === b.dataset.ed)));
  }
  function modalPromo(orig) {
    const pr = orig ? JSON.parse(JSON.stringify(orig)) : { titulo: '', tipo: 'porcentaje', valor: 10, categoria_id: DB.categorias[0]?.id || null, producto_ids: [], desde: ArbaAPI.hoyLocal(), hasta: '', activa: true, banner: false };
    let alcance = pr.categoria_id ? 'cat' : 'prod';
    const bg = document.createElement('div'); bg.className = 'modal-bg';
    bg.innerHTML = `<div class="modal"><h2>${orig ? 'Editar promo' : 'Nueva promo'}</h2>
      <label class="f">Nombre de la promo (se ve en la web)<input id="m_tit" value="${esc(pr.titulo)}" placeholder="Ej: Semana del sillón"></label>
      <div class="g2">
        <label class="f">Tipo<select id="m_tipo"><option value="porcentaje">Porcentaje de descuento</option><option value="precio">Precio final fijo</option></select></label>
        <label class="f"><span id="m_vlbl">Descuento (%)</span><input id="m_val" type="number" min="0" value="${fmtNum(pr.valor)}"></label>
      </div>
      <div class="f">Se aplica a</div>
      <div class="radio"><label><input type="radio" name="alc" value="cat"${alcance === 'cat' ? ' checked' : ''}> Toda una categoría</label><label><input type="radio" name="alc" value="prod"${alcance === 'prod' ? ' checked' : ''}> Productos puntuales</label></div>
      <label class="f" id="m_catw">Categoría<select id="m_cat">${DB.categorias.map(c => `<option value="${c.id}"${pr.categoria_id === c.id ? ' selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select></label>
      <div id="m_prodw" class="f"><input class="inp" id="m_ps" placeholder="Buscar producto…" style="margin-bottom:6px"><div class="pick" id="m_pick"></div></div>
      <div class="g2">
        <label class="f">Desde (opcional)<input id="m_desde" type="date" value="${esc(pr.desde || '')}"></label>
        <label class="f">Hasta (opcional)<input id="m_hasta" type="date" value="${esc(pr.hasta || '')}"></label>
      </div>
      <div class="stack" style="margin:6px 0 16px">
        <label class="sw"><input type="checkbox" id="m_act"${pr.activa ? ' checked' : ''}><i></i>Promo activa</label>
        <label class="sw"><input type="checkbox" id="m_ban"${pr.banner ? ' checked' : ''}><i></i>Mostrar franja arriba de la web</label>
      </div>
      <div class="acts">${orig ? '<button class="b b-danger" id="m_del" style="margin-right:auto">Eliminar</button>' : ''}<button class="b b-ghost" id="m_cancel">Cancelar</button><button class="b b-primary" id="m_save">Guardar promo</button></div></div>`;
    document.body.appendChild(bg);
    const m = (s) => bg.querySelector(s);
    m('#m_tipo').value = pr.tipo;
    const sel = new Set(pr.producto_ids || []);
    const pick = (q = '') => {
      const qq = q.trim() ? ArbaAPI.slugify(q).replace(/-/g, ' ') : '';
      m('#m_pick').innerHTML = DB.productos.filter(p => !qq || ArbaAPI.slugify(p.nombre).replace(/-/g, ' ').includes(qq))
        .map(p => `<label><input type="checkbox" value="${p.id}"${sel.has(p.id) ? ' checked' : ''}> ${esc(p.nombre)} <span class="muted">${p.precio != null ? money(p.precio) : ''}</span></label>`).join('') || '<p class="muted">Sin resultados</p>';
      m('#m_pick').querySelectorAll('input').forEach(i => i.onchange = () => i.checked ? sel.add(i.value) : sel.delete(i.value));
    };
    const upd = () => {
      alcance = bg.querySelector('[name=alc]:checked').value;
      m('#m_catw').hidden = alcance !== 'cat'; m('#m_prodw').hidden = alcance !== 'prod';
      m('#m_vlbl').textContent = m('#m_tipo').value === 'porcentaje' ? 'Descuento (%)' : 'Precio final ($)';
    };
    bg.querySelectorAll('[name=alc]').forEach(r => r.onchange = upd); m('#m_tipo').onchange = upd;
    m('#m_ps').oninput = e => pick(e.target.value);
    pick(); upd();
    const close = () => bg.remove();
    m('#m_cancel').onclick = close; bg.addEventListener('click', e => { if (e.target === bg) close(); });
    m('#m_save').onclick = async (e) => {
      pr.titulo = m('#m_tit').value.trim(); pr.tipo = m('#m_tipo').value; pr.valor = numOrNull(m('#m_val').value);
      pr.categoria_id = alcance === 'cat' ? m('#m_cat').value : null; pr.producto_ids = alcance === 'prod' ? Array.from(sel) : [];
      pr.desde = m('#m_desde').value || null; pr.hasta = m('#m_hasta').value || null; pr.activa = m('#m_act').checked; pr.banner = m('#m_ban').checked;
      if (!pr.titulo) return toast('Ponele un nombre a la promo', true);
      if (pr.valor == null || pr.valor <= 0) return toast('Cargá el valor de la promo', true);
      if (pr.tipo === 'porcentaje' && pr.valor >= 100) return toast('El porcentaje tiene que ser menor a 100', true);
      if (alcance === 'prod' && !pr.producto_ids.length) return toast('Elegí al menos un producto', true);
      if (pr.desde && pr.hasta && pr.hasta < pr.desde) return toast('La fecha "hasta" es anterior a "desde"', true);
      const saved = await run(e.target, () => API.savePromo(pr), 'Promo guardada');
      const i = DB.promos.findIndex(x => x.id === saved.id); if (i >= 0) DB.promos[i] = saved; else DB.promos.unshift(saved);
      close(); vPromos();
    };
    if (m('#m_del')) m('#m_del').onclick = async (e) => {
      if (!confirm('¿Eliminar esta promo?')) return;
      await run(e.target, () => API.deletePromo(pr.id), 'Promo eliminada');
      DB.promos = DB.promos.filter(x => x.id !== pr.id); close(); vPromos();
    };
  }

  // ═════════════════ CATEGORÍAS ═════════════════
  function vCategorias() {
    const cats = DB.categorias.slice().sort((a, b) => a.orden - b.orden);
    view.innerHTML = `<div class="head"><div><h1>Categorías</h1><p>Los rubros que se ven en el inicio y en el catálogo.</p></div>
      <button class="b b-primary" id="nueva">+ Nueva categoría</button></div>
      <div class="list">${cats.map(c => `<div class="pcard"><div style="display:flex;gap:14px;align-items:center">
          <div style="width:56px;color:var(--noche)">${U.ICONOS[c.icono] || U.ICONOS.generico}</div>
          <div><h3>${esc(c.nombre)}${c.activo ? '' : ' <span class="tag">oculta</span>'}</h3><p>${DB.productos.filter(p => p.categoria_id === c.id).length} productos · /${esc(c.slug)}</p></div></div>
        <button class="b b-ghost b-sm" data-ed="${c.id}">Editar</button></div>`).join('') || '<div class="empty">Sin categorías</div>'}</div>`;
    $('#nueva').onclick = () => modalCat(null);
    $$('[data-ed]').forEach(b => b.onclick = () => modalCat(DB.categorias.find(x => x.id === b.dataset.ed)));
  }
  function modalCat(orig) {
    const c = orig ? { ...orig } : { nombre: '', slug: '', descripcion: '', icono: 'generico', orden: DB.categorias.length + 1, activo: true };
    const bg = document.createElement('div'); bg.className = 'modal-bg';
    bg.innerHTML = `<div class="modal"><h2>${orig ? 'Editar categoría' : 'Nueva categoría'}</h2>
      <label class="f">Nombre<input id="c_nom" value="${esc(c.nombre)}" placeholder="Ej: Sillones"></label>
      <label class="f">Descripción corta<textarea id="c_desc" style="min-height:70px">${esc(c.descripcion)}</textarea></label>
      <div class="f">Ícono</div>
      <div class="icons" id="c_ico">${Object.keys(U.ICONOS).map(k => `<button type="button" data-k="${k}" class="${c.icono === k ? 'on' : ''}" title="${k}">${U.ICONOS[k]}</button>`).join('')}</div>
      <div class="g2" style="margin-top:14px">
        <label class="f">Orden<input id="c_ord" type="number" value="${c.orden || 0}"></label>
        <div class="f" style="align-content:end"><label class="sw"><input type="checkbox" id="c_act"${c.activo !== false ? ' checked' : ''}><i></i>Visible en la web</label></div>
      </div>
      <div class="acts">${orig ? '<button class="b b-danger" id="c_del" style="margin-right:auto">Eliminar</button>' : ''}<button class="b b-ghost" id="c_cancel">Cancelar</button><button class="b b-primary" id="c_save">Guardar</button></div></div>`;
    document.body.appendChild(bg);
    const m = (s) => bg.querySelector(s);
    m('#c_ico').querySelectorAll('button').forEach(b => b.onclick = () => { c.icono = b.dataset.k; m('#c_ico').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); });
    const close = () => bg.remove();
    m('#c_cancel').onclick = close; bg.addEventListener('click', e => { if (e.target === bg) close(); });
    m('#c_save').onclick = async (e) => {
      c.nombre = m('#c_nom').value.trim(); if (!c.nombre) return toast('Falta el nombre', true);
      c.descripcion = m('#c_desc').value.trim(); c.orden = parseInt(m('#c_ord').value) || 0; c.activo = m('#c_act').checked;
      if (!orig) { let s = ArbaAPI.slugify(c.nombre), base = s, i = 2; while (DB.categorias.some(x => x.slug === s)) s = base + '-' + i++; c.slug = s; }
      const saved = await run(e.target, () => API.saveCategoria(c), 'Categoría guardada');
      const i = DB.categorias.findIndex(x => x.id === saved.id); if (i >= 0) DB.categorias[i] = saved; else DB.categorias.push(saved);
      close(); vCategorias();
    };
    if (m('#c_del')) m('#c_del').onclick = async (e) => {
      const n = DB.productos.filter(p => p.categoria_id === c.id).length;
      if (!confirm(n ? `Esta categoría tiene ${n} productos: van a quedar "sin categoría" (no se borran). ¿Eliminar igual?` : '¿Eliminar esta categoría?')) return;
      await run(e.target, () => API.deleteCategoria(c.id), 'Categoría eliminada');
      await recargar(); close(); vCategorias();
    };
  }

  // ═════════════════ CONFIGURACIÓN ═════════════════
  function vConfig() {
    const s = SITE;
    view.innerHTML = `<div class="head"><div><h1>Configuración</h1><p>Datos del negocio que aparecen en toda la web.</p></div></div>
      <div style="max-width:760px">
      <section class="card"><h2>Contacto</h2><p class="hint">Todos los botones de la web abren este WhatsApp.</p>
        <div class="g2">
          <label class="f">WhatsApp (con 549, sin espacios)<input id="k_wa" value="${esc(s.whatsapp)}" inputmode="numeric" placeholder="5493511234567"></label>
          <label class="f">Cómo se muestra<input id="k_wav" value="${esc(s.whatsappVisible)}" placeholder="+54 9 351 123-4567"></label>
        </div>
        <label class="f">Dirección del local<input id="k_dir" value="${esc(s.direccion)}" placeholder="Lima 55, Centro, Córdoba"></label>
        <label class="f">Horarios (uno por línea)<textarea id="k_hor" style="min-height:80px">${esc((s.horarios || []).join('\n'))}</textarea></label>
        <div class="g2">
          <label class="f">Instagram (link)<input id="k_ig" value="${esc(s.instagram)}" placeholder="https://instagram.com/…"></label>
          <label class="f">Facebook (link)<input id="k_fb" value="${esc(s.facebook)}" placeholder="https://facebook.com/…"></label>
        </div></section>
      <section class="card"><h2>Ficha de producto</h2><p class="hint">Textos que aparecen en cada producto. Si los dejás vacíos, no se muestran.</p>
        <div class="g2">
          <label class="f">Nombre del precio principal<input id="k_ep" value="${esc(s.etiquetaPrecio)}" placeholder="Efectivo / transferencia"></label>
          <label class="f">Nombre del precio con tarjeta<input id="k_epl" value="${esc(s.etiquetaPrecioLista)}" placeholder="Con tarjeta"></label>
        </div>
        <label class="f">Formas de pago<textarea id="k_pag" style="min-height:80px">${esc(s.pagosTexto)}</textarea></label>
      </section>
      <section class="card"><h2>Planes de cuotas</h2><p class="hint">Se muestran en cada tarjeta ("12× $40.000 sin interés"), en la ficha y en el carrito. El primero es el que se destaca.</p>
        <div id="planes"></div>
        <button type="button" class="b b-ghost b-sm" id="addPlan" style="margin-top:10px">+ Agregar plan</button>
      </section>
      <section class="card"><h2>Barra animada de arriba</h2><p class="hint">Un mensaje por línea. Se ve cuando el catálogo está activo. Si hay una promo con franja, se suma sola.</p>
        <label class="f"><textarea id="k_bar" style="min-height:110px">${esc((s.mensajesBarra || []).join('\n'))}</textarea></label>
      </section>
      <section class="card"><h2>Entrega</h2>
        <label class="f">Entrega y retiro<textarea id="k_ent" style="min-height:80px" placeholder="Ej: Retirás en el local o coordinamos la entrega. Consultanos el costo según tu zona.">${esc(s.entregaTexto)}</textarea></label>
      </section>
      <section class="card"><h2>Web y publicidad</h2>
        <label class="f">ID del Pixel de Meta<input id="k_px" value="${esc(s.metaPixelId)}" placeholder="123456789012345" inputmode="numeric"></label>
        <label class="sw"><input type="checkbox" id="k_cat"${s.catalogoActivo ? ' checked' : ''}><i></i>Mostrar el catálogo en la web <span class="muted">(apagado = solo landing con WhatsApp)</span></label>
      </section>
      </div>
      <div class="savebar"><span class="sp"></span><span class="dirty" id="dirtyTxt"></span><button class="b b-primary" id="saveCfg">Guardar configuración</button></div>`;
    const marcarCfg = () => { dirty = true; $('#dirtyTxt').textContent = 'Cambios sin guardar'; };
    view.querySelectorAll('input,textarea').forEach(el => el.addEventListener('input', marcarCfg));
    const planes = (s.planes || []).map(x => ({ nombre: x.nombre || '', cuotas: Number(x.cuotas) || 0, sinInteres: x.sinInteres !== false, base: x.base || 'lista' }));
    function rPlanes() {
      $('#planes').innerHTML = !planes.length ? '<p class="muted">Sin planes: no se muestran cuotas en la web.</p>' : planes.map((x, i) => `<div class="prow" data-i="${i}">
        <label class="f">Tarjeta / plan<input data-f="nombre" value="${esc(x.nombre)}" placeholder="Naranja"></label>
        <label class="f">Cuotas<input data-f="cuotas" type="number" min="2" max="36" value="${x.cuotas || ''}"></label>
        <label class="f">Se calcula sobre<select data-f="base"><option value="lista"${x.base === 'lista' ? ' selected' : ''}>Precio con tarjeta</option><option value="precio"${x.base === 'precio' ? ' selected' : ''}>Precio principal</option></select></label>
        <label class="sw" style="align-self:end;margin-bottom:24px"><input type="checkbox" data-f="sinInteres"${x.sinInteres ? ' checked' : ''}><i></i>Sin interés</label>
        <button type="button" class="b b-icon" data-rm style="align-self:end;margin-bottom:20px">✕</button></div>`).join('');
      $$('#planes .prow').forEach(r => {
        const x = planes[+r.dataset.i];
        r.querySelectorAll('[data-f]').forEach(inp => inp.addEventListener('input', () => {
          const f = inp.dataset.f; x[f] = f === 'sinInteres' ? inp.checked : f === 'cuotas' ? parseInt(inp.value) || 0 : inp.value; marcarCfg();
        }));
        r.querySelector('[data-rm]').onclick = () => { planes.splice(+r.dataset.i, 1); rPlanes(); marcarCfg(); };
      });
    }
    $('#addPlan').onclick = () => { planes.push({ nombre: '', cuotas: 6, sinInteres: true, base: 'lista' }); rPlanes(); marcarCfg(); };
    rPlanes();
    $('#saveCfg').onclick = async (e) => {
      const wa = $('#k_wa').value.replace(/\D/g, '');
      if (wa.length < 10) return toast('Revisá el número de WhatsApp', true);
      const obj = {
        whatsapp: wa, whatsappVisible: $('#k_wav').value.trim(), direccion: $('#k_dir').value.trim(),
        horarios: $('#k_hor').value.split('\n').map(x => x.trim()).filter(Boolean),
        instagram: $('#k_ig').value.trim(), facebook: $('#k_fb').value.trim(),
        etiquetaPrecio: $('#k_ep').value.trim(), etiquetaPrecioLista: $('#k_epl').value.trim(),
        planes: planes.filter(x => x.cuotas > 1).map(x => ({ nombre: x.nombre.trim(), cuotas: x.cuotas, sinInteres: x.sinInteres, base: x.base })),
        mensajesBarra: $('#k_bar').value.split('\n').map(x => x.trim()).filter(Boolean),
        pagosTexto: $('#k_pag').value.trim(), entregaTexto: $('#k_ent').value.trim(),
        metaPixelId: $('#k_px').value.replace(/\D/g, ''), catalogoActivo: $('#k_cat').checked,
      };
      await run(e.target, () => API.saveConfig(obj), 'Configuración guardada');
      SITE = { ...SITE, ...obj }; dirty = false; $('#dirtyTxt').textContent = '';
    };
  }

  start();
})();
