
window.onload=main;
/*window.addEventListener('load',main,false);*/
function main(){
	var oTitle=document.getElementById('ontop');
	var otit1=document.getElementById('div_1');
	var otit2=document.getElementById('div_2');
	var otit3=document.getElementById('div_3');
    oMain=document.getElementById("container");//改变它，先把它取出来，取到面板，用oMain来接收
	//oTitle.addEventListener('mousedown',fnDown,false);
	oTitle.onmousedown=fnDown;  //鼠标按下键 调用fndown
    otit1.onmousedown=fnDow;
    otit2.onmousedown=fnDow;
    otit3.onmousedown=fnDow;
    //读取存储在sessionStorage中的数据
    if (window.sessionStorage){
        var to=window.sessionStorage.getItem("top"),
            le=window.sessionStorage.getItem("left"),
            wi=window.sessionStorage.getItem("width"),
            he=window.sessionStorage.getItem("height");
        oMain.style.top=to;
        oMain.style.left=le;
        oMain.style.width=wi;
        oMain.style.height=he;
    }
}

function fnDown(even){//even（变量）用来接收事件对象
    even = event || window.event;


        //光标按下时光标和面板之间的距离  clientX光标的坐标
    var   disX=even.clientX-oMain.offsetLeft,   //光标与面板的相对距离：光标的坐标减去面板跟浏览器的距离
        disY=even.clientY-oMain.offsetTop;   //offsetTop获取的是浏览器窗口与面板左边的距离
    //移动
    function movemain(event) {
        event = event || window.event;
        fnMove(event,disX,disY);
    }
    document.addEventListener('mousemove',movemain,false);
   /* document.onmousemove=function(event){   //在整个页面移动，用document，用event接收事件对象
        event = event || window.event;
        fnMove(event,disX,disY);
    }*/
    //释放鼠标
    function moveup() {
        document.removeEventListener('mousemove',movemain,false);

    }
    document.addEventListener('mouseup',moveup,false);
   /* document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    }*/
}
function fnMove(e,posX,posY){
    //var oMain=document.getElementById("container"),
    winW=document.documentElement.clientWidth || document.body.clientWidth;//浏览器窗口的宽
        winH=document.documentElement.clientHeight || document.body.clientHeight;
    var    l=e.clientX-posX,   //面板与浏览器左边窗口的距离
        t=e.clientY-posY,

        maxW=winW-oMain.offsetWidth,  //浏览器窗口的宽减去面板的宽就是能够拖动的最大距离
        maxH=winH-oMain.offsetHeight;
    if(l<0){
        l=0;
    }else if(l>maxW){
        l=maxW;
    }
    if(t<0){
        t=0;
    }else if(t>maxH){
        t=maxH;
    }
    oMain.style.left=l+'px';
    oMain.style.top=t+'px';
    saveToStorage();
}
function fnDow(ev) {
    ev= event || window.event;
        x0=ev.clientX,
        y0=ev.clientY;

    //调整大小
   /* document.addEventListener('mousemove',function(eve1){
        eve1 = event || window.event;
        fnResize1(eve1,x0,y0);
    },false)*/
    document.addEventListener('mousemove',fnResizeOne,false);
    //释放鼠标
    function moveUpOne() {
        document.removeEventListener('mousemove',fnResizeOne,false);
    }
    document.addEventListener('mouseup',moveUpOne,false);

    document.addEventListener('mousemove',fnResizeTwo,false);//调整大小
    //释放鼠标
    function moveUpTwo() {
        document.removeEventListener('mousemove',fnResizeTwo,false);
    }
    document.addEventListener('mouseup',moveUpTwo,false);

    document.addEventListener('mousemove',fnResizeThree,false); //调整大小
    //释放鼠标
    function moveUpThree() {
        document.removeEventListener('mousemove',fnResizeThree,false);
    }
    document.addEventListener('mouseup',moveUpThree,false);

}
//将数据保存到sessionStorage对象中
function saveToStorage() {
    if (window.sessionStorage) {

        var to=oMain.style.top,
            le=oMain.style.left,
            wi=oMain.style.width,
            he=oMain.style.height;
        window.sessionStorage.setItem("top",to);
        window.sessionStorage.setItem("left",le);
        window.sessionStorage.setItem("width",wi);
        window.sessionStorage.setItem("height",he);
    }
}
/*
function fnDown2(ev2) {
    ev2= event || window.event;
    x2=ev2.clientX;
    y2=ev2.clientY;
    function moveH(eve2) {
        eve2=event ||window.event;
        fnResize2();
    }
    document.addEventListener('mousemove',moveH,false);
    function moveU2() {
        document.removeEventListener('mousemove',moveH,false);
    }
    document.addEventListener('mouseup',moveU2,false);
}
function fnDown3(ev3) {
    ev3= event || window.event;
    x3=ev3.clientX;
    y3=ev3.clientY;
    function moveWH() {
        eve3= event ||window.event;
        fnResize3();
    }
    document.addEventListener('mousemove',moveWH,false);
    function moveU3() {
        document.removeEventListener('mousemove',moveWH,false);
    }
    document.addEventListener('mouseup',moveU3,false);
}
*/
function fnResizeOne(){
    var w1=event.clientX-x0,   //两次光标的横坐标差
        h1=y0,                  //在右边拖动时纵坐标不变
        maxWW=winW-oMain.offsetLeft,   //相对浏览器div的最大宽度
        wid=w1+oMain.offsetWidth;      //div 的最大宽度
    if(wid>maxWW){
        wid=maxWW;
    }else if(wid<0){
        wid=0;
    }
    oMain.style.width=wid+'px';
    oMain.style.height=h1+'px';
    saveToStorage();
}
function fnResizeTwo() {
    var w2=x0,                      //在下方拖动时横坐标不变
        h2=event.clientY-y0,   //两次光标的纵坐标差
        maxHH=winH-oMain.offsetTop,
        hei=h2+oMain.offsetHeight;
    if(hei>maxHH){
        hei=maxHH;
    }else if(hei<0){
        hei=0;
    }
    oMain.style.width=w2+'px';
    oMain.style.height=hei+'px';
    saveToStorage();
}
function fnResizeThree() {
    var w3=event.clientX-x0,     //在右下角拉，横纵坐标都变化
        h3=event.clientY-y0,
        maxWWW=winW-oMain.offsetLeft,
        maxHHH=winH-oMain.offsetTop,
        widt=w3+oMain.offsetWidth,
        heig=h3+oMain.offsetHeight;
    if(widt>maxWWW){
        widt=maxWWW;
    }else if(widt<0){
        widt=0;
    }
    if(heig>maxHHH){
        heig=maxHHH;
    }else if(heig<0){
        heig=0;
    }
    saveToStorage();
   /* var str=one.style.cursor;
    console.log(event);
    console.log(str);
    if(str.indexOf("e")==0){
        oMain.style.width=widt+'px';
    }else if (str.indexOf("n")!=-1){
        oMain.style.height=heig+'px';
    }*/
}