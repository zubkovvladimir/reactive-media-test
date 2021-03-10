import { getFormErrors } from './validation.js';
import { onSecondButtonClick } from './steps/second';
import { onChekboxChange } from './steps/third';

const form = document.querySelector('.form');

const secondStep = form.querySelector('.details');
const secondButton = secondStep.querySelector('.btn');

const detailsWrap = form.querySelector('.details__wrap');
const agreementWrap = form.querySelector('.agreement__wrap');

const message = document.querySelector('.message-succes');

const onFormChange = function () {
  const isErrors = getFormErrors(detailsWrap);

  if (!isErrors) {
    form.removeEventListener('change', onFormChange);
    secondButton.addEventListener('click', onSecondButtonClick);
  }
};

const onFormSubmit = function (evt) {
  evt.preventDefault();
  const isErrors = getFormErrors(agreementWrap);

  if (isErrors) {
    const checkboxes = agreementWrap.querySelectorAll('input');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', onChekboxChange);
    });
  } else {
    form.style.display = 'none';
    message.style.display = 'block';
  }
};

export {
  onFormSubmit,
  onFormChange
};
