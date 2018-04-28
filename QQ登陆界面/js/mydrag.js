
function getClassName(clsName,parent_id){
    var  parent=parent_id?document.getElementById(parent_id):document;
    var eles=parent.getElementsByTagName('*');
    var cls=[];
    for(var i=0,l=eles.length;i<l;i++){
        if(eles[i].className==clsName){
            // console.log(eles[i].className);
            // cls是数组
            cls.push(eles[i]);
        }
    }
    // 一定要记得返回！！！
    return cls;
}

// window加载调用drag，记得所有调用的函数一定不要在后面加括号！！！
window.onload=drag;

function drag(){


    //返回的是数组，要取出里面的第一个元素才行，取出面板中可以拖拽的那一块区域，
    var oTitle=getClassName('login_logo_webqq','loginPanel')[0];
    // fnDown一定不要打括号！！！
    oTitle.onmousedown=fnDown;

    // 点击关闭
    var oClose=getClassName('ui_boxyClose','loginPanel')[0];
    oClose.onclick=function(){
      var oDrag=document.getElementById('loginPanel');
      oDrag.style.display='none';
    }


// 显示状态切换页面
    var logState=document.getElementById('loginState');
    var logList=document.getElementById('loginStatePanel');

    // 在下拉列表中选择的时候，阻止其冒泡事件，因为点击出现下拉列表和点击列表中的li标签是属于触发一个大盒子中的小盒子事件。点击大盒子出现下拉列表，但是点击小盒子后我们希望列表能够隐藏
    logState.onclick=function(event){
      event=event||window.event;
      if(event.stopPropagation){
        event.stopPropagation();
      }else{
        event.cancelBubble=true;
      }
      logList.style.display='block';
    }


// 在loginStatePanel这个idde 父盒子中寻找statePanel_li类，并未每一个类绑定上下列事件
    var stateList=getClassName('statePanel_li','loginStatePanel');

    for(var i=0,l=stateList.length;i<l;i++){
      // 鼠标移上去的时候改变背景色
      stateList[i].onmouseover=function(){
        this.style.backgroundColor='#C0C0C0';
      }
      // 鼠标划出还原背景色
      stateList[i].onmouseout=function(){
        this.style.backgroundColor='#FFF';
      }
      // 鼠标点击的时候选中相应状态，注意此处也有冒泡事件，点击小盒子我希望列表可以隐藏，但是同时也点击了大盒子，而大盒子表示点击时出现下拉列表。
      stateList[i].onclick=function(event){
         if(event.stopPropagation){
        event.stopPropagation();
      }else{
        event.cancelBubble=true;
      }

// 这个改变包括两个部分，一个是前面图标样式的变化，另一个是后面文字的变化
        new_state=this.id;
        // var logList=document.getElementById('loginStatePanel');
        var logStateShow=document.getElementById('loginStateShow');
        var logStateTxt=document.getElementById('login2qq_state_txt');
        var new_state_Txt=getClassName('stateSelect_text',new_state);
        logStateShow.className='';
        logStateShow.className='login-state-show '+new_state;
        logStateTxt.innerHTML=new_state_Txt[0].innerHTML;
        logList.style.display='none';
      }
    }

// 在浏览器中任意处点击，登陆状态就隐藏
    document.onclick=function(event){
      event=event||window.event;
      var logList=document.getElementById('loginStatePanel');
      logList.style.display='none';

    }

}



function fnDown(event){
    event=event||window.event;
    var oDrag=document.getElementById('loginPanel');
    var disX=event.clientX-oDrag.offsetLeft;
    var disY=event.clientY-oDrag.offsetTop;

    document.onmousemove=function(event){
        event=event||window.event;
        fnMove(event,disX,disY);
    }
    document.onmouseup=function(event){
      document.onmousemove=null;
      document.onmouseup=null;
    }



}
function fnMove(e,posX,posY){
    var oDrag=document.getElementById('loginPanel');
    var maxW=document.documentElement.clientWidth||document.body.clientWidth;
    var maxH=document.documentElement.clientHeight||document.body.clientHeight;
    // 因为关闭按钮还有一个偏移的距离10px,所以需要在计算最大可移动区域的时候把这一部分也算进去。横向可移动的最大宽度减去10px，纵向可向上移动的最大高度只能等于10px，如果小于10就会使面板遮挡住一部分。
    // 纵向部分如果是在maxT上面减去10，得到的效果是面板在最底部会有10px的间隔，而不是上面刚好到顶。
    var maxL=maxW-oDrag.offsetWidth-10;
    var maxT=maxH-oDrag.offsetHeight;
    l=e.clientX-posX;
    t=e.clientY-posY;
   document.title=l;
   if(l<0){
    l=0;
   } else if (l>maxL){
    l=maxL;
   }
   if(t<0){
    t=10;
   } else if(t>maxT){
    t=maxT;
   }
    oDrag.style.left=l+'px';
    oDrag.style.top=t+'px';
}