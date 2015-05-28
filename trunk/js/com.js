/**
 * Project: 报告平台
 * Author: fangge
 * Build: 2015/5/21 15:32
 */
$(function () {
    var bgFun = {
        /**
         * 滚动效果
         */
        scrollShow:function(){
            $(window).scroll(function(){
                var t = $(window).scrollTop();
                if(t>0){
                    $('.index #index-title').css({'position':'fixed','top':0,'left':0})
                        .find('.sprite-nav,.sprite-search').show()
                }else{
                    $('.index #index-title')
                        .css({'position':'relative'})
                        .find('.sprite-nav,.sprite-search').hide()
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
                $('#mask,#qrwrap').fadeOut(200)
                $('.pop').fadeOut(200)
            });
            $('#index-wx').click(function(){
                $('#mask,#qrwrap').stop().fadeIn(200);
            })

        },
        /**
         * 分享信息
         */
        shareInfo:function(){
            var title = encodeURIComponent("Samshing"),
                intro = encodeURIComponent("超级喜欢的网站，分享给大家，保证很有料哦~！（分享来自@xxxxxxxxxx网）"),
                url = encodeURIComponent(document.location),
                pic= encodeURIComponent("http://www.mrfangge.com/bgptv4/img/share.jpg");
            $('.sprite-index-sina').attr('href','//v.t.sina.com.cn/share/share.php?title='+intro+'&url='+url+'&pic='+pic);
            $('.sprite-index-yx').attr('href','//open.yixin.im/share?title='+title+'&url='+url+'&pic='+pic+'&desc='+intro)
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