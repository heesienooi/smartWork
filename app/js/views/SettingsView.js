define([
    'backbone',
    'hbs!templates/settings',
], function (Backbone, tmpl) {
    'use strict';

    var SettingsView = Backbone.View.extend({

        template: tmpl,

        events: {
            'click .btn': 'promptForSetting'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {
            var fields = this.model.getSettingFields();
            this.$el.html(this.template({ 'settings': fields }));
            return this;
        },

        promptForSetting: function (e) {
            var $field = $(e.target).closest('.field');
            var fieldName = $field.data('field-name');
            var labelName = $field.find('label').text();
            var fieldValue = $field.find('.value').text();

            // Prompt user for update settings value
            var newValue = prompt(labelName + ': ', fieldValue);

            if (newValue.length > 0) {
                // Update model with new value entered by user
                this.model.set(fieldName, newValue);
                this.model.save();
            }
        }

    });

    return SettingsView;
})
