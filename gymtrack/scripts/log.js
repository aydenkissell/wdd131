// log.js - Workout log page logic for GymTrack

let currentFilter = 'All';
let currentSearch = '';

// Render the summary pills (total count, muscle breakdown)
function renderSummary(workouts) {
  const summary = document.getElementById('logSummary');

  if (workouts.length === 0) {
    summary.innerHTML = '';
    return;
  }

  // Use reduce to count per muscle group
  const muscleCounts = workouts.reduce((acc, w) => {
    acc[w.muscle] = (acc[w.muscle] || 0) + 1;
    return acc;
  }, {});

  const pills = Object.entries(muscleCounts).map(([muscle, count]) =>
    `<div class="summary-pill">${muscle}: <span>${count}</span></div>`
  ).join('');

  summary.innerHTML = `
    <div class="summary-pill">Total: <span>${workouts.length}</span></div>
    ${pills}
  `;
}

// Render the full workout log cards
function renderLog() {
  const grid = document.getElementById('logGrid');
  let workouts = filterByMuscle(currentFilter);

  // Filter by search term if present
  if (currentSearch.trim() !== '') {
    workouts = workouts.filter(w =>
      w.exercise.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  renderSummary(workouts);

  if (workouts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🏋️</div>
        <h3 class="empty-title">No Workouts Found</h3>
        <p class="empty-desc">${currentSearch || currentFilter !== 'All' ? 'No workouts match your filter. Try a different one.' : "You haven't logged any workouts yet. Get off the couch!"}</p>
        ${currentSearch || currentFilter !== 'All' ? '' : '<a href="index.html" class="cta-btn">Log Your First Lift →</a>'}
      </div>
    `;
    return;
  }

  // Use map to build each card
  grid.innerHTML = workouts.map(w => {
    const rating = getLiftRating(w.weight, w.muscle);
    const badgeText = rating === 'strong' ? '💪 Strong Lift' : '📈 Keep Improving';
    const badgeClass = rating === 'strong' ? 'strong' : 'improve';

    return `
      <div class="log-card" id="card-${w.id}">
        <div class="log-card-left">
          <div class="log-card-name">${w.exercise}</div>
          <div class="log-card-details">
            <strong>${w.sets}</strong> sets ×
            <strong>${w.reps}</strong> reps @
            <strong>${w.weight} lbs</strong>
            &nbsp;·&nbsp;
            <span class="muscle-tag">${w.muscle}</span>
          </div>
          <div class="workout-date">${w.date}</div>
        </div>
        <div class="log-card-right">
          <span class="pr-badge ${badgeClass}">${badgeText}</span>
          <button class="delete-btn" onclick="handleDelete(${w.id})" title="Delete">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

// Handle deleting a workout
function handleDelete(id) {
  if (confirm('Delete this workout?')) {
    deleteWorkout(id);
    renderLog();
  }
}

// Handle filter button clicks
function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Conditional: update active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderLog();
    });
  });
}

// Handle search input
function setupSearch() {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderLog();
  });
}

// Handle clear all button
function setupClearAll() {
  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete ALL workouts? This cannot be undone.')) {
      clearAllWorkouts();
      currentFilter = 'All';
      currentSearch = '';
      document.getElementById('searchInput').value = '';
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('[data-filter="All"]').classList.add('active');
      renderLog();
    }
  });
}

// Initialize the log page
function init() {
  renderLog();
  setupFilters();
  setupSearch();
  setupClearAll();
}

document.addEventListener('DOMContentLoaded', init);
