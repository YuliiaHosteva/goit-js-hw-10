import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      datetimePicker.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener("click", startTimer);

function startTimer() {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  const intervalId = setInterval(() => {
    const timeLeft = calculateTimeLeft(userSelectedDate);
    updateTimer(timeLeft);

    if (timeLeft.total <= 0) {
      clearInterval(intervalId);
      iziToast.success({
        title: "Timer Finished",
        message: "The countdown has ended!",
      });
    }
  }, 1000);
}

function calculateTimeLeft(endDate) {
  const difference = endDate - new Date();
  const timeLeft = convertMs(difference);
  return timeLeft;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  const nonNegativeDays = Math.max(0, days);
  const nonNegativeHours = Math.max(0, hours);
  const nonNegativeMinutes = Math.max(0, minutes);
  const nonNegativeSeconds = Math.max(0, seconds);

return {
    days: nonNegativeDays,
    hours: nonNegativeHours,
    minutes: nonNegativeMinutes,
    seconds: nonNegativeSeconds,
    total: ms
  };

}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
