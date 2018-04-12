(function ($) {
    "use strict";

    $(document).on("dialog-ready", function (e) {
        var $date = $(".creation--date").find('input').val();
        if (!$date) {
            $('.creation--date').find('input').prop('value', new Date());
        }
    });

})(Granite.$);