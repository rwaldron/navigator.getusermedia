/* gum - v0.1.0 - 3/08/2012
* https://github.com/rwldrn/dmv (gum)
* Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>; Licensed MIT */
(function( window, navigator ) {
  // 2012-03-08 Inspired by https://gist.github.com/f2ac64ed7fc467ccdfe3

  // If unprefix.js is available, use it.
  // https://github.com/rwldrn/unprefix.js
  // Otherwise...
  if ( !window.unprefix ) {
    // Thanks to Mike Taylr for typing this
    // https://gist.github.com/f2ac64ed7fc467ccdfe3
    // normalize window.URL
    if ( !window.URL ) {
      window.URL = window.webkitURL || window.msURL || window.oURL;
    }
    // normalize navigator.getUserMedia
    if ( !navigator.getUserMedia ) {
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }
  }

  var getUserMedia = navigator.getUserMedia;

  navigator.getUserMedia = (getUserMedia) ? function( opts, callback, errback ) {

    getUserMedia.call( navigator, opts, function( raw ) {
      var stream;

      // If the stream is raw (ie. Chrome), cook it.
      if ( raw.label && raw.readyState === 1 ) {
        stream = window.URL.createObjectURL( raw );
      }

      // Opera 12.02 does it like this...
      // Make Firefox Nightly happy...
      if ( raw.createObjectURL || raw.currentTime !== undefined ) {
        stream = raw;
      }


      // This is non-standard, but feels like a
      // "nice to have" way to handle the mixed-matched
      // implementations of stream params.
      // This will be removed when the implementations
      // are updated.
      callback( stream, /* non-standard */ raw );
    }, errback || function() {});
  } : false;

} (typeof window === "object" && window || this, this.navigator || {} ) );
