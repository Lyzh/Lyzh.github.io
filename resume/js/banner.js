~(function() {
    function banner(ele,interval) {
        var $banner = $(ele);
        var $bannerInner = $banner.find('.bannerInner');
        //集合
        var $imgs = $bannerInner.find("img");
        var $divs = $bannerInner.children('div');
        //图片延迟加载
        function imgsDelay() {
            $.each($imgs, function(index, item) { // 循环所有的图片
                //index每一张真实图片的索引，item是每一张真实的图片
                var tempImg = new Image();
                $(tempImg).prop('src', $(item).attr('trueSrc')); // tempImg.src = img.getAttribute('trueSrc')
                $(tempImg).on('load', function() {
                    //图片加载成功的时候
                    //item.src = this.src;
                    $(item).prop('src', $(this).prop('src')).css('display', 'block');
                });

            });
            //默认让第一张的zIndex设置为1，透明度从0运动到1
            $divs.eq(0).css('zIndex', 1).stop().animate({ opacity: 1 }, 300);
        }
        window.setTimeout(imgsDelay, 500);

        //自动轮播
        var timer = null;
        interval = interval || 2000;
        var step = 0; //当前第几张图片显示，step和索引值是相同的
        timer = window.setInterval(autoMove, interval);

        function autoMove() {
            //当运动到第四张的索引是3，下一次应该运动到索引为0的那一张
            if (step == $imgs.length - 1) {
                step = -1;
            }
            step++; //每次执行时候step都会自动增加1
            //step = 0   ==>  step = 1
            //让step为1这一张出现 ==> 把step增加后的值对应的索引图片的zIndex的值赋值1，并且把其他的zIdex的值赋值为0.
            //立刻让step这张图片的透明度从0运动1，到达1之后把其他的图片的透明度设置成0
            //自动轮播和点击和左右都是相同的操作。。。封装成一个函数
            setBanner();
        }

        function setBanner() {
            $.each($imgs, function(index, item) { //$divs是包含img的那个盒子
                //index 每一张图片的索引，item是每一张图片 ==> 这个item也可以使用this
                if (index == step) { //这是即将要显示的那一张
                    $(item).parent().css('zIndex', 1).stop().animate({ opacity: 1 }, 300, 'linear', function() {
                        //当前要显示的这一张的透明度从0运动到1，并且把其他张透明度都设置成0
                        $(item).parent().siblings().css('opacity', 0);
                    })
                } else { //都是应该不层级zIndex放到0
                    $(item).parent().css('zIndex', 0);
                }
            });
        }

        $banner.off('mouseover').on('mouseover', function() {
            window.clearInterval(timer);
        }).off('mouseout').on('mouseout', function() {
            timer = window.setInterval(autoMove, interval);
        });
    }
    window.banner = banner;
})();
banner("#main-aboutme-banner",5000);