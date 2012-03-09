/*! Navigator Getusermedia - v0.1.0 - 3/9/2012
* https://github.com/rwldrn/navigator.getusermedia
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

  var isSpecParam = true,
      getUserMedia = navigator.getUserMedia;

  // To test param style support, check that it's safe to call
  // navigator.getUserMedia with an object param.
  // Chrome's implementation will throw:
  // NOT_SUPPORTED_ERR: DOM Exception 9
  try {
    navigator.getUserMedia({ video: true, audio: true }, function() {});
  } catch(e) {
    isSpecParam = false;
  }

  navigator.getUserMedia = function( opts, callback, errback ) {
    var key, options,
        keys = Object.keys( opts ),
        // Create guard against bogus options
        safe = { video: 1, audio: 1 };

    if ( !isSpecParam ) {
      // If this implementation expects a string param,
      // translate the object param into a comma sep. string
      // { video: 1, audio: 1 } => "video,audio"
      options = keys.filter(function( key ) {
        return this[ key ] && safe[ key ];
      }, opts ).join(",");
    } else {
      options = {};
      for ( key in opts ) {
        options[ key ] = opts[ key ] && safe[ key ];
      }
    }

    getUserMedia.call( navigator, options, function( raw ) {
      var stream;

      // If the stream is raw (ie. Canary), cook it.
      if ( raw.label && raw.readyState === 1 ) {
        stream = window.URL.createObjectURL( raw );
      }

      // This is non-standard, but feels like a
      // "nice to have" way to handle the mixed-matched
      // implementations of stream params.
      // This will be removed when the implementations
      // are updated.
      callback( raw, /* non-standard */ stream );
    }, errback || function() {});
  };

} (typeof window === "object" && window || this, this.navigator || {} ) );
