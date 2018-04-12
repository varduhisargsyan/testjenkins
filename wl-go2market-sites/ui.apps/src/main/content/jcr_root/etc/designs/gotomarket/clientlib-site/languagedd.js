
$(function () {
    //not use this if can do in server side TODO
    var items = $('.lang-selector ul').find('li');
    for (var i = 0; i < items.length; i++) {
        var it = $(items[i]);
        if(it.find('a').length==0){
            it.remove();
        }
    }
});