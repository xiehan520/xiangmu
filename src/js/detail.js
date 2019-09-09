//顶部悬浮和返回顶部
!function ($) {
    //窗口高度改变时出现顶部导航栏
    $(window).on('scroll', function () {
        var $st = $(this).scrollTop()
        if ($st >= 600) {
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
        if ($st >=600) {
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
                        location.href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html"
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
            location.href="http://10.31.157.32/js-1907/xiangmu/dist/detail.html"
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


//详情页获取数据

    var $sid = location.search.substring(1).split('=')[1];
    $.ajax({
        url: 'http://10.31.157.32/js-1907/xiangmu/php/detail.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function (dd) { //获取后端返回的数据。
        let $smallpic = dd.urls.split(',');
        $('.simg img').attr('src', dd.bpicurl);
        $('.bimg .bbimg').attr('sid', dd.sid); //添加自定义属性sid
        $('.bimg .bbimg').attr('src', $smallpic[0]); //添加自定义属性sid
        $('.goods-right .dic2 img').attr('src', dd.spicurl); //添加自定义属性sid
        $('.goods-right h2').text(dd.title);
        $('#src .tip').text(dd.title);
        $('title').text('【丰趣海淘】'+dd.title+'，丰趣海淘！');
        $('.brand').text(dd.brand);
        $('.goodsprice1').text(dd.price);
        $('.goodsprice2').text(dd.delprice);
        //拼接小图片
        let $htmlstr = ''
        $.each($smallpic, function (index, value) {
            $htmlstr += `
            <li><img src="${value}" alt="" ></li>
            `;
        });
        $('.simg ul').html($htmlstr);
    });
    // $.ajax({
    //     url: 'http://10.31.157.32/js-1907/xiangmu/php/detail2.php',
    //     data: {
    //         sid: $sid
    //     },
    //     dataType: 'json'
    // }).done(function (ee) { //获取后端返回的数据。
    //     let $smallpic = ee.urls.split(',');
    //     $('.simg img').attr('src', ee.bpicurl);
    //     $('.bimg .bbimg').attr('sid', ee.sid); //添加自定义属性sid
    //     $('.bimg .bbimg').attr('src', $smallpic[0]); //添加自定义属性sid
    //     $('.goods-right .dic2 img').attr('src', ee.spicurl); //添加自定义属性sid
    //     $('.goods-right h2').text(ee.title);
    //     $('title').text('【丰趣海淘】'+ee.title+'，丰趣海淘！');
    //     $('#src .tip').text(ee.title);
    //     $('.brand').text(ee.brand);
    //     $('.goodsprice1').text(ee.price);
    //     $('.goodsprice2').text(ee.delprice);
    //     //拼接小图片
    //     let $htmlstr = ''
    //     $.each($smallpic, function (index, value) {
    //         $htmlstr += `
    //         <li><img src="${value}" alt="" ></li>
    //         `;
    //     });
    //     $('.simg ul').html($htmlstr);
    // });
    
    //加入购物车
    let sidarr = []; //存放商品的编号数组
    let numarr = []; //存放商品的数量数组

    //2.1取cookie(假设是第二次点击，获取第一次的cookie),提前约定cookie的key值
    //cookie添加， 获取， 删除
    
         function addcookie(key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        }
         function getcookie(key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        }
         function delcookie(key) {
            addcookie(key, '', -1);
        }
        let allnum=0;
    
    //编号：[2,4,5] 数量：[12,34,68]
    //将cookie取出转换成数组，利用数组进行判断是否是第一次。
    function cookieToArray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            sidarr = getcookie('cookiesid').split(',') //cookie存放商品编号的key值
            numarr = getcookie('cookienum').split(',') //cookie存放商品数量的key值
            $.each(numarr, function (index, value) {
               allnum+=parseInt(value) 
                console.log(allnum)
            })
        }
    }
    $('.add').on('click', function () {
        //通过当前点击的按钮，获取当前商品的(图片)sid。
        let $sid = $('.bimg .img2').attr('sid');
        //是否第一次，获取cookie才能知道是否是第一次。第一次会存储cookie(编号和数量)
        cookieToArray(); //取出转换成数组
        if ($.inArray($sid, sidarr) !== -1) { //存在
            //通过sid获取对应的数量，取出数量+当前新添加的商品的数量。
            // console.log(numarr);
            // console.log(sidarr); //当前sid对应的数组的索引位置
            // console.log($.inArray($sid, sidarr)); //当前sid对应的数组的索引位置
            // console.log(numarr[$.inArray($sid, sidarr)]);
            let changenum = parseInt(numarr[$.inArray($sid, sidarr)]) + parseInt($('#count').val());//原来的数量+当前的数量。
            numarr[$.inArray($sid, sidarr)]=changenum;//数组值改变
            addcookie('cookienum', numarr.toString(), 10);//继续添加cookie 
        } else { //不存在
            sidarr.push($sid); //将编号push进数组
            addcookie('cookiesid', sidarr.toString(), 10); //存储cookie ，整个数组。
            numarr.push($('#count').val()); //将商品的数量push进数组
            addcookie('cookienum', numarr.toString(), 10);
        }
    });

//放大镜

    $('.simg ul').find('li').eq(0).addClass('red')
    $('.simg ul').on('click','li',function(){
        let $src=$(this).find('img').attr('src')
        $(this).addClass('red').siblings().removeClass('red')
        $('.bimg img').attr({src:$src})
    })
    $('.bimg').hover(function(){
        $('.img2').stop(true).animate({opacity:0}).hide().prev().show().stop(true).animate({opacity:1})
            let $bili=$('.bimg').width()/$('.img1').width()
            $('.bimg').on('mousemove',function(ev){
                $('.img1').css({top:-ev.offsetY*$bili,left:-ev.offsetX*$bili})
            })
    },function(){
        $('.img1').stop(true).animate({opacity:0}).hide().next().show().stop(true).animate({opacity:1})
    })

//页面点击效果

    
    $('.goods-right').find('ol li a').on('click',function(){
        $(this).addClass('red').append("<span></span>").siblings().removeClass('red').find('span').detach("span")
    })
    $('.goods-right').find('.more').on('click',function(){
        if($('.goods-yh2').css('display')=='block'){
            $('.goods-yh2').hide()
        }else{
            $('.goods-yh2').show()
        }
    })
    //商品数量加减
    $('.goods-right').find('.down').on('click',function(){
        let $num=$(this).next().val()
        if(!isNaN($num)){
            $num--
            if($num>=2){
                $(this).next().val($num)
            }else{
                $(this).next().val(1)
            }
        }else{
            $(this).next().val('NaN')
        }
    })
    $('.goods-right').find('.up').on('click',function(){
        let $num=$(this).prev().val()
        if(!isNaN($num)){
            $num++
            $(this).prev().val($num)
        }else{
            $(this).prev().val('NaN')
        }
    })
}(jQuery)
