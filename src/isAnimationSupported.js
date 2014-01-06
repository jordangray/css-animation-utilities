/*
@param property  The property to test.
@param from	     A valid starting value for the animation.
@param to        A valid ending value for the animation.
@param [element] The element to test with. (Required for testing
                 properties with prerequisites, e.g. "top" requires
                 non-static position.)
*/
function isAnimationSupported(property, from, to, element) {
	var doc = document.documentElement,
		style = doc.appendChild(document.createElement("style")),
		rule = [
				'capTest{',
					'0%{',   property, ':', from, '}',
					'100%{', property, ':', to,   '}',
				'}'
			   ].join(''),
		propCamel = property.toCamelCase(),
		prefixes = ' moz ms o webkit'.split(' '),
		prefixCount = prefixes.length,
		canAnimate = false;

	element = doc.appendChild((element) ? element.cloneNode(false) : document.createElement('div'));

	// Detect invalid start value. (Webkit tries to use default.)
	element.style[propCamel] = to;

	// Iterate through supported prefixes.
	for (var i = 0; i < prefixCount; i++) {

		// Variations on current prefix.
		var prefix  = prefixes[i],
			hPrefix = (prefix) ? '-' + prefix + '-' : '',
			uPrefix = (prefix) ? prefix.toUpperCase() + '_' : '';

		// Test for support.
		if (CSSRule[uPrefix + 'KEYFRAMES_RULE']) {

			// Rule supported; add keyframe rule to test stylesheet.
			style.sheet.insertRule('@'+ hPrefix + 'keyframes ' + rule, 0);

			// Apply animation.
			var animationProp = (hPrefix + 'animation').toCamelCase();
			element.style[animationProp] = 'capTest 1s 0s both';

			// Get initial computed style.
			var before = getComputedStyle(element)[propCamel];

			// Skip to last frame of animation.
			// BUG: Firefox doesn't support reverse or update node style while attached.
			doc.removeChild(element);
			element.style[animationProp] = 'capTest 1s -1s alternate both';
			doc.appendChild(element);
			// BUG: Webkit doesn't update style when animation skipped ahead.
			element.style[animationProp] = 'capTest 1s 0 reverse both';

			// Get final computed style.
			var after = getComputedStyle(element)[propCamel];

			// If before and after are different, property and values are animable.
			canAnimate = before !== after;
			break;
		}
	}

	// Clean up the test elements.
	doc.removeChild(element);
	doc.removeChild(style);

	return canAnimate;
}

// Cribbed from Lea Verou's prefixfree.
String.prototype.toCamelCase = function() {
	return this.replace(/-([a-z])/g, function($0, $1) { return $1.toUpperCase(); }).replace('-','');
};