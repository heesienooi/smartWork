define([
    'backbone',
    'models/TaskModel',
    'utils/Server'
], function (backbone, TaskModel, Server) {
    'use strict';

    var TaskCollection = Backbone.Collection.extend({

        model: TaskModel,

        url: 'http://localhost:1234/surveyKPI/myassignments',

        sync: function () {
            return Server.sync.apply(this, arguments);
        },

        parse: function (resp) {
            return resp.data;
        }
    });

    return new TaskCollection();
});
