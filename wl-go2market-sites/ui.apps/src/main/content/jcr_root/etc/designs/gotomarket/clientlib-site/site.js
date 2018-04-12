/**
 * Created by vazgent on 5/29/2017.
 */
$(function () {

    function pageJumplinks() {
        $('.page--jumplinks').on('click', function(){
            $(this).toggleClass('opened');
        });
    }

    function removeDivVideoSolutions() {
        $(".grid-col-7>.v_slot").removeClass('v_slot');
        $(".block--featured>.v_slot").addClass('block--featured-media video').removeClass('v_slot');
    }


    function setSectionStyleFromParent() {
        $('[data-parent-section-style]').each(function () {
            $(this).closest('section').attr('style', $(this).attr('data-parent-section-style'));
        })
    }

    function setAsideStyleFromParent() {
        $('[data-parent-aside-style]').each(function () {
            $(this).closest('aside').attr('style', $(this).attr('data-parent-aside-style'));
        })
    }

    function trustUsSlider() {
        if ($('.clients--slider-container').length > 0) {
            var clientSlider = new Swiper('.clients--slider-container', {
                wrapperClass: 'clients--slider-wrapper',
                slideClass: 'clients--slider-slide',
                slideActiveClass: 'slide-active',
                loop: true,
                pagination: '.clients--slider-pagination',
                paginationType: 'bullets',
                bulletClass: 'slider-pagination-bullet',
                bulletActiveClass: 'active',
                paginationHiddenClass: 'inactive',
                paginationClickable: true,
                paginationBulletRender: function (swiper, index, className) {
                    return '<button class="' + className + '">' + (index + 1) + '</button>';
                },
                speed: 400
                //spaceBetween: 100
            });

        }


    }

    function enableVideoComponents() {
        $('.jw-video').each(function (index, element) {
            $(this).attr("id", "id_" + index + 1);
            var image = $(element).attr("data-image");
            var video = $(element).attr("data-video");

            jwplayer(element).setup({
                playlist: [{
                    image: image,
                    sources: [{
                        file: video
                    }],
                }]
            });
        });
    }

    function checkAcceptedCookie() {
        var cookieDisclaimer = $('.cookie-policy'),
            btnAcceptCookie = $('.cookie-policy__accept');

        if (Cookies.get('cookie-policy') != 'accepted') {
            cookieDisclaimer.removeClass('accepted');
        }
        btnAcceptCookie.on('click', function () {
            Cookies.set('cookie-policy', 'accepted', {expires: 365}); // 1 day cookie
            cookieDisclaimer.addClass('hide-disclaimer');
        });
    }

    function moveClassToParentElement() {
        $('[data-parent-class]').each(function (i, elem) {
            var className = $(elem).attr('data-parent-class');
            $(elem).parent().addClass(className);
        });
    }

    function moveClassToParentSectionElement() {
        $('[data-parent-section-class]').each(function (i, elem) {
            var className = $(elem).attr('data-parent-section-class');
            $(elem).closest('section').addClass(className);
        });
    }

    function moveClassToChildElements() {
        $('.inherited').each(function (i, elem) {
            var classToInherit = $(elem).closest('[data-child-class]').attr('data-child-class');
            $(elem).addClass(classToInherit);
        });
    }

    function deleteNewSectionElements() {
        $('.nosection').each(function (i, elem) {
            $(elem).next('.aem-section').remove();
        });
    }

    function listToggle() {
        var e = $(".list--toggle-content");
        e.on("click", function () {
            $(this).hasClass("active") ? $(this).removeClass("active") : ($(".list--toggle-content").removeClass("active"), $(this).addClass("active"))
        });
    }

    function articlesSlider() {
        if ($('.articles--slider-container').length > 0) {
            var articlesSlider = new Swiper('.articles--slider-container', {
                wrapperClass: 'articles--slider-wrapper',
                slideClass: 'articles--slider-slide',
                slideActiveClass: 'slide-active',
                loop: true,
                pagination: '.articles--slider-pagination',
                paginationType: 'bullets',
                bulletClass: 'slider-pagination-bullet',
                bulletActiveClass: 'active',
                paginationHiddenClass: 'inactive',
                paginationClickable: true,
                paginationBulletRender: function (swiper, index, className) {
                    return '<button class="' + className + '">' + (index + 1) + '</button>';
                },
                speed: 400
                //spaceBetween: 100
            });
        }

    }

    function articlesRowSlider() {
        var rowSlider = new Swiper('.articles-row--slider-container', {
            wrapperClass: 'articles-row--slider-wrapper',
            slideClass: 'articles-row--slider-slide',
            slideActiveClass: 'slide-active',
            loop: true,
            speed: 400,

        });

        $('.articles-row--slider-nav .slider-nav.next').on('click', function () {
            rowSlider.slideNext();
        });

        $('.articles-row--slider-nav .slider-nav.previous').on('click', function () {
            rowSlider.slidePrev();
        });

    }

    function ctaExpert() {
        var previousOffset = 0;
        $(window).on('scroll', function () {
            var currentOffset = document.documentElement.scrollTop || document.body.scrollTop,
                bottomOffset = document.body.scrollTop + $(window).outerHeight();
            if (currentOffset === 0) {
                $('.cta--contact-expert').removeClass('visible');
            } else if (currentOffset > previousOffset) {
                // downscroll code
                if (document.body.scrollTop > 200) {
                    $('.cta--contact-expert').addClass('visible');
                }
                if (bottomOffset > $('.footer--main').offset().top) {
                    $('.cta--contact-expert').removeClass('visible');
                }
            } else {
                // upscroll code
                if (document.body.scrollTop < 200) {
                    $('.cta--contact-expert').removeClass('visible');
                }
                if (bottomOffset < $('.footer--main').offset().top) {
                    $('.cta--contact-expert').addClass('visible');
                }
            }
            previousOffset = currentOffset;
        });
    }

    $(".back-to-top").on("click", function (e) {
        e.preventDefault(), $("html, body").stop(!0, !1).animate({scrollTop: 0}, 500)
    });

    //////////////////////////////////////////////////////START SEND NEWSLETTER EMAIL  ///////////////////////////////////////////////

    /* jQuery Validate Emails with Regex */
    // function validateEmail(Email) {
    //
    //     var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //
    //     return $.trim(Email).match(pattern) ? true : false;
    // }

    var resourcePath = $('#resourcePath').val();

    // function ajaxNewsletterSubscribe() {
    //
    //     function sendSubscriptionEmail() {
    //
    //         var button = 'form--newsletter-button';
    //         var email = $(".form--newsletter-button").val();
    //         var errorMessage = "*Invalid email address";
    //         var successMessage = "Sucsessfully subscribed !!";
    //         var failMessage = "Failed to subscribe";
    //
    //         var seen = {};
    //
    //         // if (!validateEmail(email)) {
    //         //     errorBehaviour();
    //         //     return;
    //         // }
    //
    //         $.ajax({
    //             url: '/bin/emailSender',
    //             data: {
    //                 'email': email,
    //                 'resourcePath': resourcePath
    //             },
    //             type: 'POST',
    //             success: function (response, status) {
    //                 successBehaviour();
    //             },
    //             error: function (response, status) {
    //
    //                 if (response.status == 406) {
    //                     errorBehaviour();
    //                 } else {
    //                     $(".input--field").find("p").remove();
    //                     $(".form--newsletter-input").removeClass('success');
    //                     $(".form--newsletter-input").addClass('error');
    //                     $(".input--field").append("<p>" + failMessage + "</p>");
    //                     $('#form-newsletter').find("p").each(function() {
    //                         var txt = $(this).text();
    //                         if (seen[txt])
    //                             $(this).remove();
    //                         else
    //                             seen[txt] = true;
    //                     });
    //                 }
    //             }
    //         });
    //
    //         function errorBehaviour() {
    //             $(".input--field").find("p").remove();
    //             $(".form--newsletter-input").removeClass('success');
    //             $(".form--newsletter-input").addClass('error');
    //             $(".input--field").append("<p>" + errorMessage + "</p>");
    //             $('#form-newsletter').find("p").each(function() {
    //                 var txt = $(this).text();
    //                 if (seen[txt])
    //                     $(this).remove();
    //                 else
    //                     seen[txt] = true;
    //             });
    //         }
    //         function successBehaviour() {
    //             $(".input--field").find("p").remove();
    //             $(".form--newsletter-input").removeClass('error');
    //             $(".form--newsletter-input").addClass('success');
    //             $(".input--field").append("<p>" + successMessage + "</p>");
    //             $('#form-newsletter').find("p").each(function() {
    //                 var txt = $(this).text();
    //                 if (seen[txt])
    //                     $(this).remove();
    //                 else
    //                     seen[txt] = true;
    //             });
    //         }
    //     };
    //
    //     $(".form--newsletter-button").on('click', function (e) {
    //         e.preventDefault();
    //         sendSubscriptionEmail();
    //     });
    // }

    //////////////////////////////////////////////////////END SEND NEWSLETTER EMAIL  //////////////////////////////////////////////////


    //////////////////////////////////////////////////////START BLOG  OVERVIEW ////////////////////////////////////////////

    function customForms() {


        /***********************************
         CUSTOM CHECKBOXES
         ***********************************/
        /** Check for previously checked checkboxes **/
        $('.checkbox').each(function () {
            var checkboxCustom = $(this).find('input[type="checkbox"]');

            if (checkboxCustom.is(':checked')) {
                $(this).closest('.checkbox').addClass('checked');
            } else {
                $(this).closest('.checkbox').removeClass('checked');
            }

            /** DISABLED CHECKBOX **/
            if (checkboxCustom.is(':disabled')) {
                $(this).closest('.checkbox').addClass('disabled');
            }

        });

        /** Apply styling on checkbox 'change' **/
        // $('.checkbox input[type="checkbox"]').change(function () {
        //     if ($(this).is(':checked')) {
        //         $(this).closest('.checkbox').addClass('checked');
        //     } else {
        //         $(this).closest('.checkbox').removeClass('checked');
        //     }
        //     updateTags();
        //     // $.each($tags, function (i, obj) {
        //     //     alert("ONCHANGE  "+obj)  ;
        //     // });
        // });

    }

    function setPostsGrid() {

        var grid = $('.blog--grid'),
            gridItem = $('.block--article'),
            loader = $('<div class="loader"></div>');

        grid.parent().append(loader);

        grid.masonry({
            // options
            itemSelector: '.block--article',
            gutter: 50,
            columnWidth: '.block--article.v',
            percentPosition: true
        });

        grid.imagesLoaded().always(function () {

            grid.masonry('layout');

            loader.fadeOut(250);

            // Once evrything is loaded, hide loader & show thumbs
            var i = 0;

            gridItem.each(function () {

                var item = $(this);

                setTimeout(function () {
                    item.addClass('visible');
                }, 100 * i);
                i++;

            });
        });

    }

    function jsonToHTML(json) {

        var blogUrl = json.link.concat('.html');
        var fragment = document.createElement('a');
        $(fragment).attr('href', blogUrl);
        var article = document.createElement('article');
        var alignment = json.alignment;
        article.className = 'block--article '.concat(alignment.trim());

        //div article thumb
        var div_Thmb = document.createElement('div');
        div_Thmb.className = 'block--article-thumb';

        var img_art = document.createElement('img');
        img_art.className = 'block--article-img';
        $(img_art).attr('src', json.imagePath).attr('alt', '');

        $(div_Thmb).append($(img_art));

        //block--article-content
        var div_Cnt = document.createElement('div');
        div_Cnt.className = 'block--article-content';
        var span = document.createElement('span');
        span.className = 'block--article-category';
        span.innerHTML = (json.category) ? json.category : " ";

        var span_date = document.createElement('span');
        span_date.className = 'block--article-date';
        span_date.innerHTML = (json.date) ? json.date : " ";

        var h2 = document.createElement('h2');
        h2.className = 'block--article-title';
        h2.innerHTML = (json.title) ? json.title : " ";

        var p = document.createElement('p');
        p.className = 'block--article-excerpt';
        p.innerHTML = (json.text) ? json.text : " ";

        $(div_Cnt).append($(span)).append($(span_date)).append($(h2)).append($(p));

        //block--article-author
        var div_Author = document.createElement('div');
        div_Author.className = 'block--article-author';

        var div_aThmb = document.createElement('div');
        div_aThmb.className = 'block--article-author-thumb';
        var img_auth = document.createElement('img');
        $(img_auth).attr('src', json.authorImagePath).attr('alt', '');

        $(div_aThmb).append($(img_auth));

        var p_auth = document.createElement('p');
        p_auth.className = 'block--article-author-name';
        p_auth.innerHTML = (json.authorName) ? json.authorName : " ";

        $(div_Author).append($(div_aThmb)).append($(p_auth));


        // div sharer
        var div_sharer = document.createElement('div');
        div_sharer.className = 'sharer';

        var icon = document.createElement('div');
        icon.className = 'icon--share';
        $(div_sharer).append($(icon));

        var ul = document.createElement('ul');
        ul.className = 'sharer--list';

        var arr = json.socials;

        arr.forEach(function(item, i, arr) {
            var li = document.createElement('li');
            li.className = 'networks-list--icon ' + item.iconClass;
            var al = document.createElement('a');
            al.innerHTML = 'Share on' + item.iconClass;
            $(al).attr('href', item.url + item.pageUrl );
            $(li).append($(al));
            $(ul).append($(li));
        });


        // $(div_sharer).append($(icon)).append($(ul));
        $(div_sharer).append($(ul));
        $(div_Cnt).append($(div_Author)).append($(div_sharer));
        $(article).append($(div_Thmb)).append($(div_Cnt));
        $(fragment).append($(article));
        // alert($(fragment).html());

        return fragment;


    }

    if ($('#blog-list').length >= 0) {

        setPostsGrid();
        ajaxTrendingTopics();
        ajaxMorePosts();
        customForms();
    }

//////////////////////////////HIDE SEARCH FORM/////////////////////////////
    if($('#isSearchFormHidden')){
        var isSearchFormHidden = $('#isSearchFormHidden').val();
        if(isSearchFormHidden === "true") {
            $('.search--form').hide();
        }
    }
///////////////////////////////////////////////////////////////////////////

    //================================MY CODE================================
    var overview = $('#pageName').val();



    function isSeeMoreHidden(totalMatches) {
        var matchesAvailable = $('.blog--grid').find('.block--article').length;
        var buttonSeeMore= $('.blog--grid-more').find('.button-blue');
        if(matchesAvailable >= parseInt(totalMatches)){
            $(buttonSeeMore).hide();
        }else if( matchesAvailable < parseInt(totalMatches)){
            $(buttonSeeMore).show();
        }
    }
    //================================END MY CODE================================

    function ajaxMorePosts() {

        var self = this,
            grid = $('.blog--grid'),
            btnMore = $('.blog--grid-more a');


        function callBlogPosts() {

            /*
             to get  total items displayed in page , to pass as selector to request
             */
            var totalCount = $('.blog--grid').find('.block--article');


            var tags = new Array();
            $('.input-field.checkbox.checked').each(function (i, obj) {
                var checkboxCustom = $(obj).find('input[type="checkbox"]');
                tags.push($(checkboxCustom).attr('id'));
            });
            $.ajax({
                url: '/bin/blogOverviewHandler/?resourcePath=' + resourcePath + '&overview=' + overview + '&selector=' + totalCount.length + '&tags=' + tags,
                type: 'GET',
                success: function (response, status) {
                    var json = jQuery.parseJSON(response[1]);
                    $.each(json, function (i, obj) {

                        var html = jsonToHTML(obj);

                        grid.append(html).masonry('reloadItems').masonry('layout');
                    });

                    isSeeMoreHidden(jQuery.parseJSON(response[0]));
                },
                complete: function () {
                    // alert(location.pathname);
                },
                error: function () {
                    console.log('AJAX error');
                }
            });

        };

        btnMore.on('click', function (e) {
            e.preventDefault();

            callBlogPosts();


        });
    }

    function ajaxTrendingTopics() {

        var self = this,
            grid = $('.blog--grid'),

            tagFilter = $('.checkbox input[type="checkbox"]');

        tagFilter.on('click', function () {

            if ($(this).is(':checked')) {
                $(this).closest('.checkbox').addClass('checked');
            } else {
                $(this).closest('.checkbox').removeClass('checked');
            }

            var tags = new Array();
            $('.input-field.checkbox.checked').each(function (i, obj) {
                var checkboxCustom = $(obj).find('input[type="checkbox"]');
                tags.push($(checkboxCustom).attr('id'));
            });


            var totalCount = $('.blog--grid').find('.block--article');
            $.ajax({
                    url: '/bin/blogOverviewHandler/?resourcePath=' + resourcePath + '&overview=' + overview + '&selector=' + 0 + '&tags=' + tags,
                    type: 'GET',
                    success: function (response, status) {
                        var json = jQuery.parseJSON(response[1]);
                        grid.empty();
                        $.each(json, function (i, obj) {
                            var html = jsonToHTML(obj);
                            grid.append(html).masonry('reloadItems').masonry({
                                transitionDuration: '0.4s'
                            });
                        });
                        isSeeMoreHidden(jQuery.parseJSON(response[0]));
                    },
                    complete: function () {
                    },
                    error: function () {
                        console.log('AJAX error');
                    }
                }
            );
        });
    }


////////////////////////////////////////////////////////////////END////////////////////////////////////////////////////////////////////////////////////

    // ajaxNewsletterSubscribe();
    articlesRowSlider();
    setAsideStyleFromParent();
    setSectionStyleFromParent();
    moveClassToParentSectionElement();
    removeDivVideoSolutions();

    trustUsSlider();
    listToggle();
    moveClassToParentElement();
    deleteNewSectionElements();
    moveClassToChildElements();
    checkAcceptedCookie();
    enableVideoComponents();
    articlesSlider();
    ctaExpert();
    pageJumplinks();
})
;