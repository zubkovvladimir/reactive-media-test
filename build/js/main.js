'use strict';

(function () {
  let form = document.querySelector('.form');

  let firstStep = form.querySelector('.declarant');
  let secondStep = form.querySelector('.details');
  let thirdStep = form.querySelector('.agreement');

  let firstButton = form.querySelector('.declarant .btn');
  let secondButton = form.querySelector('.details .btn');

  let declarantWrap = form.querySelector('.declarant__wrap');
  let detailsWrap = form.querySelector('.details__wrap');
  let agreementWrap = form.querySelector('.agreement__wrap');

  let popup = document.querySelector('.message-succes');

  const onFirstStepClick = function () {
    let start = Date.now();
    firstStep.style.height = '80px';
    declarantWrap.style.display = 'none';
    detailsWrap.style.display = 'flex';
    firstStep.style.backgroundImage = 'url("../../img/agree-icon.svg")';
    secondStep.style.backgroundImage = 'url("../../img/second-blue.svg")';

    let timer = setInterval(function () {
      let timePassed = (Date.now() - start) * 3;

      if (timePassed > 80) secondStep.style.height = timePassed + 'px';
      if (timePassed > 992) {
        secondStep.style.height = '992px';
        clearInterval(timer);
      };

    }, 20);
  }

  const onSecondStepClick =  function () {
    let start = Date.now();
    secondStep.style.height = '80px';
    detailsWrap.style.display = 'none';
    agreementWrap.style.display = 'flex';
    secondStep.style.backgroundImage = 'url("../../img/agree-icon.svg")';
    thirdStep.style.backgroundImage = 'url("../../img/third-blue.svg")';

    let timer = setInterval(function () {
      let timePassed = (Date.now() - start) * 3;

      if (timePassed > 80) thirdStep.style.height = timePassed + 'px';
      if (timePassed > 846) {
        thirdStep.style.height = '855px';
        clearInterval(timer);
      };

    }, 20);
  }


  firstButton.addEventListener('click', onFirstStepClick);
  secondButton.addEventListener('click', onSecondStepClick);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    form.style.display = 'none';
    popup.style.display = 'block';
  });
})();
