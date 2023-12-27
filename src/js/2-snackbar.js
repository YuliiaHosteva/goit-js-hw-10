// Описаний в документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayInput = form.querySelector('[name="delay"]');
    const stateInputs = form.querySelectorAll('[name="state"]');
    const selectedState = Array.from(stateInputs).find(input => input.checked);

    if (!selectedState) {
      // Якщо стан не обрано, вивести повідомлення
      iziToast.error({
        title: 'Error',
        message: 'Please choose a state (Fulfilled or Rejected)',
      });
      return;
    }

    const delay = parseInt(delayInput.value);

    if (isNaN(delay) || delay <= 0) {
      // Якщо введено некоректне значення затримки, вивести повідомлення
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid delay (greater than 0)',
      });
      return;
    }

    // Створюємо проміс з вказаною затримкою
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Викликаємо resolve або reject в залежності від обраного стану
        selectedState.value === 'fulfilled' ? resolve(delay) : reject(delay);
      }, delay);
    });

    // Обробляємо результати промісу
    promise
      .then((result) => {
        // Виводимо повідомлення про вдале виконання
        iziToast.success({
          title: 'Fulfilled Promise',
          message: `✅ Fulfilled promise in ${result}ms`,
        });
      })
      .catch((error) => {
        // Виводимо повідомлення про невдале виконання
        iziToast.error({
          title: 'Rejected Promise',
          message: `❌ Rejected promise in ${error}ms`,
        });
      });
  });
});
