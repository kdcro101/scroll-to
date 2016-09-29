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

`scrollTo` accepts two parameters: the scroll target and an optional configuration object:

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
  	* `'easeInOut'` (default)
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

___

### `scrollTo.autobindAnchorLinks`

A convenience method that finds all of the anchor tags that link to an element within the same page and binds a click event listener that will smooth scroll to that location.

Accepts an optional configuration object with all of the same options as the primary API, with an additional field, `onStartScroll`, a callback to be invoked when the scroll animation begins. The function is passed two parameters, the `anchorLink` that was clicked on and the `scrollTarget`:

```js
scrollTo.autobindAnchorLinks({
	easing: 'ease',
	onStartScroll: (anchorLink, scrollTarget) => {
		//...
	}
});
```