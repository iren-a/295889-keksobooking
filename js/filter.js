'use strict';

(function () {

  var ANY_VALUE = 'any';
  var PRICE_VALUE = {
    middle: {
      name: 'middle',
      min: 10000,
      max: 50000
    },
    low: {
      name: 'low',
      value: 10000
    },
    high: {
      name: 'high',
      value: 50000
    }
  };

  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomsNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var housingFeatures = document.querySelector('#housing_features');

  var housingTypeValue = ANY_VALUE;
  var housingPriceValue = ANY_VALUE;
  var housingRoomsNumberValue = ANY_VALUE;
  var housingGuestsNumberValue = ANY_VALUE;
  var housingFeaturesValue = getFeaturesArr();

  function getFeaturesArr() {
    var featuresArr = [];
    var el = housingFeatures.elements;
    for (var i = 0; i < el.length; i++) {
      if (el[i].checked && featuresArr.indexOf(el[i].value) === -1) {
        featuresArr.push(el[i].value);
      }
    }
    return featuresArr;
  }

  function filter(data) {
    var filteredData = data.filter(function (item) {
      return (typeFilter(item) && priceFilter(item) && roomsNumberFilter(item) && guestsNumberFilter(item) && featuresFilter(item));
    });
    console.log(filteredData);

  }

  function typeFilter(offerObj) {
    return (housingTypeValue === ANY_VALUE || housingTypeValue === offerObj.offer.type);
  }

  function priceFilter(offerObj) {
    return (housingPriceValue === ANY_VALUE
            ||
            housingPriceValue === PRICE_VALUE.middle.name &&
            offerObj.offer.price >= PRICE_VALUE.middle.min &&
            offerObj.offer.price <= PRICE_VALUE.middle.max
            ||
            housingPriceValue === PRICE_VALUE.low.name && offerObj.offer.price < PRICE_VALUE.low.value
            ||
            housingPriceValue === PRICE_VALUE.high.name && offerObj.offer.price > PRICE_VALUE.high.value);
  }

  function roomsNumberFilter(offerObj) {
    return (housingRoomsNumberValue === ANY_VALUE || +housingRoomsNumberValue === offerObj.offer.rooms);
  }

  function guestsNumberFilter(offerObj) {
    return (housingGuestsNumberValue === ANY_VALUE || +housingGuestsNumberValue === offerObj.offer.guests);
  }

  function featuresFilter(offerObj) {
    for (var i = 0; i < housingFeaturesValue.length; i++) {
      if (offerObj.offer.features.indexOf(housingFeaturesValue[i]) === -1) {
        return false;
      }
    }
    return true;
  }


  housingType.addEventListener('change', function () {
    housingTypeValue = housingType.value;
    window.debounce(filter(window.data));
  });
  housingPrice.addEventListener('change', function () {
    housingPriceValue = housingPrice.value;
    window.debounce(filter(window.data));
  });
  housingRoomsNumber.addEventListener('change', function () {
    housingRoomsNumberValue = housingRoomsNumber.value;
    window.debounce(filter(window.data));
  });
  housingGuestsNumber.addEventListener('change', function () {
    housingGuestsNumberValue = housingGuestsNumber.value;
    window.debounce(filter(window.data));
  });
  housingFeatures.addEventListener('change', function () {
    housingFeaturesValue = getFeaturesArr();
    window.debounce(filter(window.data));
  });


})();
