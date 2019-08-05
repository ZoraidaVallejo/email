/* eslint-disable node/no-unsupported-features/es-syntax, import/extensions */
import { delegate } from './helpers.js';

function initButtons(parent, buttons, mockup) {
  // Mobile Preview Drawer
  delegate(
    parent,
    '.view-buttons .button',
    'click',
    function viewClickButton(event) {
      event.preventDefault();
      const button = event.delegateTarget;

      if (button.classList.contains('-mobile')) {
        mockup.classList.add('-hide');
      } else {
        mockup.classList.remove('-hide');
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
}

export default initButtons;
