/* ── NAVBAR ── */
function initNavbar(active) {
  const pages = [
    { id:'home',    href:'index.html',   label:'Home',         icon:'bi-house' },
    { id:'hsc26',   href:'hsc26.html',   label:'HSC 2026',     icon:'bi-collection' },
    { id:'hsc27',   href:'hsc27.html',   label:'HSC 2027',     icon:'bi-stars' },
    { id:'special', href:'special.html', label:'Engineering',  icon:'bi-cpu' },
    { id:'request', href:'request.html', label:'Notice',       icon:'bi-bell' },
  ];

  const header = document.querySelector('.navbar');
  if (!header) return;

  header.innerHTML = `
    <div class="container">
      <div class="navbar-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon"><i class="bi bi-mortarboard-fill"></i></div>
          Course<span>Link</span>
        </a>

        <ul class="nav-links">
          ${pages.map(p=>`
            <li><a href="${p.href}" class="${p.id===active?'active':''}">
              <i class="bi ${p.icon}"></i>${p.label}
            </a></li>`).join('')}
        </ul>

        <div class="nav-right">
          <a href="https://t.me/+-QWIZo1ntN5kNDk1" target="_blank" class="btn-tg">
            <i class="bi bi-telegram"></i> Telegram
          </a>
          <button class="burger" id="burgerBtn" aria-label="Menu">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div class="mobile-overlay" id="mOverlay"></div>
    <div class="mobile-drawer" id="mDrawer">
      <div class="mobile-logo">
        <div class="logo-icon"><i class="bi bi-mortarboard-fill"></i></div>
        <span>CourseLink</span>
      </div>
      ${pages.map(p=>`
        <a href="${p.href}" class="${p.id===active?'active':''}">
          <i class="bi ${p.icon}"></i>${p.label}
        </a>`).join('')}
      <div style="margin-top:20px; padding-top:16px; border-top:1px solid #1e2535;">
        <a href="https://t.me/+-QWIZo1ntN5kNDk1" target="_blank" class="btn-tg" style="width:100%;justify-content:center;display:flex;border-radius:8px;padding:10px;">
          <i class="bi bi-telegram"></i> Join Telegram
        </a>
      </div>
    </div>`;

  const burger   = document.getElementById('burgerBtn');
  const overlay  = document.getElementById('mOverlay');
  const drawer   = document.getElementById('mDrawer');
  const open  = () => { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; };
  const close = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; };
  burger?.addEventListener('click', open);
  overlay?.addEventListener('click', close);
}

/* ── FOOTER ── */
function initFooter() {
  const f = document.querySelector('.site-footer');
  if (!f) return;
  f.innerHTML = `
    <div class="container footer-inner">
      <div class="footer-left">
        <div class="logo-icon" style="width:30px;height:30px;font-size:0.85rem;">
          <i class="bi bi-mortarboard-fill"></i>
        </div>
        <span style="font-weight:700;font-size:0.95rem;">CourseLink</span>
        <span style="color:#334155;font-size:0.82rem;">— HSC Cycle Directory</span>
      </div>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="hsc26.html">HSC 2026</a></li>
        <li><a href="hsc27.html">HSC 2027</a></li>
        <li><a href="special.html">Engineering</a></li>
        <li><a href="request.html">Notice</a></li>
      </ul>
      <div class="footer-right">&copy; ${new Date().getFullYear()} CourseLink</div>
    </div>`;
}

/* ── CANDIDATE IMAGE GENERATOR ── */
function getImgCandidates(src) {
  if (!src) return [];
  const list = [];
  const lastDot = src.lastIndexOf('.');
  if (lastDot === -1) return list;
  const base = src.substring(0, lastDot);
  const ext = src.substring(lastDot).toLowerCase();
  
  const extensions = ['.png', '.jpg', '.jpeg', '.webp'];
  
  // Try same base with other extensions (.png, .jpg, etc.)
  for (const e of extensions) {
    if (e !== ext && !list.includes(base + e)) list.push(base + e);
  }

  // Handle acsp <-> ascp naming variation
  if (base.includes('acsp')) {
    const alt = base.replace('acsp', 'ascp');
    for (const e of [ext, ...extensions]) {
      if (!list.includes(alt + e)) list.push(alt + e);
    }
  }
  if (base.includes('ascp')) {
    const alt = base.replace('ascp', 'acsp');
    for (const e of [ext, ...extensions]) {
      if (!list.includes(alt + e)) list.push(alt + e);
    }
  }

  // Handle acsm27 <-> acsm naming variation
  if (base.includes('acsm27')) {
    const alt = base.replace('acsm27', 'acsm');
    for (const e of [ext, ...extensions]) {
      if (!list.includes(alt + e)) list.push(alt + e);
    }
  }

  return list;
}

