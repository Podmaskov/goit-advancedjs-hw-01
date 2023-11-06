import throttle from 'lodash.throttle';
const THROTTLE_TIME = 500;
const LS_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');

(function preFillForm() {
  const localStorageData =
    localStorage.getItem(LS_KEY) && JSON.parse(localStorage.getItem(LS_KEY));

  if (!localStorageData) return;

  const inputEmail = feedbackForm.querySelector('input');
  const textareaMessage = feedbackForm.querySelector('textarea');
  inputEmail.value = localStorageData.email;
  textareaMessage.value = localStorageData.message;
})();

function setDataToLocalStorage({ target }) {
  const localStorageData =
    localStorage.getItem(LS_KEY) && JSON.parse(localStorage.getItem(LS_KEY));

  if (localStorageData) {
    const formData = JSON.stringify({
      ...localStorageData,
      [target.name]: target.value,
    });

    localStorage.setItem(LS_KEY, formData);
  } else {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ [target.name]: target.value })
    );
  }
}

function onSubmit(event) {
  event.preventDefault();
  feedbackForm.reset();
  console.log(JSON.parse(localStorage.getItem(LS_KEY)));
  localStorage.removeItem(LS_KEY);
}

feedbackForm.addEventListener(
  'input',
  throttle(setDataToLocalStorage, THROTTLE_TIME)
);

feedbackForm.addEventListener('submit', onSubmit);
