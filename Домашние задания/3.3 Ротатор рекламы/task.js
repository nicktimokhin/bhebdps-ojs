document.addEventListener('DOMContentLoaded', () => {
  const rotators = document.querySelectorAll('.rotator');

  rotators.forEach(rotator => {
    let intervalId;

    const rotate = () => {
      const active = rotator.querySelector('.rotator__case_active');
      const items = Array.from(rotator.querySelectorAll('.rotator__case'));
      const currentIndex = items.indexOf(active);

      // Убираем активный класс и стиль (цвет регулируется через родителя)
      if (active) {
        active.classList.remove('rotator__case_active');
      }

      // Определяем следующий элемент
      const nextIndex = (currentIndex + 1) % items.length;
      const nextItem = items[nextIndex];

      // Делаем его активным
      nextItem.classList.add('rotator__case_active');

      // Применяем цвет из data-color (если нет — чёрный)
      rotator.style.color = nextItem.dataset.color || 'black';

      // Берём скорость из текущего (только что ушедшего) элемента
      // Но на первой итерации active — это тот, что был до rotate()
      const speed = active ? (parseInt(active.dataset.speed, 10) || 1000) : 1000;

      // Обновляем интервал с новой скоростью
      clearInterval(intervalId);
      intervalId = setTimeout(rotate, speed); // используем setTimeout для гибкой скорости
    };

    // Запуск: определяем начальный активный элемент
    const firstActive = rotator.querySelector('.rotator__case_active');
    if (firstActive) {
      // Применяем начальный цвет
      rotator.style.color = firstActive.dataset.color || 'black';
      // Запускаем первый таймаут с его скоростью
      const firstSpeed = parseInt(firstActive.dataset.speed, 10) || 1000;
      intervalId = setTimeout(rotate, firstSpeed);
    } else {
      // Если никто не активен — активируем первый
      const first = rotator.querySelector('.rotator__case');
      if (first) {
        first.classList.add('rotator__case_active');
        rotator.style.color = first.dataset.color || 'black';
        const firstSpeed = parseInt(first.dataset.speed, 10) || 1000;
        intervalId = setTimeout(rotate, firstSpeed);
      }
    }
  });
});