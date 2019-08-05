/* eslint-disable node/no-unsupported-features/es-syntax, import/extensions */
import { triggerEvent, getMockupsNames } from './helpers.js';
import initButtons from './init-buttons.js';
import initOpacitySlider from './init-opacity-slider.js';

window.domready(function ready() {
  const templateSelect = document.getElementById('template-select');
  const { hash } = document.location;
  const previewWindow = document.querySelector('iframe');
  const mockupWrapper = document.querySelector('.mockup-mask');
  const mockupImg = mockupWrapper.querySelector('img');
  const mockupPosChanger = document.querySelector('.mockup-position .position');

  var mockupAdjustments = {};
  var currentMockup;
  var allMockups = getMockupsNames(templateSelect);

  allMockups.forEach(name => {
    mockupAdjustments[name] = Number(localStorage.getItem(`${name}-adjust`)) || 0;
  });

  function adjustMockup(img, name, value) {
    mockupAdjustments[name] = value;
    // eslint-disable-next-line no-param-reassign
    img.style.transform = `translateY(${mockupAdjustments[name]}px)`;

    localStorage.setItem(`${name}-adjust`, value);
  }

  // ==================================================================================================================

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

      currentMockup = templateSelect.value.replace('.html', '');
      mockupPosChanger.value = mockupAdjustments[currentMockup]; // Set slider to actual position.

      adjustMockup(mockupImg, currentMockup, mockupAdjustments[currentMockup]);

      previewWindow.src = `${value}?t=${ms}`;
      document.location.hash = `template:${value}`;
    },
    false
  );

  // Preload selected template from hashed template:
  if (hash && hash.indexOf('template:') !== -1) {
    const tpl = hash.split(':')[1];
    templateSelect.value = tpl;

    triggerEvent(templateSelect, 'change');
  }

  // ==================================================================================================================

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

  // ==================================================================================================================

  adjustMockup(mockupImg, currentMockup, mockupAdjustments[currentMockup]);

  mockupPosChanger.addEventListener('input', function repositionMockup(event) {
    currentMockup = templateSelect.value.replace('.html', '');

    adjustMockup(mockupImg, currentMockup, Number(event.target.value));
  });

  // ==================================================================================================================

  const mockupOpacityChanger = document.querySelector('.mockup-position .opacity');

  initOpacitySlider(mockupImg, mockupOpacityChanger);

  const buttonsWrapper = document.querySelector('.view-buttons');
  const buttons = buttonsWrapper.querySelectorAll('.button');

  initButtons(buttonsWrapper, buttons, mockupWrapper);
});
