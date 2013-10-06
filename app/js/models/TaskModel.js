define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TaskModel = Backbone.Model.extend({

        generateEnketoUrl: function (callback) {
            // TODO: abstract this hard code serverUrl to some settings model
            var serverUrl = "http://rmit.smap.com.au";
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
                    // TODO: abstract this hard code userId to some settings model
                    var userId = 'admin'
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
