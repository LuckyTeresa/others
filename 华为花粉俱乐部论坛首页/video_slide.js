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
