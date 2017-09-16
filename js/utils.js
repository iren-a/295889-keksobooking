'use strict';

(function () {

  window.utils = {
    showErrorMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.classList.add('error_message');
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

})();