/* ── SMART ERROR HANDLER WITH AUTOMATIC ALTERNATIVES ── */
function handleImgError(img) {
  let candidates = img.dataset.fallbacks ? JSON.parse(img.dataset.fallbacks) : [];
  let index = parseInt(img.dataset.idx || '0', 10);

  if (index < candidates.length) {
    img.dataset.idx = index + 1;
    img.src = candidates[index];
  } else {
    img.style.display = 'none';
    if (img.nextElementSibling) {
      img.nextElementSibling.style.display = 'flex';
    }
  }
}

/* ── BUILD 16:9 CARD ── */
function buildCard(c) {
  const ok = c.status === 'available' && c.link && !['','will be added','will be add'].includes(c.link.trim());

  const subjMap = {
    Physics:  { cls:'physics',   icon:'bi-lightning-charge-fill' },
    Chemistry:{ cls:'chemistry', icon:'bi-flask-fill' },
    Math:     { cls:'math',      icon:'bi-calculator-fill' },
  };
  const s = subjMap[c.subject] || subjMap.Physics;
  const fname = c.image ? c.image.replace('images/','') : 'image.jpg';
  const candidates = JSON.stringify(getImgCandidates(c.image));

  return `
  <div class="c-card">
    <div class="c-poster">
      <div class="poster-badges">
        <span class="badge badge-batch">${c.batch}</span>
        <span class="badge ${ok?'badge-active':'badge-soon'}">${ok?'Active':'Coming Soon'}</span>
      </div>
      <img
        src="${c.image}"
        alt="${c.title}"
        loading="lazy"
        data-fallbacks='${candidates}'
        data-idx="0"
        onerror="handleImgError(this)"
      />
      <div class="poster-fallback" style="display:none;">
        <div class="poster-fallback-icon"><i class="bi ${s.icon}"></i></div>
        <div class="poster-fallback-name">${c.title}</div>
        <div class="poster-fallback-file">${fname}</div>
      </div>
    </div>

    <div class="c-body">
      <div class="c-subject ${s.cls}">
        <i class="bi ${s.icon}"></i>${c.subject} · ${c.provider}
      </div>
      <div class="c-title">${c.title}</div>
      <div class="c-actions">
        ${ok
          ? `<a href="${c.link}" target="_blank" rel="noopener" class="btn-join">
               <i class="bi bi-telegram"></i> Join Channel
             </a>`
          : `<button class="btn-join disabled" disabled>
               <i class="bi bi-clock"></i> Link Coming Soon
             </button>`
        }
        <button class="btn-copy" title="Copy link"
          onclick="copyLink('${c.link}','${c.title.replace(/'/g,"\\'")}')"
          ${!ok?'disabled style="opacity:0.3;pointer-events:none"':''}>
          <i class="bi bi-copy"></i>
        </button>
      </div>
    </div>
  </div>`;
}

/* ── COPY ── */
function copyLink(link, title) {
  if (!link || link.trim()==='') { showToast('Link not available yet.','warn'); return; }
  navigator.clipboard?.writeText(link).then(()=>{
    showToast('Link copied!','ok');
  }).catch(()=>{
    const el=document.createElement('textarea'); el.value=link;
    document.body.appendChild(el); el.select(); document.execCommand('copy'); el.remove();
    showToast('Link copied!','ok');
  });
}

/* ── TOAST ── */
function showToast(msg, type='ok') {
  let wrap=document.querySelector('.toasts');
  if (!wrap){wrap=document.createElement('div');wrap.className='toasts';document.body.appendChild(wrap);}
  const t=document.createElement('div');
  t.className='toast';
  t.innerHTML=`<i class="bi ${type==='ok'?'bi-check-circle-fill text-success':'bi-exclamation-triangle-fill'}" style="color:${type==='ok'?'#34d399':'#fbbf24'}"></i>${msg}`;
  wrap.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='0.3s';setTimeout(()=>t.remove(),320);},2800);
}
