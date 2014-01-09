CSS animation utilities
=======================

Useful JavaScript snippets related to CSS animation.

`isAnimationSupported`
----------------------

Determine if a particular property can be animated with either transitions or keyframe animation.

### Parameters

<dl>
  <dt><code>property</code></dt>
  <dd>The property to test.
  
  <dt><code>from</code></dt>
  <dd>A valid starting value for the animation.</dd>
  
  <dt><code>to</code></dt>
  <dd>A valid ending value for the animation.</dd>
  
  <dt><code>element</code> <em>(optional)</em></dt>
  <dd>The element to test with. (Required for testing properties with prerequisites, e.g. "top" requires non-static position.)</dd>
</dl>

### Example use

    isAnimationSupported('background', 'red', 'green');
