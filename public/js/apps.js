$(document).ready(function () {
    
    /** SIDEBAR FUNCTION **/
    $('.sidebar-left ul.sidebar-menu li a').click(function () {
        "use strict";
        $('.sidebar-left li').removeClass('active');
        $(this).closest('li').addClass('active');
        var checkElement = $(this).next();
        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('fast');
        }
        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('.sidebar-left ul.sidebar-menu ul:visible').slideUp('fast');
            checkElement.slideDown('fast');
        }
        if ($(this).closest('li').find('ul').children().length == 0) {
            return true;
        } else {
            return false;
        }
    });
    
    if ($(window).width() < 1025) {
        $(".sidebar-left").removeClass("sidebar-nicescroller");
        $(".sidebar-right").removeClass("right-sidebar-nicescroller");
        $(".nav-dropdown-content").removeClass("scroll-nav-dropdown");
    }
    /** END SIDEBAR FUNCTION **/
    
    
    /** BUTTON TOGGLE FUNCTION **/
    $(".btn-collapse-sidebar-left").click(function () {
        "use strict";
        $(".top-navbar").toggleClass("toggle");
        $(".sidebar-left").toggleClass("toggle");
        $(".page-content").toggleClass("toggle");
        $(".icon-dinamic").toggleClass("rotate-180");
        
        if ($(window).width() > 991) {
            if ($(".sidebar-right").hasClass("toggle-left") === true) {
                $(".sidebar-right").removeClass("toggle-left");
                $(".top-navbar").removeClass("toggle-left");
                $(".page-content").removeClass("toggle-left");
                $(".sidebar-left").removeClass("toggle-left");
                if ($(".sidebar-left").hasClass("toggle") === true) {
                    $(".sidebar-left").removeClass("toggle");
                }
                if ($(".page-content").hasClass("toggle") === true) {
                    $(".page-content").removeClass("toggle");
                }
            }
        }
    });
    $(".btn-collapse-sidebar-right").click(function () {
        "use strict";
        $(".top-navbar").toggleClass("toggle-left");
        $(".sidebar-left").toggleClass("toggle-left");
        $(".sidebar-right").toggleClass("toggle-left");
        $(".page-content").toggleClass("toggle-left");
    });
    $(".btn-collapse-nav").click(function () {
        "use strict";
        $(".icon-plus").toggleClass("rotate-45");
    });
    
    /** END BUTTON TOGGLE FUNCTION **/
    
    /** BEGIN Bootstrap Modal FUNCTION **/
    
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog = $(this).find(".modal-dialog");
        var offset = ($(window).height() - $dialog.height()) / 2;
        // Center modal vertically in window
        $dialog.css("margin-top", offset);
    }
    
    $('.modal').on('show.bs.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
    /** END Bootstrap Modal FUNCTION **/
    
    
    /** BEGIN TOOLTIP FUNCTION **/
    //$('.tooltips').tooltip({
    //    selector: "[data-toggle=tooltip]",
    //    container: "body"
    //})
    //$('.popovers').popover({
    //    selector: "[data-toggle=popover]",
    //    container: "body"
    //})
    /** END TOOLTIP FUNCTION **/
    
    
    /** NICESCROLL AND SLIMSCROLL FUNCTION **/
    $(".sidebar-nicescroller").niceScroll({
        cursorcolor: "#121212",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        cursorwidth: "0px"
    });
    $(".sidebar-nicescroller-visible-scroller").niceScroll({
        cursorcolor: "#121212",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        cursorwidth: "5px",
        cursoropacitymax: 0.2
    });
    $(".sidebar-nicescroller").getNiceScroll().resize();
    $(".right-sidebar-nicescroller").niceScroll({
        cursorcolor: "#111",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        cursorwidth: "0px"
    });
    $(".right-sidebar-nicescroller").getNiceScroll().resize();
    
    $(function () {
        "use strict";
        $('.scroll-nav-dropdown').slimScroll({
            height: '350px',
            position: 'right',
            size: '4px',
            railOpacity: 0.3
        });
    });
    
    $(function () {
        "use strict";
        $('.scroll-chat-widget').slimScroll({
            height: '330px',
            position: 'right',
            size: '4px',
            railOpacity: 0.3,
            railVisible: true,
            alwaysVisible: true,
            start: 'bottom'
        });
    });
    if ($(window).width() < 768) {
        $(".chat-wrap").removeClass("scroll-chat-widget");
    }
    /** END NICESCROLL AND SLIMSCROLL FUNCTION **/
    
    /** BEGIN BACK TO TOP **/
    $(function () {
        $("#back-top").hide();
    });
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });
        
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
    /** END BACK TO TOP **/
    
    /** BEGIN PANEL HEADER BUTTON COLLAPSE **/
    $(function () {
        "use strict";
        $('.collapse').on('show.bs.collapse', function () {
            var id = $(this).attr('id');
            $('button.to-collapse[data-target="#' + id + '"]').html('<i class="fa fa-chevron-up"></i>');
        });
        $('.collapse').on('hide.bs.collapse', function () {
            var id = $(this).attr('id');
            $('button.to-collapse[data-target="#' + id + '"]').html('<i class="fa fa-chevron-down"></i>');
        });
        
        $('.collapse').on('show.bs.collapse', function () {
            var id = $(this).attr('id');
            $('a.block-collapse[href="#' + id + '"] span.right-icon').html('<i class="glyphicon glyphicon-minus icon-collapse"></i>');
        });
        $('.collapse').on('hide.bs.collapse', function () {
            var id = $(this).attr('id');
            $('a.block-collapse[href="#' + id + '"] span.right-icon').html('<i class="glyphicon glyphicon-plus icon-collapse"></i>');
        });
    });
    /** END PANEL HEADER BUTTON COLLAPSE **/

    /** BEGIN GRITTER PLUGIN **/
    //$.extend($.gritter.options, {
    //    position: 'top-right', // possibilities: bottom-left, bottom-right, top-left, top-right
    //    fade_in_speed: 500, // how fast notifications fade in (string or int)
    //    fade_out_speed: 500, // how fast the notices fade out
    //    time: 5000 // hang on the screen for...
    //});
    /** END GRITTER PLUGIN **/
});
$(function () {
    
    //if (typeof koVM !== 'undefined')
    //    koVM.username($('#profile_username').text());

});
toastr.options = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-bottom-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
}
function showNotification(title, content, type) {
    if (type == 'danger')
        type = 'error';
    
    toastr[type](content, title);
}
Number.prototype.toFormat = function (n) {
    var num = parseFloat(this.toFixed(8));
    if (num.toString().indexOf('e-') > 0)
        return toFixed(num);
    
    return num;

}

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e + 2);
            x = parseInt(x);
            x = ((x < 0) ? '-' : '') + '0.' + (new Array(e)).join('0') + x.toString().substr((x < 0) ? 1 : 0, 3);
            //x = parseFloat(x).toFixed(8);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}

String.prototype.padRight = function (padChar, width) {
    var ret = this;
    while (ret.length < width) {
        if (ret.length + padChar.length < width) {
            ret += padChar;
        }
        else {
            ret += padChar.substring(0, width - ret.length);
        }
    }
    return ret;
};
/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function () {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function () {
        $('.modal:visible').each(reposition);
    });
});
//************************************
//jQuery Cookie
//************************************
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        options.path = '/';
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(options.expires);
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
