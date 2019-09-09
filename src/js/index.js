!function ($) {
    //窗口高度改变时出现顶部导航栏
    $(window).on('scroll', function () {
        var $st = $(this).scrollTop()
        if ($st >= 165) {
            $('aside').stop(true).animate({
                top: 0,
                opacity: 1
            })
        } else {
            $('aside').stop(true).animate({
                top: -59,
                opacity: 0
            })
        }
        //窗口高度改变时出现返回顶部按钮
        if ($st >= 600) {
            $('.totop').stop(true).animate({
                opacity: 1
            }).show()
        } else {
            $('.totop').stop(true).animate({
                opacity: 0
            }, function () {
                $(this).hide()
            })
        }
    })
    //点击返回顶部按钮事件
    $('.totop').hover(function () {
        $(this).css({ 'background': 'rgba(0, 0, 0, 0.5)' })
    }, function () {
        $(this).css({ 'background': 'rgba(0, 0, 0, 0.3)' })
    }).on('click', function () {
        $('html,body').stop(true).animate({
            scrollTop: 0
        })
    })
    //轮播图
    $('.banner ol li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.bpic li').eq($(this).index()).show().siblings().hide()
    })
    var $time = null;
    var $num = 0;
    $('.btn-next').on('click', function () {//点击向右切换图片
        $num++
        $('.banner ol li').eq($num).addClass('active').siblings().removeClass('active')
        $('.bpic li').eq($num).show().siblings().hide()
        if ($num >= $('.banner ol li').length - 1) {
            $num = -1
        }
    })
    $('.btn-prve').on('click', function () {//点击向左切换图片
        $num--
        $('.banner ol li').eq($num).addClass('active').siblings().removeClass('active')
        $('.bpic li').eq($num).show().siblings().hide()
        if ($num < 0) {
            $num = $('.banner ol li').length - 1
        }
    })//右点击加定时器
    $time = setInterval(function () {
        $('.btn-next').click()
    }, 2000)
    $('.banner').hover(function () {//鼠标悬浮时清除定时器
        clearInterval($time)
    }, function () {
        $time = setInterval(function () {
            $('.btn-next').click()
        }, 2000)
    })

    //注册登录
    var $flag1 = false;
    var $flag2 = false;
    var $flag3 = false;
    //登录框事件
    $('#signin').on('click', function () {//点击登录按钮弹出登录框
        $('.login-register').show().find('.login').show().next().hide()
        $('input').not(':submit').val('').prevAll('input').focus()
    })
    $('.close').on('click', function () {//点击关闭按钮关闭弹窗
        $('.login-register').hide()
        $('input').not(':submit').val('')
    })
    $('.toreg').on('click', function () {//点击立即注册切换注册框
        $('.login').hide().next().show()
        $('input').not(':submit').val('').prevAll('input').focus()
    })
    $('.log:password').on('focus', function () {//密码框获得焦点
        $('.iconfont.b').css({ 'color': '#5bc2d8' })
        $('.wrong2').hide()
    }).on('blur', function () {//密码框失去焦点
        $('.iconfont.b').css({ 'color': '#e5e5e5' })
    }).prevAll(':text').on('focus', function () {//账号框获得焦点
        $('.wrong1').hide()
    }).on('blur', function () {//账号框失去焦点账号验证
        $.ajax({//传输账号框里的内容给后端
            url: "http://10.31.157.32/js-1907/xiangmu/php/register.php",
            data: {
                checkpe: $('.pe').val()
            },
            success: function (d) {
                if ($('.pe').val() !== '') {//表单验证
                    let telandemail = /^1[34578]\d{9}|(\w+[+-._]*\w+)\@(\w+[+-.]*\w+)\.(\w+[+-.]*\w+)$/;
                    if (telandemail.test($('.pe').val())) {
                        if (!d) {
                            $('.wrong1').text('账号未注册，').append("<a href='#' class='toreg'>立即注册</b>").show()
                            $flag1 = false
                        } else {
                            $('.wrong1').hide()
                            $flag1 = true
                        }
                    } else {
                        $('.wrong1').text('账户有误，请重新输入').show()
                        $flag1 = false
                    }
                } else {
                    $('.wrong1').text('请输入丰趣海淘帐号').show()
                    $flag1 = false
                }
            }
        })
    }).parent().on('submit', function () {//点击登录验证账号密码
        $.ajax({//传输账号密码信息给后端
            type: "post",
            url: "http://10.31.157.32/js-1907/xiangmu/php/login.php",
            data: {
                phone: $('.pe').val(),
                password: $('.log:password').val()
            },
            success: function (d) {
                if ($('.log:password').val() !== '') {
                    if (!d) {
                        $('.wrong2').text('登录密码错误，请重新输入').show()
                        $flag2 = false
                    } else {
                        $('.wrong2').hide()
                        alert('登录成功！')
                        localStorage.setItem('customname', $('.pe').val());
                        location.href="http://10.31.157.32/js-1907/xiangmu/dist/index.html"
                    }
                } else {
                    $('.wrong2').text('请输入密码').show()
                    $flag2 = false
                }
            }
        });
        if (!($flag1 && $flag2)) {//如果有一个表单为false则阻止登录
            return false
        }
    })
    //登录后顶部出现登录信息
    if (localStorage.getItem('customname')) {
        $('#signin,#register').hide()
        $('#hello').prepend(localStorage.getItem('customname')).show()
        $('#quit').show().on('click', function () {
            localStorage.removeItem('customname')
            $('#signin,#register').show()
            $('#hello,#quit').hide()
            location.href="http://10.31.157.32/js-1907/xiangmu/dist/index.html"
        })
    }
    //注册框事件
    $('#register').on('click', function () {//点击注册按钮弹出注册框
        $('.login-register').show().find('.login').hide().next().show()
        $('input').not(':submit').val('').prevAll('.phone').focus()
    })
    $('.tologin').on('click', function () {//点击立即登录切换登录框
        $('.login').show().next().hide()
        $('input').not(':submit').val('').prevAll('input').focus()
    })
    $('.reg:password').on('focus', function () {//密码框获得焦点
        $('.iconfont.b').css({ 'color': '#5bc2d8' })
        $('.tip3').hide()
    }).on('blur', function () {//密码框失去焦点进行表单验证
        $('.iconfont.b').css({ 'color': '#e5e5e5' })
        if ($(this).val() !== '') {
            let pass = /^(\w|[\w+-.,%=~!@#&'\<\>\?\(\)\*\/\$\^]){6,18}$/;
            if (pass.test($(this).val())) {
                $('.tip3').hide()
                $flag3 = true
            } else {
                $('.tip3').text('密码请设置6-18位字母、数字或标点符号').show()
                $flag3 = false
            }
        } else {
            $('.tip3').text('请设置登录密码').show()
            $flag3 = false
        }
    }).prevAll('.email:text').on('focus', function () {//邮箱框获得焦点
        $('.tip2').remove('.tologin').hide()
    }).on('blur', function () {//邮箱框失去焦点验证
        $.ajax({//传输邮箱信息给后端
            url: "http://10.31.157.32/js-1907/xiangmu/php/register.php",
            data: {
                checkemail: $('.email').val()
            },
            success: function (d) {
                if ($('.email').val() !== '') {//邮箱表单验证
                    let email = /^(\w+[+-._]*\w+)\@(\w+[+-.]*\w+)\.(\w+[+-.]*\w+)$/;
                    if (email.test($('.email').val())) {
                        if (!d) {
                            $('.tip2').hide()
                            $flag2 = true
                        } else {
                            $('.tip2').text('邮箱已存在，').append("<a href='#' class='tologin'>立即登录</b>").show()
                            $flag2 = false
                        }
                    } else {
                        $('.tip2').text('您的邮箱格式有误').show()
                        $flag2 = false
                    }
                } else {
                    $('.tip2').text('请输入您的邮箱').show()
                    $flag2 = false
                }
            }
        });
    }).prevAll('.phone:text').on('focus', function () {//注册框手机获得焦点
        $('.tip1').remove('.tologin').hide()
    }).on('blur', function () {//注册框手机失去焦点验证
        $.ajax({//传输手机信息给后端
            type: "get",
            url: "http://10.31.157.32/js-1907/xiangmu/php/register.php",
            data: {
                checkphone: $('.phone').val()
            },
            success: function (d) {
                if ($('.phone').val() !== '') {//手机进行表单验证
                    let tel = /^1[34578]\d{9}$/;
                    if (tel.test($('.phone').val())) {
                        if (!d) {
                            $('.tip1').hide()
                            $flag1 = true
                        } else {
                            $('.tip1').text('手机号已存在，').append("<a href='#' class='tologin'>立即登录</b>").show()
                            $flag1 = false
                        }
                    } else {
                        $('.tip1').text('您的手机号码格式有误').show()
                        $flag1 = false
                    }
                } else {
                    $('.tip1').text('请输入您的手机号码').show()
                    $flag1 = false
                }
            }
        })
    }).parent().on('submit', function () {//提交注册信息给数据库
        if (!($flag1 && $flag2 && $flag3)) {
            return false
        }
    })
}(jQuery);


//商品数据渲染
!function ($) {
    $.ajax({
        type: "get",
        url: "http://10.31.157.32/js-1907/xiangmu/php/hotlist1.php",
        data: "data",
        dataType: "json",
        success: function (d) {
            let strhtml = `<li><a href="#"><img
            src="https://img0.fengqucdn.com/cmsres/20190826/857bfcb0-44e8-43ea-8e84-8beff5494813.jpeg"
            alt=""></a></li>`;
            $.each(d, function (index, value) {
                strhtml += `
                <li>
                <div class="pic">
                    <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid=${value.sid}" target='blank'><img
                            src="${value.bpicurl}"
                            alt="${value.title}"></a>
                </div>
                <h3 class="tip">
                    <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid=${value.sid}" target='blank'>${value.title}</a>
                </h3>
                <p class="price">
                    <img src="${value.spicurl}" alt="">
                    <span>￥</span>
                    <b>${value.price}</b>
                    <del>￥<span>${value.delprice}</span></del>
                </p>
            </li>
                `
            });
            $('.hotlist-1 .main-left ul').html(strhtml)
        }
    });
    $.ajax({
        type: "get",
        url: "http://10.31.157.32/js-1907/xiangmu/php/hotsale1.php",
        data: "data",
        dataType: "json",
        success: function (d) {
            let strhtml = '';
            $.each(d, function (index, value) {
                strhtml += `
                <li>
                   <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid=${value.sid}" target='blank' class="pic">
                      <img src="${value.picurl}">
                   </a>
                   <a href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html?sid=${value.sid}" target='blank' class="tip">
                      <h3 class="title">${value.title}</h3>
                         <p>
                           <span>￥</span>
                           <b>${value.price}</b>
                           <del>￥<span>${value.delprice}</span></del>
                         </p>
                    </a>
                 </li>   
                `
            });
            $('.hotlist-1 .main-right ul').html(strhtml)
            $('.main-right ul>li').eq(0).find('.pic').append('<span class="num1"></span>');
            $('.main-right ul>li').eq(1).find('.pic').append('<span class="num2"></span>');
            $('.main-right ul>li').eq(2).find('.pic').append('<span class="num3"></span>');
        }
    });

}(jQuery)