'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];

const getRandomFromRange = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateMock = () => {
  const mocks = [];

  for (let i = 0; i < 8; i++) {
    const mockElement = {
      "author": {
        "avatar": `img/avatars/user0${getRandomFromRange(1, 8)}.png`
      },
      "offer": {
        /* "title": */
        "address": `${getRandomFromRangeX()}, ${getRandomFromRangeY()}`,
        /* "price":*/
        "type": TYPES[getRandomFromRange(0, 4)],
        "rooms": getRandomFromRange(0, 4),
        "guests": getRandomFromRange(0, 2),
        "checkin": CHECKIN[getRandomFromRange(0, 3)],
        "checkout": CHECKOUT[getRandomFromRange(0, 3)],
        "features": FEATURES[getRandomFromRange(0, 6)],
        /* "description": */
        /* "photos": */
      },
      "location": {
        /* "x": */
        "y": getRandomFromRange(130, 630)
      }
    };
    mocks.push(mockElement);
  }

  return mocks;
};


const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const buildMapPin = (mocks, template) => {
  const mapPinElement = template.cloneNode(true);
  mapPinElement.querySelector(`map_pin.button`).textContent = mocks.location.x;
  mapPinElement.querySelector(`map_pin.img.src`).textContent = mocks.author.avatar;
  mapPinElement.querySelector(`map_pin.img.alt`).textContent = mocks.offer.title;

  return mapPinElement;
};

const buildMapPins = (mocks) => {
  const mapPinTemplate = document.querySelector(`#pin`)
  mapPinTemplate.content.querySelector(`.map__pin`);
  const mapPinsblock = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  mocks.forEach((mocksItem) => {
    const mapPin = buildMapPin(mapPinTemplate, mocksItem);
    fragment.appendChild(mapPin)
  });
}

mapPinsblock.appendChild(fragment);
