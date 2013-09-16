define([
    'backbone',
    'hbs!templates/settings',
], function (Backbone, tmpl) {
    'use strict';

    var SettingsView = Backbone.View.extend({

        template: tmpl,

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return SettingsView;
})
