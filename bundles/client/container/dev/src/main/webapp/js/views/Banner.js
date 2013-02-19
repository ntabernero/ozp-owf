define([
    'app',
    'events/EventBus',

//    'views/launchmenu/LaunchMenu',
    'views/dashboardswitcher/DashboardSwitcher',
//    'views/UserProfileWindow',
//    'views/AboutWindow',

    // Libraries.
    'backbone',
    'jquery'
],

function(app, EventBus, DashboardSwitcher,
//         LaunchMenu, UserProfileWindow, AboutWindow,
         Backbone, $) {

    var $body = $(document.body),
        launchmenuShown = false;

    var Banner = Backbone.View.extend({

        el: $('#banner'),

        events: {
            'click .launchmenu-btn': 'showLaunchMenu',
            'click .create-dashboard-btn': 'createDashboard',
            'click .dashboards-btn': 'showDashboardsWindow',
            'click .admin-btn': 'showAdminWindow',
            'click .user-profile-btn': 'showProfileWindow',
            'click .about-btn': 'showAboutWindow'
        },

        initialize: function () {
            this.$el.tooltip();  
            return this;
        },
        
        showLaunchMenu: function (evt) {
            //this.trigger('show:launchmenu', e);
//            if(!launchmenuShown)
//                $body.append(LaunchMenu.render().$el);

//            LaunchMenu.show();
            launchmenuShown = true;
            return false;
        },

        createDashboard: function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            EventBus.trigger('dashboard:create');
        },

        showDashboardsWindow: function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            EventBus.trigger('dashboard:showSwitcher', evt);
        },

        showAdminWindow: function(e) {
            return false;
        },

        showProfileWindow: function () {
//            var userProfileWindow = new UserProfileWindow();
//            $body.append( userProfileWindow.render().$el );
//            userProfileWindow.show();
        },

        showAboutWindow: function () {
//            var aboutWindow = new AboutWindow();
//            $body.append( aboutWindow.render().$el );
//            aboutWindow.show();
        }
    });

    return Banner;

});
