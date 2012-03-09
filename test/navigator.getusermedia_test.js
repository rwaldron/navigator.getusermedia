/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function( window, navigator ) {

  test("navigator.getUserMedia", 1, function() {
    equal(typeof navigator.getUserMedia, "function", "navigator.getUserMedia() is a function");
  });


} ( this, this.navigator ) );
