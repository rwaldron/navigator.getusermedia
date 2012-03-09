/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function( window, navigator ) {

  test("navigator.getUserMedia", 1, function() {
    equal(typeof navigator.getUserMedia, "function", "navigator.getUserMedia() is a function");
  });

  // This test is questionable, as it will prompt for sharing your camera
  asyncTest("first param is object, no exceptions", 1, function() {

    // Needs to be tested in a real browser
    if ( !/Phantom/.test(navigator.userAgent) ) {
      try {
        navigator.getUserMedia({ video: true, audio: true }, function() {}, function() {});

        ok( true, "No Exception thrown" );
      } catch(e) {
        ok( false, "Exception thrown" );
      } finally {
        start();
      }
    } else {
      ok( true, "not tested in phantomjs" );
      start();
    }

  });
} ( this, this.navigator ) );
