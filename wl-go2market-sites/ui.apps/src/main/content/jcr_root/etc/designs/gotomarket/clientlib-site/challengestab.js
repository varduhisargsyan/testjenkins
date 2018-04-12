
$(function () {


    function setTabs(){

        var self = this;

        /** Add data-height to each tabs **/
        $('.tabs--content-wrapper .tabs--content').each(function(){
            $(this).attr( 'data-height', $(this).outerHeight(true) );
        });

        /** Open first Tab **/
        $('.tabs--cell').first().addClass('active');
        $('.tabs--content').first().addClass('active');
        $('.tabs--cell.active').find("a").addClass("white");

        $('.tabs--content-wrapper').css({
            'height': $('.tabs--content').first().attr('data-height')
        });

        /** onClick on tabs-cell, show content **/
        $('.tabs--cell').on('click', function(){

            var requestedTab = $(this).attr('data-tab');

            $('.tabs--cell.active').find("a").removeClass("white");
            $('.tabs--cell, .tabs--content').removeClass('active');


            $('.tabs--cell[data-tab="'+requestedTab+'"], #'+requestedTab).addClass('active');
            $('.tabs--cell.active').find("a").addClass("white");

            $('.tabs--content-wrapper').css({
                'height': $('#'+requestedTab).attr('data-height')
            });

            if( $(window).width() < 600 ){

                $('html, body').stop(true, false).animate({
                    scrollTop: $('#'+requestedTab).offset().top - 100
                }, 500);
            }

        });

    }
    setTabs();

});