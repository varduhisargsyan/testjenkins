(function ($) {
    "use strict";

    $(document).on("dialog-ready", function (e) {
        var $text = $(".header--small").find('input').val();
        if ($text) {
            $('.target--header--small').find('.coral-Multifield-add').prop('disabled', true);
        } else {
            $('.target--header--small').find('.coral-Multifield-add').prop('disabled', false);
        }

    });

    $(document).on("change", ".header--small", function (e) {

        var $text = $(".header--small").find('input').val();

        if ($text) {
            $('.target--header--small').find('.coral-Multifield-add').prop('disabled', true);
        } else {
            $('.target--header--small').find('.coral-Multifield-add').prop('disabled', false);
        }

    });
})(Granite.$);