/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function( window, navigator ) {

  // Only run these tests if navigator.getUserMedia is supported
  if ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia ) {
    
    // navigator.getUserMedia should be a function if supported
    test("navigator.getUserMedia is supported", 1, function() {
      equal(typeof navigator.getUserMedia, "function", "navigator.getUserMedia() is a function");
    });

    // Do not run these tests in Phantom (real browser only)
    if ( !/Phantom/.test(navigator.userAgent) ) {
    
      // This test is questionable, as it will prompt for sharing your camera
      asyncTest("Really works", 1, function() {
        var video = document.querySelector("#test-target");
        
        navigator.getUserMedia({ video: true }, function( stream ) {
          
          if ( navigator.mozGetUserMedia ) {
            video.mozSrcObject = stream;  
          } else {
            video.src = stream;
          }

          video.play();
          video.addEventListener("canplaythrough", function(e) {
            ok( true, "playing!!" );
            start();
          }, false);

        });
      });

    }

  // Only run these tests if navigator.getUserMedia is not supported
  } else {

    // navigator.getUserMedia should be equal to undefined if not supported
    test("navigator.getUserMedia is not supported", 1, function() {
      equal(navigator.getUserMedia, undefined, "navigator.getUserMedia() is undefined");
    });

  }

} ( this, this.navigator ) );
