define([
    'backbone',
    'hbs!templates/app',
    'snapjs'
], function (Backbone, tmpl, Snap) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '#app',

        template: tmpl,

        events: {
            'click #open-nav': 'openNav',
            'click .nav a': 'closeNav'
        },

        initialize: function () {
            this.render();
            this.snapper = new Snap({
              element: this.$el.find('.snap-content')[0]
            });
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        setContentView: function (options) {
            var $content = this.$el.find('.snap-content');
            $content.html(options.view.el);
        },

        openNav: function () {
            if (this.snapper.state().state === 'closed') {
                this.snapper.open('left');
            }
        },

        closeNav: function () {
            this.snapper.close();
        }
    });

    return AppView;
})
