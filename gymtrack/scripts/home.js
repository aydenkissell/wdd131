// home.js - Home page logic for GymTrack

const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Push yourself because no one else is going to do it for you.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Success starts with self-discipline.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up. Work out. Look hot. Kick ass.",
  "Train insane or remain the same.",
  "Sweat is just fat crying.",
  "You don't have to be great to start, but you have to start to be great.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Results happen over time, not overnight. Work hard, stay consistent.",
  "If it doesn't challenge you, it doesn't change you.",
  "Do something today that your future self will thank you for.",
  "No excuses. No shortcuts. Just results.",
];

// Show a different quote each day based on the date
function renderDailyQuote() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const quote = quotes[dayOfYear % quotes.length];
  document.getElementById('dailyQuote').textContent = quote;
}

// Build personal bests — highest weight per exercise using reduce
function renderPersonalBests() {
  const pbGrid = document.getElementById('pbGrid');
  const workouts = getWorkouts();

  if (workouts.length === 0) {
    pbGrid.innerHTML = '<p class="empty-msg">No workouts yet — log some lifts to see your personal bests!</p>';
    return;
  }

  // Use reduce to find the heaviest weight per exercise
  const bests = workouts.reduce((acc, w) => {
    const key = w.exercise.toLowerCase();
    if (!acc[key] || parseFloat(w.weight) > parseFloat(acc[key].weight)) {
      acc[key] = w;
    }
    return acc;
  }, {});

  // Use Object.values + map to render each PB card
  const pbArray = Object.values(bests);

  pbGrid.innerHTML = pbArray.map(w => {
    const rating = getLiftRating(w.weight, w.muscle);
    const isStrong = rating === 'strong';
    return `
      <div class="pb-card">
        <div class="pb-trophy">${isStrong ? '🏆' : '📈'}</div>
        <div class="pb-exercise">${w.exercise}</div>
        <div class="pb-weight">${w.weight} <span>lbs</span></div>
        <div class="pb-details">${w.sets} sets × ${w.reps} reps</div>
        <span class="muscle-tag">${w.muscle}</span>
      </div>
    `;
  }).join('');
}

// Update the 3 stat cards from localStorage data
function updateStats() {
  const stats = getStats();
  document.getElementById('stat-workouts').querySelector('.stat-number').textContent = stats.totalWorkouts;
  document.getElementById('stat-exercises').querySelector('.stat-number').textContent = stats.totalExercises;
  document.getElementById('stat-streak').querySelector('.stat-number').textContent = stats.streak;
}

// Render the 3 most recent workouts in the recent list
function renderRecentWorkouts() {
  const list = document.getElementById('recentList');
  const workouts = getWorkouts().slice(0, 3);

  if (workouts.length === 0) {
    list.innerHTML = '<p class="empty-msg">No workouts yet. Add one above!</p>';
    return;
  }

  list.innerHTML = workouts.map(w => `
    <div class="workout-item">
      <div>
        <div class="workout-name">${w.exercise}</div>
        <div class="workout-meta">${w.sets} sets × ${w.reps} reps @ ${w.weight} lbs</div>
      </div>
      <div style="display:flex; gap:0.75rem; align-items:center;">
        <span class="muscle-tag">${w.muscle}</span>
        <span class="workout-date">${w.date}</span>
      </div>
    </div>
  `).join('');
}

// Handle the quick-add form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const exercise = document.getElementById('exercise').value.trim();
  const muscle = document.getElementById('muscle').value;
  const weight = document.getElementById('weight').value;
  const reps = document.getElementById('reps').value;
  const sets = document.getElementById('sets').value;
  const feedback = document.getElementById('formFeedback');

  if (!exercise || !muscle || !weight || !reps || !sets) {
    feedback.textContent = 'Please fill out all fields.';
    feedback.className = 'form-feedback feedback-improve';
    return;
  }

  addWorkout({ exercise, muscle, weight, reps, sets });

  const rating = getLiftRating(weight, muscle);
  if (rating === 'strong') {
    feedback.textContent = `💪 Strong lift! ${exercise} at ${weight} lbs logged.`;
    feedback.className = 'form-feedback feedback-strong';
  } else {
    feedback.textContent = `✅ ${exercise} logged! Keep pushing — you're building!`;
    feedback.className = 'form-feedback feedback-improve';
  }

  e.target.reset();
  updateStats();
  renderRecentWorkouts();
  renderPersonalBests();

  setTimeout(() => { feedback.textContent = ''; }, 3000);
}

function init() {
  renderDailyQuote();
  updateStats();
  renderRecentWorkouts();
  renderPersonalBests();
  document.getElementById('quickForm').addEventListener('submit', handleFormSubmit);
}

document.addEventListener('DOMContentLoaded', init);