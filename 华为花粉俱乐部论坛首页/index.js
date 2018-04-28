
$(function(){
    /* ===========返回顶部/吸顶============= */
    var $top=$('.top');
    var $header3=$('.header3');
    $(window).on('scroll',function(){
        var $nowTop=$(this).scrollTop();
        if($nowTop>106){
            $top.css({
                transition:'opacity .3s ease',
                opacity:1
            });
            $header3.css({
                position:'fixed',
                top:0
            });
        }else{
            $top.css({
                transition:'opacity .3s ease',
                opacity:0
            });
            $header3.css({
                position:'fixed',
                top:106-$nowTop+'px'
            });
        }
    }).trigger('scroll');
    $top.on('click',function(){
        $('body,html').stop().animate({scrollTop:0},400);
    });

/* ============导航条下滚动小球============ */
    var $boll=$('.boll');
    var orgWidth=($('.header3 .link_lis>li:first-of-type').width()+60)/2;

    $('.header3 .link_lis>li').each(function(i,elem){
       $(this).on('mouseover',function(){
           // 每一个li的中心位置相对于ul的偏移距离
           var li_offsetLeft=$(this).offset().left+($(this).width()+60)/2;
           var ul_offsetLeft=$('.header3 .link_lis>li:first-of-type').offset().left;
            // 小球相对于ul列表绝对定位,所以移动时的left值要减去ul列表的相对偏移值ul_offsetLeft
           $boll.css({
            left:li_offsetLeft-ul_offsetLeft+'px',
            transition:'left .4s ease'
            });
       });
    });
    // 鼠标移出ul列表时,小球回归到原位
    $('.header3 .link_lis').on('mouseout',function(){
        $boll.css({
            left:orgWidth+'px',
            transition:'left .5s ease'
        });
    })

/* ===========banner============= */
    var $banner_btn=$('.banner_btn li');
    var $imgs=$('.banner_wrap img');
    var index=0;
    var timer=null;
    // 初始位置的显示状态
    $imgs.eq(index).css('display','block');
    $banner_btn.eq(index).addClass("btn_on");
    banner();//自动轮播

    function banner(){
        timer=setInterval(function(){
                checkout(function(){
                index++;
                if(index==6)index=0;
                })
        },5000);
    }
    // 鼠标划入清除自动播放/划出时回复
    $('.banner_wrap').on('mouseover',function(){
        clearInterval(timer);
    }).on('mouseout',function(){
        banner();
    });

    // 在btn上点击时
    $banner_btn.each(function(i,elem){
        $(this).on('click',function(){
            var that=$(this);
            checkout(function(){
                index=that.index();
            });
        });
    });
    // 上一页/下一页
    $('.paging').eq(0).on('click',function(){
            checkout(function(){
                index--;
                if(index==-1)index=5;
            })
    });
    $('.paging').eq(1).on('click',function(){
            checkout(function(){
                index++;
                if(index==6)index=0;
            });
    });
    // paging合并
    /*$('.paging').each(function(i,elem){
        if($(this).index()){
           $(this).on('click',function(){
                checkout(function(){
                index--;
                if(index==-1)index=5;
                });
           });
        }else{
            $(this).on('click',function(){
                checkout(function(){
                index++;
                if(index==6)index=0;
                });
            });
        }
    });*/
    //简化的函数
    function checkout(callback){
            $imgs.eq(index).css('display','none');
            $banner_btn.eq(index).removeClass('btn_on');
            callback&&callback();
            $imgs.eq(index).css('display','block')
            $banner_btn.eq(index).addClass('btn_on');
    }

    /* ===========版块和圈子切换============= */
    var $cirList=$('.sec_cir_recom .cir_list');
    var $secList=$('.sec_cir_recom .sec_list');
    $('.sec_cir_recom .cir').on('mouseover',function(){
        $secList.css('display','none');
        $cirList.css('display','block');
    });
    $('.sec_cir_recom .sec').on('mouseover',function(){
        $secList.css('display','block');
        $cirList.css('display','none');
    });

   /* ===========视频播放切换============= */
    var videoIndex=0;
    var $video_img=$('.video_list img');
    var $video_li=$('.video_btn_lis li');
    $video_li.eq(videoIndex).addClass('video_on');//开始时li的样式

    $('.video_paging_nex').on('click',function(){
        // 先设置当前张和下一张的位置
        $video_img.eq(videoIndex).css('left',0);
        $video_li.eq(videoIndex).addClass('video_on');
        videoIndex++;
        if(videoIndex==8)videoIndex=0;
        $video_img.eq(videoIndex).css('left','240px');

        videoIndex--;//videoIndex还原

        // 当前张和下一张向左滑动,滑动之后将当前张left置为240,下一张滑动到left为0处
        $video_img.eq(videoIndex).animate({left:'-=240px',opacity:0},300,function(){$(this).css('left','240px');});
        $video_li.eq(videoIndex).removeClass('video_on');
        videoIndex++;
        if(videoIndex==8)videoIndex=0;
        $video_img.eq(videoIndex).animate({left:'-=240px',opacity:1},300);
        $video_li.eq(videoIndex).addClass('video_on');
    });

    $('.video_paging_pre').on('click',function(){
        // 先设置当前张和上一张的位置
        $video_img.eq(videoIndex).css('left',0);
        $video_li.eq(videoIndex).addClass('video_on');
        videoIndex--;
        if(videoIndex==-1)videoIndex=7;
        $video_img.eq(videoIndex).css('left','-240px');

        videoIndex++;
        if(videoIndex==8)videoIndex=0;

        // 当前张和上一张向右滑动,滑动之后将当前张left置为-240,下一张滑动到left为0处
        $video_img.eq(videoIndex).animate({left:'+=240px',opacity:0},300,function(){
            $(this).css('left','-240px');
        });
        $video_li.eq(videoIndex).removeClass('video_on');
        videoIndex--;
        if(videoIndex==-1)videoIndex=7;

        $video_img.eq(videoIndex).animate({
            left:'+=240px',
            opacity:1},300);
        $video_li.eq(videoIndex).addClass('video_on');
    });

    /* ===========照片切换============= */
    var $photo_li=$('.photo_wall_btn li');
    var $photo=$('.photo_wall_label a');
    var photoIndex=0;

    $photo_li.each(function(i,elem){
        $(this).on('mouseover',function(){
            $photo.eq(photoIndex).css('display','none');
            photoIndex=$(this).index();
            $photo.eq(photoIndex).css('display','block');

        });
    });

})
