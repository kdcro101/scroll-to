import bezierEasing from 'bezier-easing';

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  function(fn) { window.setTimeout(fn, 15); };

const easings = {
  ease: bezierEasing(0.25, 0.1, 0.25, 1),
  easeOut: bezierEasing(0, 0, 0.58, 1),
  easeInOut: bezierEasing(0.42, 0, 0.58, 1)
};

function scroller() {
  this.defaultOpts = {
    duration: 500,
    easing: 'easeInOut',
    offset: 0,
    callback: null,
    context: window
  };
}

scroller.prototype = {
  scrollTo(element, options) {
    const
      { duration, easing, offset, callback, context } = this.parseOptions(options),
      easeFn = typeof easing === 'string' ? easings[easing] : bezierEasing.apply(bezierEasing, easing),
      start = window.pageYOffset,
      end = typeof element === 'number' ? parseInt(element) : this.getTop(element, offset),
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

  getTop(element, offset) {
    return element.getBoundingClientRect().top + window.pageYOffset - offset;
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

module.exports = scrollTo;