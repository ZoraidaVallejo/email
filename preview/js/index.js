// eslint-disable-next-line node/no-unsupported-features/es-syntax, import/extensions
import { delegate, triggerEvent, getMockupsNames, scrollMockup } from './helpers.js';

window.domready(function ready() {
  // Reusables
  const templateSelect = document.getElementById('template-select');
  const { hash } = document.location;
  const previewWindow = document.querySelector('iframe');
  const mockupWrapper = document.querySelector('.mockup-mask');
  const mockupImg = mockupWrapper.querySelector('img');
  const mockupPosChanger = document.querySelector('.mockup-position .position');
  const mockupOpacityChanger = document.querySelector('.mockup-position .opacity');
  var scrollOffset = {};

  // TODO:
  // - Change values to dynamic.
  // - Get from local storage.
  var moveMockup = {
    'client-newsletter': 9,
    'jld-newsletter': 5
  };

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
    scrollMockup(mockupImg, moveMockup[mockupName] - scrollOffset[mockupName]);

    innerDoc.addEventListener('scroll', function scollMockup(event) {
      scrollOffset[mockupName] = event.target.childNodes[1].scrollTop;
      scrollMockup(mockupImg, moveMockup[mockupName] - scrollOffset[mockupName]);
    });
  });

  mockupPosChanger.addEventListener('input', function repositionMockup(event) {
    var mockupName = templateSelect.value.replace('.html', '');
    moveMockup[mockupName] = Number(event.target.value);

    scrollMockup(mockupImg, moveMockup[mockupName] - scrollOffset[mockupName]);
  });

  mockupOpacityChanger.addEventListener('input', function alphaMockup(event) {
    // TODO:
    // Change localStorage values.
    mockupWrapper.style.opacity = event.target.value;
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

      var mockupName = templateSelect.value.replace('.html', '');

      // TODO:
      // Change localStorage values.
      mockupPosChanger.value = moveMockup[mockupName]; // Set slider to actual position.

      resetMockupsPosition();

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

  const buttonsWrapper = document.querySelector('.view-buttons');
  const buttons = buttonsWrapper.querySelectorAll('.button');

  // Mobile Preview Drawer
  delegate(
    document.body,
    '.view-buttons .button',
    'click',
    function viewClickButton(event) {
      event.preventDefault();
      const button = event.delegateTarget;

      if (button.classList.contains('-mobile')) {
        mockupWrapper.classList.add('-hide');
      } else {
        mockupWrapper.classList.remove('-hide');
      }

      buttons.forEach(function switchClasses(btn) {
        btn.classList.remove('-active');
        document.body.classList.remove(`set-view-${btn.dataset.viewType}`);
      });

      button.classList.add('-active');

      document.body.classList.add(`set-view-${button.dataset.viewType}`);
    },
    false
  );
});
