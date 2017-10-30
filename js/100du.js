/**
 * Created by Administrator on 2017/5/16.
 */
$(function(){//预处理函数
    //切换搜索框
    var aLi=$("#menu li");//获取到每一项
    var oText=$("#search").find(".form .text");//获取到input文本框
    var arrText=[//数据文本来源 可以放在数组里 也可以放在json对象里
        "例如:荷塘烧鱼或者印花日本料理",
        "例如:万达影院双人情侣套餐",
        "例如:北京雾霾",
        "例如:上海天气逐渐变热",
        "例如:心理难受"
    ];
    var iNow=0;//当前默认为0
    oText.val(arrText[iNow]);//默认文本框显示为第0条数据
    aLi.each(function(index){//讲所有li遍历一遍 传个下标作为形参
        $(this).click(function(){//点击当前li时触发
            aLi.attr("class","gradient");//所有的li背景都变灰
            $(this).attr("class","active");
            iNow=index;
            oText.val(arrText[iNow]);
        });
    });
    //输入框获得光标
    oText.focus(function(){
        $(this).val("");
    });
    //输入框失去光标
    oText.blur(function(){
        $(this).val(arrText[iNow]);
    });

    //update弹性滑动
    var oDiv=$(".update");//获取到div框
    var oUl=oDiv.find("ul");//获取到ul
    var iH=0;//高度默认为0
    var timer=null;//定时器名字初始化
    var oButUp=$("#updateUpBut");
    var oButDown=$("#updateDownBut");
    var arrData=[//文字来源
        {"name":"萱萱","time":4,"title":"那些灿烂华美的瞬间","url":"http:www.baidu.com"},
        {"name":"红红","time":5,"title":"广东3天抓获涉黄疑犯…","url":"http:www.baidu.com"},
        {"name":"艳艳","time":6,"title":"我们要移民到非洲了…","url":"http:www.baidu.com"},
        {"name":"晶晶","time":7,"title":"北京怎么每天都雾霾...","url":"http:www.baidu.com"},
        {"name":"畅畅","time":8,"title":"云南是个风景秀丽的...","url":"http:www.baidu.com"},
        {"name":"猜猜","time":9,"title":"那些年一点都不好看","url":"http:www.baidu.com"},
        {"name":"翠翠","time":10,"title":"那些年我们一起写过的代码","url":"http:www.baidu.com"}
    ];
    console.log(arrData.length);
    var iNow1=0;
    var str="";//内容初始化
    for(var i=0;i<arrData.length;i++){
        str+="<li><a href='"+arrData[i].url+"'><strong>"+arrData[i].name+"</strong><span>&nbsp;"+arrData[i].time+"分钟前写了一篇文章&nbsp;</span>"+arrData[i].title+"</a></li>";
    }
    oUl.html(str);
    iH=oUl.find("li").height();//获取到内容的宽度 赋值给iH
    function doMove(num){//自定义一个函数,让他移动
        iNow1+=num;
        //当前条数的绝对值大于给定数据长度就把当前条当做第0条
        if(Math.abs(iNow1)>arrData.length-1){//向上翻到最后一条
            iNow1=0;//把当前显示条数归0
        }
        if(iNow1>0){//向下翻到最后一条
            iNow1=-(arrData.length-1)
        }
        oUl.stop().animate({"top":iH*iNow1},2000,"elasticBoth")
    }
    doMove(-1);
    function autoplay(){//设置自定义一个自动播放函数,调用一个定时器
        timer=setInterval(function(){
            doMove(-1)//每隔2秒向上滚一次
        },2000)
    }
    autoplay();//调用自动播放函数
    oButUp.click(function(){//向上点击时
        doMove(-1)
    });
    oButDown.click(function(){//向下点击时
        doMove(1);
    });
    //hover 类似于鼠标移入移出两个事件的结合，第一个参数是移入，第二个参数是移出，参数都是函数
    oDiv.hover(function(){
        clearInterval(timer);//移入鼠标清除定时器，使其不动
    },function(){
        autoplay();//移出鼠标时调用自动播放函数
    });
//封装选项卡函数
//oNav表示选项按钮
//aCon表示各个选项按钮
//代表的是事件
    funTab($(".tabNav1"),$(".tabCon1"),"click");
    funTab($(".tabNav2"),$(".tabCon2"),"mouseover");
    funTab($(".tabNav3"),$(".tabCon3"),"mouseover");
    funTab($(".tabNav4"),$(".tabCon4"),"click");
    function funTab(oNav,aCon,sEvent){
        var aElem=oNav.children();
        aCon.hide().eq(0).show();
        aElem.each(function(index){
            $(this).on(sEvent,function(){
                aElem.removeClass("active").addClass("gradient");
                $(this).removeClass("gradient").addClass("active");
                aElem.find('a').attr('class','triangle_down_gray');
                $(this).find('a').attr('class','triangle_down_red');
                aCon.hide().eq(index).show();
            })
        });
    }
//高亮显示
    $(".bbs ol li").mouseover(function(){
        $(".bbs ol li").removeClass("active").eq($(this).index()).addClass("active");
        /*$(".bbs ol li").removeClass("active");
         $(this).addClass("active");*/
    });

//Hot遮罩提示
    var arr=[//数据来源
        "",
        "用户1:<br>人气:995",
        "用户2:<br>人气:996",
        "用户3:<br>人气:997",
        "用户4:<br>人气:998",
        "用户5:<br>人气:999",
        "用户6:<br>人气:1000",
        "用户7:<br>人气:999",
        "用户8:<br>人气:998",
        "用户9:<br>人气:997",
        "用户10:<br>人气:996"
    ];
    $(".hot_area ul li").mouseover(function(){
        if($(this).index()==0){//如果if之后只执行一句可以不加{}写在一行
            return false;
        }
        $(".hot_area li p").remove();//初始化，移除li里面所有的p标签
        var indNow=$(this).index();
        var W=$(this).width()-12;//当前的宽减去12
        $(this).append("<p style='width:"+W+"px'>"+arr[indNow]+"</p>");
    });

//自动播放焦点图
    var oDiv=$("#fade");
    var aUlli=oDiv.find("ul li");//左侧大图的li列表
    var aOlli=oDiv.find("ol li");//右侧小图的li列表
    var oP=oDiv.find("p");//装提示文字的p标签
    var Data=[
        "爸爸去哪了",
        "人像摄影",
        "美丽女人"
    ];
    var pageNow=0;//当前页默认为0
    var timer2=null;//定时器初始化
    function fnFade(){//自定义一个函数
        aUlli.each(function(i){
            if(i!==pageNow){//如果不等于当前页
                aUlli.eq(i).fadeOut().css({"zIndex":"1"});
                aOlli.eq(i).removeClass("active");
                oP.text(Data[pageNow]);//p标签里的文本等于当前页的小标
            }else{
                aUlli.eq(i).fadeIn().css({"zIndex":"2"});
                aOlli.eq(i).addClass("active");
            }
        });
    }
    function autoplays(){
        timer2=setInterval(function(){
            pageNow++;
            pageNow=pageNow%Data.length;//取余的目的限制当前页的范围
            /*if(pageNow==3){
             pageNow=0;
             }*/
            fnFade();
        },2000)
    }
    autoplays();
//鼠标触摸
    oDiv.hover(function(){
        clearInterval(timer2);
    },function(){
        autoplays();
    });
//鼠标切换
    aOlli.click(function(){
        pageNow=$(this).index();
        fnFade();
    });
//日历的提示说明
    var aSpan=$(".calendar h3 span");//获取到星期列表
    var aImg=$(".calendar .img");//获取到日历中的图片
    var oPromot=$(".today_info");//获取到提示块
    var tImg=oPromot.find("img");//获取到提示块里的图片
    var tStrong=oPromot.find("strong");//获取到提示块里的星期提示
    var tP=oPromot.find("p");//获取到提示块里的文字介绍
    aImg.hover(function(){
        var iTop=$(this).parent().position().top-33;
        var iLeft=$(this).parent().position().left+55;
        var index=$(this).parent().index()%aSpan.size();
        oPromot.show().css({"top":iTop,"left":iLeft});
        tP.text($(this).attr("info"));//设置提示块的文本
        tImg.attr("src",$(this).attr("src"));//设置提示块的图片
        tStrong.text(aSpan.eq(index).text());//设置提示块里的星期文本
    },function(){
        oPromot.hide();
    });
});

