$(function(){
     // 轮播的开始
     var i=0;
     var length=$('#lun li').length;
     function autoRun(){
          run=setInterval(function(){
               $('#lun li').hide();
               $('#dian li').css('background','#aaa');
               i++;
               if(i>=length){
                    i=0;
               }
               $('#lun li:eq('+i+')').show();
               $('#dian li:eq('+i+')').css('background','#00a696');
          },2000)
     }
     autoRun();
     $('#lun li').mouseover(function(){
          clearInterval(run);
     }).mouseout(function(){
          autoRun();
     })
     $('#dian li').mouseover(function(){
          clearInterval(run);
          $('#lun li').hide();
          $('#dian li').css('background','#aaa');
          var i=$(this).index();
          $('#lun li:eq('+i+')').show();
          $('#dian li:eq('+i+')').css('background','#00a696');
     }).mouseout(function(){
          autoRun();
     })
     // 轮播的结束

     $('.main_nav .one>ol>li').mouseover(function(){
          var index=$(this).index();
          $('#daohang>li:eq('+index+')').show().siblings().hide();
     }).mouseout(function(){
          $('#daohang>li').hide();
     })
     $('.footer_middle>div>p>span>img').mouseover(function(){
          $(this).attr('src','./img/kefu2.png')
     }).mouseout(function(){
          $(this).attr('src','./img/kefu.png')
     })
 // 搜索模块（高级单例模式）
    var searchModule = (function() {
        var $input = $(".form-control"),
            $ul = $("#ul"),
            interval = 100;

        //->向百度的服务器发送JSONP请求,把数据获取到之后绑定到ul容器中
        function bindHTML() {
            var searchKey = $input.val();
            $.ajax({
                url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + searchKey, //wd文本框中的关键字
                dataType: "jsonp",
                jsonp: "cb",
                success: callback
            });
            function callback(data) {
                //https: //sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=博士

                // window.baidu.sug({q:"博士",p:false,s:["博士留学网","博士论文网","博士伦","博世","博士后","博士帽","博士网上征婚被骗","博士研究生","博士服","博士眼镜"]});

                data = data["s"];
                var str = '';
                $.each(data, function(index, item) { //为每个匹配元素规定要运行的函数。
                    if (index <= 3) {
                        str += '<li>' + item + '</li>';
                    }
                });
                if (str.length === 0) {
                    $ul.html(str);
                    return;
                }
                $ul.html(str).stop().slideDown(interval);
            }
        }

        //->事件绑定和模块的入口
        function init() {
            //->事件委托处理:点击的是LI我们让LI中的内容显示在文本框中,展示框消失;点击的是文本框什么事情都不错;否则展示框消失;
            $(document).on("click", function(e) {
                var tar = e.target,
                    tarTag = tar.tagName.toUpperCase(),
                    $tar = $(tar);

                if (tarTag === "LI" && tar.parentNode.id === "ul") {
                    $input.val($tar.html()); //返回或设置被选元素的 value 属性
                    $ul.stop().slideUp(interval);
                    return;
                }

                if (tar.id === "input") {
                    return;
                }

                $ul.stop().slideUp(interval);
            });

            //->文本框获取焦点或者输入内容的时候判断当前文本框中是否有内容,有内容绑定数据,没有内容隐藏展示框
            $input.on("focus keyup keydon", function() {
                var val = $(this).val();
                if (val.length > 0) {
                    bindHTML();
                    return;
                }
                $ul.stop().slideUp(interval);
            });
        }

        return {
            init: init
        };
    })();
    searchModule.init();

})
