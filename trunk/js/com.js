/**
 * Project: 报告平台
 * Author: fangge
 * Build: 2015/5/21 15:32
 */
$(function () {
    if($('body').hasClass('index')){
        $("html").niceScroll({
            cursorborder:'0',
            scrollspeed:'100'
        });
    }

    var bgFun = {
        /**
         * 滚动效果
         */
        scrollShow:function(){
            $(window).scroll(function(){
                var t = $(window).scrollTop();
                if(t>=521){
                    $('.index #index-title').css({'position':'fixed','top':0,'left':0})
                        .find('.sprite-nav,.sprite-search').fadeIn(200)
                    $('article, aside').css('margin-top','186px')
                }else{
                    $('.index #index-title')
                        .css({'position':'relative'})
                        .find('.sprite-nav,.sprite-search').fadeOut(200)
                    $('article, aside').css('margin-top','100px')
                }
            })


        },
        /**
         * 导航显示
         */
        navShow:function(){
            $('.nav-open').bind('click',function(){
                $('#more-wrap').fadeIn(200)
            })
            $('#nav-close').bind('click',function(){
                $('#more-wrap').fadeOut(200)
            })
        },
        /**
         * 微信显示
         */
        wxShow:function(){
            $('#mask,#more-wrap .more-bg').bind('click',function(){
                $('#mask,.qrcode-wrap').fadeOut(200);
                $('#index-wx,#index-yixin').css('z-index','50')
                $('.pop').fadeOut(200)
            });
            $('#index-wx').click(function(){
                $(this).css('z-index','101')
                setTimeout(function(){$('#mask,#qrwrap').stop().fadeIn(100);},420)
            })
            $('#index-yixin').click(function(){
                $(this).css('z-index','101')
                setTimeout(function(){$('#mask,#qrwrap2').stop().fadeIn(100);},420)
            })
            $('.sprite-weixin').click(function(){
                $(this).closest('.art-bottom').find('.qrwrap3').stop().fadeIn(100)
                $('#mask').stop().fadeIn(100)
            })
            $('.sprite-yixin').click(function(){
                $(this).closest('.art-bottom').find('.qrwrap4').stop().fadeIn(100)
                $('#mask').stop().fadeIn(100)
            })
        },
        /**
         * 分享信息
         */
        shareInfo:function(){
            var title = encodeURIComponent("Samshing"),
                intro = encodeURIComponent("超级喜欢的网站，分享给大家，保证很有料哦~！（分享来自@xxxxxxxxxx网）"),
                url = encodeURIComponent(document.location),
                pic= encodeURIComponent("http://www.mrfangge.com/bgptv6/img/share.jpg");
            $('.sprite-index-sina,.sprite-sina').attr('href','//v.t.sina.com.cn/share/share.php?title='+intro+'&url='+url+'&pic='+pic);
            //$('.sprite-index-yx,.sprite-yixin').attr('href','//open.yixin.im/share?title='+title+'&url='+url+'&pic='+pic+'&desc='+intro)
        },
        init:function(){
            this.scrollShow();
            this.navShow();
            this.wxShow();
            this.shareInfo()
        }
    }

    bgFun.init()

})
/**
 * 县是弹层
 * @param id
 */
function showPop(id){
    $('#'+id).stop().fadeIn(200);
    $('#mask').stop().fadeIn(200);
}