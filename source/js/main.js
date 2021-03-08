'use strict';

(function () {
  var MIN_STEP_HEIGHT = 80;
  var FIRST_STEP_MAX_HEIGHT = 344;
  var SECOND_STEP_MAX_HEIGHT = 992;
  var THIRD_STEP_MAX_HEIGHT = 855;

  var IS_FIRST_STEP = 'first';
  var IS_THIRD_STEP = 'third';
  var IS_SECOND_STEP = 'second';

  var TIME_SPEED_MULTIPLIER = 5;
  var INTERVAL_DELAY = 1;

  var form = document.querySelector('.form');

  var firstStep = form.querySelector('.declarant');
  var secondStep = form.querySelector('.details');
  var thirdStep = form.querySelector('.agreement');

  var firstButton = firstStep.querySelector('.btn');
  var secondButton = secondStep.querySelector('.btn');

  var declarantWrap = form.querySelector('.declarant__wrap');
  var detailsWrap = form.querySelector('.details__wrap');
  var agreementWrap = form.querySelector('.agreement__wrap');

  var message = document.querySelector('.message-succes');

  detailsWrap.addEventListener('invalid', function () {
    onSecondStepClick();
  }, true);

  var hideThirdStep = function () {
    thirdStep.style.height = MIN_STEP_HEIGHT + 'px';
    agreementWrap.style.display = 'none';
    thirdStep.style.backgroundImage = 'url("./img/third-gray.svg")';
  }

  var setStylesStep = function (resizeBlock, hideBlock, showBlock, backgroundBlock, stepNumber) {
    resizeBlock.style.height = MIN_STEP_HEIGHT + 'px';
    showBlock.style.display = 'flex';
    hideBlock.style.display = 'none';
    stepNumber === IS_FIRST_STEP ? resizeBlock.style.backgroundImage = 'url("./img/second-gray.svg")'
                                  : resizeBlock.style.backgroundImage = 'url("./img/agree-icon.svg")';
    backgroundBlock.style.backgroundImage = 'url("./img/' + stepNumber + '-blue.svg")';
  }

  var onFirstStepClick = function () {
    var start = Date.now();

    var timer = setInterval(function () {
      var timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

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

  var onFirstButtonClick = function () {
    var start = Date.now();

    var timer = setInterval(function () {
      var timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

      if (timePassed > MIN_STEP_HEIGHT) {
        secondStep.style.height = timePassed + 'px';
      }

      if (timePassed > SECOND_STEP_MAX_HEIGHT) {
        secondStep.style.height = SECOND_STEP_MAX_HEIGHT + 'px';
        clearInterval(timer);

        setStylesStep(firstStep, declarantWrap, detailsWrap, secondStep, IS_SECOND_STEP);
        hideThirdStep();

        firstStep.addEventListener('click', onFirstStepClick);
      };

    }, INTERVAL_DELAY);
  }

  var onSecondStepClick = function () {
    onFirstButtonClick();
    secondStep.removeEventListener('click', onSecondStepClick);
  }

  var onSecondButtonClick =  function () {
    var start = Date.now();

    var timer = setInterval(function () {
      var timePassed = (Date.now() - start) * TIME_SPEED_MULTIPLIER;

      if (timePassed > MIN_STEP_HEIGHT) {
        thirdStep.style.height = timePassed + 'px';
      }

      if (timePassed > THIRD_STEP_MAX_HEIGHT) {
        thirdStep.style.height = THIRD_STEP_MAX_HEIGHT + 'px';
        clearInterval(timer);

        setStylesStep(secondStep, detailsWrap, agreementWrap, thirdStep, IS_THIRD_STEP);

        secondStep.addEventListener('click', onSecondStepClick);
      };

    }, INTERVAL_DELAY);
  }

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    form.style.display = 'none';
    message.style.display = 'block';
  };


  firstButton.addEventListener('click', onFirstButtonClick);
  secondButton.addEventListener('click', onSecondButtonClick);
  form.addEventListener('submit', onFormSubmit);
})();
