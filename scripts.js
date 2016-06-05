/**
 * Created by cdeguia on 6/5/16.
 */

var winResize = function () {
    document.getElementById('frame').style.height = (window.innerHeight-100) + 'px';
}

$(window).ready(function() {

    window.onresize = function () {
        winResize();
    };

    $('.action').on("click", event, aaction)
    $(function () {
        $("#searchbox").focus();
    });
    function aaction(event) {
        event.preventDefault();
        var a = $(this).attr('href');
        document.getElementById("resultsWindow").innerHTML = '<iframe id="frame" src="' + a + '" width= 100%></iframe>';
        winResize();
    };

    $("form").submit(function () {
        event.preventDefault();
        var searchString = $(".searchString").val();
        //console.log(searchString);

        $.getJSON('http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=13&warningsaserror=1&callback=?&search=' + searchString, function (data) {
            // console.log(data);
            //$("#resultsWindow").empty();
            var out = "";
            $.each(data[1], function (i, val) {
                // console.log(val.title);
                out += '<a href="' + data[3][i] + '"  class="action">';
                out += '<div class="panel panel-info"><div class="panel-heading">'
                out += '<h3 class="panel-title">' + val + '</h3></div>';
                out += '<div class="panel-body">' + data[2][i] + '</div></div>';
                out += '</a>';
            });
            document.getElementById("resultsWindow").innerHTML = out;
            $('.action').on("click", event, aaction)
        });

    });
});