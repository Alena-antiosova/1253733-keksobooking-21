'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const PIN_WIDHT = 50;
const MAP_WIDHT = 1200;
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const MAP_PIN_WIDHT = 65;
const MAP_PIN_HEIGHT = 65;

const getRandomFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateMock = () => {
  const mocks = [];

  for (let i = 0; i < 8; i++) {
    const mockElement = {
      "author": {
        "avatar": `img/avatars/user0${i + 1}.png`
      },
      "offer": {
        "title": `Отличные предложения`,
        "type": TYPES[getRandomFromRange(0, 4)],
        "address": `600, 350`,
        "rooms": getRandomFromRange(0, 4),
        "price": getRandomFromRange(2000, 10000),
        "guests": getRandomFromRange(0, 2),
        "checkin": CHECKIN[getRandomFromRange(0, 3)],
        "checkout": CHECKOUT[getRandomFromRange(0, 3)],
        "features": FEATURES.slice(0, getRandomFromRange(1, FEATURES.length)),
        "description": `строка с описанием`,
        "photos": PHOTOS.slice(0, getRandomFromRange(1, PHOTOS.length)),

      },
      "location": {
        "x": getRandomFromRange(PIN_WIDHT, MAP_WIDHT - PIN_WIDHT),
        "y": getRandomFromRange(130, 630),
      }
    };
    mocks.push(mockElement);
  }

  return mocks;
};

const mocks = generateMock();

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const buildMapPin = (mockItem) => {
  const mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style = `left: ${mockItem.location.x}px; top: ${mockItem.location.y}px; `;
  const mapPinImg = mapPinElement.querySelector(`img`);
  mapPinImg.alt = mockItem.offer.description;
  mapPinImg.src = mockItem.author.avatar;

  return mapPinElement;
};

const buildMapPins = () => {
  const mapPinsblock = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  mocks.forEach((mockItem) => {
    const mapPin = buildMapPin(mockItem);
    fragment.appendChild(mapPin);
  });
  mapPinsblock.appendChild(fragment);
};


const form = document.querySelector(`.ad-form`);
const filter = document.querySelector(`.map__filters`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const roomNumber = form.querySelector(`#room_number`);
const guestsNumber = form.querySelector(`#capacity`);
const formAddress = form.querySelector(`#address`);

const getMapPinSize = () => {
  const mapPinX = Math.round(MAP_PIN_WIDHT / 2);
  const mapPinY = Math.round(MAP_PIN_HEIGHT / 2);
  return (parseInt(mapPinMain.style.left, 10)) - `${mapPinX}` + (parseInt(mapPinMain.style.top, 10)) - `${mapPinY}`;
};

formAddress.value = getMapPinSize();

function setFormStatus(status) {
  const fields = form.children;
  for (let i = 0; i < fields.length; i++) {
    fields[i].disabled = status;
  }
}

const setInactivePage = () => {
  map.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  setFormStatus(form, true);
  setFormStatus(filter, true);
  getMapPinSize();
};

setInactivePage();


const setActivePage = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  setFormStatus(form, false);
  setFormStatus(filter, false);
  buildMapPins();
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
