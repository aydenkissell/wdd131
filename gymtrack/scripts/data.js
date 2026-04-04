// data.js - Shared data layer for GymTrack
// Handles all localStorage read/write operations

const STORAGE_KEY = 'gymtrack_workouts';

// Get all workouts from localStorage
function getWorkouts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save all workouts to localStorage
function saveWorkouts(workouts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

// Add a single workout object
function addWorkout(workout) {
  const workouts = getWorkouts();
  workout.id = Date.now();
  workout.date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  workouts.unshift(workout); // newest first
  saveWorkouts(workouts);
  return workout;
}

// Delete a workout by id
function deleteWorkout(id) {
  const workouts = getWorkouts().filter(w => w.id !== id);
  saveWorkouts(workouts);
}

// Clear all workouts
function clearAllWorkouts() {
  localStorage.removeItem(STORAGE_KEY);
}

// Get unique muscle groups from logged workouts
function getMuscleGroups() {
  const workouts = getWorkouts();
  const groups = workouts.map(w => w.muscle);
  return [...new Set(groups)];
}

// Filter workouts by muscle group
function filterByMuscle(muscle) {
  const workouts = getWorkouts();
  if (muscle === 'All') return workouts;
  return workouts.filter(w => w.muscle === muscle);
}

// Determine if a lift is "strong" (>=135lbs for upper, >=185 for lower)
function getLiftRating(weight, muscle) {
  const heavyMuscles = ['Legs', 'Back'];
  const threshold = heavyMuscles.includes(muscle) ? 185 : 135;
  return parseFloat(weight) >= threshold ? 'strong' : 'improve';
}

// Get total stats
function getStats() {
  const workouts = getWorkouts();
  const totalExercises = workouts.length;

  // Count unique workout days
  const days = [...new Set(workouts.map(w => w.date))];
  const streak = days.length;

  return { totalWorkouts: totalExercises, totalExercises, streak };
}