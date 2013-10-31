define([
    'backbone',
    'models/TaskCollection',
    'models/SettingsModel',
    'views/AppView',
    'views/TaskListView',
    'views/TaskMapView',
    'views/SettingsView',
    'views/EnketoView'
], function (Backbone, taskCollection, settingsModel, AppView, TaskListView, TaskMapView, SettingsView, EnketoView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        appView: new AppView(),

        views: {},

        routes: {
            '': 'taskListView',
            'taskmap' : 'taskMapView',
            'settings': 'settingsView',
            'enketo/:index': 'enketoView'
        },

        initialize: function () {
            // When application launched, start fetch user's settings from local storage
            settingsModel.fetch();
            taskCollection.fetch({ reset: true });
        },

        taskListView: function () {
            if (!this.views.taskListView) {
                this.views.taskListView = new TaskListView({ collection: taskCollection });
            }

            this.appView.setContentView({
                view: this.views.taskListView
            });
        },

        taskMapView: function () {
            if (!this.views.taskMapView) {
                this.views.taskMapView = new TaskMapView({ collection: taskCollection });
            }

            this.appView.setContentView({
                navBarTitle: 'Task Map',
                view: this.views.taskMapView
            });

            this.views.taskMapView.configureMap();
        },

        settingsView: function () {
            if (!this.views.settingsView) {
                this.views.settingsView = new SettingsView({ model: settingsModel });
            }

            this.appView.setContentView({
                view: this.views.settingsView
            });
        },

        enketoView: function (index) {
            var model = taskCollection.at(index);

            if (!this.views.enketoView) {
                delete this.views.enketoView;
            }

            this.views.enketoView = new EnketoView({ model: model });

            this.appView.setContentView({
                view: this.views.enketoView
            });
        }

    });

    return AppRouter;
})
