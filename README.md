CSS animation utilities
=======================

A collection of useful JavaScript snippets related to CSS animation.

`isAnimationSupported`
----------------------

Determine if a particular property can be animated with either transitions or keyframe animation.

### Parameters

<dl>
  <dt>`property`</dt>
  <dd>The property to test.
  
  <dt>`from`</dt>
  <dd>A valid starting value for the animation.</dd>
  
  <dt>`to`</dt>
  <dd>A valid ending value for the animation.</dd>
  
  <dt>`element` *(optional)*</dt>
  <dd>The element to test with. (Required for testing properties with prerequisites, e.g. "top" requires non-static position.)</dd>
</dl>

### Example use

    isAnimationSupported('background', 'red', 'green');
