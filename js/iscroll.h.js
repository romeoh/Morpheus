
(function(window, doc){
var m = Math,
	dummyStyle = doc.createElement('div').style,
	vendor,
	cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',

	// Style properties
	transform = prefixStyle('transform'),
	transitionProperty = prefixStyle('transitionProperty'),
	transitionDuration = prefixStyle('transitionDuration'),
	transformOrigin = prefixStyle('transformOrigin'),
	transitionTimingFunction = prefixStyle('transitionTimingFunction'),
	transitionDelay = prefixStyle('transitionDelay'),

    // Browser capabilities
	isAndroid = (/android/gi).test(navigator.appVersion),
	isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
	isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

    has3d = prefixStyle('perspective') in dummyStyle,
    hasTouch = 'ontouchstart' in window && !isTouchPad,
    hasTransform = vendor !== false,
    hasTransitionEnd = prefixStyle('transition') in dummyStyle,

	RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	TRNEND_EV,
	nextFrame,
	cancelFrame,

	// Helpers
	translateZ = has3d ? ' translateZ(0)' : '',

	// Constructor
	iScroll = function (el, options) {
		var that = this,
			i;

		that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
		that.wrapper.style.overflow = 'hidden';
		that.scroller = that.wrapper.children[0];

		// Default options
		that.options = {};

		// User defined options

		// Set starting position
		that.x = that.options.x;
		that.y = that.options.y;

		// Normalize options
		that.options.useTransform = hasTransform && that.options.useTransform;
		that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
		that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
		that.options.zoom = that.options.useTransform && that.options.zoom;
		that.options.useTransition = hasTransitionEnd && that.options.useTransition;

		// Set some default styles
		that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
		that.scroller.style[transitionDuration] = '0';
		that.scroller.style[transformOrigin] = '0 0';
		that.refresh();

		that._bind(RESIZE_EV, window);
		that._bind(START_EV);
	};

// Prototype
iScroll.prototype = {
	enabled: true,
	x: 0,
	y: 0,
	steps: [],
	scale: 1,
	currPageX: 0, currPageY: 0,
	pagesX: [], pagesY: [],
	aniTime: null,
	wheelZoomCount: 0,

	handleEvent: function (e) {},

	_checkDOMChanges: function () {},

	_scrollbar: function (dir) {},

	_resize: function () {},

	_pos: function (x, y) {},

	_scrollbarPos: function (dir, hidden) {},

	_start: function (e) {},

	_move: function (e) {},

	_end: function (e) {},

	_resetPos: function (time) {},

	_wheel: function (e) {},

	_transitionEnd: function (e) {},

	/**
	* Utilities
	*/
	_startAni: function () {},

	_transitionTime: function (time) {},

	_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {},

	_offset: function (el) {},

	_snap: function (x, y) {},

	_bind: function (type, el, bubble) {},

	_unbind: function (type, el, bubble) {},


	/**
	* Public methods
	*/
	destroy: function () {},

	refresh: function () {},

	scrollTo: function (x, y, time, relative) {},

	scrollToElement: function (el, time) {},

	scrollToPage: function (pageX, pageY, time) {},

	disable: function () {},

	enable: function () {},

	stop: function () {},

	zoom: function (x, y, scale, time) {},

	isReady: function () {}
};

function prefixStyle (style) {}

dummyStyle = null;	// for the sake of it

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})(window, document);