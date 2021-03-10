import { setStylesStep, stepMap } from '../utils.js';
import { hideThirdStep } from './third';
import { onSecondButtonClick, onSecondStepClick } from './second';

const MIN_STEP_HEIGHT = 80;
const TIME_SPEED_MULTIPLIER = 5;
const INTERVAL_DELAY = 1;

const form = document.querySelector('.form');

const firstStep = form.querySelector('.declarant');
const secondStep = form.querySelector('.details');
const secondButton = secondStep.querySelector('.btn');

const declarantWrap = form.querySelector('.declarant__wrap');
const detailsWrap = form.querySelector('.details__wrap');

const onFirstStepClick = function () {
  const start = Date.now();

  const timer = setInterval(function () {
    const timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

    if (timePassed > MIN_STEP_HEIGHT) {
      firstStep.style.height = timePassed + 'px';
    }

    if (timePassed > stepMap.first.height) {
      firstStep.style.height = stepMap.first.height + 'px';
      clearInterval(timer);

      setStylesStep(secondStep, detailsWrap, declarantWrap, firstStep, stepMap.first.name);
      hideThirdStep();

      firstStep.removeEventListener('click', onFirstStepClick);
      secondStep.removeEventListener('click', onSecondStepClick);
    }
  }, INTERVAL_DELAY);
};

const onFirstButtonClick = function () {
  const start = Date.now();

  const timer = setInterval(function () {
    const timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

    if (timePassed > MIN_STEP_HEIGHT) {
      secondStep.style.height = timePassed + 'px';
    }

    if (timePassed > stepMap.second.height) {
      secondStep.style.height = stepMap.second.height + 'px';
      clearInterval(timer);

      setStylesStep(firstStep, declarantWrap, detailsWrap, secondStep, stepMap.second.name);
      hideThirdStep();

      firstStep.addEventListener('click', onFirstStepClick);
      secondButton.addEventListener('click', onSecondButtonClick);
    }
  }, INTERVAL_DELAY);
};

export {
  onFirstButtonClick
};
