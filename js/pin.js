'use strict';
(function () {
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

    window.data.mocks.forEach((mockItem) => {
      const mapPin = buildMapPin(mockItem);
      fragment.appendChild(mapPin);
    });
    mapPinsblock.appendChild(fragment);
  };

  window.pin = {
    buildMapPin,
    buildMapPins,
  };
})();
