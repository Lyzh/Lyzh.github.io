// 在棋盘上放一个棋子
// x,y->coordinate		w->block width 		type->white or black
function chessman(x,y,type){
    var realx = x*w+w/2;
    var realy = y*w+w/2;    
    if(type == 'white'){
        // shadow
        myctx.shadowBlur=10;
        myctx.shadowColor="black";

        // contours
        myctx.beginPath();
        myctx.arc(realx,realy,25,2*Math.PI,0);
        myctx.strokeStyle="white";
        myctx.stroke();
        // fill
        var my_whitechess=myctx.createRadialGradient(realx,realy,5,realx,realy,25);
        my_whitechess.addColorStop(1,"#a0a0a0");
        my_whitechess.addColorStop(0,"white");
        myctx.fillStyle=my_whitechess;	// myctx.fillStyle="white";
        myctx.fill();			
    }else if(type=='black'){
        //shadow
        myctx.shadowBlur = 10;
        myctx.shadowColor="black";
        // contours
        myctx.beginPath();
        myctx.arc(realx,realy,25,2*Math.PI,0);
        myctx.strokeStyle="black";
        myctx.stroke();
        // fill
        var my_whitechess=myctx.createRadialGradient(realx,realy,2,realx,realy,25);
        my_whitechess.addColorStop(1,"black");
        my_whitechess.addColorStop(0,"#aaaaaa");
        myctx.fillStyle=my_whitechess;	// myctx.fillStyle="white";
        myctx.fill();
    }
}

/*************** 画棋盘 ****************/
// 标准棋盘 15*15
function chessBoard(){
    var bgcolor = "#EEE685"
    var n = 15;
    var linecolor = "#A0522D";
    var ptcolor = "#0000ff";
    mycan.style.backgroundColor=bgcolor;
    //mycan.style.border='5px solid'+ linecolor;
    // 画棋盘格
    myctx.beginPath();
    for(var i=0;i<n;i++){
        myctx.moveTo(w/2,w*i+w/2);
        myctx.lineTo(w*n-w/2,w*i+w/2);
    }
    for(var i=0;i<n;i++){
        myctx.moveTo(w*i+w/2,w/2);
        myctx.lineTo(w*i+w/2,w*n-w/2);
    }
    myctx.closePath();
    myctx.strokeStyle=linecolor;	
    myctx.stroke();
    // draw Point
    myctx.beginPath();	
    myctx.arc(n*w/2,n*w/2,5,2*Math.PI,0);
    myctx.fillStyle=ptcolor;
    myctx.fill();
    myctx.stroke();
    // click ==> chessman
};

// 绑定监听函数
function bindListener(){
    mycan.onmousedown = function(e){
        var e = window.event||e;// IE 用window.event传递鼠标数据, firefox 用 e传递，兼容不同浏览器			
        var x = e.clientX - mycan.getBoundingClientRect().left - w/2;
        var y = e.clientY - mycan.getBoundingClientRect().top - w/2;
        x = Math.round(x/w);
        y = Math.round(y/w);
        chessman(x, y, "black");
    }
}

var mycan=document.getElementById("myCanvas");
var myctx=mycan.getContext("2d");
var w = 60;
chessBoard(60);
bindListener();

