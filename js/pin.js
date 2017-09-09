'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function renderPinMap(offersArr) {
    var tokyoPinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offersArr.length; i++) {
      var div = document.createElement('div');
      div.classList.add('pin');
      div.style.left = offersArr[i].location.x + 'px';
      div.style.top = offersArr[i].location.y + 'px';
      var img = document.createElement('img');
      img.src = offersArr[i].author.avatar;
      img.classList.add('rounded');
      img.width = 40;
      img.height = 40;
      img.setAttribute('tabindex', '1');
      div.appendChild(img);

      fragment.appendChild(div);
    }
    tokyoPinMap.appendChild(fragment);
  }

  renderPinMap(window.offers);

  var pins = document.querySelectorAll('.pin:not(.pin__main)');
  var dialogClose = document.querySelector('.dialog__close');
  var dialog = document.querySelector('.dialog');

  function openDialog(idx) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('pin--active');
    }
    pins[idx].classList.add('pin--active');

    dialog.classList.remove('hidden');
    window.showCard(pins[idx]);
  }

  function closeDialog() {
    dialog.classList.add('hidden');
    for (var j = 0; j < pins.length; j++) {
      pins[j].classList.remove('pin--active');
    }
  }

  function pinClickHandler(i) {
    openDialog(i);
    document.addEventListener('keydown', dialogEscPressHandler);
  }

  function pinEnterPressHandler(i, evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openDialog(i);
      document.addEventListener('keydown', dialogEscPressHandler);
    }
  }

  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', pinClickHandler.bind(null, i));
    pins[i].addEventListener('keydown', pinEnterPressHandler.bind(null, i));
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

})();
