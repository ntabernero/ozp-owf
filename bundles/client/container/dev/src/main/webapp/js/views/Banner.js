define([
    'app',
    'events/EventBus',

//    'views/launchmenu/LaunchMenu',
//    'views/dashboardswitcher/DashboardSwitcher',
//    'views/UserProfileWindow',
//    'views/AboutWindow',

    // Libraries.
    'backbone',
    'jquery',
    'handlebars'
],

function(app, EventBus,
//         LaunchMenu, DashboardSwitcher, UserProfileWindow, AboutWindow,
         Backbone, $, Handlebars) {
        
        var buttonsTemplate =
            '<div id="toolbar-buttons">' +
            '<div class="toolbar-separator"></div>' +
            '{{#each buttons}}' +
            '<div class="toolbar-button-wrapper">'+
            '<button class="{{this.className}}"> </button>' +
            '</div>' + 
            '<div class="toolbar-separator"></div>' +
            '{{/each}}' +
            '</div>';
        
        var bannerImageTemplate = 
            '<div id="toolbar-image"></div>';
    
        var userPulldownTemplate = 
            '<div class="toolbar-user-menu-wrapper" style="height: auto, width: auto">' +
            '   <div id="toolbar-user-menu">' +
            '       <buttton id="userMenuBtn">John Doe</button>' +
            '   </div>' +
            '   <div id="toolbar-user-menu-dropdown">' +
            '       <ul class="user-menu-options-list">' +
            '            <li id="prev-login-menu-option">Previous Sign In</li>' +
            '            <li>Profile</li>' +
            '           <li>About</li>' +
            '           <hr>' +
            '           <li id="sign-out-menu-option">Sign Out</li>' +
            '       </ul>' +
            '   </div>' +
            '</div>';
        
        var isMenuVisible;

    var Banner = Backbone.View.extend({
        
        buttons: [],

        el: $('#banner'),
        
        displayButtonsTemplate: Handlebars.compile(buttonsTemplate),
        
        className: "navbar navbar-static-top",

        events: {
            'click .launchMenu-btn': 'showLaunchMenu',
            'click .create-dashboard-btn': 'createDashboard',
            'click .switcher-btn': 'showSwitcherWindow',
            'click .settings-btn': 'showSettingsWindow',
            'click .admin-btn': 'showAdminWindow',
            'click .help-btn': 'showHelpWindow',
            'click #userMenuBtn' : 'onUserMenuButtonClicked'
            //'mouseout #toolbar-user-menu-dropdown' : 'hideUserMenu'
        },

        initialize: function () {
            // add the buttons across the top.
            this.model.get("buttons").push({name: 'Launch Menu', className: 'launchMenu-btn'});
            this.model.get("buttons").push({name: 'Create Dashboard', className: 'create-dashboard-btn'});
            this.model.get("buttons").push({name: 'Switcher', className: 'switcher-btn'});
            this.model.get("buttons").push({name: 'Settings', className: 'settings-btn'});
            this.model.get("buttons").push({name: 'Admin', className: 'admin-btn'});
            this.model.get("buttons").push({name: 'Help', className: 'help-btn'});
        },
        
        render: function () {
            
                var me = this;
            
                // render the 3 parts of the toolbar
                this.$el.html(this.displayButtonsTemplate(this.model.attributes));
                this.$el.append(bannerImageTemplate);
                this.$el.append(userPulldownTemplate);
           
                
                // loop through the button list and dynamically add the icons to the buttons
                var buttons = this.model.get("buttons");
                for (var a = 0; a < buttons.length; a++) {
                    $('.' + buttons[a].className).button({
                        text: false,
                        icons: {
                            primary: buttons[a].className + '-icon'
                        }
                    });
                }
                
                // setup the user menu button
                $(function() {
                   $("#userMenuBtn").button({
                       icons: {
                           primary: "",
                           secondary: "userMenuIcon"
                       }
                   }); 
                });
                
                // do all of the jquery specific binding and what not
                $(document).ready(function () {
                    $('ul.user-menu-options-list').fadeOut(200);
                    $('#user-menu-options-list').menu();
                    $('.ui-menu-item').removeClass('.ui-corner-all');
                    
                    $("ul.user-menu-options-list > li").each(function() {
                        $(this).bind('mouseover', function(e) {
                            if ($(this).attr('id') !== 'prev-login-menu-option') {
                                $(this).addClass('menu-hover');
                            }
                            
                            if ($(this).attr('id') === 'sign-out-menu-option') {
                                $(this).addClass('sign-out-hover');
                            }
                        });
                        $(this).bind('mouseout', function(e) {
                            $(this).removeClass('menu-hover');
                            
                            if ($(this).attr('id') === 'sign-out-menu-option') {
                                $(this).removeClass('sign-out-hover');
                            }
                        });
                    });
                    
                    // bind the mouseout from the user menu here
                    $(".toolbar-user-menu-wrapper").hover( 
                    function(){
                        me.showUserMenu();
                    },
                    function() {
                        me.hideUserMenu();
                    });
                    
                    // bind the hover to the button as well
                    //$("#userMenuButton").hover( 
                    //function(){
                    //    me.showUserMenu();
                    //},
                    //function() {
                    //    ; // do nothing
                    //});
                });
            },
        
        
        showLaunchMenu: function (evt) {
            return false;
        },

        createDashboard: function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            EventBus.trigger('dashboard:create');
        },

        showSwitcherWindow: function(evt) {
//            if(!this.dashboardSwitcher) {
//                this.dashboardSwitcher = new DashboardSwitcher();
//                $body.append(this.dashboardSwitcher.render().$el);
//            }
//
//            this.dashboardSwitcher.show();
//            this.dashboardSwitcher.$el.one('hidden', function () {
//                $(evt.currentTarget).removeClass('active');
//            });
//            $(evt.currentTarget).addClass('active');
            alert('in the switcher window button');
            return false;
        },

        showSettingsWindow: function(e) {
            alert('in the settings window button');
            return false;
        },

        showAdminWindow: function () {
//            var userProfileWindow = new UserProfileWindow();
//            $body.append( userProfileWindow.render().$el );
//            userProfileWindow.show();
            alert('in the admin window button');
        },

        showHelpWindow: function () {
//            var aboutWindow = new AboutWindow();
//            $body.append( aboutWindow.render().$el );
//            aboutWindow.show();
            alert('in the help window button');
        },
        
        onUserMenuButtonClicked: function() {
            if (!isMenuVisible) {
                this.showUserMenu();
            } else {
                this.hideUserMenu();
            }
        },
        
        showUserMenu: function () {
            if (!isMenuVisible){
                $('ul.user-menu-options-list').fadeIn(100);
                isMenuVisible = true;
            }
        },
        
        hideUserMenu: function () {
            if (isMenuVisible) {
                $('ul.user-menu-options-list').fadeOut(100);
                isMenuVisible = false;
            }
        }
        
    });

    return Banner;

});
