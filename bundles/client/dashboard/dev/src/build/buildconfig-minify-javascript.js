/*
 * Copyright 2013 Next Century Corporation 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// All options can be found at: https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
    baseUrl: "../../target/minified-output/js",
    mainConfigFile: '../../target/minified-output/js/main.js',
    locale: "en_us",
    
    optimize: "closure",
    waitSeconds: 15,
    
    name: '../js/require', // just 'require' doesn't work for some reason
    include: ['main'],
    
    wrap: {
        start: ";(function() {",
        end: "}());"
    },
    
    out: '../../target/minified-output/js/production.js'
})
