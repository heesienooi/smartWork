define([
    'backbone',
    'text!templates/settings.html',
], function (Backbone, html) {
    'use strict';

    var SettingsView = Backbone.View.extend({

        template: _.template(html),

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
