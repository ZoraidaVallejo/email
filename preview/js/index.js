/**
 * Finds closest match and invokes callback.
 *
 * Borrowed from https://github.com/zenorocha/delegate/blob/master/src/delegate.js
 * Modified it to use closest as prototype function of Element. Polyfill is already added in shared.
 *
 * @param   {Element}   element
 * @param   {String}    selector
 * @param   {String}    type
 * @param   {Function}  callback
 * @returns {Function}
 */
function listener(element, selector, type, callback) {
  return function listen(e) {
    e.delegateTarget = e.target.closest(selector);

    if (e.delegateTarget) {
      callback.call(element, e);
    }
  };
}

/**
 * Delegates event to a selector.
 *
 * Borrowed from https://github.com/zenorocha/delegate/blob/master/src/delegate.js
 *
 * @param   {Element}   element
 * @param   {String}    selector
 * @param   {String}    type
 * @param   {Function}  callback
 * @param   {Boolean}   useCapture
 * @returns {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
  const listenerFn = listener.apply(this, arguments); // eslint-disable-line prefer-rest-params

  element.addEventListener(type, listenerFn, useCapture);

  return {
    destroy() {
      element.removeEventListener(type, listenerFn, useCapture);
    }
  };
}

/**
 * Manually an event.
 *
 * @param {Element} element
 * @param {String}  type
 */
function triggerEvent(element, type) {
  if ('createEvent' in document) {
    // modern browsers, IE9+
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, false, true);
    element.dispatchEvent(e);
  } else {
    // IE 8
    const e = document.createEventObject();
    e.eventType = type;
    element.fireEvent(`on${e.eventType}`, e);
  }
}

(function iife() {
  // Reusables
  const templateSelect = document.getElementById('template-select');
  const { hash } = document.location;

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

      document.querySelectorAll('iframe').forEach(function setIframeSrc(frame) {
        // eslint-disable-next-line no-param-reassign
        frame.src = `${value}?t=${ms}`;
      });

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

      buttons.forEach(function switchClasses(btn) {
        btn.classList.remove('-active');
        document.body.classList.remove(`set-view-${btn.dataset.viewType}`);
      });

      button.classList.add('-active');

      document.body.classList.add(`set-view-${button.dataset.viewType}`);
    },
    false
  );
})();
