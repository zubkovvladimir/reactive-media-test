import { getFormErrors } from '../validation.js';
import { onFirstButtonClick } from './first';
import { showThirdStep, hideThirdStep } from './third';
import { onFormChange } from '../form';

const MIN_STEP_HEIGHT = 80;
const ANIMATION_INTERVAL = 500;

const form = document.querySelector('.form');
const secondStep = form.querySelector('.details');
const thirdStep = form.querySelector('.agreement');
const detailsWrap = form.querySelector('.details__wrap');

const onSecondStepClick = function () {
  $(thirdStep).animate({
    height: MIN_STEP_HEIGHT + 'px'
  },
  ANIMATION_INTERVAL,
  function () {
    onFirstButtonClick();
  });

  hideThirdStep();
  secondStep.removeEventListener('click', onSecondStepClick);
};

const onSecondButtonClick = function () {
  const isErrors = getFormErrors(detailsWrap);
  form.addEventListener('change', onFormChange);

  if (!isErrors) {
    $(secondStep).animate({
      height: MIN_STEP_HEIGHT + 'px'
    },
    ANIMATION_INTERVAL,
    function () {
      showThirdStep();
    });
  }
};

export {
  onSecondButtonClick,
  onSecondStepClick
};
