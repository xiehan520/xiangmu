"use strict";!function(n){n(window).on("scroll",function(){var t=n(this).scrollTop();165<=t?n("aside").stop(!0).animate({top:0,opacity:1}):n("aside").stop(!0).animate({top:-59,opacity:0}),600<=t?n(".totop").stop(!0).animate({opacity:1}).show():n(".totop").stop(!0).animate({opacity:0},function(){n(this).hide()})}),n(".totop").hover(function(){n(this).css({background:"rgba(0, 0, 0, 0.5)"})},function(){n(this).css({background:"rgba(0, 0, 0, 0.3)"})}).on("click",function(){n("html,body").stop(!0).animate({scrollTop:0})}),n(".banner ol li").on("click",function(){n(this).addClass("active").siblings().removeClass("active"),n(".bpic li").eq(n(this).index()).show().siblings().hide()});var t=null,i=0;n(".btn-next").on("click",function(){i++,n(".banner ol li").eq(i).addClass("active").siblings().removeClass("active"),n(".bpic li").eq(i).show().siblings().hide(),i>=n(".banner ol li").length-1&&(i=-1)}),n(".btn-prve").on("click",function(){i--,n(".banner ol li").eq(i).addClass("active").siblings().removeClass("active"),n(".bpic li").eq(i).show().siblings().hide(),i<0&&(i=n(".banner ol li").length-1)}),t=setInterval(function(){n(".btn-next").click()},2e3),n(".banner").hover(function(){clearInterval(t)},function(){t=setInterval(function(){n(".btn-next").click()},2e3)});var e=!1,s=!1,o=!1;n("#signin").on("click",function(){n(".login-register").show().find(".login").show().next().hide(),n("input").not(":submit").val("").prevAll("input").focus()}),n(".close").on("click",function(){n(".login-register").hide(),n("input").not(":submit").val("")}),n(".toreg").on("click",function(){n(".login").hide().next().show(),n("input").not(":submit").val("").prevAll("input").focus()}),n(".log:password").on("focus",function(){n(".iconfont.b").css({color:"#5bc2d8"}),n(".wrong2").hide()}).on("blur",function(){n(".iconfont.b").css({color:"#e5e5e5"})}).prevAll(":text").on("focus",function(){n(".wrong1").hide()}).on("blur",function(){n.ajax({url:"http://10.31.157.32/js-1907/xiangmu/php/register.php",data:{checkpe:n(".pe").val()},success:function(t){if(""!==n(".pe").val()){e=/^1[34578]\d{9}|(\w+[+-._]*\w+)\@(\w+[+-.]*\w+)\.(\w+[+-.]*\w+)$/.test(n(".pe").val())?t?(n(".wrong1").hide(),!0):(n(".wrong1").text("账号未注册，").append("<a href='#' class='toreg'>立即注册</b>").show(),!1):(n(".wrong1").text("账户有误，请重新输入").show(),!1)}else n(".wrong1").text("请输入丰趣海淘帐号").show(),e=!1}})}).parent().on("submit",function(){if(n.ajax({type:"post",url:"http://10.31.157.32/js-1907/xiangmu/php/login.php",data:{phone:n(".pe").val(),password:n(".log:password").val()},success:function(t){""!==n(".log:password").val()?t?(n(".wrong2").hide(),alert("登录成功！"),localStorage.setItem("customname",n(".pe").val()),location.href="http://10.31.157.32/js-1907/xiangmu/dist/index.html"):(n(".wrong2").text("登录密码错误，请重新输入").show(),s=!1):(n(".wrong2").text("请输入密码").show(),s=!1)}}),!e||!s)return!1}),localStorage.getItem("customname")&&(n("#signin,#register").hide(),n("#hello").prepend(localStorage.getItem("customname")).show(),n("#quit").show().on("click",function(){localStorage.removeItem("customname"),n("#signin,#register").show(),n("#hello,#quit").hide(),location.href="http://10.31.157.32/js-1907/xiangmu/dist/index.html"})),n("#register").on("click",function(){n(".login-register").show().find(".login").hide().next().show(),n("input").not(":submit").val("").prevAll(".phone").focus()}),n(".tologin").on("click",function(){n(".login").show().next().hide(),n("input").not(":submit").val("").prevAll("input").focus()}),n(".reg:password").on("focus",function(){n(".iconfont.b").css({color:"#5bc2d8"}),n(".tip3").hide()}).on("blur",function(){if(n(".iconfont.b").css({color:"#e5e5e5"}),""!==n(this).val()){o=/^(\w|[\w+-.,%=~!@#&'\<\>\?\(\)\*\/\$\^]){6,18}$/.test(n(this).val())?(n(".tip3").hide(),!0):(n(".tip3").text("密码请设置6-18位字母、数字或标点符号").show(),!1)}else n(".tip3").text("请设置登录密码").show(),o=!1}).prevAll(".email:text").on("focus",function(){n(".tip2").remove(".tologin").hide()}).on("blur",function(){n.ajax({url:"http://10.31.157.32/js-1907/xiangmu/php/register.php",data:{checkemail:n(".email").val()},success:function(t){if(""!==n(".email").val()){s=/^(\w+[+-._]*\w+)\@(\w+[+-.]*\w+)\.(\w+[+-.]*\w+)$/.test(n(".email").val())?t?(n(".tip2").text("邮箱已存在，").append("<a href='#' class='tologin'>立即登录</b>").show(),!1):(n(".tip2").hide(),!0):(n(".tip2").text("您的邮箱格式有误").show(),!1)}else n(".tip2").text("请输入您的邮箱").show(),s=!1}})}).prevAll(".phone:text").on("focus",function(){n(".tip1").remove(".tologin").hide()}).on("blur",function(){n.ajax({type:"get",url:"http://10.31.157.32/js-1907/xiangmu/php/register.php",data:{checkphone:n(".phone").val()},success:function(t){if(""!==n(".phone").val()){e=/^1[34578]\d{9}$/.test(n(".phone").val())?t?(n(".tip1").text("手机号已存在，").append("<a href='#' class='tologin'>立即登录</b>").show(),!1):(n(".tip1").hide(),!0):(n(".tip1").text("您的手机号码格式有误").show(),!1)}else n(".tip1").text("请输入您的手机号码").show(),e=!1}})}).parent().on("submit",function(){if(!(e&&s&&o))return!1})}(jQuery),function(n){n.ajax({type:"get",url:"http://10.31.157.32/js-1907/xiangmu/php/hotlist1.php",data:"data",dataType:"json",success:function(t){var i='<li><a href="#"><img\n            src="https://img0.fengqucdn.com/cmsres/20190826/857bfcb0-44e8-43ea-8e84-8beff5494813.jpeg"\n            alt=""></a></li>';n.each(t,function(t,n){i+='\n                <li>\n                <div class="pic">\n                    <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid='+n.sid+"\" target='blank'><img\n                            src=\""+n.bpicurl+'"\n                            alt="'+n.title+'"></a>\n                </div>\n                <h3 class="tip">\n                    <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid='+n.sid+"\" target='blank'>"+n.title+'</a>\n                </h3>\n                <p class="price">\n                    <img src="'+n.spicurl+'" alt="">\n                    <span>￥</span>\n                    <b>'+n.price+"</b>\n                    <del>￥<span>"+n.delprice+"</span></del>\n                </p>\n            </li>\n                "}),n(".hotlist-1 .main-left ul").html(i)}}),n.ajax({type:"get",url:"http://10.31.157.32/js-1907/xiangmu/php/hotsale1.php",data:"data",dataType:"json",success:function(t){var i="";n.each(t,function(t,n){i+='\n                <li>\n                   <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid='+n.sid+'" target=\'blank\' class="pic">\n                      <img src="'+n.picurl+'">\n                   </a>\n                   <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid='+n.sid+'" target=\'blank\' class="tip">\n                      <h3 class="title">'+n.title+"</h3>\n                         <p>\n                           <span>￥</span>\n                           <b>"+n.price+"</b>\n                           <del>￥<span>"+n.delprice+"</span></del>\n                         </p>\n                    </a>\n                 </li>   \n                "}),n(".hotlist-1 .main-right ul").html(i),n(".main-right ul>li").eq(0).find(".pic").append('<span class="num1"></span>'),n(".main-right ul>li").eq(1).find(".pic").append('<span class="num2"></span>'),n(".main-right ul>li").eq(2).find(".pic").append('<span class="num3"></span>')}})}(jQuery);