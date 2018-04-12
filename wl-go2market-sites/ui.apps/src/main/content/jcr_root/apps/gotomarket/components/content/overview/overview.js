"use strict";

use(function() {
    try {

        // setting the limit


        var m = parseInt(this.matches);
        var itemPerPage=parseInt(this.itemPerPage);
        var offset, p = "", next="", pages;
        var selectors = new Array();

        var pages = new Array();
        selectors = request.getRequestPathInfo().getSelectors();

        // Getting Selector
        if (selectors.length != 0 && selectors[0] == 'nocache')
            var sel = 0;
        else if (selectors.length != 0 && selectors[0] >= 0){
            var sel = parseInt(selectors[0]);
        }
        else
            var sel = 0;

        var maxSel = parseInt(m / itemPerPage + 1) - 1;
        maxSel = Math.floor(maxSel - 1);
        if (maxSel == -1)
            maxSel = 0;
        log.info("Max Selector " + maxSel);

        // Previous Link
        if (sel != 0 && sel < m / itemPerPage + 1) {
            p = parseInt(sel) - 1;
        }

        // Next link
        if ((sel + 1) * itemPerPage >= m) {
            next = "";
        } else {
            next = parseInt(sel) + 1;
        }

        // Need to find this.itemPerPage links including adjacent links and current one
        var fcount = 0;
        var bcount = 0;
        var flimit = 2;
        var blimit = 2;

        if (maxSel - sel >= 2) {
            var blimit = 2;
        } else {
            flimit = parseInt(flimit)
                + (parseInt(blimit) - (parseInt(maxSel) - parseInt(sel)));
            log.info(flimit);
            blimit = maxSel - sel;
        }

        if (parseInt(sel) - 0 < 2) {
            blimit = blimit + flimit - parseInt(sel) - 0;
        }

        // Front
        for (i = sel - 1; i >= 0; i--) {
            if (fcount != flimit) {
                log.info(fcount);
                pages[fcount] = i;
                fcount++;
            }
        }

        for (i = parseInt(sel) + 1; i <= maxSel; i++) {
            log.info("i=" + i);
            if (bcount != blimit) {
                pages[bcount + fcount] = i;
                bcount++;
            }
        }

        log.info(pages.length)
        pages[pages.length] = parseInt(sel);

        var list = [];
        for (var n = 0; n < pages.length; n++) {

            var x = parseInt(pages[n]);
            list[n] = x;
            // }
        }

        list.sort(function(a, b) {
            return a - b
        });

        for (var n = 0; n < list.length; n++) {
            log.info(list[n])
            log.info(isNaN(list[n]));
        }

        var pageList = new Array();
        for (var n = 0; n < list.length; n++) {

            var link = [];
            var x = parseInt(list[n]) + 1;
            link[0] = list[n].toString();
            link[1] = x.toString();

            list[n] = link;

        }

        // Check for invalid pagination
        var valid = true;
        if (parseInt(sel) > parseInt(maxSel))
            valid = this.previous;

        // Removing single element is it has only one page
        if (list.length == 1)
            list.pop();

        return {
            previous : p.toString(),
            next : next.toString(),
            pages : list,
            check : valid

        };

    } catch (e) {
        log.info(e);
    }
});