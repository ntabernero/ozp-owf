var tests = Object.keys(window.__testacular__.files).filter(function (file) {
    return /Spec\.js$/.test(file);
});

require({

    baseUrl: '/base/target/minified-output/js',
    paths: {
      require: '../target/minified-output/js/require',
      backbone: '/base/target/minified-output/js/backbone'
    },
    shim: {
        backbone: {
            exports: 'Backbone'
        }
    }
  }, tests, function() {
    window.__testacular__.start();
});
