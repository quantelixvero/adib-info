/* =====================================================================
   CourseLink — Search & Program Hierarchical Filter Logic
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  window.AppState = {
    batch:   window.PAGE_BATCH || params.get('batch') || 'all',
    subject: params.get('subject') || 'all',
    query:   params.get('q') || '',
  };

  buildFilterChips();
  bindSearchEvents();
  renderCoursePrograms();
});

/* ── BUILD SUBJECT & BATCH CHIPS ── */
function buildFilterChips() {
  const subjectContainer = document.getElementById('subjectFilters');
  const batchContainer   = document.getElementById('batchFilters');

  if (subjectContainer && window.SUBJECTS) {
    subjectContainer.innerHTML = window.SUBJECTS.map(s =>
      `<button class="chip ${window.AppState.subject === s.id ? 'active' : ''}" data-subject="${s.id}">
        <i class="bi ${s.icon}"></i>${s.name}
      </button>`
    ).join('');
  }

  if (batchContainer && window.BATCHES && !window.PAGE_BATCH) {
    batchContainer.innerHTML = window.BATCHES.map(b =>
      `<button class="chip ${window.AppState.batch === b.id ? 'active' : ''}" data-batch="${b.id}">
        ${b.name}
      </button>`
    ).join('');
  }
}

/* ── BIND SEARCH AND FILTER EVENTS ── */
function bindSearchEvents() {
  const inputEl  = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');

  if (inputEl) {
    if (window.AppState.query) {
      inputEl.value = window.AppState.query;
      clearBtn && clearBtn.classList.add('show');
    }

    inputEl.addEventListener('input', e => {
      window.AppState.query = e.target.value.trim();
      clearBtn && clearBtn.classList.toggle('show', window.AppState.query.length > 0);
      renderCoursePrograms();
    });
  }

  clearBtn && clearBtn.addEventListener('click', () => {
    if (inputEl) inputEl.value = '';
    window.AppState.query = '';
    clearBtn.classList.remove('show');
    renderCoursePrograms();
  });

  // Delegate click for subject chips
  document.addEventListener('click', e => {
    const subjectBtn = e.target.closest('[data-subject]');
    if (subjectBtn) {
      window.AppState.subject = subjectBtn.dataset.subject;
      document.querySelectorAll('[data-subject]').forEach(c =>
        c.classList.toggle('active', c.dataset.subject === window.AppState.subject)
      );
      renderCoursePrograms();
      return;
    }

    const batchBtn = e.target.closest('[data-batch]');
    if (batchBtn && !window.PAGE_BATCH) {
      window.AppState.batch = batchBtn.dataset.batch;
      document.querySelectorAll('[data-batch]').forEach(c =>
        c.classList.toggle('active', c.dataset.batch === window.AppState.batch)
      );
      renderCoursePrograms();
    }
  });
}

/* ── SCORE PROGRAM & ITS CYCLES ── */
function matchCycle(cycle, queryLow) {
  if (!queryLow) return true;
  const str = `${cycle.title} ${cycle.shortTitle || ''} cycle ${cycle.cycleNum} c${cycle.cycleNum}`.toLowerCase();
  return str.includes(queryLow);
}

/* ── RENDER PROGRAMS ── */
function renderCoursePrograms() {
  const container = document.getElementById('programsContainer');
  if (!container || !window.COURSE_PROGRAMS) return;

  const { batch, subject, query } = window.AppState;
  const qLow = query.toLowerCase();

  const matchingPrograms = [];
  let totalCyclesCount = 0;

  window.COURSE_PROGRAMS.forEach(prog => {
    // Check batch filter
    if (window.PAGE_BATCH && prog.batch !== window.PAGE_BATCH) return;
    if (!window.PAGE_BATCH && batch !== 'all' && prog.batch !== batch) return;

    // Check subject filter
    if (subject !== 'all' && prog.category !== subject && prog.subject !== subject) return;

    // Check search query
    if (qLow) {
      const progText = `${prog.title} ${prog.batch} ${prog.subject} ${prog.provider} ${prog.instructor} ${(prog.tags || []).join(' ')} ${prog.description}`.toLowerCase();
      const progMatches = progText.includes(qLow);

      if (progMatches) {
        // Show all cycles in this program
        matchingPrograms.push({ program: prog, cycles: prog.cycles });
        totalCyclesCount += prog.cycles.length;
      } else {
        // Check if specific cycles match (e.g. "cycle 2", "integration")
        const matchedCycles = prog.cycles.filter(c => matchCycle(c, qLow));
        if (matchedCycles.length > 0) {
          matchingPrograms.push({ program: prog, cycles: matchedCycles });
          totalCyclesCount += matchedCycles.length;
        }
      }
    } else {
      // No search query: show full program
      matchingPrograms.push({ program: prog, cycles: prog.cycles });
      totalCyclesCount += prog.cycles.length;
    }
  });

  // Update counter
  const counterEl = document.getElementById('resultCount');
  if (counterEl) {
    counterEl.innerHTML = `<strong>${matchingPrograms.length}</strong> Course${matchingPrograms.length !== 1 ? 's' : ''} (${totalCyclesCount} Cycles)`;
  }

  // Render empty state or programs list
  if (matchingPrograms.length === 0) {
    container.innerHTML = `
      <div class="empty-search-state">
        <i class="bi bi-search"></i>
        <h3>No courses or cycles found</h3>
        <p>Try searching for a different keyword or reset filters to view all courses.</p>
        <button class="chip active" style="margin-top:12px;" onclick="resetAllFilters()">
          <i class="bi bi-arrow-clockwise"></i> Reset Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = matchingPrograms.map(({ program, cycles }) => 
    buildProgramCard(program, cycles)
  ).join('');
}

/* ── RESET ALL FILTERS ── */
function resetAllFilters() {
  window.AppState.subject = 'all';
  window.AppState.query   = '';
  if (!window.PAGE_BATCH) window.AppState.batch = 'all';

  const inputEl  = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  if (inputEl) inputEl.value = '';
  clearBtn && clearBtn.classList.remove('show');

  document.querySelectorAll('[data-subject]').forEach(c => c.classList.toggle('active', c.dataset.subject === 'all'));
  if (!window.PAGE_BATCH) {
    document.querySelectorAll('[data-batch]').forEach(c => c.classList.toggle('active', c.dataset.batch === 'all'));
  }

  renderCoursePrograms();
}
