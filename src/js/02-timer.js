import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};
flatpickr('input#datetime-picker', options);

let timerTime = 0;
function checkDate(selectedDate) {
  const currDate = new Date();
  if (selectedDate < currDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else if (!intervalId) {
    refs.start.disabled = false;
    timerTime = selectedDate - new Date();
  }
}

const refs = {
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
refs.start.disabled = true;
refs.start.addEventListener('click', handleStart);
let intervalId = 0;
function handleStart() {
  refs.start.disabled = true;
  const interval = setInterval(calculateTimer, 1000);
  intervalId = interval;
}

function calculateTimer() {
  if (timerTime <= 1000) {
    clearInterval(intervalId);
  }
  const { days, hours, minutes, seconds } = convertMs(timerTime);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
  timerTime -= 1000;
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
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
