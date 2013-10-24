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
            var fields = this.model.getSettingFields();
            this.$el.html(this.template({ 'settings': fields }));
            return this;
        }

    });

    return SettingsView;
})
