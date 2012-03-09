# navigator.getUserMedia()

Reasonably normalization for navigator.getUserMedia. Inspired by [Mike Taylr's **gUM Shield**](https://gist.github.com/f2ac64ed7fc467ccdfe3)

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/rwldrn/navigator.getusermedia/master/dist/navigator.getusermedia.min.js
[max]: https://raw.github.com/rwldrn/navigator.getusermedia/master/dist/navigator.getusermedia.js

In your web page:

```html
<!--  You can optionally include Unprefix.js... -->
<!-- <script src="https://raw.github.com/rwldrn/unprefix.js/master/dist/unprefix.js.min.js"></script> -->

<script src="dist/navigator.getusermedia.min.js"></script>
<script>

navigator.getUserMedia({ video: true, audio: true }, function( raw, cooked ) {

  // "raw" is the stream as it was received by the host API
  // "cooked" is the normalized, URL.createObjectURL()-ified

});

</script>
```

## Documentation

- Opera (Labs Build: "Camera") uses the object parameter implementation, but pre-cooks the stream object
- Chrome (Canary) uses the string parameter implementation, provides the raw stream object

## Contributing
Style guide: [idiomatic.js](https://github.com/rwldrn/idiomatic.js), Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 Rick Waldron <waldron.rick@gmail.com>
Licensed under the MIT license.
