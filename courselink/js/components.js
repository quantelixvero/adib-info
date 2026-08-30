/* ── NAVBAR ── */
function initNavbar(active) {
  const pages = [
    { id:'home',    href:'index.html',   label:'Home',         icon:'bi-house' },
    { id:'hsc26',   href:'hsc26.html',   label:'HSC 2026',     icon:'bi-collection' },
    { id:'hsc27',   href:'hsc27.html',   label:'HSC 2027',     icon:'bi-stars' },
    { id:'special', href:'special.html', label:'Engineering',  icon:'bi-cpu' },
    { id:'request', href:'request.html', label:'Notice & Guide', icon:'bi-bell' },
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
      <div style="margin-top:auto; padding-top:16px; border-top:1px solid #1e293b;">
        <a href="https://t.me/+-QWIZo1ntN5kNDk1" target="_blank" class="btn-tg" style="width:100%;justify-content:center;display:flex;border-radius:8px;padding:10px;">
          <i class="bi bi-telegram"></i> Join Telegram Channel
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
      <div class="footer-brand">
        <div class="logo-icon" style="width:30px;height:30px;font-size:0.85rem;">
          <i class="bi bi-mortarboard-fill"></i>
        </div>
        <span style="font-weight:700;font-size:0.95rem;">CourseLink</span>
        <span style="color:#475569;font-size:0.82rem;">— HSC & Engineering Directory</span>
      </div>
      <ul class="footer-nav">
        <li><a href="index.html">Home</a></li>
        <li><a href="hsc26.html">HSC 2026</a></li>
        <li><a href="hsc27.html">HSC 2027</a></li>
        <li><a href="special.html">Engineering</a></li>
        <li><a href="request.html">Notice & Guide</a></li>
      </ul>
      <div class="footer-copy">&copy; ${new Date().getFullYear()} CourseLink. All links verified.</div>
    </div>`;
}

/* ── CANDIDATE IMAGE GENERATOR (FALLBACK SUPPORT) ── */
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

/* ── RENDER STRUCTURED ACADEMIC PROGRAM CARD ── */
function buildProgramCard(prog, matchingCycles = null) {
  const displayCycles = matchingCycles || prog.cycles;
  if (!displayCycles || displayCycles.length === 0) return '';

  const activeCount = prog.cycles.filter(c => c.status === 'available' && c.link && !['','will be added','will be add'].includes(c.link.trim())).length;

  const cyclesHtml = displayCycles.map(c => {
    const ok = c.status === 'available' && c.link && !['','will be added','will be add'].includes(c.link.trim());
    const fname = c.image ? c.image.replace('images/','') : 'image.jpg';
    const candidates = JSON.stringify(getImgCandidates(c.image));

    return `
      <div class="cycle-card-item">
        <!-- 16:9 Poster -->
        <div class="cycle-thumb-wrap">
          <span class="cycle-num-tag">Cycle ${c.cycleNum}</span>
          <span class="cycle-status-pill ${ok ? 'status-active' : 'status-soon'}">
            ${ok ? '● Active' : '◌ Soon'}
          </span>
          <img
            src="${c.image}"
            alt="${c.title}"
            class="cycle-thumb-img"
            loading="lazy"
            data-fallbacks='${candidates}'
            data-idx="0"
            onerror="handleImgError(this)"
          />
          <div class="thumb-fallback" style="display:none;">
            <i class="bi bi-play-circle-fill"></i>
            <div class="thumb-fallback-name">Cycle ${c.cycleNum}</div>
            <div class="thumb-fallback-file">${fname}</div>
          </div>
        </div>

        <!-- Cycle Details & Actions -->
        <div class="cycle-card-body">
          <div class="cycle-card-title">${c.shortTitle || c.title}</div>
          <div class="cycle-card-actions">
            ${ok 
              ? `<a href="${c.link}" target="_blank" rel="noopener" class="btn-cycle-join">
                   <i class="bi bi-telegram"></i> Join Telegram
                 </a>`
              : `<button class="btn-cycle-join disabled" disabled>
                   <i class="bi bi-clock"></i> Soon
                 </button>`
            }
            <button class="btn-cycle-copy" title="Copy Telegram Link"
              onclick="copyLink('${c.link}', '${(c.shortTitle || c.title).replace(/'/g, "\\'")}')"
              ${!ok ? 'disabled style="opacity:0.3;pointer-events:none;"' : ''}>
              <i class="bi bi-copy"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="program-card" data-batch="${prog.batch}" data-subject="${prog.subject}">
      <!-- Program Header -->
      <div class="program-header">
        <div class="program-header-left">
          <div class="program-meta-badges">
            <span class="p-badge p-badge-batch">${prog.batch}</span>
            <span class="p-badge p-badge-provider">${prog.provider}</span>
            <span class="p-badge p-badge-count">${prog.cycles.length} Cycles (${activeCount} Active)</span>
          </div>
          <h2 class="program-title">${prog.title}</h2>
          <div class="program-instructor">
            <i class="bi bi-person-badge"></i> ${prog.instructor}
          </div>
          <p class="program-desc">${prog.description}</p>
        </div>
      </div>

      <!-- Cycles List Inside This Course -->
      <div class="program-cycles-section">
        <div class="cycles-section-title">
          <span>Cycles in this Course (${displayCycles.length})</span>
        </div>
        <div class="cycles-grid">
          ${cyclesHtml}
        </div>
      </div>
    </div>
  `;
}

/* ── COPY LINK ── */
function copyLink(link, title) {
  if (!link || link.trim()==='') { showToast('Link not available yet.','warn'); return; }
  navigator.clipboard?.writeText(link).then(()=>{
    showToast(`Copied: ${title}`,'ok');
  }).catch(()=>{
    const el=document.createElement('textarea'); el.value=link;
    document.body.appendChild(el); el.select(); document.execCommand('copy'); el.remove();
    showToast(`Copied: ${title}`,'ok');
  });
}

/* ── TOAST NOTIFICATION ── */
function showToast(msg, type='ok') {
  let wrap=document.querySelector('.toasts');
  if (!wrap){wrap=document.createElement('div');wrap.className='toasts';document.body.appendChild(wrap);}
  const t=document.createElement('div');
  t.className='toast';
  t.innerHTML=`<i class="bi ${type==='ok'?'bi-check-circle-fill text-success':'bi-exclamation-triangle-fill'}" style="color:${type==='ok'?'#34d399':'#fbbf24'}"></i> <span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='0.3s';setTimeout(()=>t.remove(),320);},2800);
}
