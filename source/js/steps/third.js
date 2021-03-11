import { getFormErrors } from '../validation.js';
import { onFormSubmit } from '../form';
import { onSecondStepClick } from './second';
import { stepMap } from '../utils.js';

const MIN_STEP_HEIGHT = 80;
const ANIMATION_INTERVAL = 500;

const form = document.querySelector('.form');
const thirdStep = form.querySelector('.agreement');
const agreementWrap = form.querySelector('.agreement__wrap');
const secondStep = form.querySelector('.details');
const detailsWrap = form.querySelector('.details__wrap');

const hideThirdStep = function () {
  $(thirdStep).animate({
    height: MIN_STEP_HEIGHT + 'px'
  },
  ANIMATION_INTERVAL, function () {
    agreementWrap.style.display = 'none';
  });
  thirdStep.style.backgroundImage = 'url("./img/third-gray.svg")';
};

const onChekboxChange = function () {
  const isErrors = getFormErrors(agreementWrap);

  if (!isErrors) {
    form.addEventListener('submit', onFormSubmit);
  }
};

const showThirdStep = function () {
  $(thirdStep).animate({
    height: stepMap.third.height + 'px'
  },
  ANIMATION_INTERVAL,
  function () {
    secondStep.addEventListener('click', onSecondStepClick);
    form.addEventListener('submit', onFormSubmit);
    detailsWrap.style.display = 'none';
  });
  secondStep.style.backgroundImage = 'url("./img/agree-icon.svg")';
  thirdStep.style.backgroundImage = 'url("./img/' + stepMap.third.name + '-blue.svg")';
  agreementWrap.style.display = 'flex';
};

export {
  hideThirdStep,
  onChekboxChange,
  showThirdStep
};
