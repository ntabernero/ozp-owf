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
/*global define, describe, it, expect*/
define([
    'eventing/Container',
    'util/containerUtil',
    'handlebars',
    'jquery'
], function (Container, containerUtil, Handlebars, $) {
    'use strict';

    describe("rpcRemoteTest", function () {
        var serviceName = '_rpc_test';
        var container = null;
        var widget = null;
        var widgetFrameId = null;
        var iframeTag = null;

        var setupWidget = function () {
            //var altHostName = window.location.hostname;
            var altHostName = '127.0.0.1';
            var port = window.location.port != '' ? ':' + window.location.port : '';

            //init container
            Container.init({
                containerRelay: window.location.protocol + "//" + window.location.hostname + port
                        + '/base/target/minified-output/js/eventing/rpc_relay.uncompressed.html'
            });
            container = Container;

            widget = {
                id: containerUtil.guid(),
                widgetGuid: containerUtil.guid(),
                url: window.location.protocol + "//" + (altHostName + port
                        + '/base/src/test/js/eventing/rpc/rpcWidget.html').replace(/\/{2,}/, '/')
            };
            var widgetFrameIdObj = container.generateIframeId(widget.id);
            widgetFrameId = JSON.stringify(widgetFrameIdObj);
            iframeTag = "<iframe " + container.getIframeProperties(widget.url, widget.id, widget, 'desktop', 1) + " width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"auto\"></iframe>";
        };

        var writeWidget = function () {
            var testDiv = $('#testDiv');
            if (testDiv.length === 0) {
                testDiv = $('<div id="testDiv"></div>').appendTo(document.body);
            }
            var tpl = Handlebars.compile(
                        '<h>Eventing Remote RPC Tests</h>' +
                        '<div style="border: 2px solid black;">' +
                        '<h>Container</h>' +
                        '<div id="message"></div>' +
                        '<div id="widget_container" style="border: 2px solid black;">' +
                        'Widget' +
                        '<div id="widget">' +
                        '{{{iframeTag}}}' +
                        '</div>' +
                        '</div>' +
                        '</div>'
            );
            testDiv.html(tpl({'iframeTag': iframeTag}));
        };

        afterEach(function () {
          $('#testDiv').remove();
        });

        it('widgetToContainerRPCTest', function (done) {

            var finished = $.Deferred();

            setupWidget();

            container.registerHandler(serviceName, function (sender, msg) {
                //parse sender and see if the widget id is as expected
                var widgetId = JSON.parse(sender);
                expect(widgetId.id).to.be(widget.id);
                expect(msg).to.be('I sent you a message from the widget!!!');
                $('#message').text('received message: <b>' + msg + '</b>');
                finished.resolve();
            });

            writeWidget();

            finished.then(function () {
                var msgFromContainer = 'this is a message from the container';
                gadgets.rpc.call(widgetFrameId,
                        '_rpc_widget_test', function (msg) {
                            //this callback will get the msg string from the rpcWidget
                            expect(msg).to.be('rpc_widget_test:' + msgFromContainer);

                            done();

                        }, 'rpcTestContainer', msgFromContainer);
            });
        });
    });
});
