define([
    'backbone',
    'collections/TaskCollection',
    'views/AppView',
    'views/TaskListView'
], function (Backbone, taskCollection, AppView, TaskListView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        appView: new AppView(),

        views: {},

        routes: {
            '': 'taskListView'
        },

        taskListView: function () {
            if (!this.views.taskListView) {
                this.views.taskListView = new TaskListView({ collection: taskCollection });
            }

            this.appView.setContentView({
                navBarTitle: 'Task List',
                contentView: this.views.taskListView
            });
        }

    });

    return AppRouter;
})
