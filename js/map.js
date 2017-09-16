'use strict';

(function () {

  var address = document.getElementById('address');

  function setAddressbyPin(x, y) {
    address.value = 'x: ' + x + ', y: ' + y;
  }

  var mainPinHandle = document.querySelector('.tokyo__pin-map .pin__main');

  mainPinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinHandle.style.top = (mainPinHandle.offsetTop - shift.y) + 'px';
      mainPinHandle.style.left = (mainPinHandle.offsetLeft - shift.x) + 'px';

      setAddressbyPin(mainPinHandle.offsetLeft + mainPinHandle.offsetWidth / 2, mainPinHandle.offsetTop + mainPinHandle.offsetHeight);

    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });


})();
