'use strict';

(function () {
  var titleInput = document.getElementById('title');
  var priceInput = document.getElementById('price');
  var address = document.getElementById('address');
  var timeinSelect = document.getElementById('timein');
  var timeoutSelect = document.getElementById('timeout');
  var roomNumberSelect = document.getElementById('room_number');
  var capacitySelect = document.getElementById('capacity');
  var typeSelect = document.getElementById('type');
  var noticeForm = document.querySelector('.notice__form');

  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;

  var PRICE_MIN_VALUE = 0;
  var PRICE_MAX_VALUE = 1000000;

  var ROOMS_CAPACITY_MAP = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var HOUSING_TYPES_PRICE_MAP = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  timeinSelect.addEventListener('change', function (evt) {
    var target = evt.target;
    timeoutSelect.value = target.value;
  });

  timeoutSelect.addEventListener('change', function (evt) {
    var target = evt.target;
    timeinSelect.value = target.value;
  });

  typeSelect.addEventListener('change', function (evt) {
    var target = evt.target;
    priceInput.value = HOUSING_TYPES_PRICE_MAP[target.value];
  });

  roomNumberSelect.addEventListener('change', function (evt) {
    var target = evt.target;
    var capacityEnabledArr = ROOMS_CAPACITY_MAP[target.value];
    capacitySelect.value = capacityEnabledArr[0];
    for (var j = 0; j < capacitySelect.options.length; j++) {
      var option = capacitySelect.options[j];
      if (capacityEnabledArr.indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  });

  function checkValidityInput(input) {
    if (input === titleInput) {
      if (titleInput.value === '' ||
        titleInput.value.length < TITLE_MIN_LENGTH ||
        titleInput.value.length > TITLE_MAX_LENGTH) {
        return false;
      }
    }
    if (input === priceInput) {
      if (priceInput.value === '' ||
        priceInput.value.length < PRICE_MIN_VALUE ||
        priceInput.value.length > PRICE_MAX_VALUE) {
        return false;
      }
    }
    if (input === address) {
      if (address.value === '') {
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
