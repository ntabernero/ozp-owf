// All options can be found at: https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
    baseUrl: "../../target/minified-output/js",
    mainConfigFile: '../../target/minified-output/js/main.js',
    locale: "en_us",
    
    optimize: "none",
    waitSeconds: 15,
    
    name: '../libs/js/require', // just 'require' doesn't work for some reason
    include: ['main'],
    
    wrap: {
        start: ";(function() {",
        end: "}());"
    },
    
    out: '../../target/minified-output/js/production-debug.js'
})