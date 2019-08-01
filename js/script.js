$(function(){
    if($.fancybox){
        $('.fancybox').fancybox();
    }

    $("#totop").click(function() {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
    });

    $(window).scroll(function() {
        var docHeight = $(document).height() - $(window).height(),
            scrollTop = $(window).scrollTop(),
            percent = parseInt(scrollTop / docHeight * 100);

        if (scrollTop >= 200) {
            $("#totop").addClass("display");

            (function(color, percent){
                var canvas = $("#totop-canvas"),
                    width = canvas.width(),
                    height = canvas.height(),
                    center = width / 2,
                    radius = parseInt((width - 3) / 2),
                    ctx = canvas[0].getContext("2d");

                ctx.clearRect(0, 0, width, height);
                ctx.beginPath();
                ctx.arc(center, center, radius, - Math.PI / 2, Math.PI * 2 * percent - Math.PI / 2, false);
                ctx.strokeStyle = color;
                ctx.lineCap = "round"; // butt, round or square
                ctx.lineWidth = 3;
                ctx.stroke();
            })("#555555", percent/100);
        } else{
            $("#totop").removeClass("display");
        }

        $("#totop-percent").attr("data-percent", percent);
    });

    if($.fn.tagcanvas){
        // console.log( $('#tagCloudContainer').width())
        $("#tagCanvas").attr("width", $('#tagCloudContainer').width());
        $("#tagCanvas").attr("height", $('#tagCloudContainer').width());

        if(!$('#tagCanvas').tagcanvas({
            textFont: 'Georgia,Optima',
            textColour: null,
            outlineColour: 'black',
            weight: true,
            reverse: true,
            depth: 0.8,
            maxSpeed: 0.05,
            bgRadius: 1,
            freezeDecel: true,
            zoom: $('#tagCloudContainer').width() > 512 ? 1 : $('#tagCloudContainer').width()/512
        },'tags')) {
            // something went wrong, hide the canvas container
            $('#tagCanvasContainer').hide();
        }
    }
});
