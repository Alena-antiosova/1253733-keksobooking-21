'use strict';
(function () {
  const form = document.querySelector(`.ad-form`);
  const filter = document.querySelector(`.map__filters`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const roomNumber = form.querySelector(`#room_number`);
  const guestsNumber = form.querySelector(`#capacity`);
  const formAddress = form.querySelector(`#address`);
  const MAP_PIN_WIDHT = 65;
  const MAP_PIN_HEIGHT = 65;
  const URL_GET_DATE = `https://21.javascript.pages.academy/keksobooking/data23`;


  const getMapPinSize = () => {
    const mapPinX = Math.round(MAP_PIN_WIDHT / 2);
    const mapPinY = Math.round(MAP_PIN_HEIGHT / 2);
    return (parseInt(mapPinMain.style.left, 10)) - `${mapPinX}` + (parseInt(mapPinMain.style.top, 10)) - `${mapPinY}`;
  };

  formAddress.value = getMapPinSize();

  const setInactivePage = () => {
    window.map.map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    window.main.setFormStatus(form, true);
    window.main.setFormStatus(filter, true);
    getMapPinSize();
  };

  setInactivePage();


  const onSuccess = (response) => {
    window.pin.buildMapPins(response);
  };

  const onError = (error) => {
    console.log(`error`, error);
  };

  const setActivePage = () => {
    window.map.map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    window.main.setFormStatus(form, false);
    window.main.setFormStatus(filter, false);
    try {
      window.load.makeGetRequest(URL_GET_DATE, onSuccess, onError);
    } catch (error) {
      console.log(`error1`, error);
    }
  };

  const onPinActive = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      evt.preventDefault();
      setActivePage();
    }
  };

  mapPinMain.addEventListener(`mousedown`, onPinActive);
  mapPinMain.addEventListener(`keydown`, onPinActive);

  const selectRoomsForGuests = () => {
    roomNumber.setCustomValidity(``);
    const rooms = parseInt(roomNumber.value, 10);
    const guests = parseInt(guestsNumber.value, 10);
    if (rooms === 1 && guests > 1) {
      roomNumber.setCustomValidity(`1 комната только для 1 гостя`);
    } else if (rooms === 2 && guests > 2) {
      roomNumber.setCustomValidity(`2 комнаты только для 2 гостей или 1 гостя`);
    } else if (rooms === 3 && guests > 3) {
      roomNumber.setCustomValidity(`3 комнаты только для 3 гостей, 2 гостей или 1 гостя`);
    } else if (rooms === 100 && guests > 0) {
      roomNumber.setCustomValidity(`100 комнат не для гостей`);
    }
    roomNumber.reportValidity();
  };

  roomNumber.addEventListener(`change`, selectRoomsForGuests);

  guestsNumber.addEventListener(`change`, selectRoomsForGuests);

  window.form = {
    getMapPinSize,
    setInactivePage,
    onPinActive,
    selectRoomsForGuests,
  };
})();
