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
    
//    var tpl = 
//            '<img src="/themes/common/images/dashboardswitcher/DefaultDashboard_Color.png" class="img-polaroid" />' +
//            '<span>{{this.name}}</span>' +
//            '<div class="btn-group">' +
//                '<button class="btn"><i class="icon-refresh"></i></button>' +
//                '<button class="btn"><i class="icon-share"></i></button>' +
//                '<button class="btn"><i class="icon-edit"></i></button>' +
//                '<button class="btn"><i class="icon-remove"></i></button>' +
//            '</div>';
   
    var tpl = 
        '<div class="thumb-wrap">' +
            '<div class="thumb">' +
            '</div>' +
        '</div>' +
        '{{#if this.isStack}}' +
            '<ul class="stack-actions hide">'+
                '<li></li>'+
                '<li class="refresh icon-refresh" tabindex="0" title="Restore" data-id="{{this.id}}"></li>'+
                '<li class="remove icon-remove" tabindex="0" title="Delete" data-id="{{this.id}}"></li>'+
                '<li></li>'+
            '</ul>' +
        '{{else}}' +
            '<ul class="dashboard-actions hide">'+
                '<li class="share icon-share" tabindex="0" title="Share" data-id="{{this.id}}"></li>'+
                '<li class="refresh icon-refresh" tabindex="0" title="Restore" data-id="{{this.id}}"></li>'+
                '<li class="edit icon-edit" tabindex="0" title="Edit" data-id="{{this.id}}"></li>'+
                '<li class="remove icon-remove" tabindex="0" title="Delete" data-id="{{this.id}}"></li>'+
            '</ul>' +
        '{{/if}}' +
        '<div class="dashboard-name">' +
            '{{this.switcherItem.attributes.name}}' +
        '</div>';
    
    return View.extend({

        className: function() {
            return this.getName(this.model) + "";
        },
        
        template:   Handlebars.compile(tpl),

        selectedItemCls: 'dashboard-selected',
        
        initialize: function() {
            this.constructor.__super__.initialize.call(this);
        },
        
        render: function() {
            //this.$el.html( this.template( this.model.get('switcherItem').toJSON() ) );
            this.$el.html(this.template(this.model.toJSON()));
            // Enable HTML tooltips.
            this.$el.tooltip({
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
        
        onRefresh: function (evt) {
            evt.stopPropagation();

            if (this.model.get('isStack')) {
                this.trigger('stackrestore', this.model);
            }
            else {
                this.trigger('dashboardrestore', this.model);
            }
        },
        
        onShare: function (evt) {
            evt.stopPropagation(); 
            this.trigger('dashboardshare', this.model);
        },
        
        onEdit: function (evt) {
            evt.stopPropagation();
            this.trigger('dashboardedit', this.model);
        },
        
        onDelete: function (evt) {
            evt.stopPropagation();
            
            if (this.model.get('isStack')) {
                this.trigger('stackdelete', this.model);
            }
            else {
                this.trigger('dashboarddelete', this.model);
            }
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