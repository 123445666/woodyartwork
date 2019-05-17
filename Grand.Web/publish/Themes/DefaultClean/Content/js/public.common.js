/*
** custom js functions
*/
$(document).ready(function () {
    $('body').addClass('is-ready');  
});
function Logo() {
    if ($(window).width() > 991) {
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 74) {
                if (!$('.header-logo.expand').length) {
                    $('.header-logo').addClass('expand');
                    $('.header-logo').clone().insertAfter('.dropdowns-container');
                }
            } else {
                if ($('.header-logo.expand').length) {
                    $('.header-logo').removeClass('expand');
                    $('.header-links .header-logo').remove();
                }
            }
        });
    }
}

$(function () {
    $(document).bind("beforecreate.offcanvas", function (e) {
        var dataOffcanvas = $(e.target).data('offcanvas-component');
    });
    $(document).bind("create.offcanvas", function (e) {
        var dataOffcanvas = $(e.target).data('offcanvas-component');
        //console.log(dataOffcanvas);
        dataOffcanvas.onOpen = function () {
            //console.log('Callback onOpen');
        };
        dataOffcanvas.onClose = function () {
            //console.log('Callback onClose');
        };

    });
    $(document).bind("clicked.offcanvas-trigger clicked.offcanvas", function (e) {
        var dataBtnText = $(e.target).text();
        //console.log(e.type + '.' + e.namespace + ': ' + dataBtnText);
    });
    $(document).bind("open.offcanvas", function (e) {
        var dataOffcanvasID = $(e.target).attr('id');
        //console.log(e.type + ': #' + dataOffcanvasID);
    });
    $(document).bind("resizing.offcanvas", function (e) {
        var dataOffcanvasID = $(e.target).attr('id');
        //console.log(e.type + ': #' + dataOffcanvasID);
    });
    $(document).bind("close.offcanvas", function (e) {
        var dataOffcanvasID = $(e.target).attr('id');
        //console.log(e.type + ': #' + dataOffcanvasID);
    });
    $(document).trigger("enhance");
});

function mainMenuReplace() {
    if ($(window).width() < 991) {
        var Menu = $('.mainNav .navbar-nav'),
            HeaderLinks = $('.header-links'),
            Logo = $('.header-logo .store-logo'),
            Dropdowns = $('.header-links .dropdowns-container'),
            Manufacturers = $('.navbar-nav .manufacturer-dropdown'),
            Links = $('.navbar-nav .solo-link-item');

        Logo.prependTo('.logo-mobile');
        Menu.prependTo('#pills-menu');
        Dropdowns.insertAfter('#pills-mobile-tabContent');
        if ($('.mobile-menu .manufacturer-dropdown').length) {
            Manufacturers.prependTo('#pills-manufacturers');
        }
        else {
            $('#pills-manufacturers-tab').parent().hide();
        }
        if ($('.mobile-menu .solo-link-item').length) {
            Links.prependTo('#pills-links .links-dropdown');
        }
        else {
            $('#pills-links-tab').parent().hide();
        }

        $("#pills-mobile-tabContent .nav-item .dropdown-toggle").each(function () {
            $(this).removeAttr('href');
        });

        $('#pills-mobile-tabContent .navbar-nav .nav-item.dropdown > .dropdown-toggle').click(function () {
            var CatForOpen = $(this).parent().find('.dropdown-menu:first');
            CatForOpen.addClass('show');
        });
        $('#pills-mobile-tabContent .navbar-nav .cat-back').click(function () {
            $(this).parent().removeClass('show');
        });

    }
    else {
        var Menu = $('.mobile-menu #pills-menu .navbar-nav'),
            HeaderLinks = $('.header-links'),
            Logo = $('.logo-mobile .store-logo'),
            Dropdowns = $('.mobile-menu .dropdowns-container'),
            Manufacturers = $('.mobile-menu .manufacturer-dropdown'),
            Links = $('.mobile-menu .links-dropdown .solo-link-item');

        Logo.prependTo('.header-logo');
        Menu.prependTo('.mainNav .navbar-collapse');
        Dropdowns.insertAfter('.header-links .default-message');
        Manufacturers.insertAfter('.mainNav .manufacturer-items .dropdown-toggle');
        $(Links.get().reverse()).each(function () {
            $(this).insertAfter('.blank-link');
        });
    }
}
function IpadMenuFix() {
    if (navigator.platform == "iPad") {
        $('.mainNav li.dropdown > .dropdown-toggle').click(function () {
            if ($(this).parent().hasClass("show")) {
                window.location = $(this).attr('href');
            }
        });
    }
    else {
        $('.mainNav li.dropdown > .dropdown-toggle').click(function () {
            window.location = $(this).attr('href');
        });
    }
}

