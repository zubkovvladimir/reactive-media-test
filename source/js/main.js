'use strict';

(function () {
  var form = document.querySelector('.form');

  var firstStep = form.querySelector('.declarant');
  var secondStep = form.querySelector('.details');
  var thirdStep = form.querySelector('.agreement');

  var firstButton = form.querySelector('.declarant .btn');
  var secondButton = form.querySelector('.details .btn');

  var declarantWrap = form.querySelector('.declarant__wrap');
  var detailsWrap = form.querySelector('.details__wrap');
  var agreementWrap = form.querySelector('.agreement__wrap');

  var popup = document.querySelector('.message-succes');

  detailsWrap.addEventListener('invalid', function () {
    onSecondStepClick();
  }, true);

  var hideThirdStep = function () {
    thirdStep.style.height = '80px';
    thirdStep.style.backgroundImage = 'url("./img/third-gray.svg")';
  }

  var setStylesStep = function (resizeBlock, hideBlock, showBlock, backgroundBlock, stepNumber) {
    resizeBlock.style.height = '80px';
    showBlock.style.display = 'flex';
    hideBlock.style.display = 'none';
    stepNumber === 'first' ? resizeBlock.style.backgroundImage = 'url("./img/second-gray.svg")'
                           : resizeBlock.style.backgroundImage = 'url("./img/agree-icon.svg")';;
    backgroundBlock.style.backgroundImage = 'url("./img/' + stepNumber + '-blue.svg")';
  }

  var onFirstStepClick = function () {
    var start = Date.now();

    setStylesStep(secondStep, detailsWrap, declarantWrap, firstStep, 'first');
    hideThirdStep();

    var timer = setInterval(function () {
      var timePassed = (Date.now() - start) * 3;

      if (timePassed > 80) {
        firstStep.style.height = timePassed + 'px';
      }

      if (timePassed > 344) {
        firstStep.style.height = '344px';
        clearInterval(timer);

        firstStep.removeEventListener('click', onFirstStepClick);
        secondStep.removeEventListener('click', onSecondStepClick);
      };

    }, 20);
  }

  var onFirstButtonClick = function () {
    var start = Date.now();

    setStylesStep(firstStep, declarantWrap, detailsWrap, secondStep, 'second');

    var timer = setInterval(function () {
      var timePassed = (Date.now() - start) * 3;

      if (timePassed > 80) {
        secondStep.style.height = timePassed + 'px';
      }

      if (timePassed > 992) {
        secondStep.style.height = '992px';
        clearInterval(timer);

        firstStep.addEventListener('click', onFirstStepClick);
      };

    }, 20);
  }

  var onSecondStepClick = function () {
    onFirstButtonClick();
    secondStep.removeEventListener('click', onSecondStepClick);
    hideThirdStep();
  }

  var onSecondButtonClick =  function () {
    var start = Date.now();

    setStylesStep(secondStep, detailsWrap, agreementWrap, thirdStep, 'third');

    var timer = setInterval(function () {
      var timePassed = (Date.now() - start) * 3;

      if (timePassed > 80) {
        thirdStep.style.height = timePassed + 'px';
      }

      if (timePassed > 846) {
        thirdStep.style.height = '855px';
        clearInterval(timer);

        secondStep.addEventListener('click', onSecondStepClick);
      };

    }, 20);
  }

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    form.style.display = 'none';
    popup.style.display = 'block';
  };


  firstButton.addEventListener('click', onFirstButtonClick);
  secondButton.addEventListener('click', onSecondButtonClick);
  form.addEventListener('submit', onFormSubmit);
})();
