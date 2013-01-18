var tests = Object.keys(window.__testacular__.files).filter(function (file) {
    return /Spec\.js$/.test(file);
});

require({

    // !! Testacular serves files from '/base'
    baseUrl: '/base/src/main/webapp/js',
    paths: {
      require: '../target/minified-output/js/require',
      backbone: '/base/target/minified-output/js/backbone'
      //text: '../lib/text'
    },
    shim: {
        backbone: {
            exports: 'Backbone'
        }
    }
  }, tests, function() {
    window.__testacular__.start();
});
