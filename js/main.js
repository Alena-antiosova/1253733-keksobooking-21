'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];

const getRandomFromRange = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateMock = () => {
  const array = [];

  for (let i = 0; i < 8; i++) {
    const mockElement = {
      "author": {
        "avatar": `img/avatars/user0${getRandomFromRange(1, 8)}.png`
      },
      "offer": {
        "title":
          "address": `${getRandomFromRangeX()}, ${getRandomFromRangeY()}`,
      "price":
        "type": TYPES[getRandomFromRange(0, 4)],
      "rooms": getRandomFromRange(0, 4),
      "guests": getRandomFromRange(0, 2),
      "checkin": CHECKIN[getRandomFromRange(0, 3)],
      "checkout": CHECKOUT[getRandomFromRange(0, 3)],
      "features": FEATURES[getRandomFromRange(0, 6)],
      "description":
        "photos":
    },
    "location": {
      "x":
      "y": getRandomFromRange(130, 630)
    }
  }
  array.push(mockElement)
}

return array;
}


const map = document.querySelector('.map');
map.classList.remove('map--faded');

const TemplateMapPin = document.querySelector('#pin');

for (let i = 0; i <= array.length; i++) {
  const mapPinElement = TemplateMapPin.cloneNode(true);
  mapPinElement.querySelector('map_pin.button').textContent = array.location.x;
  mapPinElement.querySelector('map_pin.img.src').textContent = array.author.avatar;
  mapPinElement.querySelector('map_pin.img.alt').textContent = array.offer.title;
}

//рефакторинг
const renderMapPin = (array) => {
  const mapPinElement = TemplateMapPin.cloneNode(true);
  mapPinElement.querySelector('map_pin.button').textContent = array.location.x;
  mapPinElement.querySelector('map_pin.img.src').textContent = array.author.avatar;
  mapPinElement.querySelector('map_pin.img.alt').textContent = array.offer.title;

  return mapPinElement
}

const fragment = document.createDocumentFragment();
for (var i = 0; i < array.length; i++) {
  fragment.appendChild(renderMapPin(array[i]));
}

const randerMapPins = document.querySelector('.map__pins');
randerMapPins.appendChild(fragment);
