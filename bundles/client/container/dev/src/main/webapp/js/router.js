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
define([
    'events/EventBus',

    //libs
    'backbone',
    'lodash',
    'jquery'
], function (EventBus, Backbone, _, $) {
    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };
    $.cookie.json = true;


    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'guid=:id': 'index',
            'perf/:count': 'measurePerformance',
            ':guid': 'index'
        },

        initialize: function (options) {
            this.options = options;

            //anytime a dashboard is switched update the url so it has the dashboard's id
            EventBus.on('dashboard:switched', function (model) {
              if (model != null && model.get('id') != null) {
                  this.navigate('guid='+model.get('id'));
              }
            }, this);
        },

        index: function (id) {
            EventBus.trigger('dashboard:switch', new Backbone.Model({
                id:id
            }));
        },

        measurePerformance: function (count) {
            var startTime = +(new Date());
            count = parseInt(count, 10);

            EventBus.on('dashboard:activated', function (model, view) {
                var endTime = +(new Date());
                var renderTimes = $.cookie('renderTimes') || [];
                renderTimes.push(endTime - startTime);
                $.cookie('renderTimes', renderTimes, { expires: 7, path: '/' });

                if (renderTimes.length >= count) {
                    var sum = _.reduce(renderTimes, function (memo, num) {
                        return memo + num;
                    }, 0);
                    console.log('Average render time ', sum / (renderTimes.length), renderTimes);
                    alert('Average render time ' + sum / (renderTimes.length) + ' ms');

                    $.removeCookie('renderTimes');
                }
                else {
                    setTimeout(function () {
                        window.location.reload();
                    }, 5000);
                }
            });

            this.index();

        }
    });

    return Router;

});
