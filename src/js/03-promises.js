document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();

  const delayElement = e.target.elements['delay'];
  const stepElement = e.target.elements['step'];
  const amountElement = e.target.elements['amount'];

  const delay = Number(delayElement.value);
  const step = Number(stepElement.value);
  const amount = Number(amountElement.value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + step * i;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        // Folosește Notiflix sau console.log aici:
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Folosește Notiflix sau console.log aici:
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        // Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const returnValue = { position, delay };
      if (shouldResolve) {
        resolve(returnValue);
      } else {
        reject(returnValue);
      }
    }, delay);
  });
}
