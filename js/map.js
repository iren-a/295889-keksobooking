'use strict';

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

var HOUSING_TYPES_MAP = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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

function getNoticesArr() {
  var noticesArr = [];
  var locationX;
  var locationY;

  for (var i = 0; i < 8; i++) {
    locationX = getRandomInteger(300, 900);
    locationY = getRandomInteger(100, 500);

    noticesArr[i] = {
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
        features: FEATURES.slice(0, getRandomInteger(0, FEATURES.length)),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return noticesArr;
}

var notices = getNoticesArr();

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

for (var i = 0; i < notices.length; i++) {
  var div = document.createElement('div');
  div.classList.add('pin');
  div.style.left = notices[i].location.x + 'px';
  div.style.top = notices[i].location.y + 'px';
  var img = document.createElement('img');
  img.src = notices[i].author.avatar;
  img.classList.add('rounded');
  img.width = 40;
  img.height = 40;
  div.appendChild(img);

  fragment.appendChild(div);
}
tokyoPinMap.appendChild(fragment);


var lodgeTemplate = document.querySelector('#lodge-template').content;

function renderOffer(notice) {
  var offerElement = lodgeTemplate.cloneNode(true);

  offerElement.querySelector('.lodge__title').textContent = notice.offer.title;
  offerElement.querySelector('.lodge__address').textContent = notice.offer.address;
  offerElement.querySelector('.lodge__address').textContent = notice.offer.price + '\u20BD/ночь';
  offerElement.querySelector('.lodge__type').textContent = HOUSING_TYPES_MAP[notice.offer.type];
  offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + notice.offer.guests + ' гостей в ' + notice.offer.rooms + ' комнатах';
  offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
  var featuresHtml = '';
  for (var j = 0; j < notice.offer.features.length; j++) {
    featuresHtml += '<span class="feature__image  feature__image--' + notice.offer.features[j] + '"></span>';
  }
  offerElement.querySelector('.lodge__features').innerHTML = featuresHtml;
  offerElement.querySelector('.lodge__description').textContent = notice.offer.description;

  return offerElement;
}

var offerDialog = document.querySelector('#offer-dialog');
var oldDialogPanel = document.querySelector('.dialog__panel');

offerDialog.replaceChild(renderOffer(notices[0]), oldDialogPanel);
document.querySelector('.dialog__title img').src = notices[0].author.avatar;


