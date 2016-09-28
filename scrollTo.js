const requestAnimationFrame =
	window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  function(fn) { window.setTimeout(fn, 15); };

function easeInOutCubic(t) {
	return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function getTop(el) {
	return el.getBoundingClientRect().top + window.pageYOffset;
}

function getPosition(start, end, elapsed, duration) {
  if (elapsed > duration) return end;
  return start + (end - start) * easeInOutCubic(elapsed / duration);
}

function scrollTo(el, duration, callback, context){
  duration = duration || 500;
  context = context || window;
  const start = window.pageYOffset,
  			end = typeof el === 'number' ? parseInt(el) : getTop(el),
  			clock = Date.now();;

	function step() {
    const elapsed = Date.now() - clock;
    if (context !== window) {
    	context.scrollTop = getPosition(start, end, elapsed, duration);
    }
    else {
    	window.scroll(0, getPosition(start, end, elapsed, duration));
    }

    if (elapsed > duration) {
        if (typeof callback === 'function') {
            callback(el);
        }
    } else {
        requestAnimationFrame(step);
    }
  }
  step();
}

export default scrollTo;