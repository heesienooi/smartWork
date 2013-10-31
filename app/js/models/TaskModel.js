define([
    'underscore',
    'backbone',
    'models/SettingsModel'
], function (_, Backbone, settingsModel) {
    'use strict';

    var TaskModel = Backbone.Model.extend({

        generateEnketoUrl: function (callback) {
            var serverUrl = settingsModel.get('url');
            var formId = this.get('task').form_id;
            var model = this;

            // Send ajax request to server to get enketo url
            $.ajax({
                type: "GET",
                url: serverUrl+"/enketo/api_v1/survey",
                data: {
                    server_url: serverUrl,
                    form_id: formId
                },
                dataType: 'jsonp',
                success : function (data) {
                    var userId = settingsModel.get('username');
                    var url = data.smap_url + '&user=' + userId;

                    model.set('enketoUrl', url);

                    if (typeof callback === 'function') callback(url);
                },
                error: function(xhr, textStatus, err) {
                    if(xhr.readyState == 0 || xhr.status == 0) {
                        return; // Not an error
                    } else {
                        console.log("Error: Failed to get web form: " + err);
                    }
                }
            });
        }
    });

    return TaskModel;
});
