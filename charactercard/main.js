// =========================================
//  Character Card — main.js
//  WDD131 Prove Assignment
// =========================================

// ----- Character Object -----
const character = {
  name: 'Aldric the Bold',
  class: 'Paladin',
  level: 1,
  health: 100,
  maxHealth: 100,
  image: 'images/hero.png',

  // Subtract 20 from health; notify if dead
  attacked: function () {
    if (this.health <= 0) return; // already dead

    this.health -= 20;

    if (this.health <= 0) {
      this.health = 0;
      showMessage(`${this.name} has died! ☠`, 'danger');
      document.getElementById('attackBtn').disabled = true;
      document.getElementById('levelBtn').disabled = true;
    } else {
      showMessage(`Hit! ${this.name} takes 20 damage.`);
    }

    renderCard(this);
  },

  // Add 1 to level
  levelUp: function () {
    this.level += 1;
    // Also restore health on level up as a bonus
    this.health = Math.min(this.health + 20, this.maxHealth);
    showMessage(`${this.name} reached Level ${this.level}! ✦`, '');
    renderCard(this);
  }
};

// ----- Render function -----
function renderCard(char) {
  document.getElementById('charName').textContent    = char.name;
  document.getElementById('charClass').textContent   = char.class;
  document.getElementById('charLevel').textContent   = char.level;
  document.getElementById('charHealth').textContent  = char.health;
  document.getElementById('charImage').src           = char.image;
  document.getElementById('charImage').alt           = `${char.name} portrait`;

  // Health bar width + color
  const pct = (char.health / char.maxHealth) * 100;
  const bar = document.getElementById('healthBar');
  bar.style.width = `${pct}%`;

  if (pct > 60) {
    bar.style.backgroundColor = 'var(--health-full)';
  } else if (pct > 30) {
    bar.style.backgroundColor = 'var(--health-mid)';
  } else {
    bar.style.backgroundColor = 'var(--health-low)';
  }

  // Pulse the stat values on change
  ['charLevel', 'charHealth'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('pulse');
    // Trigger reflow so the animation re-runs
    void el.offsetWidth;
    el.classList.add('pulse');
  });
}

// ----- Message helper -----
function showMessage(text, type = '') {
  const box = document.getElementById('messageBox');
  box.textContent = text;
  box.className = 'message-box visible' + (type ? ` ${type}` : '');
}

// ----- Event listeners -----
document.getElementById('attackBtn').addEventListener('click', function () {
  character.attacked();
});

document.getElementById('levelBtn').addEventListener('click', function () {
  character.levelUp();
});

// ----- Initial render -----
renderCard(character);