function OpenWindow(query, w, h, scroll) {
    var l = (screen.width - w) / 2;
    var t = (screen.height - h) / 2;

    winprops = 'resizable=0, height=' + h + ',width=' + w + ',top=' + t + ',left=' + l + 'w';
    if (scroll) winprops += ',scrollbars=1';
    var f = window.open(query, "_blank", winprops);
}

function setLocation(url) {
    window.location.href = url;
}

function displayAjaxLoading(display) {
    if (display) {
        $('.ajax-loading-block-window').show();
    }
    else {
        $('.ajax-loading-block-window').hide('slow');
    }
}

function displayPopupNotification(message, messagetype, modal) {
    //types: success, error
    var container;
    if (messagetype == 'success') {
        //success
        container = $('#dialog_success');
        $('#dialog_error').html('');
    }
    else {
        //error
        container = $('#dialog_error');
        $('#dialog_success').html('');
    }

    //we do not encode displayed message
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<div class="generalMessage-container">' + message + '</div>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p>' + message[i] + '</p>';
        }
    }
    container.html(htmlcode);
    container.show();
    $('#generalMessage').removeClass('fadeOutDown').addClass('fadeInDown show').show();
}

$(document).ready(function () {
    $('#ModalQuickView').on('hide.bs.modal', function (e) {
        $('#ModalQuickView').empty();
    });
});
  
function displayPopupAddToCart(html) {
    $('#AddedToCart').html(html).removeClass('fadeOutDown').addClass('fadeInUp show').show();
    if ($('#CrossSellProducts .cross-sells').length) {
        $('.cross-sell-button').show();
    }
}

function displayPopupQuickView(html) {
    $('#ModalQuickView').html(html).modal('show');
    $("body.modal-open").removeAttr("style");
    $(".navUp").removeAttr("style");
}


var barNotificationTimeout;
function displayBarNotification(message, messagetype, timeout) {
    clearTimeout(barNotificationTimeout);

    //types: success, error
    var cssclass = 'success';
    if (messagetype == 'success') {
        cssclass = 'card-success';
    }
    else if (messagetype == 'error') {
        cssclass = 'card-danger';
    }
    //remove previous CSS classes and notifications
    $('#bar-notification')
        .removeClass('card-success')
        .removeClass('card-danger');
    $('#bar-notification .content').remove();

    //add new notifications
    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = '<p class="content">' + message + '</p>';
    } else {
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p class="content">' + message[i] + '</p>';
        }
    }
    $('#bar-notification').append(htmlcode)
        .addClass(cssclass)
        .fadeIn('slow')
        .mouseenter(function () {
            clearTimeout(barNotificationTimeout);
        });

    $('#bar-notification .close').unbind('click').click(function () {
        $('#bar-notification').fadeOut('slow');
    });

    //timeout (if set)
    if (timeout > 0) {
        barNotificationTimeout = setTimeout(function () {
            $('#bar-notification').fadeOut('slow');
        }, timeout);
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}


// CSRF (XSRF) security
function addAntiForgeryToken(data) {
    //if the object is undefined, create a new one.
    if (!data) {
        data = {};
    }
    //add token
    var tokenInput = $('input[name=__RequestVerificationToken]');
    if (tokenInput.length) {
        data.__RequestVerificationToken = tokenInput.val();
    }
    return data;
};



$(document).ready(function () {

    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 1000);
        });
    }
});

// required asterisk position
$(".form-group .required").each(function () {
    var label_req = $(this).siblings("label");
    $(this).insertAfter(label_req);
});

// mobile collapsing menu

