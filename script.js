// File: script.js
const prompts = [
"I've tried to turn my passion into money — it went... okay.",
"I once had a “great idea” but never actually started it.",
"I've Googled “how to find your purpose” more than once.",
"I’ve felt burned out by something I love.",
"I’ve done free work just to “get my foot in the door.”",
"I’ve changed what I thought was my passion — more than once.",
"I’ve had a creative project that kept me up all night (in a good way).",
"I’ve doubted myself but kept going anyway.",
"I’ve said “no” to money because the vibes were off.",
"I’ve felt like I’m behind — even when I’m making progress.",
"I’ve tried juggling more than one passion at the same time.",
"I’ve had an idea that people didn’t understand… but I loved it anyway.",
"I’ve used my 9–5 to secretly fund my 5–9.",
"I’ve wanted to quit everything and live in the mountains (or somewhere quiet).",
"I’ve worked with someone who inspired me deeply.",
"I’ve asked myself “Is this really what I’m meant to do?”",
"I’ve taken a break to figure out what I really want.",
"I’ve helped a friend chase their dream — and it felt amazing.",
"I’ve been asked to “just do it for exposure” (and rolled my eyes).",
"I’ve thought about starting a podcast, blog, or brand… at least once.",
"I’ve felt proud of something I created — even if no one else saw it.",
"I’ve had a “this is it!” moment — and then a “never mind…” moment.",
"I’ve rebranded myself (Instagram bios count too).",
"I’ve told someone about my dream — and their reaction surprised me.",
"I’ve discovered something new about myself just this year."
];
const playBtn = document.getElementById('playBtn');
const resetBtn = document.getElementById('resetBtn');
const cardEl = document.getElementById('card');

// Fisher–Yates shuffle
function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate and render a new card
function generateCard() {
  cardEl.innerHTML = '';
  const letters = ['B','I','N','G','O'];
  letters.forEach(l => {
    cardEl.insertAdjacentHTML('beforeend', `<div class="header">${l}</div>`);
  });
  
  const cells = shuffle(prompts);
  let idx = 0;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (r === 2 && c === 2) {
        const free = document.createElement('div');
        free.className = 'cell free marked';
        free.textContent = 'FREE';
        cardEl.appendChild(free);
      } else {
        const txt = cells[idx++];
        const div = document.createElement('div');
        div.className = 'cell';
        div.textContent = txt;
        div.addEventListener('click', () => {
          div.classList.toggle('marked');
          if (checkWin()) {
            launchConfetti();
            setTimeout(() => alert("🎉 Bingo! You’ve won!"), 500);
          }
        });
        cardEl.appendChild(div);
      }
    }
  }
}

// Win‐detection: any full row, column, or diagonal
function checkWin() {
  const all = Array.from(cardEl.querySelectorAll('.cell'));
  const grid = [];
  while (all.length) grid.push(all.splice(0, 5));
  const marked = cell => cell.classList.contains('marked') || cell.classList.contains('free');

  // rows
  if (grid.some(row => row.every(marked))) return true;
  // cols
  for (let c = 0; c < 5; c++) {
    if (grid.every(row => marked(row[c]))) return true;
  }
  // diagonals
  if ([0,1,2,3,4].every(i => marked(grid[i][i]))) return true;
  if ([0,1,2,3,4].every(i => marked(grid[i][4 - i]))) return true;

  return false;
}

// Confetti celebration
function launchConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    confetti(Object.assign({}, defaults, {
      particleCount: 50,
      origin: { x: rand(0.1, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

// UI bindings
playBtn.addEventListener('click', () => {
  generateCard();
  cardEl.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
  playBtn.classList.add('hidden');
});
resetBtn.addEventListener('click', generateCard);
