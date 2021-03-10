const MIN_STEP_HEIGHT = 80;
const IS_FIRST_STEP = 'first';

const setStylesStep = function (resizeBlock, hideBlock, showBlock, backgroundBlock, stepNumber) {
  resizeBlock.style.height = MIN_STEP_HEIGHT + 'px';
  showBlock.style.display = 'flex';
  hideBlock.style.display = 'none';
  stepNumber === IS_FIRST_STEP ? resizeBlock.style.backgroundImage = 'url("./img/second-gray.svg")'
    : resizeBlock.style.backgroundImage = 'url("./img/agree-icon.svg")';
  backgroundBlock.style.backgroundImage = 'url("./img/' + stepNumber + '-blue.svg")';
};

export { setStylesStep };