$(document).ready(function () {
    $('.slide-box [data-countdown]').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            if (event.strftime('%D') > 0) {
                $this.html(event.strftime('%D days %H:%M:%S'));
            }
            else {
                $this.html(event.strftime('%H:%M:%S'));
            }
        });
    });

    $('.countdown.all').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            if (event.strftime('%D') > 0) {
                $this.html(event.strftime('%D days %H:%M:%S'));
            }
            else {
                $this.html(event.strftime('%H:%M:%S'));
            }
        });
    });
    $('.countdown.days').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            if (event.strftime('%D') > 0) {
                $this.html(event.strftime('%D'));
            }
            else {
                $this.html(event.strftime('0'));
            }
        });
    });
    $('.countdown.hours').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            if (event.strftime('%H') > 0) {
                $this.html(event.strftime('%H'));
            }
            else {
                $this.html(event.strftime('00'));
            }
        });
    });
    $('.countdown.minutes').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            if (event.strftime('%M') > 0) {
                $this.html(event.strftime('%M'));
            }
            else {
                $this.html(event.strftime('00'));
            }
        });
    });
    $('.countdown.seconds').each(function () {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            if (event.strftime('%S') > 0) {
                $this.html(event.strftime('%S'));
            }
            else {
                $this.html(event.strftime('00'));
            }
        });
    });

});

function sendcontactusform(urladd) {
    if ($("#product-details-form").valid()) {
        var contactData = {
            AskQuestionEmail: $('#AskQuestionEmail').val(),
            AskQuestionFullName: $('#AskQuestionFullName').val(),
            AskQuestionPhone: $('#AskQuestionPhone').val(),
            AskQuestionMessage: $('#AskQuestionMessage').val(),
            Id: $('#AskQuestionProductId').val(),
            'g-recaptcha-response': $('#g-recaptcha-response').val()
        };
        addAntiForgeryToken(contactData);
        $.ajax({
            cache: false,
            url: urladd,
            data: contactData,
            type: 'post',
            success: function (successprocess) {
                if (successprocess.success) {
                    $('#contact-us-product').hide();
                    $('.product-contact-error').hide();
                    $('.product-contact-send .card-body').html(successprocess.message);
                    $('.product-contact-send').show();
                }
                else {
                    $('.product-contact-error .card-body').html(successprocess.message);
                    $('.product-contact-error').show();
                }
            },
            error: function (error) {
                alert('Error: ' + error);
            }
        });
    }
}

function newAddress(isNew) {
    if (isNew) {
        this.resetSelectedAddress();
        $('#pickup-new-address-form').show();
    } else {
        $('#pickup-new-address-form').hide();
    }
}

function resetSelectedAddress() {
    var selectElement = $('#pickup-address-select');
    if (selectElement) {
        selectElement.val('');
    }
}
$(document).ready(function () {
    $("#small-searchterms").click(function (e) {
        $(".formSearch").removeClass("col-lg-6");
        e.stopPropagation();
    });
    $(document).click(function () {
        if ($(".formSearch.col-lg-6").length) {
        }
        else {
            $(".formSearch").addClass("col-lg-6");
            $(".advanced-search-results").removeClass("open");
        }
    });

    $('#small-searchterms').blur(function () {
        if ($(this).val().length === 0) {
            $(".advanced-search-results").removeClass("open");
        }
    });
    jQuery(function ($) {
        var input = $('#small-searchterms');
        input.on('keydown', function () {
            var key = event.keyCode || event.charCode;

            if (key == 8 || key == 46)
                $(".advanced-search-results").removeClass("open");
        });
    });

    $('.product-standard .review-scroll-button').on('click', function (e) {
        var el = $("#review-tab");
        var elOffset = el.offset().top;
        var elHeight = el.height();
        var windowHeight = $(window).height();
        var offset;
        if (elHeight < windowHeight) {
            offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
        }
        else {
            offset = elOffset;
        }
        $.smoothScroll({ speed: 300 }, offset);
        $("#review-tab").click();
        return false;
    });
});

//newsletter

