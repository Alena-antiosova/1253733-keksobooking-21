'use strict';
(function () {
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

  const generateMock = () => {
    const mocks = [];

    for (let i = 0; i < 8; i++) {
      const mockElement = {
        "author": {
          "avatar": `img/avatars/user0${i + 1}.png`
        },
        "offer": {
          "title": `Отличные предложения`,
          "type": TYPES[window.main.getRandomFromRange(0, 4)],
          "address": `600, 350`,
          "rooms": window.main.getRandomFromRange(0, 4),
          "price": window.main.getRandomFromRange(2000, 10000),
          "guests": window.main.getRandomFromRange(0, 2),
          "checkin": CHECKIN[window.main.getRandomFromRange(0, 3)],
          "checkout": CHECKOUT[window.main.getRandomFromRange(0, 3)],
          "features": FEATURES.slice(0, window.main.getRandomFromRange(1, FEATURES.length)),
          "description": `строка с описанием`,
          "photos": PHOTOS.slice(0, window.main.getRandomFromRange(1, PHOTOS.length)),
        },
        "location": {
          "x": window.main.getRandomFromRange(PIN_WIDHT, MAP_WIDHT - PIN_WIDHT),
          "y": window.main.getRandomFromRange(130, 630),
        }
      };
      mocks.push(mockElement);
    }
    return mocks;
  };

  const mocks = generateMock();

  window.data = {
    generateMock,
    mocks,
  };
})();
