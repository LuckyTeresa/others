window.onload=function(){
var music=document.getElementById('music');
var audio=document.getElementsByTagName('audio')[0];
var page1=document.getElementById('page1');
var page2=document.getElementById('page2');
var page3=document.getElementById('page3');
    // 音乐结束时
    audio.addEventListener('ended', function(event){
        // music.setAttribute('class','');
        music.style.animationPlayState='paused';
    },false)
    // 点击结束或者继续音乐
    /*music.onclick=function(){
        if(audio.paused){
            audio.play();
            // this.setAttribute('class','play');
            // 下面的语句可以实现图片和音乐同时停止，但兼容性不好
            this.style.animationPlayState='running';
            this.style.webkitAnimationPlayState='running';
        }else{
        audio.pause();
        // this.setAttribute('class','');
        this.style.animationPlayState='paused';
        this.style.webkitAnimationPlayState='paused';
        }
    }*/
    music.addEventListener('touchstart', function(){
        if(audio.paused){
            audio.play();
            this.setAttribute('class','play');
        }else{
            audio.pause();
            this.setAttribute('class','');
        }
    },false);

    page1.addEventListener('touchstart',function(){
        page1.style.display='none';
        page2.style.display='block';
        page3.style.display='block';
        page3.style.top='100%';
        setTimeout(function(){
            page2.setAttribute('class','page fadeOut');
            page3.setAttribute('class','page fadeIn');
        page3.style.display='block';
        },5500);
    },false);
}
