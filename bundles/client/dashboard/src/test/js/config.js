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
//    paths: {
//      require: '../target/minified-output/js/require',
//      backbone: '/base/target/minified-output/js/backbone'
//    },
//    shim: {
//        backbone: {
//            exports: 'Backbone'
//        }
//    }
    paths: {
        bootstrap: '../libs/js/bootstrap',
        jqueryui: '../libs/development-bundle/ui',
        // alias versioned dependencies to simplify updating as new versions are released
        jquery: '../libs/js/jquery',
        lodash: '../libs/js/lodash',
        backbone: '../libs/js/backbone',
        modernizr: '../libs/js/modernizr',
        handlebars: '../libs/js/handlebars'
        // // match handlebars requirejs plugin to avoid having to edit the contents of handlebars plugin when updating it to a new version
        // hbs: 'js/handlebars/handlebars-plugin-0.2.1',
        // json2: 'js/json2',
        // 'handlebars-i18nprecompile': 'js/handlebars/handlebars-i18nprecompile'
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        jquery: {
            exports: '$'
        },
        lodash: {
            exports: '_'
        },
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        'bootstrap/bootstrap-transition': {
            deps: ['jquery'],
            exports: '$'
        },
        'bootstrap/bootstrap-modal': {
            deps: ['jquery', 'bootstrap/bootstrap-transition'],
            exports: '$'
        },
        'jqueryui/jquery-ui.custom': {
            deps: ['jquery'],
            exports: '$'
        }
    }
  }, tests, function() {
    var cssPath = '/base/target/minified-output/themes/a_default.theme/css/a_default.css';

    //before starting tests, import default css
    if (document.createStyleSheet) {
        document.createStyleSheet(cssPath);
    }
    else {
        var stylesheet = $('<link>')
            .appendTo('head')
            .attr('type', 'text/css')
            .attr('rel', 'stylesheet')
            .attr('href', cssPath);
    }

    window.__testacular__.start();
});
