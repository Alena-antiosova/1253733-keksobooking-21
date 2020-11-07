'use strict';
(function () {
  const getRandomFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function setFormStatus(form, status) {
    const fields = form.children;
    for (let i = 0; i < fields.length; i++) {
      fields[i].disabled = status;
    }
  }

  window.main = {
    getRandomFromRange,
    setFormStatus,
  };
})();
