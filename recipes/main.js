// ── Build star HTML from a numeric rating ─────────────────────────────────
function buildStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span aria-hidden="true" class="icon-star">⭐</span>';
    } else {
      stars += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
    }
  }
  return stars;
}

// ── Build one recipe card HTML string ────────────────────────────────────
function buildRecipeCard(recipe) {
  const tagHTML = recipe.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  return `
    <article class="recipe-card">
      <div class="recipe-image-wrap">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image"
             onerror="this.src='images/Apple.jpg'">
      </div>
      <div class="recipe-content">
        <div class="recipe-meta">
          <h2 class="recipe-title">${recipe.name}</h2>
          <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
            ${buildStars(recipe.rating)}
          </span>
          <div class="recipe-stats">
            <span>🕐 Prep: ${recipe.prepTime}</span>
            <span>🔥 Cook: ${recipe.cookTime}</span>
            <span>🍽 Serves: ${recipe.servings}</span>
          </div>
        </div>
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-tags">${tagHTML}</div>
      </div>
    </article>
  `;
}

// ── Pick and display a random recipe on page load ─────────────────────────
function displayRandomRecipe() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  const recipe = recipes[randomIndex];
  const container = document.querySelector("#random-recipe");
  if (!container) return;

  container.innerHTML = `
    <h2 class="section-title">✨ Recipe of the Day</h2>
    ${buildRecipeCard(recipe)}
  `;
}

// ── Filter recipes by keyword (name, description, tags) ───────────────────
function filterRecipes(keyword) {
  const lower = keyword.toLowerCase().trim();
  return recipes.filter(recipe => {
    const inName        = recipe.name.toLowerCase().includes(lower);
    const inDescription = recipe.description.toLowerCase().includes(lower);
    const inTags        = recipe.tags.some(tag => tag.toLowerCase().includes(lower));
    return inName || inDescription || inTags;
  });
}

// ── Sort an array of recipes alphabetically by name ───────────────────────
function sortRecipes(recipeList) {
  return [...recipeList].sort((a, b) => a.name.localeCompare(b.name));
}

// ── Render search results into the page ───────────────────────────────────
function displayResults(results, keyword) {
  const resultsSection = document.querySelector("#search-results");
  const countEl        = document.querySelector("#results-count");

  if (results.length === 0) {
    resultsSection.innerHTML = `
      <div class="no-results">
        <p>No recipes found for "<strong>${keyword}</strong>".</p>
        <p>Try searching for a different ingredient, meal type, or tag.</p>
      </div>
    `;
    if (countEl) countEl.textContent = "";
    return;
  }

  const sorted = sortRecipes(results);

  if (countEl) {
    countEl.textContent =
      `${sorted.length} recipe${sorted.length !== 1 ? "s" : ""} found for "${keyword}" — sorted A to Z`;
  }

  resultsSection.innerHTML = sorted.map(recipe => buildRecipeCard(recipe)).join("");
}

// ── Handle search form submit ─────────────────────────────────────────────
function handleSearch(event) {
  event.preventDefault();

  const input   = document.querySelector("#search-input");
  const keyword = input.value.trim();
  const resultsSection = document.querySelector("#search-results");
  const countEl        = document.querySelector("#results-count");

  // Clear results if search is empty
  if (!keyword) {
    resultsSection.innerHTML = "";
    if (countEl) countEl.textContent = "";
    return;
  }

  const results = filterRecipes(keyword);
  displayResults(results, keyword);
}

// ── Run on page load ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  displayRandomRecipe();

  const form = document.querySelector("#search-form");
  if (form) {
    form.addEventListener("submit", handleSearch);
  }
});