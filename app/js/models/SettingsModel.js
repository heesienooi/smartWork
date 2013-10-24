define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var SETTING_LABEL_MAP = {
        'url': 'URL',
        'username': 'Username',
        'password': 'Password'
    };

    var SettingsModel = Backbone.Model.extend({
        defaults: {
            'url': 'http://dev.smap.com.au/',
            'username': 'heesien',
            'password': 'heesien'
        },

        getSettingFields: function () {
            var fields = [];
            var settingsModel = this.toJSON();

            for (var name in settingsModel) {
                fields.push({
                    'label': SETTING_LABEL_MAP[name],
                    'value': settingsModel[name],
                    'name': name
                });
            }

            return fields;
        }
    });

    return new SettingsModel();
});
