define([
    'backbone',
    'text!templates/app.html'
], function (Backbone, html) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#app',

        template: _.template(html),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        setContentView: function (options) {
            var $navBarTitle = this.$el.find('.navBarTitle');
            var $appContent = this.$el.find('.appContent');

            $navBarTitle.html(options.navBarTitle);
            $appContent.append(options.contentView.el);
        }
    });

    return AppView;
})
