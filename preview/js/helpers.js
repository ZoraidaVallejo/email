/**
 * Finds closest match and invokes callback.
 *
 * Borrowed from https://github.com/zenorocha/delegate/blob/master/src/delegate.js
 * Modified it to use closest as prototype function of Element. Polyfill is already added in shared.
 *
 * @param {Element} element
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
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
 * @param {Element} element
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
 * @param {Boolean} useCapture
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
 * @param {string} type
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

// eslint-disable-next-line node/no-unsupported-features/es-syntax
export { delegate, triggerEvent };
