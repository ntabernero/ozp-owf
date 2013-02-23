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

    describe("rpcLocalTest", function () {
        var serviceName = '_rpc_test';
        var container = null;
        var widget = null;
        var widgetFrameId = null;
        var iframeTag = null;
        var largePayload = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibul";
        var setupWidget = null;
        var writeWidget = null;

        beforeEach(function(){

            setupWidget = function () {
                //this is a local test so use the same hostname
                var altHostName = window.location.hostname;
                //    var altHostName = Ozone.config.alternateHostName ? Ozone.config.alternateHostName : '127.0.0.1';
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
                            + '/base/src/test/js/eventing/rpcLargePayload/rpcWidget.html').replace(/\/{2,}/, '/')
                };
                var widgetFrameIdObj = container.generateIframeId(widget.id);
                widgetFrameId = JSON.stringify(widgetFrameIdObj);
                iframeTag = "<iframe " + container.getIframeProperties(widget.url, widget.id, widget, 'desktop', 1) + " width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"auto\"></iframe>";
            };

            writeWidget = function () {
                var testDiv = $('#testDiv');
                if (testDiv.length === 0) {
                    testDiv = $('<div id="testDiv"></div>').appendTo(document.body);
                }
                var tpl = Handlebars.compile(
                            '<h>Eventing Local RPC Large Payload Tests</h>'+
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
        });


        afterEach(function () {
          $('#testDiv').remove();
        });

        it('sends a large message between widget and container', function(done) {
            var finished = $.Deferred();

            setupWidget();

            container.registerHandler(serviceName, function (sender, msg) {
                //parse sender and see if the widget id is as expected
                var widgetId = JSON.parse(sender);
                expect(widgetId.id).to.be(widget.id);
                expect(msg).to.be(largePayload);
                $('#message').text('received message: <b>' + msg + '</b>');
                finished.resolve();
            });

            writeWidget();

            finished.then(function () {
                gadgets.rpc.call(widgetFrameId,
                        '_rpc_widget_test', function (msg) {
                            //this callback will get the msg string from the rpcWidget
                            expect(msg).to.be('rpc_widget_test:' + largePayload);

                            done();

                        }, 'rpcTestContainer', largePayload);
            });
        });
    });
});
