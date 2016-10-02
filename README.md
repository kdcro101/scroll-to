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

`scrollTo` accepts two parameters:
  * `target` The scroll target. Can be either an element or a numeric position on the page.
  * `options` An optional configuration object.

```js
scrollTo(target, [options]);
```

## Options

* Duration
  *	The duration of the scroll animation in milliseconds
  * Default: `500`

* Easing
  * The easing function of the animation
  * Options:
    * One of the following strings, equivalent to the CSS animation easing functions of the same name:
    	* `'easeInOut'` (default)
    	* `'ease'`
    	* `'easeOut'`
    * Alternately, you can pass the four points of a custom bezier curve via an array:
    	* `[0.47, 0, 0.745, 0.715]`

* Offset
  * Offset from the top of the viewport to the scroll target (only valid when target is an element)
  * Default: `0`

* Callback
  * Callback function invoked on animation end
  * Default: `null`

* Context
  * The container element to be animated
  * Default: `window`

___

### `scrollTo.autobindAnchorLinks`

A convenience method that finds all of the anchor tags that link to an element within the same page and binds a click handler that smooth scrolls to that location.

Accepts an optional configuration object with all of the same options as the primary API, with an additional `onStartScroll` callback that is invoked when the scroll animation begins.

The function is passed two parameters:
  * `anchorLink`
  * `scrollTarget`

```js
scrollTo.autobindAnchorLinks({
	easing: 'ease',
	onStartScroll: (anchorLink, scrollTarget) => {
		//...
	}
});
```