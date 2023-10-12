import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let targetDate = null;
let countdown = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      alert('Please choose a date in the future');
    } else {
      targetDate = selectedDates[0];
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

document.querySelector('[data-start]').addEventListener('click', function () {
  if (!targetDate) {
    alert('Please select a date first');
    return;
  }

  this.disabled = true;

  if (countdown) {
    clearInterval(countdown);
  }

  countdown = setInterval(() => {
    const currentTime = new Date().getTime();
    const difference = targetDate - currentTime;

    const time = convertMs(difference);
    document.querySelector('[data-days]').innerText = addLeadingZero(time.days);
    document.querySelector('[data-hours]').innerText = addLeadingZero(
      time.hours
    );
    document.querySelector('[data-minutes]').innerText = addLeadingZero(
      time.minutes
    );
    document.querySelector('[data-seconds]').innerText = addLeadingZero(
      time.seconds
    );

    if (difference <= 0) {
      clearInterval(countdown);
    }
  }, 1000);
});

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
  return String(value).padStart(2, '0');
}
