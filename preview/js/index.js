/* eslint-disable node/no-unsupported-features/es-syntax, import/extensions */
import { triggerEvent, getMockupsNames } from './helpers.js';
import initButtons from './init-buttons.js';
import initOpacitySlider from './init-opacity-slider.js';

window.domready(function ready() {
  // Reusables
  const templateSelect = document.getElementById('template-select');
  const { hash } = document.location;
  const previewWindow = document.querySelector('iframe');
  const mockupWrapper = document.querySelector('.mockup-mask');
  const mockupImg = mockupWrapper.querySelector('img');

  var currentMockup = templateSelect.value.replace('.html', '');
  // var allMockups = getMockupsNames(templateSelect);

  // resetMockupsPosition();

  previewWindow.addEventListener('load', function setMockupClasses() {
    var innerDoc = previewWindow.contentDocument;
    currentMockup = templateSelect.value.replace('.html', '');

    if (currentMockup == '_blank') {
      mockupWrapper.style.display = 'none';
      return;
    }

    mockupWrapper.style.display = 'block';

    mockupImg.src = `/images/${currentMockup}-mockup.jpg`;
    mockupWrapper.style.transform = 'translateY(0)';

    innerDoc.addEventListener('scroll', function scrollMockup(event) {
      mockupWrapper.style.transform = `translateY(${event.target.childNodes[1].scrollTop * -1}px)`;
    });
  });

  const mockupPosChanger = document.querySelector('.mockup-position .position');
  // TODO:
  // - Change values to dynamic.
  // - Get from local storage.
  var adjustMockup = {
    'client-newsletter': 22,
    'jld-newsletter': 5
  };

  mockupPosChanger.addEventListener('input', function repositionMockup(event) {
    currentMockup = templateSelect.value.replace('.html', '');
    adjustMockup[currentMockup] = Number(event.target.value);

    mockupImg.style.transform = `translateY(${adjustMockup[currentMockup]}px)`;
  });

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

      // currentMockup = templateSelect.value.replace('.html', '');

      // TODO:
      // Change localStorage values.
      // mockupPosChanger.value = adjustMockup[currentMockup]; // Set slider to actual position.

      // resetMockupsPosition();

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
