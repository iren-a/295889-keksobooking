'use strict';

(function () {

  var HOUSING_TYPES_MAP = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };


  function replaceDialogPanel(newDialogPanel) {
    var offerDialog = document.querySelector('#offer-dialog');
    var oldDialogPanel = document.querySelector('.dialog__panel');

    offerDialog.replaceChild(newDialogPanel, oldDialogPanel);
  }
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  window.showCard = function (offerObj) {
    var offerElement = lodgeTemplate.cloneNode(true);

    offerElement.querySelector('.lodge__title').textContent = offerObj.offer.title;
    offerElement.querySelector('.lodge__address').textContent = offerObj.offer.address;
    offerElement.querySelector('.lodge__address').textContent = offerObj.offer.price + '\u20BD/ночь';
    offerElement.querySelector('.lodge__type').textContent = HOUSING_TYPES_MAP[offerObj.offer.type];
    offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offerObj.offer.guests + ' гостей в ' + offerObj.offer.rooms + ' комнатах';
    offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offerObj.offer.checkin + ', выезд до ' + offerObj.offer.checkout;

    var features = offerObj.offer.features;
    features.forEach(function (value) {
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + value;
      offerElement.querySelector('.lodge__features').appendChild(span);
    });

    offerElement.querySelector('.lodge__description').textContent = offerObj.offer.description;

    replaceDialogPanel(offerElement);

    document.querySelector('.dialog__title img').src = offerObj.author.avatar;
  };


})();
