/*
 *  Created by C. Daniel Eguia on 6/5/16.
 */

function winResize() {
  $('#home').height(window.innerHeight);
  $('#connect').height(window.innerHeight);
  $('#frame').height(window.innerHeight - 90);
}
$(document).ready(function () {
  winResize();
});

$(window).ready(function() {

    window.onresize = function () {
        winResize();
    };

    $(function () {
        $("#searchbox").focus();
    });

    function aAction(event) {
        event.preventDefault();
        var a = $(this).attr('href');
        document.getElementById("resultsWindow").innerHTML = '<iframe id="frame" src="' + a + '" width= 100%></iframe>';
        winResize();
    };
   
    $(".randomBtn").on("click", aAction);

    $("form").submit(function (event) {
        event.preventDefault();
        var searchString = $(".searchString").val();

        $.getJSON('http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=13&warningsaserror=1&callback=?&search=' + searchString, function (data) {

            var out = "";
            $.each(data[1], function (i, val) {
                
                out += '<a href="' + data[3][i] + '"  class="action">';
                out += '<div class="panel panel-info"><div class="panel-heading">'
                out += '<h3 class="panel-title">' + val + '</h3></div>';
                out += '<div class="panel-body">' + data[2][i] + '</div></div>';
                out += '</a>';
            });
            document.getElementById("resultsWindow").innerHTML = out;
            $('.action').on("click", event, aAction)
        });

    });
});