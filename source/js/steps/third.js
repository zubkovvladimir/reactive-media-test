import { getFormErrors } from '../validation.js';
import { onFormSubmit } from '../form';
import { onSecondStepClick } from './second';
import { setStylesStep, stepMap } from '../utils.js';

const MIN_STEP_HEIGHT = 80;
const TIME_SPEED_MULTIPLIER = 5;
const INTERVAL_DELAY = 1;

const form = document.querySelector('.form');
const thirdStep = form.querySelector('.agreement');
const agreementWrap = form.querySelector('.agreement__wrap');
const secondStep = form.querySelector('.details');
const detailsWrap = form.querySelector('.details__wrap');

const hideThirdStep = function () {
  thirdStep.style.height = MIN_STEP_HEIGHT + 'px';
  agreementWrap.style.display = 'none';
  thirdStep.style.backgroundImage = 'url("./img/third-gray.svg")';
};

const onChekboxChange = function () {
  const isErrors = getFormErrors(agreementWrap);

  if (!isErrors) {
    form.addEventListener('submit', onFormSubmit);
  }
};

const showThirdStep = function () {
  const start = Date.now();

  const timer = setInterval(function () {
    const timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

    if (timePassed > MIN_STEP_HEIGHT) {
      thirdStep.style.height = timePassed + 'px';
    }

    if (timePassed > stepMap.third.height) {
      thirdStep.style.height = stepMap.third.height + 'px';
      clearInterval(timer);

      setStylesStep(secondStep, detailsWrap, agreementWrap, thirdStep, stepMap.third.name);

      secondStep.addEventListener('click', onSecondStepClick);
      form.addEventListener('submit', onFormSubmit);
    }
  }, INTERVAL_DELAY);
};

export {
  hideThirdStep,
  onChekboxChange,
  showThirdStep
};