$(document).ready(function () {

    function newsletter_subscribe(subscribe) {
        var subscribeProgress = $("#subscribe-loading-progress");
        subscribeProgress.show();
        var postData = {
            subscribe: subscribe,
            email: $("#newsletter-email").val()
        };
        var href = $("#newsletterbox").closest('[data-href]').data('href');
        $.ajax({
            cache: false,
            type: "POST",
            url: href,
            data: postData,
            success: function (data) {
                subscribeProgress.hide();
                $("#newsletter-result-block").html(data.Result);
                if (data.Success) {
                    $('.newsletter-inputs .input-group, .newsletter-inputs .subscribe-radio').hide();
                    $('#newsletter-result-block').show();
                    if (data.Showcategories) {
                        $('#action_modal_form').html(data.ResultCategory);
                        window.setTimeout(function () {
                            $('.popup-action-form').magnificPopup('open');
                        }, 100);
                    }
                } else {
                    $('#newsletter-result-block').fadeIn("slow").delay(2000).fadeOut("slow");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Failed to subscribe.');
                subscribeProgress.hide();
            }
        });
    }
    $('#newsletter-subscribe-button').click(function () {
        var allowToUnsubscribe = $("#newsletterbox").data('allowtounsubscribe').toLowerCase();
        if (allowToUnsubscribe == 'true') { 
            if ($('#newsletter_subscribe').is(':checked')) {
                newsletter_subscribe('true');
            }
            else {
                newsletter_subscribe('false');
            }
        }
        else {
            newsletter_subscribe('true');
        }
    });

    $("#newsletter-email").keydown(function (event) {
        if (event.keyCode == 13) {
            $("#newsletter-subscribe-button").trigger("click")
            return false;
        }
    });
});

function deletecartitem(href) {
    var flyoutcartselector = AjaxCart.flyoutcartselector;
    var topcartselector = AjaxCart.topcartselector;
    $.ajax({
        cache: false,
        type: "POST",
        url: href,
        success: function (data) {
            var flyoutcart = $(flyoutcartselector, $(data.flyoutshoppingcart));
            setTimeout(function () {
                $(flyoutcartselector).replaceWith(flyoutcart);
                $(topcartselector).html(data.totalproducts); }, 300);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Failed to retrieve Flyout Shopping Cart.');
        }
    });
    return false;
}

// centerMegaMenu

function centerMegaMenu() {
    $(".mainNav .gallery").each(function () {
        var containerWidth = $('.headBottom').width(),
            containerPosition = $('.headBottom').offset().left,
            categoryTitlePosition = -($(this).parent().offset().left);
        $(this).css("width", containerWidth);
        $(this).css("max-width", containerWidth);
        $(this).css("left", categoryTitlePosition + containerPosition + 15);
    });
}
function mobileFixMenu() {
    $("#mobile-collapsing-menu .gallery").each(function () {
        $(this).removeAttr('style');
    });
}

// HomePageNews

var swiperHomePageNews = new Swiper('#HomePageNews', {
    navigation: {
        nextEl: '.HomePageNews-next',
        prevEl: '.HomePageNews-prev',
    },
    autoplay: {
        delay: 5000,
    },
    speed: 600,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    breakpoints: {
        767: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        1250: {
            slidesPerView: 2,
            spaceBetween: 30
        }
    }
});

function cutNewsContent() {
    $(".news-list .news-content.with-img .desc").each(function () {
        $(this).text(function () {
            if ($(this).text().substring().length > 130) {
                return $(this).text().substring(0, 130) + "...";
            }
        });
    });
    $(".news-list .news-content.no-img .desc").each(function () {
        $(this).text(function () {
            if ($(this).text().substring().length > 200) {
                return $(this).text().substring(0, 200) + "...";
            }
        });
    });
}

// SuggestedProducts & Bestsellers

var Recommended = new Swiper('#RecommendedProd', {
    navigation: {
        nextEl: '.Recommended-next',
        prevEl: '.Recommended-prev',
    },
    speed: 600,
    spaceBetween: 30,
    slidesPerView: 3,
    slidesPerColumn: 2,
});

var Bestsellers = new Swiper('#BestsellersProd', {
    navigation: {
        nextEl: '.Bestsellers-next',
        prevEl: '.Bestsellers-prev',
    },
    speed: 600,
    spaceBetween: 30,
    slidesPerView: 3,
    slidesPerColumn: 2,
});

// CategoryFeaturedProducts

$('.CatFeaturedProd').each(function () {
    var sliderId = $(this).attr('id');
    new Swiper($(this), {
        speed: 600,
        spaceBetween: 15,
        slidesPerView: 3,
        slidesPerColumn: 2,
        autoHeight: true,
        breakpoints: {
            767: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 10
            },
            992: {
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween: 10
            },
            1199: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 10
            },
            1250: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 10
            }
        },
        navigation: {
            nextEl: $(this).find('.featured-next'),
            prevEl: $(this).find('.featured-prev'),
        },
    });
});

// CategorySlider

var CategorySlider = new Swiper('#CategorySlider', {
    navigation: {
        nextEl: '.CategorySlider-next',
        prevEl: '.CategorySlider-prev',
    },
    spaceBetween: 15,
    slidesPerView: 3,
    breakpoints: {
        575: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1199: {
            slidesPerView: 2,
            spaceBetween: 30
        }
    },
    speed: 600,
});


