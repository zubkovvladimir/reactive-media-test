import { setInputsBorderRed } from './utils.js';

const checkInputsValidation = function (inputs) {
  let errorsCount = 0;
  const isChecbox = inputs[0].type === 'checkbox';

  inputs.forEach(input => {
    const isEmpty = isChecbox ? !(input.checked) : input.value === '';

    isEmpty ? errorsCount += 1 : errorsCount;
  });

  return errorsCount;
};

const getFormErrors = function (step) {
  const inputs = step.querySelectorAll('input');
  setInputsBorderRed(inputs);
  const isErrors = checkInputsValidation(inputs);

  return isErrors;
};

const addInputsMask = function (inputs) {
  inputs.forEach((value, key) => {
    $(key).mask(value);
  });
};

export { getFormErrors, addInputsMask };
