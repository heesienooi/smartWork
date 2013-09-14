define([
    'backbone',
    'text!templates/app.html',
    'snapjs'
], function (Backbone, html, Snap) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#app',

        template: _.template(html),

        events: {
            'click #open-menu-stack': 'snapperOpenPane',
            'click .navigation a': 'snapperClosePane'
        },

        initialize: function () {
            this.render();
            this.snapper = new Snap({
              element: this.$el.find('.appContent')[0]
            });
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        setContentView: function (options) {
            var $navBarTitle = this.$el.find('.navBarTitle');
            var $content = this.$el.find('.content');

            $navBarTitle.html(options.navBarTitle);
            $content.html(options.contentView.el);
        },

        snapperOpenPane: function () {
            this.snapper.open('left');
        },

        snapperClosePane: function () {
            this.snapper.close();
        }
    });

    return AppView;
})
