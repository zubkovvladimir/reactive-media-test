import { stepMap, inputsMap } from '../utils.js';
import { hideThirdStep } from './third';
import { onSecondButtonClick, onSecondStepClick } from './second';
import { addInputsMask } from '../validation.js';

const ANIMATION_INTERVAL = 500;
const MIN_STEP_HEIGHT = 80;

const form = document.querySelector('.form');

const firstStep = form.querySelector('.declarant');
const secondStep = form.querySelector('.details');
const secondButton = secondStep.querySelector('.btn');

const declarantWrap = form.querySelector('.declarant__wrap');
const detailsWrap = form.querySelector('.details__wrap');

const onFirstStepClick = function () {
  $(secondStep).animate({
    height: MIN_STEP_HEIGHT + 'px'
  },
  ANIMATION_INTERVAL);

  $(firstStep).animate({
    height: stepMap.first.height + 'px'
  },
  ANIMATION_INTERVAL,
  function () {
    hideThirdStep();
    firstStep.removeEventListener('click', onFirstStepClick);
    secondStep.removeEventListener('click', onSecondStepClick);
    detailsWrap.style.display = 'none';
  });

  secondStep.style.backgroundImage = 'url("./img/second-gray.svg")';
  firstStep.style.backgroundImage = 'url("./img/' + stepMap.first.name + '-blue.svg")';
  declarantWrap.style.display = 'flex';
};

const onFirstButtonClick = function () {
  addInputsMask(inputsMap);

  $(firstStep).animate({
    height: MIN_STEP_HEIGHT + 'px'
  },
  ANIMATION_INTERVAL);

  $(secondStep).animate({
    height: stepMap.second.height + 'px'
  },
  ANIMATION_INTERVAL,
  function () {
    firstStep.addEventListener('click', onFirstStepClick);
    secondButton.addEventListener('click', onSecondButtonClick);
    declarantWrap.style.display = 'none';
  });

  firstStep.style.backgroundImage = 'url("./img/agree-icon.svg")';
  detailsWrap.style.display = 'flex';
  secondStep.style.backgroundImage = 'url("./img/' + stepMap.second.name + '-blue.svg")';
};

export {
  onFirstButtonClick
};
