define([
    'backbone',
    'collections/TaskCollection',
    'views/AppView',
    'views/TaskListView',
    'views/TaskMapView',
    'views/SettingsView'
], function (Backbone, taskCollection, AppView, TaskListView, TaskMapView, SettingsView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        appView: new AppView(),

        views: {},

        routes: {
            '': 'taskListView',
            'taskmap' : 'taskMapView',
            'settings': 'settingsView'
        },

        taskListView: function () {
            if (!this.views.taskListView) {
                this.views.taskListView = new TaskListView({ collection: taskCollection });
            }

            this.appView.setContentView({
                navBarTitle: 'Task List',
                contentView: this.views.taskListView
            });
        },

        taskMapView: function () {
            if (!this.views.taskMapView) {
                this.views.taskMapView = new TaskMapView({ collection: taskCollection });
            }

            this.appView.setContentView({
                navBarTitle: 'Task Map',
                contentView: this.views.taskMapView
            });

            this.views.taskMapView.configureMap();
        },

        settingsView: function () {
            if (!this.views.settingsView) {
                this.views.settingsView = new SettingsView();
            }

            this.appView.setContentView({
                navBarTitle: 'Settings',
                contentView: this.views.settingsView
            });
        }

    });

    return AppRouter;
})
