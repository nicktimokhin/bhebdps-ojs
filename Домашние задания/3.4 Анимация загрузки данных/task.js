// task.js

const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');

// Ключ для хранения данных в localStorage
const STORAGE_KEY = 'currencyRates';
const EXPIRATION_KEY = 'currencyRatesExpiration';

// Функция для отображения данных
function renderCurrencies(valute) {
  itemsContainer.innerHTML = ''; // очищаем контейнер
  for (const code in valute) {
    const item = valute[code];
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <div class="item__code">${item.CharCode}</div>
      <div class="item__value">${item.Value.toFixed(4)}</div>
      <div class="item__currency">руб.</div>
    `;
    itemsContainer.appendChild(div);
  }
}

// Проверяем, есть ли кэш в localStorage и не устарел ли он (например, старше 10 минут)
function getFromCache() {
  const cachedData = localStorage.getItem(STORAGE_KEY);
  const expiration = localStorage.getItem(EXPIRATION_KEY);
  const now = new Date().getTime();

  if (cachedData && expiration && now < parseInt(expiration)) {
    try {
      const parsed = JSON.parse(cachedData);
      renderCurrencies(parsed);
      return true;
    } catch (e) {
      // Если кэш повреждён — игнорируем
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRATION_KEY);
    }
  }
  return false;
}

// Устанавливаем срок действия кэша — 10 минут
function setCache(data) {
  const expirationTime = new Date().getTime() + 10 * 60 * 1000; // +10 минут
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(EXPIRATION_KEY, expirationTime.toString());
}

// Функция загрузки данных с сервера
function fetchCurrencyRates() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      loader.classList.remove('loader_active'); // скрываем лоадер
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          const valute = response.response.Valute;
          renderCurrencies(valute);
          setCache(valute); // сохраняем в кэш
        } catch (e) {
          console.error('Ошибка при разборе JSON:', e);
        }
      } else {
        console.error('Ошибка запроса:', xhr.status);
      }
    }
  };
  xhr.send();
}

// Основной запуск
document.addEventListener('DOMContentLoaded', () => {
  // Сначала пытаемся загрузить из кэша
  const hasCache = getFromCache();

  // В любом случае запрашиваем свежие данные
  fetchCurrencyRates();

  // Если кэша не было — лоадер уже показывается по умолчанию (loader_active)
  // Если кэш есть — он отобразился сразу, а потом обновится свежими данными
});