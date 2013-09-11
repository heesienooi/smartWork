define([
    'underscore',
    'backbone'
], function (_, Backbone){
    'use strict';

    var Server = {
        sync: function (method, model, options) {
            _.extend(options, {
                xhrFields: { withCredentials: true }
            });
            return Backbone.sync.apply(this, arguments);
        }
    };

    return Server;
});