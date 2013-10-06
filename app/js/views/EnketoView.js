define([
    'backbone',
    'hbs!templates/enketo'
], function (Backbone, tmpl) {
    'use strict';

    var EnketoView = Backbone.View.extend({

        template: tmpl,

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.model.generateEnketoUrl();
            this.render();
        },

        render: function () {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });

    return EnketoView;
});
