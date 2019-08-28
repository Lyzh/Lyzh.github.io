/**
 * Created by Administrator on 2016/11/4.
 */
//g固定页面一排放多少图片
window.onload=function(){
    imgLocation("container","box");
        var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
    window.onscroll=function(){//监听一个滚动条加载
        if(checkFlag()){
            var cDad=document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){//动态加载
                var cson=document.createElement("div");
                cson.className="box";//与html中box要一样
                cDad.appendChild(cson);//加载节点
                var boximg=document.createElement("div");
                boximg.className="box_img";
                cson.appendChild(boximg);
                var img=document.createElement("img");
                img.src="img/"+imgData.data[i].src;
                boximg.appendChild(img);
              }
            imgLocation("container","box");
        }
    }
}
//判断是否加载
function checkFlag(){
    var cfarther=document.getElementById("container");
    var cchild=getKid(cfarther,"box");
    var lastchildHeight=cchild[cchild.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop; //被卷去的头部
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;//clientHeight是元素的内容和padding值
    //console.log(lastchildHeight+":"+scrollTop+":"+pageHeight);
    if(lastchildHeight<scrollTop+pageHeight){
        return true;
    }
}

//首先获得屏幕有多少图片
//将parent所有content取出（也就是container里的所有box）
function imgLocation(parent,kid){
    var cparent=document.getElementById(parent);//得到父级空间
    var cKid=getKid(cparent,kid);//定义个对象承载k子集内容
    var imgWidth=cKid[0].offsetWidth;//得到图片的宽度
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);//floor向下取整，得到一排图片个数
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0px auto;";//改变父级div的CSS样式-页面显示宽度

    var boxheightArr=[];//存放每个图片的高度
    for(var i=0;i<cKid.length;i++){
        if(i<num){
            boxheightArr[i]=cKid[i].offsetHeight;//每个图片的高度存放到数组中

       }else{//第一排以外的图片
          var minheight=Math.min.apply(null,boxheightArr);//min不提供数组，使用apply
          var minIndex=getminheightLocation(boxheightArr,minheight);//得到当前最低图片
            cKid[i].style.position="absolute";//固定ckid高度
            cKid[i].style.top=minheight+"px";
            cKid[i].style.left=cKid[minIndex].offsetLeft+"px";
            boxheightArr[minIndex]+=cKid[i].offsetHeight;//cKid[i].offsetHeight是指加载图片的高度
        }

    }
}
//得到当前最低图片,并返回该图片在数组中位置
function getminheightLocation(boxheightArr,minheight){
    var i;
    for(i in boxheightArr){//i在数组中遍历
       if(boxheightArr[i]==minheight){
           return i;
       }
     }
}

 //得到每个空间（子空间）
function getKid(parent,kid){
    var kidArr=[];//用来存储
    var allKid=parent.getElementsByTagName("*");//通过父级得到子集空间元素
    for(var i= 0;i<allKid.length;i++){  //定义for循环储存将获取的子集放进数组中
            if(allKid[i].className==kid){
                kidArr.push(allKid[i]);//向数组末尾进行添加
            }
    }
    return kidArr;
}