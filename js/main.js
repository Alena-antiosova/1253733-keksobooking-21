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

buildMapPins();
