# scrollTo.js

A vanilla JS smooth scrolling animation plugin, no jQuery required.

---

## Installation

Clone the repo and require or import `scrollTo.js`:

```js
var scrollTo = require('path/to/scrollTo');
// or
import scrollTo from ('path/to/scrollTo');
```

## Basic Usage

`scrollTo` accepts two parameters: the scroll target and an optional options configuration object:

```js
scrollTo(target, [options]);
```

The scroll target can be either an element or a numeric position on the page.

## Options

* Duration
  *	The duration of the scroll animation in milliseconds
  * Default: `500`

* Easing
  * The easing function of the animation
  	* `'easeInout'` (default)
  	* `'ease'`
  	* `'easeOut'`
  * Alternately, you can pass the four points of a custom bezier curve via an array:
  	* `[0.47, 0, 0.745, 0.715]`

* Offset
  * Offset from the top of the viewport to the scroll target (only valid when target is an element)
  * Default: `0`

* Callback
  * Callback function to be called on animation end
  * Default: `null`

* Context
  * The container element to be animated
  * Default: `window`