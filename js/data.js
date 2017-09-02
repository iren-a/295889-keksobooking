'use strict';

(function () {
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var HOUSING_TYPES = [
    'flat',
    'house',
    'bungalo'
  ];

  var CHECKIN_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var CHECKOUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];


  function getRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getOffersArr() {
    var offersArr = [];
    var locationX;
    var locationY;

    for (var i = 0; i < 8; i++) {
      locationX = getRandomInteger(300, 900);
      locationY = getRandomInteger(100, 500);

      offersArr[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLES[i],
          address: locationX + ', ' + locationY,
          price: getRandomInteger(1000, 1000000),
          type: HOUSING_TYPES[getRandomInteger(0, HOUSING_TYPES.length - 1)],
          rooms: getRandomInteger(1, 5),
          guests: getRandomInteger(1, 100),
          checkin: CHECKIN_TIMES[getRandomInteger(0, CHECKIN_TIMES.length - 1)],
          checkout: CHECKOUT_TIMES[getRandomInteger(0, CHECKOUT_TIMES.length - 1)],
          features: FEATURES.slice(0, getRandomInteger(1, FEATURES.length)),
          description: '',
          photos: []
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }
    return offersArr;
  }

  window.offers = getOffersArr();
})();
