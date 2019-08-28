FastClick.attach(document.body);

// //->REM(屏幕调整)
~ function() {
    var desW = 640,
        winW = document.documentElement.clientWidth,
        ratio = winW / desW,
        oMain = document.querySelector('.main');
    if (winW > desW) {
        oMain.style.margin = '0 auto';
        oMain.style.width = desW + 'px';
        return;
    }
    document.documentElement.style.fontSize = ratio * 100 + 'px';
}();


//->INIT SWIPER初始化
new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    /*当切换结束后,给当前展示的区域添加对应的ID,由此实现对应的动画效果*/
    onSlideChangeEnd: function(swiper) {
        //swiper.slides:获取当前一共有多少个活动块(包含LOOP模式先前后多加的两个)
        //swiper.activeIndex:当前展示这个区域的索引
        var slideAry = swiper.slides,
            curIn = swiper.activeIndex,
            total = slideAry.length;

        //->计算ID是PAGE?
        var targetId = 'page';
        switch (curIn) {
            case 0:
                targetId += total - 2;
                break;
            case (total - 1):
                targetId += 1;
                break;
            default:
                targetId += curIn;
        }

        //     //->给当前的活动块设置ID即可,还要把其余的移除
        // slideAry.forEach(function(item,index){
        //     if(curIn==index){
        //         item.id=targetId;
        //         return;
        //     }
        //     item.id=null;
        // })
        //slideAry是类数组不能直接用forEach()；
        [].forEach.call(slideAry, function(item, index) {
            if (curIn === index) {
                item.id = targetId;
                return;
            }
            item.id = null;
        });
    }
}); //forEach在IE6-8不兼容

//->MUSIC
~ function() {
    var musicMenu = document.getElementById('musicMenu'),
        musicAudio = document.getElementById('musicAudio');

    musicMenu.addEventListener('click', function() { //移动端的click有300ms的延迟
        if (musicAudio.paused) { //->暂停
            musicAudio.play();
            musicMenu.className = 'music move';
            return;
        }
        musicAudio.pause();
        musicMenu.className = 'music';
    }, false);

    function controlMusic() {
        musicAudio.volume = 0.1;
        musicAudio.play();
        // 能播放了
        musicAudio.addEventListener('canplay', function() {
            musicMenu.style.display = 'block';
            musicMenu.className = 'music move';
        }, false); //冒泡阶段执行
    }
    // 声音先出来，再显示图标
    window.setTimeout(controlMusic, 1000);
}();