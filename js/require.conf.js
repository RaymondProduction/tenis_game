requirejs.config({
  baseUrl: './js',     // select root directory for external JS files
  deps: ['main'],      // Main script when use external files

  // Parametr for short id
  paths: {
    'jquery': 'vendor/jquery-2.2.4.min',
    'canvas': '../bower_components/canvas-5-polyfill/canvas'
  }
});
