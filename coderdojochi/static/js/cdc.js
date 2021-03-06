/**
CoderDojoChi.org Global JS

@class global
@namespace CDC
@type {Object}
**/

var CDC = CDC || {};

CDC.global = (function($, document, window, undefined) {
    'use strict';

    // app global properties


    /* Public Methods _________________________________________________________________ */

    function init() {

        // account for csrf in all ajax requests
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                function getCookie(name) {
                    var cookieValue = null;
                    if (document.cookie && document.cookie !== '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
                if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                    // Only send the token to relative URLs i.e. locally.
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        });

        // remove any alerts
        setTimeout(function() {
            $('.alert-fade').parent().fadeOut();
        }, 5000);

        // Scroll
        $(window).scroll(function() {
            if ($(document).scrollTop() > 50) {
                $('nav').addClass('shrink');
            } else {
                $('nav').removeClass('shrink');
            }
        });

        $('#carousel-home-hero').carousel({
            interval: false
        });

        // Login / Register email show/hide
        $('.login-email, .signup-email').click(function() {
            var $form = $('.main .container form');

            $form.toggleClass('hide');
            $form.find('input:not([type=hidden]):eq(0)').focus();
        });

        // Student form field expand/hide
        $('.js-expand-student-form').click(function() {
            var $this = $(this);
            var text = $this.text();

            $this.parent().parent().find('textarea').toggleClass('hidden');

            if (text === 'expand') {
                $this.text('contract');
            } else {
                $this.text('expand');
            }
        });

        $('[data-toggle="popover"]').popover();
    }

    function openPopUp(url, height, width) {
        height = (height) ? height : 500;
        width = (width) ? width : 600;
        var newWindow = window.open(url, 'name', 'height=' + height + ',width=' + width);
        if (window.focus) {
            newWindow.focus();
        }
        return false;
    }

    /* Private Methods ________________________________________________________________ */


    /* Expose Public Methods ________________________________________________________________ */

    return {
        init: init,
        openPopUp: openPopUp
    };

}(jQuery, document, window, undefined));

$(function() {
    'use strict';
    CDC.global.init();
});
