// 'use strict';

// (function () {
//   var HASHTAG_PATTERN = /.[^a-zA-Zа-яА-Я0-9]/g;
//   var IS_HASH_SYMBOL = /[^#]/g;
//   var IS_SPACE = /.#/g;
//   var HASHTAG_MAX_LENGTH = 21;
//   var HASHTAG_MAX_COUNT = 5;

//   var picturesContainer = document.querySelector('.pictures');
//   var form = picturesContainer.querySelector('.img-upload__form');
//   var formUploadHashtags = form.querySelector('.text__hashtags');

//   // создает метод для валидации хештегов в форме редактирования

//   var CustomValidation = function () {
//     this.invalidities = [];
//     this.validityChecks = [];
//     this.uniqueInvalidities = [];
//   };

//   // опеределяет прототип метода валидации

//   CustomValidation.prototype = {
//     addInvalidity: function (message) {
//       this.invalidities.push(message);
//     },
//     getInvalidities: function () {
//       this.uniqueInvalidities = [...new Set(this.invalidities)];

//       return this.uniqueInvalidities.join('. \n');
//     },
//     checkValidity: function (input, arrayHashtags) {
//       var isInvalid = this.validityChecks.isInvalid(input, arrayHashtags);

//       if (isInvalid) {
//         this.addInvalidity(this.validityChecks.invalidityMessage);
//         this.validityChecks.element.classList.add('invalid');
//         this.validityChecks.element.classList.remove('valid');
//       } else {
//         this.validityChecks.element.classList.remove('invalid');
//         this.validityChecks.element.classList.add('valid');
//         }
//     }
//   };

//   // массив проверок валидации

//   var usernameValidityChecks = [
//     {
//       isInvalid: function (input) {
//         return input !== '';
//       },
//       invalidityMessage: 'Заполните это поле.',
//       element: form.querySelector('.input-requirements li:nth-child(1)')
//     }
//   ];

//   // валидирует поле хештегов в реальном времени

//   var checkValidity = function (evt) {
//     formUploadHashtags.CustomValidation.invalidities = [];
//     var arrayHashtags = evt.target.value.split(' ');

//     for (var i = 0; i < arrayHashtags.length; i++) {
//       formUploadHashtags.CustomValidation.checkValidity(arrayHashtags[i], arrayHashtags);
//     }

//     var isEmpty = formUploadHashtags.CustomValidation.invalidities.length === 0
//                                             && formUploadHashtags.value !== '';

//     if (isEmpty) {
//       formUploadHashtags.setCustomValidity('');
//     } else if (arrayHashtags.length === 1 && arrayHashtags[0] === ''){
//       formUploadHashtags.setCustomValidity('');
//     } else {
//       var message = formUploadHashtags.CustomValidation.getInvalidities();
//       formUploadHashtags.setCustomValidity(message);
//     }
//   };

//   formUploadHashtags.CustomValidation = new CustomValidation();
//   formUploadHashtags.CustomValidation.validityChecks = usernameValidityChecks;

//   window.validation = {
//     onTextHashtagsInput: checkValidity
//   }
// })();


// (function () {
//   var CustomValidation = function () {
//     this.invalidities = [];
//   }

//   CustomValidation.prototype = {
//     addInvalidity: function (message) {
//       this.invalidities.push(message);
//     },
//     getInvalidities: function () {
//       return this.invalidities.join('. \n');
//     },
//     checkValidity: function (input) {
//       if (input.value.length === 0) {
//         this.addInvalidity('Заполните это поле.')
//       }
//     }
//   }
// })();
