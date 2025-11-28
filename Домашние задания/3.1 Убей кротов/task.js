let dead = 0;
let lost = 0;

const deadEl = document.getElementById('dead');
const lostEl = document.getElementById('lost');

function updateCounters() {
  deadEl.textContent = dead;
  lostEl.textContent = lost;
}

// Назначаем клики
for (let i = 1; i <= 9; i++) {
  document.getElementById(`hole${i}`).onclick = function () {
    // Проверяем наличие крота
    if (this.className.includes('hole_has-mole')) {
      dead++;
      if (dead >= 10) {
        alert('Вы победили!');
        dead = lost = 0;
        updateCounters();
        return;
      }
    } else {
      lost++;
      if (lost >= 5) {
        alert('Вы проиграли!');
        dead = lost = 0;
        updateCounters();
        return;
      }
    }
    updateCounters();
  };
}