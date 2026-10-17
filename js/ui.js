// ═══════════════════════════════════════════════════════════════
//  arba HOGAR — Componentes compartidos del sitio público
// ═══════════════════════════════════════════════════════════════
(function () {
  const LOGO = `<svg role="img" aria-label="arba HOGAR" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 847 419" fill="currentColor"><path fill-rule="evenodd" d="M422.0,415.1C411.7,411.9 406.0,404.9 405.8,395.0C405.6,388.2 407.6,383.5 412.5,379.2C421.4,371.4 435.3,370.8 443.3,378.0C446.3,380.7 446.4,381.0 444.8,382.6C443.1,384.3 442.9,384.3 440.1,382.2C430.9,375.4 417.3,378.2 413.4,387.6C409.2,397.6 415.1,408.4 425.9,410.4C433.7,411.8 443.0,406.2 443.0,400.1L443.0,397.0L436.1,397.0C431.3,397.0 429.1,396.6 428.7,395.7C427.5,392.6 429.6,391.9 439.1,392.2L448.5,392.5L448.5,399.2C448.5,405.5 448.3,406.1 445.1,409.4C439.7,414.9 429.7,417.4 422.0,415.1ZM245.2,414.1C244.5,413.7 244.0,409.8 243.8,404.0L243.5,394.5L231.3,394.2L219.1,393.9L218.8,403.7C218.5,413.4 218.5,413.5 216.0,413.5L213.5,413.5L213.2,393.4C213.0,376.1 213.2,373.1 214.5,372.6C218.1,371.3 219.0,372.9 219.0,381.1L219.0,389.0L231.5,389.0L244.0,389.0L244.0,381.0C244.0,374.7 244.3,372.8 245.5,372.4C246.3,372.0 247.7,372.3 248.5,373.0C249.7,374.0 250.0,377.7 250.0,393.6C250.0,411.2 249.8,413.0 248.2,413.9C247.2,414.4 245.9,414.5 245.2,414.1ZM317.5,413.1C297.5,404.1 303.5,375.3 325.7,373.3C333.9,372.6 339.7,374.4 344.6,379.4C352.6,387.3 353.1,399.3 345.7,407.7C341.3,412.7 335.9,415.0 328.0,415.0C323.8,415.0 320.1,414.3 317.5,413.1ZM504.2,414.1C502.7,413.2 504.3,409.0 515.4,385.7C521.1,373.9 523.0,371.6 525.5,374.1C526.7,375.4 544.0,411.9 544.0,413.2C544.0,414.2 541.1,415.0 539.6,414.4C538.9,414.1 537.3,411.7 536.0,408.9L533.7,404.0L523.5,404.0L513.3,404.0L511.4,408.1C508.6,414.4 506.9,415.8 504.2,414.1ZM599.2,414.2C598.3,413.5 598.0,408.6 598.2,392.9L598.5,372.5L608.3,372.2C619.4,371.9 625.2,373.1 628.5,376.5C633.8,381.7 632.1,391.3 625.4,394.5C621.4,396.4 621.1,395.7 629.7,405.4C635.3,411.7 636.0,413.4 633.4,414.4C631.1,415.3 630.2,414.5 622.1,405.2L614.8,397.0L609.4,397.0L604.0,397.0L604.0,404.8C604.0,413.7 602.6,416.3 599.2,414.2ZM333.0,409.0C347.7,404.9 347.5,382.9 332.8,378.9C322.2,376.1 312.0,383.5 312.0,394.0C312.0,405.3 321.7,412.2 333.0,409.0ZM527.5,391.0C525.7,387.1 523.8,383.9 523.4,383.9C522.9,383.8 521.1,387.0 519.3,390.9L516.1,398.0L523.5,398.0L530.9,398.0L527.5,391.0ZM623.0,389.2C625.7,387.0 625.9,382.7 623.5,380.0C622.0,378.3 620.4,378.0 612.8,378.0L604.0,378.0L604.0,384.5L604.0,391.0L612.4,391.0C619.0,391.0 621.3,390.6 623.0,389.2ZM84.7,309.9C57.5,306.9 32.4,292.3 18.1,271.2C-3.3,239.5 0.1,196.3 26.7,163.1C41.0,145.1 59.0,133.8 81.5,128.4C90.0,126.4 112.5,126.1 121.9,127.9C141.3,131.7 157.1,140.0 170.5,153.5C180.1,163.1 184.1,169.0 189.7,182.0C195.4,195.2 197.0,205.3 197.0,229.0C197.1,265.0 198.9,273.2 208.0,277.8C213.4,280.5 217.2,280.6 222.7,278.1C230.5,274.5 230.4,275.0 231.1,228.5C231.7,182.8 231.9,181.9 238.9,167.5C241.1,163.1 245.1,156.8 247.7,153.5C256.5,142.7 272.4,132.9 288.6,128.4C296.5,126.2 335.5,125.1 340.0,127.0C345.2,129.2 347.5,133.5 347.4,141.1C347.4,149.1 344.9,153.4 339.2,155.0C337.2,155.5 328.5,156.0 319.9,156.0C303.4,156.0 297.9,157.0 289.0,161.5C279.5,166.4 271.4,175.7 267.4,186.5C265.7,191.1 265.5,196.1 265.0,244.5C264.7,282.1 264.2,298.1 263.3,299.5C259.6,306.0 250.9,310.0 243.5,308.6C239.7,307.8 232.9,302.3 231.8,299.0C231.5,297.9 230.3,298.4 227.0,301.2C221.0,306.4 214.4,308.5 204.0,308.4C193.3,308.3 185.8,305.6 180.0,299.8C175.4,295.2 171.6,288.5 170.5,283.0C169.0,275.4 169.3,275.4 162.3,283.0C154.5,291.4 145.7,297.9 136.4,302.1C121.8,308.7 101.5,311.8 84.7,309.9ZM501.0,310.4C476.4,307.8 458.4,301.0 441.2,288.0C422.6,273.9 410.5,254.4 405.6,230.8C404.3,224.7 404.0,216.3 404.0,190.0L404.0,157.0L386.9,157.0L369.8,157.0L366.3,153.5C362.8,150.0 362.8,149.9 363.2,142.4C363.5,135.7 363.9,134.5 366.2,132.5C368.6,130.4 370.0,130.3 388.6,129.7C399.6,129.3 432.8,128.7 462.5,128.4C521.4,127.7 525.3,127.9 542.6,133.5C566.0,140.9 588.4,161.6 600.0,186.3C605.9,198.8 607.3,205.6 607.4,220.0C607.4,234.5 605.8,242.1 600.0,254.7C593.5,268.6 585.8,278.7 574.3,288.0C557.1,301.9 537.8,309.1 514.0,310.3C508.8,310.5 502.9,310.6 501.0,310.4ZM696.8,308.1C661.5,300.4 633.9,273.0 627.4,239.2C619.6,198.5 642.0,155.2 680.6,136.4C708.6,122.7 743.8,122.9 771.5,136.8C798.3,150.2 815.2,173.4 820.5,203.9C821.6,209.9 822.0,220.1 822.0,239.9C822.0,255.2 822.5,269.1 823.0,271.1C824.5,276.4 827.2,278.3 834.3,279.1C842.6,280.1 844.0,281.9 844.0,291.2C844.0,303.9 839.0,308.0 823.7,308.0C814.2,308.0 807.7,305.6 802.1,299.9C797.8,295.5 793.4,286.3 792.5,279.8L791.8,274.7L788.2,279.1C777.2,292.5 762.6,301.9 744.5,307.2C734.1,310.2 708.7,310.7 696.8,308.1ZM108.4,281.0C129.7,277.9 147.3,265.6 156.9,247.1C162.0,237.3 164.2,228.6 164.3,218.0C164.7,183.8 137.3,157.0 102.1,157.0C84.1,157.0 69.5,163.3 56.5,176.4C47.0,186.0 42.0,194.7 39.0,207.1C35.4,222.2 37.2,237.0 44.2,250.3C50.6,262.3 64.9,274.0 78.8,278.5C89.3,281.9 97.4,282.5 108.4,281.0ZM531.4,278.5C546.7,273.1 560.3,261.7 567.4,248.0C576.6,230.6 576.0,214.1 565.7,193.0C556.4,173.9 541.3,161.5 522.5,157.5C517.0,156.4 507.1,156.0 477.2,156.0L438.9,156.0L439.2,190.8L439.5,225.5L442.3,233.5C447.5,248.2 455.5,259.5 466.7,268.0C480.7,278.6 492.3,282.2 511.0,281.6C521.4,281.3 524.8,280.8 531.4,278.5ZM738.8,279.4C767.2,272.1 787.0,246.8 787.0,218.0C787.0,200.5 781.4,187.1 769.1,174.9C755.8,161.8 741.1,156.3 721.6,157.2C697.6,158.4 677.8,171.6 666.9,193.5C658.0,211.5 657.8,231.2 666.5,248.5C679.1,274.0 709.5,286.9 738.8,279.4ZM418.2,119.1C411.2,116.7 406.1,112.4 403.0,106.4L400.5,101.6L400.2,61.5C400.0,39.5 400.2,20.0 400.5,18.2C400.8,16.4 402.5,13.3 404.3,11.3C414.0,0.2 430.4,2.2 437.1,15.2C438.9,18.8 439.0,21.4 438.8,69.7L438.5,120.5L431.0,120.7C425.8,120.9 421.9,120.4 418.2,119.1Z"/></svg>`;

  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.24-3.27-.68-2.77-1.09-4.51-3.93-4.65-4.11-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.99.95-2.26.24-.27.53-.34.71-.34l.51.01c.16.01.38-.06.6.46.24.55.79 1.9.86 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.28-.12.56.16.27.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.23.6-.14.25.09 1.57.74 1.84.88.27.14.45.2.52.32.07.11.07.66-.17 1.34z"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.5v13l11-6.5z"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="i-list" viewBox="0 0 24 24"><path d="M8 7h11M8 12h11M8 17h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="4.5" cy="7" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="17" r="1" fill="currentColor"/></symbol>
  <symbol id="i-chev-l" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-chev-r" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-bag" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="17.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
  <symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18M7 15h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
  <symbol id="i-store" viewBox="0 0 24 24"><path d="M4 10v10h16V10M3 10l2-5h14l2 5c0 1.7-1.3 3-3 3s-3-1.3-3-3c0 1.7-1.3 3-3 3s-3-1.3-3-3c0 1.7-1.3 3-3 3s-3-1.3-3-3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 20v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
  <symbol id="i-cash" viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="19" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
</svg>`;

  const A = (p) => `<svg viewBox="0 0 120 84" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ICONOS = {
    sillones: A('<path d="M18 52V38a8 8 0 0 1 8-8h68a8 8 0 0 1 8 8v14"/><path d="M12 50a6 6 0 0 1 12 0v10h72V50a6 6 0 0 1 12 0v16H12z"/><path d="M60 30v30"/><path d="M20 66v6M100 66v6"/>'),
    comedor: A('<path d="M30 40h60M38 40v34M82 40v34"/><path d="M12 22v52M12 48h16v26M28 48V74"/><path d="M108 22v52M108 48H92v26"/>'),
    roperos: A('<rect x="32" y="8" width="56" height="68" rx="3"/><path d="M60 8v68M55 38v8M65 38v8M36 80h4M80 80h4"/>'),
    melamina: A('<rect x="14" y="12" width="40" height="22" rx="2"/><rect x="66" y="12" width="40" height="22" rx="2"/><rect x="14" y="44" width="92" height="32" rx="2"/><path d="M60 44v32M14 60h46M30 52h12M30 68h12M80 58v6"/>'),
    sommiers: A('<path d="M10 40c0-4 3-6 7-6h86c4 0 7 2 7 6v8H10z"/><rect x="10" y="48" width="100" height="18" rx="3"/><path d="M18 66v8M102 66v8M24 34c4-6 18-6 22 0"/>'),
    respaldos: A('<path d="M16 76V36a44 26 0 0 1 88 0v40"/><path d="M16 76h88"/><circle cx="40" cy="42" r="1.4" fill="currentColor"/><circle cx="60" cy="38" r="1.4" fill="currentColor"/><circle cx="80" cy="42" r="1.4" fill="currentColor"/><circle cx="50" cy="56" r="1.4" fill="currentColor"/><circle cx="70" cy="56" r="1.4" fill="currentColor"/>'),
    mesas: A('<ellipse cx="60" cy="34" rx="42" ry="10"/><path d="M60 44v30M44 76h32"/>'),
    deco: A('<path d="M48 76h24l4-30H44z"/><path d="M60 46c0-14-10-22-18-26M60 46c0-16 8-26 18-30M60 46V18"/>'),
    generico: A('<rect x="22" y="22" width="76" height="46" rx="4"/><path d="M22 40h76M50 68v8M70 68v8"/>'),
  };

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => n == null ? '' : '$' + Math.round(n).toLocaleString('es-AR');
  const r100 = (x) => Math.round(x / 100) * 100;

  let SITE = window.ARBA_CFG.sitio;

  // ═════════════ PRECIOS ═════════════
  function promoDe(p, promos) {
    return (promos || []).find(pr => (pr.producto_ids || []).includes(p.id)) ||
           (promos || []).find(pr => pr.categoria_id && pr.categoria_id === p.categoria_id) || null;
  }
  function precioDe(p, v, promos) {
    let precio = v && v.precio != null ? v.precio : p.precio;
    let lista = v && v.precio_lista != null ? v.precio_lista
      : (p.precio_lista != null && p.precio ? (precio === p.precio ? p.precio_lista : r100(p.precio_lista * (precio / p.precio))) : null);
    const promo = promoDe(p, promos);
    let anterior = null;
    if (promo && precio != null) {
      anterior = precio;
      if (promo.tipo === 'porcentaje') { const f = 1 - Number(promo.valor) / 100; precio = r100(precio * f); if (lista != null) lista = r100(lista * f); }
      else { const ratio = Number(promo.valor) / precio; precio = Number(promo.valor); if (lista != null) lista = r100(lista * ratio); }
    }
    const ahorro = lista && precio && lista > precio ? Math.round((1 - precio / lista) * 100) : 0;
    return { precio, lista, anterior, promo, ahorro, mostrar: p.mostrar_precio !== false && precio != null };
  }
  function desdePrecio(p, promos) {
    const vs = (p.variantes || []).filter(v => v.disponible !== false);
    const opciones = vs.length ? vs.map(v => precioDe(p, v, promos)) : [precioDe(p, null, promos)];
    const validas = opciones.filter(o => o.precio != null);
    if (!validas.length) return opciones[0];
    const min = validas.reduce((a, b) => (b.precio < a.precio ? b : a));
    min.varios = new Set(validas.map(o => o.precio)).size > 1;
    return min;
  }
  // Cuotas según los planes configurados. Devuelve [{nombre, cuotas, monto, sinInteres}]
  function cuotas(pr) {
    if (!pr || !pr.mostrar) return [];
    return (SITE.planes || []).filter(pl => pl && pl.cuotas > 1).map(pl => {
      const base = pl.base === 'precio' ? pr.precio : (pr.lista ?? pr.precio);
      return { nombre: pl.nombre, cuotas: Number(pl.cuotas), sinInteres: pl.sinInteres !== false, monto: Math.ceil(base / pl.cuotas) };
    });
  }
  const cuotaTxt = (c, corto) => c ? `${c.cuotas} cuotas${c.sinInteres && !corto ? ' sin interés' : ''} de ${money(c.monto)}${c.nombre ? ' con ' + c.nombre : ''}` : '';

  // ═════════════ WHATSAPP + TRACKING ═════════════
  const waURL = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  function track(evento, datos) {
    try { if (window.fbq) fbq('track', evento, datos || {}); } catch (e) {}
    try { if (window.gtag) gtag('event', evento, datos || {}); } catch (e) {}
  }
  function bindWA(root = document) {
    root.querySelectorAll('[data-wa]:not([data-wa-ok])').forEach(a => {
      a.dataset.waOk = '1';
      a.href = waURL(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener';
      a.addEventListener('click', () => track('Contact', { content_name: a.dataset.src || 'web', content_category: a.dataset.rubro || 'general' }));
    });
  }
  function rebindWA(a, msg) { delete a.dataset.waOk; a.dataset.wa = msg; bindWA(a.parentNode || document); }
  function pixel(id) {
    if (!id || window.fbq) return;
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', id); fbq('track', 'PageView');
  }

  // ═════════════ TARJETA DE PRODUCTO ═════════════
  const vacio = (icono) => `<div class="ph-empty"><div class="art">${ICONOS[icono] || ICONOS.generico}</div></div>`;
  function card(p, cat, promos) {
    const pr = desdePrecio(p, promos);
    const img = p.imagenes[0], img2 = p.imagenes[1];
    const sw = (p.variantes || []).filter(v => v.color_hex).slice(0, 5);
    const c1 = cuotas(pr)[0];
    const badges = [];
    if (pr.promo && pr.mostrar) badges.push(`<span class="badge promo">${pr.promo.tipo === 'porcentaje' ? `-${Number(pr.promo.valor)}%` : 'Promo'}</span>`);
    if (p.etiqueta) badges.push(`<span class="badge">${esc(p.etiqueta)}</span>`);
    if (p.es_muestra) badges.push('<span class="badge muestra">Muestra</span>');
    return `<article class="card" data-slug="${esc(p.slug)}">
      <a class="ph" href="producto.html?p=${encodeURIComponent(p.slug)}" aria-label="${esc(p.nombre)}">
        ${img ? `<img src="${esc(img.url)}" alt="${esc(img.alt || p.nombre)}" loading="lazy">${img2 ? `<img class="alt" src="${esc(img2.url)}" alt="" loading="lazy">` : ''}` : vacio(cat?.icono)}
        <div class="badges">${badges.join('')}</div>
      </a>
      <button class="quick" type="button" data-quick="${esc(p.slug)}" aria-label="Agregar al carrito">+</button>
      <a class="info" href="producto.html?p=${encodeURIComponent(p.slug)}">
        ${cat ? `<div class="cat">${esc(cat.nombre)}</div>` : ''}
        <h3>${esc(p.nombre)}</h3>
        ${p.resumen ? `<div class="res">${esc(p.resumen)}</div>` : ''}
        ${pr.mostrar ? `
          <div class="pr">${pr.varios ? '<small>desde</small>' : ''}<b>${money(pr.precio)}</b>${pr.anterior ? `<s>${money(pr.anterior)}</s>` : ''}</div>
          ${pr.ahorro >= 5 ? `<div class="save">${pr.ahorro}% menos en efectivo o transferencia</div>` : ''}
          ${c1 ? `<div class="cuota">${c1.cuotas}× <b>${money(c1.monto)}</b>${c1.sinInteres ? ' sin interés' : ''}${c1.nombre ? ' · ' + esc(c1.nombre) : ''}</div>` : ''}`
        : '<div class="pr"><span class="cons">Consultá el precio</span></div>'}
        ${sw.length ? `<div class="swatches">${sw.map(v => `<i style="background:${esc(v.color_hex)}" title="${esc(v.nombre)}"></i>`).join('')}${(p.variantes || []).length > sw.length ? `<span>+${p.variantes.length - sw.length}</span>` : ''}</div>` : ''}
      </a></article>`;
  }
  // Agregado rápido desde la tarjeta (usa la primera variante disponible)
  function bindQuick(root, catalogo) {
    root.querySelectorAll('[data-quick]:not([data-q-ok])').forEach(b => {
      b.dataset.qOk = '1';
      b.addEventListener('click', (e) => {
        e.preventDefault();
        const p = catalogo.productos.find(x => x.slug === b.dataset.quick); if (!p) return;
        const vs = (p.variantes || []).filter(v => v.disponible !== false);
        if (vs.length > 1) { location.href = `producto.html?p=${encodeURIComponent(p.slug)}&elegir=1`; return; }
        const cat = catalogo.categorias.find(c => c.id === p.categoria_id);
        carrito.add(itemDe(p, vs[0] || null, catalogo.promos, cat), 1);
      });
    });
  }

  // ═════════════ CARRITO ═════════════
  const CKEY = 'arba_carrito';
  function itemDe(p, v, promos, cat) {
    const pr = precioDe(p, v, promos);
    return { key: p.id + '|' + (v?.id || ''), slug: p.slug, nombre: p.nombre, variante: v?.nombre || '',
      precio: pr.mostrar ? pr.precio : null, lista: pr.mostrar ? (pr.lista ?? pr.precio) : null,
      img: p.imagenes[0]?.url || '', icono: cat?.icono || 'generico', categoria: cat?.slug || '', qty: 1 };
  }
  const carrito = {
    get() { try { return JSON.parse(localStorage.getItem(CKEY)) || []; } catch (e) { return []; } },
    set(a) { try { localStorage.setItem(CKEY, JSON.stringify(a)); } catch (e) {} renderCarrito(); },
    add(it, qty = 1) {
      const a = carrito.get(); const ex = a.find(x => x.key === it.key);
      if (ex) ex.qty += qty; else a.push({ ...it, qty });
      carrito.set(a);
      track('AddToCart', { content_name: it.nombre, content_category: it.categoria, value: (it.precio || 0) * qty, currency: 'ARS' });
      toast(`<b>${esc(it.nombre)}</b> agregado al carrito <button type="button" data-open-cart>Ver carrito</button>`);
      pulse();
    },
    qty(key, d) { const a = carrito.get(); const it = a.find(x => x.key === key); if (!it) return; it.qty = Math.max(0, it.qty + d); carrito.set(a.filter(x => x.qty > 0)); },
    rm(key) { carrito.set(carrito.get().filter(x => x.key !== key)); },
    totales() {
      const a = carrito.get(), conPrecio = a.filter(x => x.precio != null);
      return { n: a.reduce((s, x) => s + x.qty, 0), precio: conPrecio.reduce((s, x) => s + x.precio * x.qty, 0),
        lista: conPrecio.reduce((s, x) => s + (x.lista ?? x.precio) * x.qty, 0), sinPrecio: a.some(x => x.precio == null) };
    },
  };
  function pulse() { document.querySelectorAll('.btn-cart').forEach(b => { b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); }); }
  function renderCarrito() {
    const a = carrito.get(), t = carrito.totales();
    document.querySelectorAll('[data-count]').forEach(el => { el.textContent = t.n; el.style.display = t.n ? '' : 'none'; });
    const box = document.getElementById('cItems'); if (!box) return;
    box.innerHTML = a.length ? a.map(it => `<div class="c-item">
        <a class="th" href="producto.html?p=${encodeURIComponent(it.slug)}">${it.img ? `<img src="${esc(it.img)}" alt="">` : vacio(it.icono)}</a>
        <div class="c-mid"><a href="producto.html?p=${encodeURIComponent(it.slug)}"><h4>${esc(it.nombre)}</h4></a>
          ${it.variante ? `<p>${esc(it.variante)}</p>` : ''}
          <div class="qty"><button type="button" data-q="-1" data-k="${esc(it.key)}" aria-label="Menos">−</button><span>${it.qty}</span><button type="button" data-q="1" data-k="${esc(it.key)}" aria-label="Más">+</button></div></div>
        <div class="c-right"><b>${it.precio != null ? money(it.precio * it.qty) : 'A consultar'}</b><button class="rm" type="button" data-rm="${esc(it.key)}">Quitar</button></div></div>`).join('')
      : `<div class="c-empty"><div class="art">${ICONOS.sillones}</div><p>Tu carrito está vacío</p><a class="btn btn-line" href="catalogo.html">Ver catálogo</a></div>`;
    box.querySelectorAll('[data-q]').forEach(b => b.onclick = () => carrito.qty(b.dataset.k, +b.dataset.q));
    box.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => carrito.rm(b.dataset.rm));
    const foot = document.getElementById('cFoot');
    foot.hidden = !a.length;
    if (!a.length) return;
    const c1 = cuotas({ mostrar: true, precio: t.precio, lista: t.lista })[0];
    document.getElementById('cTot').innerHTML = `
      <div class="row"><span>${esc(SITE.etiquetaPrecio || 'Efectivo / transferencia')}</span><b class="big">${money(t.precio)}</b></div>
      ${t.lista > t.precio ? `<div class="row sub"><span>${esc(SITE.etiquetaPrecioLista || 'Con tarjeta')}</span><span>${money(t.lista)}</span></div>` : ''}
      ${c1 ? `<div class="row sub hl"><span>${c1.cuotas} cuotas${c1.sinInteres ? ' sin interés' : ''}${c1.nombre ? ' · ' + esc(c1.nombre) : ''}</span><span>${money(c1.monto)}/mes</span></div>` : ''}
      ${t.sinPrecio ? '<div class="row sub"><span>Hay productos con precio a consultar</span></div>' : ''}`;
    const pagos = [SITE.etiquetaPrecio || 'Efectivo / transferencia', ...(SITE.planes || []).map(pl => `${pl.cuotas} cuotas${pl.nombre ? ' con ' + pl.nombre : ''}`), 'Otra tarjeta'];
    const sel = document.getElementById('cPago');
    if (sel && sel.options.length !== pagos.length) sel.innerHTML = pagos.map(x => `<option>${esc(x)}</option>`).join('');
  }
  function mensajePedido(f) {
    const a = carrito.get(), t = carrito.totales();
    const lineas = a.map(it => `• ${it.qty} × ${it.nombre}${it.variante ? ' (' + it.variante + ')' : ''} — ${it.precio != null ? money(it.precio * it.qty) : 'a consultar'}`);
    return [`Hola! Quiero hacer este pedido desde la web de arba HOGAR:`, '', ...lineas, '',
      `Total ${SITE.etiquetaPrecio || 'efectivo / transferencia'}: ${money(t.precio)}`,
      t.lista > t.precio ? `${SITE.etiquetaPrecioLista || 'Con tarjeta'}: ${money(t.lista)}` : null, '',
      `Nombre: ${f.nombre}`, `Entrega: ${f.entrega}`, `Pago: ${f.pago}`, f.nota ? `Nota: ${f.nota}` : null
    ].filter(x => x !== null).join('\n');
  }
  function toggleCart(open) {
    document.getElementById('cOverlay').classList.toggle('open', open);
    document.getElementById('cDrawer').classList.toggle('open', open);
    document.body.classList.toggle('lock', open);
    if (open) { const t = carrito.totales(); if (t.n) track('ViewCart', { value: t.precio, currency: 'ARS' }); }
  }
  function toast(html) {
    let t = document.querySelector('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.innerHTML = html; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 3200);
    t.querySelector('[data-open-cart]')?.addEventListener('click', () => { t.classList.remove('show'); toggleCart(true); });
  }

  // ═════════════ CUENTA REGRESIVA ═════════════
  function finDe(promo) { if (!promo?.hasta) return null; const [y, m, d] = promo.hasta.split('-').map(Number); return new Date(y, m - 1, d, 23, 59, 59); }
  function countdown(el, fin) {
    if (!el || !fin) return;
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      let s = Math.max(0, Math.floor((fin - new Date()) / 1000));
      const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60;
      el.innerHTML = [[d, 'días'], [h, 'hs'], [m, 'min'], [s, 'seg']].map(([v, l]) => `<span class="cd"><b>${pad(v)}</b><small>${l}</small></span>`).join('');
    };
    tick(); clearInterval(el._t); el._t = setInterval(tick, 1000);
  }

  // ═════════════ HEADER / FOOTER ═════════════
  function shell(site, { activo = '', catalogo = true, promoBanner = null } = {}) {
    document.body.insertAdjacentHTML('afterbegin', SPRITE);
    const msgs = catalogo ? (site.mensajesBarra || []).filter(Boolean) : [];
    if (promoBanner) msgs.unshift(`${promoBanner.titulo}${promoBanner.tipo === 'porcentaje' ? ' · ' + Number(promoBanner.valor) + '% OFF' : ''}`);
    const tickerItems = msgs.map(m => `<span>${esc(m)}</span><i>✦</i>`).join('');
    const h = document.getElementById('hdr');
    if (h) h.outerHTML = `${msgs.length ? `<div class="ticker" aria-label="Novedades"><div class="ticker-track">${tickerItems}${tickerItems}${tickerItems}${tickerItems}</div></div>` : ''}
      <header class="nav"><div class="wrap">
        <a href="index.html" class="logo" aria-label="arba HOGAR - inicio">${LOGO}</a>
        <ul>
          ${catalogo ? `<li><a href="catalogo.html"${activo === 'catalogo' ? ' class="on"' : ''}>Catálogo</a></li>` : ''}
          ${catalogo ? `<li><a href="catalogo.html?promos=1">Ofertas</a></li>` : `<li><a href="index.html#rubros">Qué vendemos</a></li>`}
          <li><a href="index.html#como">Cómo comprar</a></li>
          <li data-if-videos><a href="index.html#videos">Videos</a></li>
          <li><a href="index.html#donde">Dónde estamos</a></li>
        </ul>
        <div class="nav-right">
          ${catalogo ? `<a class="nav-search" href="catalogo.html#buscar" aria-label="Buscar"><svg class="ico"><use href="#i-search"/></svg></a>
          <button class="btn-cart" id="cOpen" type="button" aria-label="Carrito"><svg class="ico"><use href="#i-bag"/></svg><span class="lbl">Carrito</span><span class="count" data-count style="display:none">0</span></button>` : ''}
          <a class="btn btn-wa${catalogo ? ' nav-wa' : ''}" data-wa="Hola! Vi la web de arba HOGAR y quiero hacer una consulta." data-src="nav"><span class="dot"></span><span><span class="t-long">Escribinos </span>por WhatsApp</span></a>
        </div>
      </div></header>`;
    const f = document.getElementById('ftr');
    if (f) f.outerHTML = `<footer><div class="wrap">
        <span class="logo">${LOGO}</span>
        <nav>${catalogo ? '<a href="catalogo.html">Catálogo</a><a href="catalogo.html?promos=1">Ofertas</a>' : ''}<a href="index.html#rubros">Qué vendemos</a><a href="index.html#donde">Dónde estamos</a>
          ${site.instagram ? `<a href="${esc(site.instagram)}" target="_blank" rel="noopener">Instagram</a>` : ''}
          ${site.facebook ? `<a href="${esc(site.facebook)}" target="_blank" rel="noopener">Facebook</a>` : ''}</nav>
        <span>© ${new Date().getFullYear()} arba HOGAR · Córdoba</span>
      </div></footer>
      <a class="wa-float" data-wa="Hola! Vi la web de arba HOGAR y quiero hacer una consulta." data-src="flotante" aria-label="WhatsApp"><svg><use href="#i-wa"/></svg></a>
      ${catalogo ? `<div class="overlay" id="cOverlay"></div>
      <aside class="drawer" id="cDrawer" aria-label="Carrito">
        <header><h3>Tu carrito <span class="count" data-count style="display:none">0</span></h3><button class="x" id="cClose" aria-label="Cerrar">×</button></header>
        <div class="items" id="cItems"></div>
        <footer id="cFoot" hidden>
          <div class="tot" id="cTot"></div>
          <form id="cForm" class="c-form">
            <input name="nombre" required placeholder="Tu nombre" autocomplete="given-name">
            <div class="seg"><label><input type="radio" name="entrega" value="Retiro en el local" checked><span>Retiro en el local</span></label><label><input type="radio" name="entrega" value="Envío a domicilio (cotizar)"><span>Envío a domicilio</span></label></div>
            <select name="pago" id="cPago" aria-label="Forma de pago"></select>
            <button class="btn btn-wa" type="submit"><span class="dot"></span>Enviar pedido por WhatsApp</button>
            <small>Te confirmamos disponibilidad, entrega y precio final. No se cobra nada en la web.</small>
          </form>
        </footer>
      </aside>` : ''}`;
    if (!(site.videos || []).length) document.querySelectorAll('[data-if-videos]').forEach(el => el.style.display = 'none');
    if (catalogo) {
      document.getElementById('cOpen').onclick = () => toggleCart(true);
      document.getElementById('cClose').onclick = () => toggleCart(false);
      document.getElementById('cOverlay').onclick = () => toggleCart(false);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleCart(false); });
      document.getElementById('cForm').addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const t = carrito.totales();
        track('InitiateCheckout', { value: t.precio, currency: 'ARS', num_items: t.n });
        window.open(waURL(mensajePedido({ nombre: fd.get('nombre').trim(), entrega: fd.get('entrega'), pago: fd.get('pago') })), '_blank');
      });
      renderCarrito();
      window.addEventListener('storage', e => { if (e.key === CKEY) renderCarrito(); });
    }
    bindWA();
    pixel(site.metaPixelId);
  }

  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
  }
  // Flechas para carruseles horizontales
  function carousel(root) {
    root.querySelectorAll('[data-car]').forEach(w => {
      const track = w.querySelector('.car-track');
      w.querySelectorAll('[data-dir]').forEach(b => b.onclick = () => track.scrollBy({ left: +b.dataset.dir * track.clientWidth * .85, behavior: 'smooth' }));
      const upd = () => { const l = w.querySelector('[data-dir="-1"]'), r = w.querySelector('[data-dir="1"]'); if (!l) return;
        l.disabled = track.scrollLeft < 8; r.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8; };
      track.addEventListener('scroll', upd, { passive: true }); upd(); setTimeout(upd, 300);
    });
  }

  async function boot() { SITE = await ArbaAPI.config(); return SITE; }

  window.ArbaUI = { LOGO, ICONOS, esc, money, precioDe, desdePrecio, promoDe, cuotas, cuotaTxt, waURL, track, bindWA, rebindWA,
    card, bindQuick, vacio, carrito, itemDe, toggleCart, toast, countdown, finDe, shell, reveal, carousel, boot };
})();
