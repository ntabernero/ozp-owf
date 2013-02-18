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
    'mixins/widgets/WidgetControl',
    'views/View',
    'models/WidgetStateModel',
    'lodash'
], function(WidgetControl, View, WidgetStateModel, _) {
    describe('WidgetControl', function() {
        var view,

            //create a subclass of view that has the WidgetControl mixin
            ViewClass = View.extend(_.extend({}, WidgetControl, {
                initialize: function(options) {
                    View.prototype.initialize.apply(this, arguments);
                    this.model = options.model;
                    WidgetControl.initialize.apply(this, arguments);
                }
            })),
            widget = {
                title: 'Widget Three',
                id: '3',
                url: 'widget.html',
                x: 50,
                y: 50,
                width: 400,
                height: 500,
                zIndex: 10000,
                minimized: false,
                maximized: false,
                collapsed: false,
                active: false
            };

        beforeEach(function(done) {
            view = new ViewClass({
                model: new WidgetStateModel(widget)
            });

            done();
        });

        afterEach(function(done) {
            view.remove();
            view = null;

            done();
        });

        it("sets the model's active attribute to true when activateWidget is called", function() {
            view.activateWidget();

            expect(view.model.get('active')).to.be(true);
        });

        it("sets the model's active attribute to true when the view gets a mousedown", function() {
            view.$el.trigger('mousedown');

            expect(view.model.get('active')).to.be(true);
        });

        it('removes the view when the model is destroyed', function() {
            sinon.spy(view, 'remove');

            view.model.destroy();

            expect(view.remove.calledOnce).to.be.ok();
        });

        //checks that the given css class is added and/removed when the
        //corresponding property on the model is set/unset
        function cssClassChecker(cssClass) {
            it('adds the ' + cssClass + 'css class to the view when the model property is set',
                function() {
                    view.model.set(cssClass, true);

                    expect(view.$el.hasClass(cssClass)).to.be(true);
            });

            it('removes the ' + cssClass + 'css class from the view when the model property is set',
                function() {
                    view.model.set(cssClass, false);

                    expect(view.$el.hasClass(cssClass)).to.be(false);
            });
        }

        _.each(['active', 'minimized', 'maximized', 'collapsed'], cssClassChecker);

        it('sets the appropriate css classes when constructed', function() {
            var view2 = new ViewClass({
                model: new WidgetStateModel({
                    title: 'Widget Three',
                    id: '3',
                    url: 'widget.html',
                    x: 50,
                    y: 50,
                    width: 400,
                    height: 500,
                    zIndex: 10000,
                    minimized: true,
                    maximized: true,
                    collapsed: true,
                    active: true
                })
            });

            expect(view2.$el.hasClass('active')).to.be(true);
            expect(view2.$el.hasClass('minimized')).to.be(true);
            expect(view2.$el.hasClass('maximized')).to.be(true);
            expect(view2.$el.hasClass('collapsed')).to.be(true);

            view2.remove();
        });
    });

});
