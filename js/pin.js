'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function addPinHandlers(pin, offer) {

    pin.addEventListener('click', pinClickHandler);
    pin.addEventListener('keydown', pinEnterPressHandler);

    function openDialog() {
      var activePin = document.querySelector('.pin--active');
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
      pin.classList.add('pin--active');

      dialog.classList.remove('hidden');
      window.showCard(offer);
    }

    function pinClickHandler() {
      openDialog();
      document.addEventListener('keydown', dialogEscPressHandler);
    }

    function pinEnterPressHandler(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openDialog();
        document.addEventListener('keydown', dialogEscPressHandler);
      }
    }
  }

  var dialogClose = document.querySelector('.dialog__close');
  var dialog = document.querySelector('.dialog');

  function closeDialog() {
    dialog.classList.add('hidden');
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
  }

  dialogClose.addEventListener('click', function () {
    closeDialog();
    document.removeEventListener('keydown', dialogEscPressHandler);
  });

  function dialogEscPressHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialog();
      document.removeEventListener('keydown', dialogEscPressHandler);
    }
  }

  window.renderPinMap = function (offersArr) {
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    var pins = document.querySelectorAll('.pin:not(.pin__main)');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offersArr.length; i++) {
      var pin = document.createElement('div');
      pin.classList.add('pin');
      pin.style.left = offersArr[i].location.x + 'px';
      pin.style.top = offersArr[i].location.y + 'px';
      var img = document.createElement('img');
      img.src = offersArr[i].author.avatar;
      img.classList.add('rounded');
      img.width = 40;
      img.height = 40;
      img.setAttribute('tabindex', '1');
      pin.appendChild(img);

      addPinHandlers(pin, offersArr[i]);

      fragment.appendChild(pin);
    }

    for (var j = 0; j < pins.length; j++) {
      tokyoPinMap.removeChild(pins[j]);
    }
    tokyoPinMap.appendChild(fragment);
  };

  function loadHandler(data) {
    window.data = data;
    window.renderPinMap(data);
  }

  function errorHandler(errorMessage) {
    window.utils.showErrorMessage(errorMessage);
  }

  window.backend.load(loadHandler, errorHandler);

})();
