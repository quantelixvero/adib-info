/* CourseLink — Search & Filter Logic */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  window.AppState = {
    batch:   window.PAGE_BATCH || params.get('batch') || 'all',
    subject: params.get('subject') || 'all',
    query:   params.get('q') || '',
  };

  buildFilters();
  bindEvents();
  render();
});

function buildFilters() {
  const sSel = document.getElementById('subjectFilters');
  const bSel = document.getElementById('batchFilters');

  if (sSel && window.SUBJECTS) {
    sSel.innerHTML = window.SUBJECTS.map(s =>
      `<button class="chip ${window.AppState.subject === s.id ? 'active' : ''}" data-subject="${s.id}">
        <i class="bi ${s.icon}"></i>${s.name}
      </button>`
    ).join('');
  }

  if (bSel && window.BATCHES && !window.PAGE_BATCH) {
    bSel.innerHTML = window.BATCHES.map(b =>
      `<button class="chip ${window.AppState.batch === b.id ? 'active' : ''}" data-batch="${b.id}">
        ${b.name}
      </button>`
    ).join('');
  }
}

function bindEvents() {
  const input   = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');

  if (input) {
    if (window.AppState.query) {
      input.value = window.AppState.query;
      clearBtn && clearBtn.classList.add('show');
    }
    input.addEventListener('input', e => {
      window.AppState.query = e.target.value.trim();
      clearBtn && clearBtn.classList.toggle('show', window.AppState.query.length > 0);
      render();
    });
  }

  clearBtn && clearBtn.addEventListener('click', () => {
    if (input) input.value = '';
    window.AppState.query = '';
    clearBtn.classList.remove('show');
    render();
  });

  document.addEventListener('click', e => {
    const sc = e.target.closest('[data-subject]');
    if (sc) {
      window.AppState.subject = sc.dataset.subject;
      document.querySelectorAll('[data-subject]').forEach(c =>
        c.classList.toggle('active', c.dataset.subject === window.AppState.subject)
      );
      render(); return;
    }
    const bc = e.target.closest('[data-batch]');
    if (bc && !window.PAGE_BATCH) {
      window.AppState.batch = bc.dataset.batch;
      document.querySelectorAll('[data-batch]').forEach(c =>
        c.classList.toggle('active', c.dataset.batch === window.AppState.batch)
      );
      render();
    }
  });
}

function score(course, q) {
  if (!q) return 1;
  const text = [
    course.title, course.batch, course.subject,
    course.category, course.provider, course.instructor || '',
    ...(course.tags || []), String(course.cycle)
  ].join(' ').toLowerCase();
  const qLow = q.toLowerCase();
  if (text.includes(qLow)) return 2;
  const words = qLow.split(/\s+/);
  const hits  = words.filter(w => w && text.includes(w));
  return hits.length ? hits.length / words.length : 0;
}

function render() {
  const grid = document.getElementById('coursesGrid');
  if (!grid || !window.COURSE_DATA) return;

  const { batch, subject, query } = window.AppState;

  const results = window.COURSE_DATA
    .map(c => ({ c, s: score(c, query) }))
    .filter(({ c, s }) => {
      if (s === 0) return false;
      if (window.PAGE_BATCH && c.batch !== window.PAGE_BATCH) return false;
      if (!window.PAGE_BATCH && batch !== 'all' && c.batch !== batch) return false;
      if (subject !== 'all' && c.category !== subject && c.subject !== subject) return false;
      return true;
    })
    .sort((a, b) => b.s - a.s)
    .map(({ c }) => c);

  const counter = document.getElementById('resultCount');
  if (counter) counter.innerHTML = `<strong>${results.length}</strong> cycle${results.length !== 1 ? 's' : ''}`;

  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-search"></i>
        <h3>Nothing found</h3>
        <p>Try a different keyword or reset the filters.</p>
        <button class="chip active" onclick="resetAll()">
          <i class="bi bi-arrow-clockwise"></i> Reset
        </button>
      </div>`;
    return;
  }

  grid.innerHTML = results.map(c => buildCard(c)).join('');
}

function resetAll() {
  window.AppState.subject = 'all';
  window.AppState.query   = '';
  if (!window.PAGE_BATCH) window.AppState.batch = 'all';
  const input = document.getElementById('searchInput');
  const clr   = document.getElementById('searchClear');
  if (input) input.value = '';
  clr && clr.classList.remove('show');
  document.querySelectorAll('[data-subject]').forEach(c => c.classList.toggle('active', c.dataset.subject === 'all'));
  if (!window.PAGE_BATCH) document.querySelectorAll('[data-batch]').forEach(c => c.classList.toggle('active', c.dataset.batch === 'all'));
  render();
}
