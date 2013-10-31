define([
    'underscore',
    'backbone',
    'backboneLocalStorage'
], function (_, Backbone, localStorage) {
    'use strict';

    var SETTING_LABEL = {
        'url': 'URL',
        'username': 'Username',
        'password': 'Password'
    };

    var SettingsModel = Backbone.Model.extend({

        defaults: {
            'url': 'http://dev.smap.com.au',
            'username': 'heesien',
            'password': 'heesien'
        },

        localStorage: new Backbone.LocalStorage('Settings'),

        getSettingFields: function () {
            var fields = [];
            var settingsModel = this.toJSON();

            for (var name in settingsModel) {
                // If setting model attribute not found in label map
                // then skip this attribute
                if (!SETTING_LABEL[name]) continue;

                fields.push({
                    'label': SETTING_LABEL[name],
                    'value': settingsModel[name],
                    'name': name
                });
            }

            return fields;
        }
    });

    return new SettingsModel({ id: 'YfX2EXbMpyF2sC' });
});
