'use strict';

(function () {

  window.synchronizeFields = function (srcField, destField, srcValuesArr, destValuesArr, syncFunc) {
    srcField.addEventListener('change', function () {
      var syncIndex = srcValuesArr.indexOf(srcField.value);
      syncFunc(destField, destValuesArr[syncIndex]);
    });
  };

})();
