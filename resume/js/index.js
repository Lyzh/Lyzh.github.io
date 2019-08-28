/*loading*/
function load() {
    $("#loading").delay(1000).fadeOut("slow");
}
var $container = $("#container");



~ function() {
    /*header*/
    var $header = $container.children(".header"),
        $menu = $header.find(".h-con-menu"),
        $nav = $header.children(".h-nav"),
        $mainI = $container.find("#main-aboutme");
    var $goTop = $container.children("#goTop");
    var flag = null;
    $menu.on("click", function() {
        $nav.slideToggle();

    })
    $nav.on("click", function() {
        $nav.slideToggle();
    })


    window.onscroll = scroll; //为什么不能加()；
    function scroll() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        if (scrollTop > clientHeight / 2) {
            $header.animate({
                opacity: '1'
            }, 0).removeClass('slideOutUp').addClass('animated slideInDown');

            $goTop.animate({
                opacity: '1'
            }, 0).removeClass('slideOutDown').addClass('animated slideInUp');

        } else {
            $header.removeClass('slideInDown').addClass('animated slideOutUp');
            $goTop.removeClass('slideInUp').addClass('animated slideOutDown');
        }

    }
    /*goTop*/

    goTop.onclick = function() {
        //点击时当前的go消失
        this.style.display = "none"; //此时不会立马消失，因为下面动画执行的时候滚动条依旧在动，就会触发onsroll行为，所以需要取消此事件
        window.onscroll = "none";

        var duration = 500,
            interval = 1;
        var target = document.documentElement.scrollTop || document.body.scrollTop;
        var step = (target / duration) * interval;

        var timer = window.setInterval(function() {
            var curTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (curTop === 0) {
                window.clearInterval(timer); //需要传id，否则清除不了
                window.onscroll = scroll; //动画结束后，将对应方法重新绑定
                return;
            }
            curTop -= step;
            document.documentElement.scrollTop = curTop;
            document.body.scrollTop = curTop;
        }, interval);
    }

    /*sections*/
    // var $sectionTitle = $container.find(".sectionTitle");
    var $work = $container.find(".work");
    $work.on("mouseover", function() {
        $(this).find(".aLayer").stop().animate({
            opacity: '1'
        }, 0).fadeIn(0);

    }).on("mouseout", function() {
        $(this).find(".aLayer").stop().animate({
            opacity: '0'
        }, 0).fadeOut(0);
    })


}()