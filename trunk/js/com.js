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
        i:0,
        sinaurl:'',
        /**
         * 滚动效果
         */
        scrollShow:function(){

            var _this = this;
            //初始化
            _this.getList(_this.i)

            var w = $(window).width();
            $(window).scroll(function(){
                var t = $(this).scrollTop(),
                scrollHeight = $(document).height(),
               windowHeight = $(this).height();
                var l
                w >1200?l=521:l=parseInt($('header').height())
                bgFun.fixNav(t,l);


                if(t + windowHeight == scrollHeight){
                    _this.i++;
                    _this.getList(_this.i)
                }
            })

        },
        /**
         * 读取新闻列表
         * @param n 页码
         */
        getList:function(n){
            var _this = this;
            $.getJSON(
                "wenyi.yy.com:8080/report/list",
                {
                    pageNo:n,
                    keyword:''
                }
                ,function(data){
                    var arr = []
                    for(var i in data){
                        var list = data[i]
                        arr.push('<div class="art-col art-'+list.id+'"> <a href="report/'+list.id+'.html" class="art-title-wrap" target="_blank" title="'+list.title+'">');
                        arr.push('<span class="art-time">'+list.createDate+'</span><span class="art-author">'+list.author+'</span>');
                        arr.push('<span class="art-title">'+list.title+'</span><img src="'+list.logoUrl+'" alt="'+list.title+'" class="art-img"/></a>');
                        arr.push('<p class="art-intro">'+list.summary+'</p>');
                        arr.push('<div class="art-bottom"><div class="art-tag"><i class="sprite sprite-tag"></i>');
                        for(var j in list.tags){
                            arr.push('<i>'+list.tags[j]+'</i>');
                        }
                        arr.push('</div><div class="art-share"><i>分享</i><a class="sprite sprite-sina" target="_blank" href="'+_this.sinaurl+'"></a><a class="sprite sprite-weixin"></a><a class="sprite sprite-yixin"></a></div> <div class="qrcode-wrap sprite sprite-qrwrap qrwrap3"> <p>分享到微信</p> <blockquote>请用微信<strong>“扫一扫”</strong>二维码，即可分享</blockquote> <div class="img-qrcode wx-qrcode"></div> </div> <div class="qrcode-wrap sprite sprite-qrwrap qrwrap4"> <p>分享到易信</p> <blockquote>请用易信<strong>“扫一扫”</strong>二维码，即可分享</blockquote> <div class="img-qrcode yx-qrcode"></div> </div> </div> </div>')
                    }
                    $('#index-list-wrap').append(arr.join(''));
                    $(".art-"+list.id).find('.wx-qrcode').qrcode({
                        size:128,
                        text:"report/"+list.id+".html"
                    })
                    $(".art-"+list.id).find('.yx-qrcode').qrcode({
                        size:128,
                        text:"report/"+list.id+".html"
                    })
                })
        },
        /**
         * 滚动判断
         * @param scrollY
         * @param fixY
         */
        fixNav:function(scrollY,fixY){
            var mTop,fmTop;
            if(fixY ==521){
                mTop = '186px';
                fmTop='100px';
            }else{

                mTop = '25%';
                fmTop='15%';
            }
            if(scrollY>=fixY){
                $('.index #index-title').css({'position':'fixed','top':0,'left':0})
                    .find('.sprite-nav,.sprite-search').fadeIn(200)
                $('article, aside').css('margin-top',mTop)
            }else{
                $('.index #index-title')
                    .css({'position':'relative'})
                    .find('.sprite-nav,.sprite-search').fadeOut(200)
                $('article, aside').css('margin-top',fmTop)
            }
        },
        /**
         * 导航显示
         */
        navShow:function(){
            $('.nav-open').on('click',function(){
                $('#more-wrap').fadeIn(200)
            })
            $('.search-open').on('click',function(){
                $('#more-wrap').hide();
                $('#search-wrap').fadeIn(200)
            })
            $('.nav-close').on('click',function(){
                $(this).closest('.more-wrap').fadeOut(200)
            })
        },
        /**
         * 微信显示
         */
        wxShow:function(){
            $('#mask,#more-wrap .more-bg,#qrwrap3,#qrwrap4,.pop-close-btn,.pop-close').bind('click',function(){
                $('#mask,.qrcode-wrap').fadeOut(200);
                $('#index-wx,#index-yixin').css('z-index','50')
                $('.pop').fadeOut(200);
                $('#more-wrap').removeClass('mask-more-bg')
            });
            $('#index-wx').click(function(){
                $(this).css('z-index','101')
                setTimeout(function(){$('#mask,#qrwrap').stop().fadeIn(100);},420)
            })
            $('#index-yixin').click(function(){
                $(this).css('z-index','101')
                setTimeout(function(){$('#mask,#qrwrap2').stop().fadeIn(100);},420)
            })
            $('#index-list-wrap').on('click','.sprite-weixin',function(){
                $(this).closest('.art-bottom').find('.qrwrap3').stop().fadeIn(100)
                $('#mask').stop().fadeIn(100)
            })
            $('#index-list-wrap').on('click','.sprite-yixin',function(){
                $(this).closest('.art-bottom').find('.qrwrap4').stop().fadeIn(100)
                $('#mask').stop().fadeIn(100)
            })
            $('#more-wx').click(function(){
                $('#qrwrap3').stop().fadeIn(100);
                $('#more-wrap').addClass('mask-more-bg')
            })
            $('#more-yx').click(function(){
                $('#qrwrap4').stop().fadeIn(100);
                $('#more-wrap').addClass('mask-more-bg')
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
            this.sinaurl = '//v.t.sina.com.cn/share/share.php?title='+intro+'&url='+url+'&pic='+pic;
            $('.sprite-index-sina,.sprite-sina,.sina-btn,.more-share-sina').attr('href','//v.t.sina.com.cn/share/share.php?title='+intro+'&url='+url+'&pic='+pic);
            //$('.sprite-index-yx,.sprite-yixin').attr('href','//open.yixin.im/share?title='+title+'&url='+url+'&pic='+pic+'&desc='+intro)
        },
        init:function(){
            this.wxShow();
            this.shareInfo();
            //this.scrollShow();
            this.navShow();
            $('.share-pop').bind('click',function(){
                showPop('share-pop')
            })


        }
    }

    bgFun.init()

})
/**
 * s弹层
 * @param id
 */
function showPop(id){
    $('#'+id).stop().fadeIn(200);
    $('#mask').stop().fadeIn(200);
}