/* ===================================================================
 * Abstract - Main JS
 *
 * ------------------------------------------------------------------- */

;(function($) {
    'use strict'

    var cfg = {
            defAnimation: 'fadeInUp', // default css animation
            scrollDuration: 800, // smoothscroll duration
            statsDuration: 4000, // stats animation duration
            mailChimpURL:
                'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc',
        },
        $WIN = $(window)

    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function() {
        $WIN.on('load', function() {
            // will first fade out the loading animation
            $('#loader').fadeOut('slow', function() {
                // will fade out the whole DIV that covers the website.
                $('#preloader')
                    .delay(300)
                    .fadeOut('slow')
            })
        })
    }
    
    /* FitVids
	------------------------------------------------------ */
    var ssFitVids = function() {
        $('body').fitVids();
    }

    
    // Gallery scripts here
    var galleryImages = document.querySelectorAll('.kg-gallery-image img');
    galleryImages.forEach(function (image) {
        var container = image.closest('.kg-gallery-image');
        var width = image.attributes.width.value;
        var height = image.attributes.height.value;
        var ratio = width / height;
        container.style.flex = ratio + ' 1 0%';
    });

    // zoom popup
     const images = [
        ...document.querySelectorAll('.kg-image-card img:not(.kg-width-full), .kg-gallery-image img'),
    ]
    mediumZoom(images)

    /* pretty print
     * -------------------------------------------------- */
    var ssPrettyPrint = function() {
        $('pre').addClass('prettyprint')
        $(document).ready(function() {
            prettyPrint()
        })
    }

    /* Alert Boxes
    ------------------------------------------------------- */
    var ssAlertBoxes = function() {
        $('.alert-box').on('click', '.close', function() {
            $(this)
                .parent()
                .fadeOut(500)
        })
    }

    /* superfish
     * -------------------------------------------------- */
    var ssSuperFish = function() {
        $('ul.sf-menu').superfish({
            animation: { height: 'show' }, // slide-down effect without fade-in
            animationOut: { height: 'hide' }, // slide-up effect without fade-in
            cssArrows: false, // disable css arrows
            delay: 600, // .6 second delay on mouseout
        })
    }

    /* Mobile Menu
------------------------------------------------------ */
    var ssMobileNav = function() {
        var toggleButton = $('.menu-toggle'),
            nav = $('.main-navigation')

        toggleButton.on('click', function(event) {
            event.preventDefault()

            toggleButton.toggleClass('is-clicked')
            nav.slideToggle()
        })

        if (toggleButton.is(':visible')) nav.addClass('mobile')

        $WIN.resize(function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile')
            else nav.removeClass('mobile')
        })

        $('#main-nav-wrap li a').on('click', function() {
            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked')
                nav.fadeOut()
            }
        })
    }

    /*  Masonry
	------------------------------------------------------ */
    var ssMasonryFolio = function() {
        var containerBricks = $('.bricks-wrapper')

        containerBricks.imagesLoaded(function() {
            containerBricks.masonry({
                itemSelector: '.entry',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                resize: true,
            })
        })
    }

    /* animate bricks
     * ------------------------------------------------------ */
    var ssBricksAnimate = function() {
        var animateEl = $('.animate-this')

        $WIN.on('load', function() {
            setTimeout(function() {
                animateEl.each(function(ctr) {
                    var el = $(this)

                    setTimeout(function() {
                        el.addClass('animated fadeInUp')
                    }, ctr * 200)
                })
            }, 200)
        })

        $WIN.on('resize', function() {
            // remove animation classes
            animateEl.removeClass('animate-this animated fadeInUp')
        })
    }

    /* Flex Slider
     * ------------------------------------------------------ */
    var ssFlexSlider = function() {
        $WIN.on('load', function() {
            $('#featured-post-slider').flexslider({
                namespace: 'flex-',
                controlsContainer: '', // ".flex-content",
                animation: 'fade',
                controlNav: false,
                directionNav: true,
                smoothHeight: false,
                slideshowSpeed: 7000,
                animationSpeed: 600,
                randomize: false,
                touch: true,
            })

            $('.post-slider').flexslider({
                namespace: 'flex-',
                controlsContainer: '',
                animation: 'fade',
                controlNav: true,
                directionNav: false,
                smoothHeight: false,
                slideshowSpeed: 7000,
                animationSpeed: 600,
                randomize: false,
                touch: true,
                start: function(slider) {
                    if (typeof slider.container === 'object') {
                        slider.container.on('click', function(e) {
                            if (!slider.animating) {
                                slider.flexAnimate(slider.getTarget('next'))
                            }
                        })
                    }

                    $('.bricks-wrapper').masonry('layout')
                },
            })
        })
    }

    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function() {
        $('.smoothscroll').on('click', function(e) {
            var target = this.hash,
                $target = $(target)

            e.preventDefault()
            e.stopPropagation()

            $('html, body')
                .stop()
                .animate(
                    {
                        scrollTop: $target.offset().top,
                    },
                    cfg.scrollDuration,
                    'swing'
                )
                .promise()
                .done(function() {
                    // check if menu is open
                    if ($('body').hasClass('menu-is-open')) {
                        $('#header-menu-trigger').trigger('click')
                    }

                    window.location.hash = target
                })
        })
    }

    /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
    var ssPlaceholder = function() {
        $('input, textarea, select').placeholder()
    }

    /* AjaxChimp
     * ------------------------------------------------------ */
    var ssAjaxChimp = function() {
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL,
        })

        // Mailchimp translation
        //
        //  Defaults:
        //   'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            submit: 'Submitting...',
            0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
            2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            5: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        }
    }

    /* Back to Top
     * ------------------------------------------------------ */
    var ssBackToTop = function() {
        var pxShow = 500, // height on which the button will show
            fadeInTime = 400, // how slow/fast you want the button to show
            fadeOutTime = 400, // how slow/fast you want the button to hide
            scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
            goTopButton = $('#go-top')

        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime)
            } else {
                goTopButton.fadeOut(fadeOutTime)
            }
        })
    }


    /**
     * Search Box open
     * 
     */
    // var searchbar = function(){
    //     $('.search-trigger').on('click', function(e) {
    //         e.preventDefault()
    //         $('.search-wrap').addClass('active')
    //     })
    //     $('#close-search').on('click', function(e){
    //         e.preventDefault()
    //         $('.search-wrap, .search-form').removeClass('active')
    //         $('.search-field').val('')
    //         $('.results').addClass('d-none')
    //     })

    // }


    // testing file
    // Search results
     var posts = [],
     searchKey = $(".search-field"),
     searchContent = $('.result')
    // search-bar
    $('.search-trigger').on('click', function (e) {
        e.preventDefault()
        $('.search-wrap')
            .addClass('active')
            .on('click', function (e) {
                e.stopPropagation()
            })

            e.stopPropagation()
            $('search-input-area')
            .delay(4000)
            .fadeIn()
            $('body').addClass('body-overflow')
            searchKey.focus()


        if (posts.length == 0 && typeof serachContentApi !== undefined) {
            $.get(serachContentApi)
                .done(function(data) {
                    posts = data.posts
                    search()
                })
                .fail(function(err) {})
        }
    });
    //  click on close icon input text clear
    $('#close-search').on('click', function () {
        $('.search-wrap').removeClass('active')
        $('body').removeClass('body-overflow')
        searchKey.val('')
        searchContent.empty()
    });
    $(document).on('click', function () {
        $('.search-wrap').removeClass('active')
        $('body').removeClass('body-overflow')
        searchKey.val('')
        searchContent.empty()
    });

    function search(){
        var options = {
            shouldSort: true,
            tokenize: true,
            matchAllTokens: true,
            threshold: 0,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [{
            name: 'title',
            weight: 0.3
            }, {
            name: 'author',
            weight: 0.7
            }]
        };
        var fuse = new Fuse(posts, options)
        
        searchKey.keyup(function(){
            var value = this.value,
            search = fuse.search(value),
            output = '',
            language = $('html').attr('lang'),
            searchResultnum = $('.no-result')

            searchResultnum.addClass('d-block')
            searchResultnum.children('span').html(search.length)
            if(posts.length > 0){
            $.each(search, function(key, val) {
                    var pubDate = new Date(
                        val.published_at
                    ).toLocaleDateString(language, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })
                    output += `
                    <div class="search-single-result">
                        <div class="right-part-search">
                            <div class="search-res-heading">
                                <a href="${val.url}"><h2>${val.title}</h2></a>
                            </div>
                        </div>
                    </div>
                    `
                })

                searchContent.html(output)
            }

    
        })
    }




    /* Initialize
     * ------------------------------------------------------ */
    ;(function ssInit() {
        ssPreloader()
        ssFitVids()
        ssPrettyPrint()
        ssAlertBoxes()
        ssSuperFish()
        ssMobileNav()
        ssMasonryFolio()
        ssBricksAnimate()
        ssFlexSlider()
        ssSmoothScroll()
        ssPlaceholder()
        ssAjaxChimp()
        ssBackToTop()
        // searchbar()
    })()
})(jQuery)
