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

const checkInputsValidation = function (inputs) {
  console.log(inputs);
  let errorsCount = 0;
  const isChecbox = inputs[0].type === 'checkbox';
  console.log(isChecbox + ' isChekbox');

  inputs.forEach(input => {
    const isEmpty = isChecbox ? !(input.checked) : input.value === '';
    console.log(input);
    console.log(isEmpty);

    if (isEmpty) {
      isChecbox ? input.labels[0].style.borderColor = 'red' : input.style.borderColor = 'red';
      errorsCount += 1;
    } else if (input.value !== '') {
      isChecbox ? input.labels[0].style.borderColor = '' : input.style.borderColor = '';
    };
  });
  console.log(errorsCount);
  return errorsCount;
}

$("#tel").mask("+7 (999) 999-99-99");
$("#series").mask("9999");
$("#number").mask("999999");
$("#day").mask("99");
$("#month").mask("99");
$("#year").mask("9999");

/* end validation */

const hideThirdStep = function () {
  thirdStep.style.height = MIN_STEP_HEIGHT + 'px';
  agreementWrap.style.display = 'none';
  thirdStep.style.backgroundImage = 'url("./img/third-gray.svg")';
}

const setStylesStep = function (resizeBlock, hideBlock, showBlock, backgroundBlock, stepNumber) {
  resizeBlock.style.height = MIN_STEP_HEIGHT + 'px';
  showBlock.style.display = 'flex';
  hideBlock.style.display = 'none';
  stepNumber === IS_FIRST_STEP ? resizeBlock.style.backgroundImage = 'url("./img/second-gray.svg")'
                                : resizeBlock.style.backgroundImage = 'url("./img/agree-icon.svg")';
  backgroundBlock.style.backgroundImage = 'url("./img/' + stepNumber + '-blue.svg")';
}

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
    };

  }, INTERVAL_DELAY);
}

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
      secondButton.addEventListener('click',onSecondButtonClick);
      form.addEventListener('change',onFormChange);
    };

  }, INTERVAL_DELAY);
}

const onSecondStepClick = function () {
  onFirstButtonClick();
  secondStep.removeEventListener('click', onSecondStepClick);
}

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
    };

  }, INTERVAL_DELAY);
}

const onSecondButtonClick =  function () {
  const inputs = detailsWrap.querySelectorAll('input');
  const isErrors = checkInputsValidation(inputs);

  if (!isErrors) {
    showThirdStep();
  }
}

const onFormChange = function () {
  const inputs = detailsWrap.querySelectorAll('input');
  const isErrors = checkInputsValidation(inputs);

  if (!isErrors) {
    form.removeEventListener('change',onFormChange);
    secondButton.addEventListener('click',onSecondButtonClick);
  }
}

const onFormSubmit = function (evt) {
  evt.preventDefault();
  const inputs = agreementWrap.querySelectorAll('.agreement__input');
  const isErrors = checkInputsValidation(inputs);

  if (!isErrors) {
    form.style.display = 'none';
    message.style.display = 'block';
  }
};


firstButton.addEventListener('click', onFirstButtonClick);
