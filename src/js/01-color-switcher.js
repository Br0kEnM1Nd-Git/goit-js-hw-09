function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let colorChangeId = 0;

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
refs.stop.disabled = true;
refs.start.addEventListener('click', handleStart);
refs.stop.addEventListener('click', handleStop);

function handleStart() {
  refs.start.disabled = true;
  refs.stop.disabled = false;
  const colorChange = setInterval(() => {
    const randC = getRandomHexColor();
    document.querySelector('body').style.backgroundColor = randC;
  }, 1000);
  colorChangeId = colorChange;
}

function handleStop() {
  refs.start.disabled = false;
  refs.stop.disabled = true;
  clearInterval(colorChangeId);
}
