/* eslint-disable node/no-unsupported-features/es-syntax, import/extensions */
import { triggerEvent, getMockupsNames, scrollMockup } from './helpers.js';
import initButtons from './init-buttons.js';
import initOpacitySlider from './init-opacity-slider.js';

window.domready(function ready() {
  // Reusables
  const templateSelect = document.getElementById('template-select');
  const { hash } = document.location;
  const previewWindow = document.querySelector('iframe');
  const mockupWrapper = document.querySelector('.mockup-mask');
  const mockupImg = mockupWrapper.querySelector('img');
  // const mockupPosChanger = document.querySelector('.mockup-position .position');
  var scrollOffset = {};

  // TODO:
  // - Change values to dynamic.
  // - Get from local storage.
  // var moveMockup = {
  //   'client-newsletter': 22,
  //   'jld-newsletter': 5
  // };

  var allMockups = getMockupsNames(templateSelect);

  function resetMockupsPosition() {
    allMockups.forEach(function each(value) {
      scrollOffset[value] = 0;
    });
  }

  resetMockupsPosition();

  previewWindow.addEventListener('load', function setMockupClasses() {
    var innerDoc = previewWindow.contentDocument;
    var mockupName = templateSelect.value.replace('.html', '');

    mockupImg.src = `/images/${mockupName}-mockup.jpg`;

    resetMockupsPosition();
    scrollMockup(mockupImg, scrollOffset[mockupName] * -1);

    innerDoc.addEventListener('scroll', function scollMockup(event) {
      scrollOffset[mockupName] = event.target.childNodes[1].scrollTop;
      scrollMockup(mockupImg, scrollOffset[mockupName] * -1);
    });
  });

  // mockupPosChanger.addEventListener('input', function repositionMockup(event) {
  //   var mockupName = templateSelect.value.replace('.html', '');
  //   moveMockup[mockupName] = Number(event.target.value);

  //   scrollMockup(mockupImg, moveMockup[mockupName] - scrollOffset[mockupName]);
  // });

  // On change, reload template
  templateSelect.addEventListener(
    'change',
    function reloadTemplate(event) {
      const element = event.target;
      const { value } = element;
      const ms = new Date().getTime(); // We'll timestamp each iframe load for cache-busting

      if (!value) {
        return;
      }

      // var mockupName = templateSelect.value.replace('.html', '');

      // TODO:
      // Change localStorage values.
      // mockupPosChanger.value = moveMockup[mockupName]; // Set slider to actual position.

      resetMockupsPosition();

      previewWindow.src = `${value}?t=${ms}`;
      document.location.hash = `template:${value}`;
    },
    false
  );

  const mockupOpacityChanger = document.querySelector('.mockup-position .opacity');

  initOpacitySlider(mockupImg, mockupOpacityChanger);

  const buttonsWrapper = document.querySelector('.view-buttons');
  const buttons = buttonsWrapper.querySelectorAll('.button');

  initButtons(buttonsWrapper, buttons, mockupWrapper);

  // Preload selected template from hashed template:
  if (hash && hash.indexOf('template:') !== -1) {
    const tpl = hash.split(':')[1];
    templateSelect.value = tpl;

    triggerEvent(templateSelect, 'change');
  }
});
