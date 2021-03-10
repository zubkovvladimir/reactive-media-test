import { getFormErrors } from '../validation.js';
import { onFirstButtonClick } from './first';
import { showThirdStep } from './third';
import { onFormChange } from '../form';

const form = document.querySelector('.form');
const secondStep = form.querySelector('.details');
const detailsWrap = form.querySelector('.details__wrap');

const onSecondStepClick = function () {
  onFirstButtonClick();
  secondStep.removeEventListener('click', onSecondStepClick);
};

const onSecondButtonClick = function () {
  const isErrors = getFormErrors(detailsWrap);
  form.addEventListener('change', onFormChange);

  if (!isErrors) {
    showThirdStep();
  }
};

export {
  onSecondButtonClick,
  onSecondStepClick
};
