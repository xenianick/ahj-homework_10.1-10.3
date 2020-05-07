/* eslint-disable no-param-reassign */
export default function setTimer(timerEl) {
  const timerStr = timerEl.innerHTML;
  let minutes = timerStr.slice(timerStr.indexOf(':') + 1);
  let seconds = timerStr.slice(0, timerStr.indexOf(':'));

  minutes = parseInt(minutes, 10);
  seconds = parseInt(seconds, 10);

  const timerId = setInterval(() => {
    seconds += 1;
    if (seconds > 59) {
      minutes += 1;
      seconds = 0;
    }
    let minutesStr = `${minutes}`;
    let secondsStr = `${seconds}`;

    if (seconds < 10) {
      secondsStr = `0${seconds}`;
    }
    if (minutes < 10) {
      minutesStr = `0${minutes}`;
    }
    const timer = `${minutesStr}:${secondsStr}`;
    timerEl.innerHTML = timer;
  }, 1000);

  return timerId;
}
