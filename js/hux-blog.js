/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

// Tooltip Init
$(function() {
    $("[data-toggle='tooltip']").tooltip();
});


// make all images responsive
/* 
 * Unuse by Hux
 * actually only Portfolio-Pages can't use it and only post-img need it.
 * so I modify the _layout/post and CSS to make post-img responsive!
 */
// $(function() {
// 	$("img").addClass("img-responsive");
// });

// brighton, 3/12/'19, added fancybox support
$(document).ready(function() {
    $('img').not('#avatar_pic').each(function() {
        var $image = $(this);
        var imageCaption = $image.attr('alt');
        var $imageWrapLink = $image.parent('a');
        if ($imageWrapLink.size() < 1) {
            var src = this.getAttribute('src');
            var idx = src.lastIndexOf('?');
            if (idx != -1) {
                src = src.substring(0, idx);
            }
            $imageWrapLink = $image.wrap('<a href="' + src + '"></a>').parent('a');
        }
        $imageWrapLink.attr('data-fancybox', 'images');
        if (imageCaption) {
            $imageWrapLink.attr('data-caption', imageCaption);
        }
    });
    $().fancybox({
        selector: '[data-fancybox="images"]',
        thumbs: false,
        hash: true,
        loop: false,
        fullScreen: false,
        slideShow: false,
        protect: true,
    });
});


// responsive tables
$(document).ready(function() {
	$("table").wrap("<div class='table-responsive'></div>");
	$("table").addClass("table");
});

// responsive embed videos
$(document).ready(function () { 
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	$('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
	$('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});
