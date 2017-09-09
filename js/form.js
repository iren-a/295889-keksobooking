'use strict';

(function () {
  var titleInput = document.getElementById('title');
  var priceInput = document.getElementById('price');
  var addressInput = document.getElementById('address');
  var timeinSelect = document.getElementById('timein');
  var timeoutSelect = document.getElementById('timeout');
  var roomNumberSelect = document.getElementById('room_number');
  var capacitySelect = document.getElementById('capacity');
  var typeSelect = document.getElementById('type');
  var noticeForm = document.querySelector('.notice__form');

  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];


  var syncValues = function (field, value) {
    field.value = value;
  };

  window.synchronizeFields(timeinSelect, timeoutSelect, CHECK_TIMES, CHECK_TIMES, syncValues);
  window.synchronizeFields(timeoutSelect, timeinSelect, CHECK_TIMES, CHECK_TIMES, syncValues);

  var syncValueMinByValue = function (field, value) {
    field.min = value;
  };

  window.synchronizeFields(typeSelect, priceInput, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueMinByValue);

  var syncOptionsListbyValue = function (field, valuesArr) {
    field.value = valuesArr[0];
    for (var i = 0; i < field.options.length; i++) {
      var option = field.options[i];
      if (valuesArr.indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  };

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

  noticeForm.addEventListener('submit', function (evt) {

    var inputs = document.querySelectorAll('.notice__form input');
    var stopSubmit = false;

    for (var j = 0; j < inputs.length; j++) {
      if (!checkValidityInput(inputs[j])) {
        inputs[j].style = 'border: 2px solid red;';
        stopSubmit = true;
      } else {
        inputs[j].style = '';
      }
    }
    if (stopSubmit) {
      evt.preventDefault();
    }

  });

})();
