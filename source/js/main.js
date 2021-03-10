const MIN_STEP_HEIGHT = 80;
const FIRST_STEP_MAX_HEIGHT = 344;
const SECOND_STEP_MAX_HEIGHT = 992;
const THIRD_STEP_MAX_HEIGHT = 855;

const IS_FIRST_STEP = 'first';
const IS_THIRD_STEP = 'third';
const IS_SECOND_STEP = 'second';

const TIME_SPEED_MULTIPLIER = 5;
const INTERVAL_DELAY = 1;

const form = document.querySelector('.form');

const firstStep = form.querySelector('.declarant');
const secondStep = form.querySelector('.details');
const thirdStep = form.querySelector('.agreement');

const firstButton = firstStep.querySelector('.btn');
const secondButton = secondStep.querySelector('.btn');

const declarantWrap = form.querySelector('.declarant__wrap');
const detailsWrap = form.querySelector('.details__wrap');
const agreementWrap = form.querySelector('.agreement__wrap');

const message = document.querySelector('.message-succes');

// validation second step

$('#tel').mask('+7 (999) 999-99-99');
$('#series').mask('9999');
$('#number').mask('999999');
$('#day').mask('99');
$('#month').mask('99');
$('#year').mask('9999');

/* end validation */

const hideThirdStep = function () {
  thirdStep.style.height = MIN_STEP_HEIGHT + 'px';
  agreementWrap.style.display = 'none';
  thirdStep.style.backgroundImage = 'url("./img/third-gray.svg")';
};

const setStylesStep = function (resizeBlock, hideBlock, showBlock, backgroundBlock, stepNumber) {
  resizeBlock.style.height = MIN_STEP_HEIGHT + 'px';
  showBlock.style.display = 'flex';
  hideBlock.style.display = 'none';
  stepNumber === IS_FIRST_STEP ? resizeBlock.style.backgroundImage = 'url("./img/second-gray.svg")'
    : resizeBlock.style.backgroundImage = 'url("./img/agree-icon.svg")';
  backgroundBlock.style.backgroundImage = 'url("./img/' + stepNumber + '-blue.svg")';
};

const onFirstStepClick = function () {
  const start = Date.now();

  const timer = setInterval(function () {
    const timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

    if (timePassed > MIN_STEP_HEIGHT) {
      firstStep.style.height = timePassed + 'px';
    }

    if (timePassed > FIRST_STEP_MAX_HEIGHT) {
      firstStep.style.height = FIRST_STEP_MAX_HEIGHT + 'px';
      clearInterval(timer);

      setStylesStep(secondStep, detailsWrap, declarantWrap, firstStep, IS_FIRST_STEP);
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

    if (timePassed > SECOND_STEP_MAX_HEIGHT) {
      secondStep.style.height = SECOND_STEP_MAX_HEIGHT + 'px';
      clearInterval(timer);

      setStylesStep(firstStep, declarantWrap, detailsWrap, secondStep, IS_SECOND_STEP);
      hideThirdStep();

      firstStep.addEventListener('click', onFirstStepClick);
      secondButton.addEventListener('click', onSecondButtonClick);
    }
  }, INTERVAL_DELAY);
};

const onSecondStepClick = function () {
  onFirstButtonClick();
  secondStep.removeEventListener('click', onSecondStepClick);
};

const showThirdStep = function () {
  const start = Date.now();

  const timer = setInterval(function () {
    const timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

    if (timePassed > MIN_STEP_HEIGHT) {
      thirdStep.style.height = timePassed + 'px';
    }

    if (timePassed > THIRD_STEP_MAX_HEIGHT) {
      thirdStep.style.height = THIRD_STEP_MAX_HEIGHT + 'px';
      clearInterval(timer);

      setStylesStep(secondStep, detailsWrap, agreementWrap, thirdStep, IS_THIRD_STEP);

      secondStep.addEventListener('click', onSecondStepClick);
      form.addEventListener('submit', onFormSubmit);
    }
  }, INTERVAL_DELAY);
};

const checkInputsValidation = function (inputs) {
  let errorsCount = 0;
  const isChecbox = inputs[0].type === 'checkbox';

  inputs.forEach(input => {
    const isEmpty = isChecbox ? !(input.checked) : input.value === '';

    isEmpty ? errorsCount += 1 : errorsCount;
  });

  return errorsCount;
};

const setInputsBorderRed = function (inputs) {
  const isChecbox = inputs[0].type === 'checkbox';

  inputs.forEach(input => {
    const isEmpty = isChecbox ? !(input.checked) : input.value === '';

    if (isEmpty) {
      isChecbox ? input.labels[0].style.borderColor = 'red' : input.style.borderColor = 'red';
    } else if (!isEmpty) {
      isChecbox ? input.labels[0].style.borderColor = '' : input.style.borderColor = '';
    }
  });
};

const onSecondButtonClick = function () {
  const isErrors = getFormErrors(detailsWrap);
  form.addEventListener('change', onFormChange);

  if (!isErrors) {
    showThirdStep();
  }
};

const getFormErrors = function (step) {
  const inputs = step.querySelectorAll('input');
  setInputsBorderRed(inputs);
  const isErrors = checkInputsValidation(inputs);

  return isErrors;
};

const onFormChange = function () {
  const isErrors = getFormErrors(detailsWrap);

  if (!isErrors) {
    form.removeEventListener('change', onFormChange);
    secondButton.addEventListener('click', onSecondButtonClick);
  }
};

const onChekboxChange = function () {
  const isErrors = getFormErrors(agreementWrap);

  if (!isErrors) {
    form.addEventListener('submit', onFormSubmit);
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

firstButton.addEventListener('click', onFirstButtonClick);
