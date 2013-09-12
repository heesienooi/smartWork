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
            'click #open-menu-stack': 'snapperOpen'
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
            var $appContent = this.$el.find('.appContent');

            $navBarTitle.html(options.navBarTitle);
            $appContent.append(options.contentView.el);
        },

        snapperOpen: function () {
            this.snapper.open('left');
        }
    });

    return AppView;
})
