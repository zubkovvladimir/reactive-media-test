const FIRST_STEP_MAX_HEIGHT = 344;
const SECOND_STEP_MAX_HEIGHT = 992;
const THIRD_STEP_MAX_HEIGHT = 855;

const IS_FIRST_STEP = 'first';
const IS_SECOND_STEP = 'second';
const IS_THIRD_STEP = 'third';

const stepMap = {
  first: {
    height: FIRST_STEP_MAX_HEIGHT,
    name: IS_FIRST_STEP
  },
  second: {
    height: SECOND_STEP_MAX_HEIGHT,
    name: IS_SECOND_STEP
  },
  third: {
    height: THIRD_STEP_MAX_HEIGHT,
    name: IS_THIRD_STEP
  }
};

const inputsMap = new Map([
  ['#tel', '+7 (999) 999-99-99'],
  ['#series', '9999'],
  ['#number', '999999'],
  ['#day', '99'],
  ['#month', '99'],
  ['#year', '9999']
]);

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

export {
  setInputsBorderRed,
  inputsMap,
  stepMap
};
