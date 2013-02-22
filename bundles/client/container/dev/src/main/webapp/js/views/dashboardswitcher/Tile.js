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
    'views/View',
    'views/dashboardswitcher/Tiles',
    'events/EventBus',
    // Libraries.
    'jquery',
    'lodash',
    'handlebars',
    'jqueryui/jquery-ui.custom',
    'bootstrap/bootstrap-tooltip'
],

function(View, Tiles, EventBus, $, _, Handlebars) {
   
    var tpl = 
        '<div class="thumb-wrap">' +
            '<div class="thumb">' +
            '</div>' +
        '</div>' +
        '{{#if this.isStack}}' +
            '<div class="btn-group">' +
                '<button class="btn refresh" data-id="{{this.id}}"><i class="icon-refresh"></i></button>' +
                '<button class="btn remove" data-id="{{this.id}}"><i class="icon-remove"></i></button>' +
            '</div>'+
        '{{else}}' +
            '<div class="btn-group">' +
                '<button class="btn refresh" data-id="{{this.id}}"><i class="icon-refresh"></i></button>' +
                '<button class="btn share" data-id="{{this.id}}"><i class="icon-share"></i></button>' +
                '<button class="btn edit" data-id="{{this.id}}"><i class="icon-edit"></i></button>' +
                '<button class="btn remove" data-id="{{this.id}}"><i class="icon-remove"></i></button>' +
            '</div>'+
        '{{/if}}' +
        '<span class="dashboard-name">{{this.switcherItem.attributes.name}}</span>';
    
    return View.extend({

        className: function() {
            return this.getName(this.model) + " dashboard-view";
        },
        
        template:   Handlebars.compile(tpl),

        selectedItemCls: 'dashboard-selected',
        
        initialize: function() {
            this.constructor.__super__.initialize.call(this);
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "remove", this.destroy);
        },
        
        render: function() {
            this.$el.empty();
            this.$el.html(this.template(this.model.toJSON()));
            // Enable HTML tooltips.
            this.$el.tooltip({
                html: true,
                placement: "bottom"
            });
            this.$el.find('btn').tooltip({
                html: true,
                placement: "bottom"
            });

            return this;
        },

        attributes: function() {
            var retVal = {
                    "id": 'dashboard' + this.model.get('id'),
                    "data-id": this.model.get('id'),
                    dataType: this.model.get('id'),
                    "title": this.getToolTip(this.model),
                    "tabIndex": "0"
            };
            retVal["data-" + this.getName(this.model) + "-id"] = this.model.get('id');
            return retVal;
        },
        
        getName: function(model) {
            return this.model.get('isStack') ? 'stack' : 'dashboard';
        },
        
        getToolTip: function(model) {
            var str = '<div class=\'dashboard-tooltip-content\'>' +
            '<h3 class=\'name\'>' + _.escape(model.get('switcherItem').get('name')) + '</h3>';

            model.get('switcherItem').get('description') && (str += '<p class=\'tip-description\'>' + _.escape(model.get('switcherItem').get('description')) +'</p><br>');
            
            if (model.get('isStack')) {
                return str + '</div>"';
            }
            else { 
                var groups = model.get('switcherItem').get('groups');
                
                // If we have groups, display a groups listing in the tooltip.
                if (groups && groups.length > 0) {
                    var groupStr = '';
                    for (var i = -1; ++i < groups.length;) {
                        groupStr += _.escape(groups[i].name) + ', ';                         
                    }
                    // Include the group listing only if there are groups to list.
                    if (groupStr.length > 0) {
                        str = str + '<p class=\'group\'><label>Group(s): </label>';
                        groupStr = groupStr.substring(0, groupStr.length - 2);
                        str = str + groupStr + '</p>';
                    }
                } 
                return str + '<p class=\'created-by\'><label>Created by: </label>' + (model.get('switcherItem').get('createdBy') ? (_.escape(model.get('switcherItem').get('createdBy').userFullName)) : '') + '</p>' +
                       '<p class=\'last-updated\'><label>Last Modified: </label>' + (model.get('switcherItem').get('lastModified') || '') + '</p></div>';
            }
        }
    });
});