// FeaturedProductsOnCategory

var FeaturedProductsOnCategory = new Swiper('#FeaturedProductsOnCategory', {
    navigation: {
        nextEl: '.FeaturedProductsOnCategory-next',
        prevEl: '.FeaturedProductsOnCategory-prev',
    },
    loop: true,
    speed: 600,
    spaceBetween: 30,
    slidesPerView: 3,
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30
        },
    },
});

function HomeProductTabsCheck() {
    $("#HomeProductTabsContent .tab-pane").each(function () {
        var tabId = $(this).attr("id");
        if (!$(this).find(".product-grid").length) {
            $('#HomeProductTabs .nav-link[aria-controls=' + tabId + ']').parent().hide();
        }
    });
}

//  HomePageManufacturers

var HomePageManufacturers = new Swiper('#HomePageManufacturers', {
    loop: true,
    speed: 600,
    autoplay: {
        delay: 1500,
    },
    spaceBetween: 0,
    slidesPerView: 6,
    breakpoints: {
        440: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        575: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        767: {
            slidesPerView: 4,
            spaceBetween: 30
        },
    },
});

function searchOpener() {
    $("#small-search-box-form").toggleClass("show");
    $(".mainNav .navbar-nav").toggleClass("opacity-none");
    setTimeout(function () { $(".search-box-text").focus(); }, 100);
}

function searchLinkMobile() {
    if ($(window).width() < 991) {
        if (!$('.header-links #small-search-box-form').length) {
            $('#small-search-box-form').insertBefore('#topcartlink');
        }
    } else {
        if ($('.header-links #small-search-box-form').length) {
            $('#small-search-box-form').insertAfter('.mainNav .navbar-nav');
        }
    }
}

function toggleContent() {
    $('.generalLeftSide .generalTitle strong, footer .step-title').on("click", function () {
        $(this).closest('.block').find('.viewBox').slideToggle('300');
        $(this).toggleClass('closed');
    });
}

function itemsStatistics() {
    var perPage = parseInt($('#products-pagesize option:selected').text());
    var totalItems = parseInt($('#items_statistics .items-total').text());
    if (parseInt($('.items-total').text()) > perPage) {
        var perPageFinal = parseInt($('#products-pagesize option:selected').text());
    }
    else {
        var perPageFinal = parseInt($('.items-total').text());
    }
    if ($('.pagination').length) {
        var currentPaggingSite = parseInt($('.pagination .current-page .page-link').text()),
            totalPaggingSites = $('.pagination li').length;
    } else {
        var currentPaggingSite = 1;
        var paggingSite = 1;
        var totalPaggingSites = 1;
    }
    if (totalItems < currentPaggingSite * perPageFinal) {
        $('#items_statistics .items-per-page .number').text(currentPaggingSite * perPageFinal - perPageFinal + 1 + ' - ' + totalItems);
    }
    else {
        $('#items_statistics .items-per-page .number').text(currentPaggingSite * perPageFinal - perPageFinal + 1 + ' - ' + currentPaggingSite * perPageFinal);
    }   
}

// left-side canvas

function LeftSide() {
    if ($(window).width() < 991) {
        $('.generalLeftSide').prependTo('#leftSide');
    }
    else {
        $('.generalLeftSide').insertBefore('.generalSideRight');
    }
}

// flyCart on Cart fix 

function CartFix() {
    var pathname = window.location.pathname;
    if (pathname === '/cart') {
        var CartLink = $("#topcartlink .nav-link"),
            cartName = $("#topcartlink .cart-name").html(),
            cartQty = $("#topcartlink .cart-qty").html();
        CartLink.remove();
        $('<a class="nav-link"><span class="lnr linearicons-bag"></span><span class="cart-name">' + cartName + '</span><span class="cart-qty">' + cartQty + '</span></a>').appendTo("#topcartlink");
    }
}

$(document).ready(function () {
    CartFix();
    mainMenuReplace();
    centerMegaMenu();
    Logo();
    cutNewsContent();
    LeftSide();
    IpadMenuFix();
    HomeProductTabsCheck();
    searchLinkMobile();
    toggleContent();
    itemsStatistics();
});

$(document).ready(function () {
    $(window).resize(function () {
        if ($(window).width() > 991) {
            centerMegaMenu();
        }
        else {
            mobileFixMenu();
        }
        mainMenuReplace();
        searchLinkMobile();
        IpadMenuFix();
        LeftSide();
        Logo();
    });
});
