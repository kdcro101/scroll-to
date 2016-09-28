const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  function(fn) { window.setTimeout(fn, 15); };

const easings = {
  easeInOutCubic: function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
};

function scroller() {
  this.defaultOpts = {
    duration: 500,
    easing: 'easeInOutCubic',
    callback: null,
    context: window
  };
}

scroller.prototype = {
  scrollTo(element, options) {
    const { duration, easing, callback, context } = this.parseOptions(options),
          easeFn = easings[easing],
          start = window.pageYOffset,
          end = typeof element === 'number' ? parseInt(element) : this.getTop(element),
          clock = Date.now(),

    step = () => {
      const elapsed = Date.now() - clock;
      if (context !== window) {
        context.scrollTop = this.getPosition(start, end, elapsed, duration, easeFn);
      }
      else {
        window.scroll(0, this.getPosition(start, end, elapsed, duration, easeFn));
      }

      if (elapsed > duration) {
          if (typeof callback === 'function') {
              callback(element);
          }
      } else {
          requestAnimationFrame(step);
      }
    };
    step();
  },

  getTop(element) {
    return element.getBoundingClientRect().top + window.pageYOffset;
  },

  getPosition(start, end, elapsed, duration, easeFn) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeFn(elapsed / duration);
  },

  parseOptions(userOpts) {
    if (typeof userOpts === 'undefined') return this.defaultOpts;
    let ret = {};
    for (let opt in this.defaultOpts) {
      ret[opt] = (typeof userOpts[opt] !== 'undefined') ? userOpts[opt] : this.defaultOpts[opt];
    }
    return ret;
  }
}

const _scroller = new scroller();

let scrollTo = _scroller.scrollTo.bind(_scroller);

export default scrollTo;