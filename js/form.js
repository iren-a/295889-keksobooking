'use strict';

(function () {
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var addressInput = document.querySelector('#address');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var typeSelect = document.querySelector('#type');
  var noticeForm = document.querySelector('.notice__form');

  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];


  function syncValues(field, value) {
    field.value = value;
  }

  window.synchronizeFields(timeinSelect, timeoutSelect, CHECK_TIMES, CHECK_TIMES, syncValues);
  window.synchronizeFields(timeoutSelect, timeinSelect, CHECK_TIMES, CHECK_TIMES, syncValues);

  function syncValueMinByValue(field, value) {
    field.min = value;
  }

  window.synchronizeFields(typeSelect, priceInput, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueMinByValue);

  function syncOptionsListbyValue(field, valuesArr) {
    field.value = valuesArr[0];
    for (var i = 0; i < field.options.length; i++) {
      var option = field.options[i];
      if (valuesArr.indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  }

  window.synchronizeFields(roomNumberSelect, capacitySelect, ['1', '2', '3', '100'], [['1'], ['1', '2'], ['1', '2', '3'], ['0']], syncOptionsListbyValue);


  function checkValidityInput(input) {
    if (!input.validity.valid) {
      return false;
    }
    if (input === addressInput) {
      if (addressInput.value === '') {
        return false;
      }
    }
    // для Edge
    if (input === titleInput) {
      if (titleInput.value.length < titleInput.minLength) {
        return false;
      }
    }

    return true;
  }

  function loadHandler() {
    noticeForm.reset();
  }

  function errorHandler(errorMessage) {
    window.utils.showErrorMessage(errorMessage);
  }

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var inputs = document.querySelectorAll('.notice__form input');
    var error = false;

    for (var j = 0; j < inputs.length; j++) {
      if (!checkValidityInput(inputs[j])) {
        inputs[j].classList.add('input_error');
        error = true;
      } else {
        inputs[j].classList.remove('input_error');
      }
    }

    if (!error) {
      window.backend.save(new FormData(noticeForm), loadHandler, errorHandler);
    }

  });

})();
