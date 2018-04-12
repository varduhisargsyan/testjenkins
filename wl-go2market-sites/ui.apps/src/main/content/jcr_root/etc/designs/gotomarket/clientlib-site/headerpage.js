
$(function () {
    $('[data-href]').click(function () {

       var link=$(this).attr('data-href');

        // similar behavior as clicking on a link
        window.location.href = link;

    })



    var e = new Swiper(".page--slider-container", {
        wrapperClass: "page--slider-wrapper",
        slideClass: "page--slider-slide",
        slideActiveClass: "slide-active",
        loop: !0,
        pagination: ".page--slider-pagination",
        paginationType: "bullets",
        bulletClass: "slider-pagination-bullet",
        bulletActiveClass: "active",
        paginationHiddenClass: "inactive",
        paginationClickable: !0,
        paginationBulletRender: function (e, t, i) {
            return '<button class="' + i + '">' + (t + 1) + "</button>"
        },
        speed: 400,
        autoplay: 4e3
    });
    $(".page--slider-nav .slider-nav.next").on("click", function () {
        e.slideNext()
    }), $(".page--slider-nav .slider-nav.previous").on("click", function () {
        e.slidePrev()
    })

});