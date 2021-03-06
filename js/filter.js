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
  var housingFeaturesList = document.querySelector('#housing_features');
  var featureInputs = housingFeaturesList.querySelectorAll('input');
  var housingTypeValue = ANY_VALUE;
  var housingPriceValue = ANY_VALUE;
  var housingRoomsNumberValue = ANY_VALUE;
  var housingGuestsNumberValue = ANY_VALUE;
  var housingFeaturesValue = getFeaturesArr();

  function getFeaturesArr() {
    var features = [];

    // для Edge по другому не работает
    Array.prototype.forEach.call(featureInputs, function (item) {
      if (item.checked && features.indexOf(item.value) === -1) {
        features.push(item.value);
      }
    });

    return features;
  }

  function filter(data) {
    var filteredData = data.filter(function (item) {
      return (typeFilter(item) && priceFilter(item) && roomsNumberFilter(item) && guestsNumberFilter(item) && featuresFilter(item));
    });
    window.renderPinMap(filteredData);
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
  housingFeaturesList.addEventListener('change', function () {
    housingFeaturesValue = getFeaturesArr();
    window.debounce(filter(window.data));
  });


})();
