import 'jquery.maskedinput';
import { onFirstButtonClick } from './steps/first';

const firstButton = document.querySelector('.btn');

firstButton.addEventListener('click', onFirstButtonClick);
