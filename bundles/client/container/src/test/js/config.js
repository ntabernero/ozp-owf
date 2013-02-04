var tests = [];
for (var file in window.__testacular__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    enforceDefine: true
});

require({

    baseUrl: '/base/target/minified-output/js',
    paths: {
      require: '../target/minified-output/libs/js/require',
      backbone: '/base/target/minified-output/libs/js/backbone'
    },
    shim: {
        backbone: {
            exports: 'Backbone'
        }
    }
  }, tests, function() {
    window.__testacular__.start();
});
