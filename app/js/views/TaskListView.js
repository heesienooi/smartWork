define([
    'backbone',
    'hbs!templates/tasklist'
], function (Backbone, tmpl) {
    'use strict';

    var TaskListView = Backbone.View.extend({

        template: tmpl,

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function () {
            var html = this.template({ tasks: this.collection.toJSON() });
            this.$el.html(html);
            return this;
        }
    });

    return TaskListView;
});
