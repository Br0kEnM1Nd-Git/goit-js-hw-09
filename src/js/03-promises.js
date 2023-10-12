import Notiflix from 'notiflix';

let delay = 0;
let delayStep = 0;
let amount = 0;
const id = [];

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  id.forEach(id => clearTimeout(id));
  id.splice(0, id.length);
  delay = Number(form.elements.delay.value);
  delayStep = Number(form.elements.step.value);
  amount = Number(form.elements.amount.value);
  form.reset();
  for (let i = 1; i <= amount; i++) {
    id.push(
      setTimeout(
        (i, delay) => {
          createPromise(i, delay)
            .then(({ position, delay }) => {
              Notiflix.Notify.success(
                `✅ Fulfilled promise ${position} in ${delay}ms`
              );
            })
            .catch(({ position, delay }) => {
              Notiflix.Notify.failure(
                `❌ Rejected promise ${position} in ${delay}ms`
              );
            });
        },
        delay,
        i,
        delay
      )
    );
    delay += delayStep;
  }
}
