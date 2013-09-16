define([
    'backbone',
    'models/TaskCollection',
    'views/AppView',
    'views/TaskListView',
    'views/SettingsView'
], function (Backbone, taskCollection, AppView, TaskListView, SettingsView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        appView: new AppView(),

        views: {},

        routes: {
            '': 'taskListView',
            'settings': 'settingsView'
        },

        taskListView: function () {
            if (!this.views.taskListView) {
                this.views.taskListView = new TaskListView({ collection: taskCollection });
            }

            this.appView.setContentView({
                view: this.views.taskListView
            });
        },

        settingsView: function () {
            if (!this.views.settingsView) {
                this.views.settingsView = new SettingsView();
            }

            this.appView.setContentView({
                view: this.views.settingsView
            });
        }

    });

    return AppRouter;
})
