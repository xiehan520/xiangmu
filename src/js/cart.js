//注册登录
!function ($) {
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
                        location.href = "http://10.31.157.32/js-1907/xiangmu/dist/cart.html"
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
            location.href = "http://10.31.157.32/js-1907/xiangmu/dist/cart.html"
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

!function ($) {
    //获取cookie,进行商品列表的渲染。
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        let csid = getcookie('cookiesid').split(','); //数组
        let cnum = getcookie('cookienum').split(',');
        $.each(csid, function (index, value) {
            showgoodslist(csid[index], cnum[index]);
        })
    }
    //全选
    $('.allsel').on('click', function () {
        $('.tbody tr:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calc();
    });
    //思路：选中的input的数量和余下input长度一致，全选。
    $('.tbody').on('click', 'input:checkbox', function () {
        if ($('.tbody tr:visible').find('input:checked').length == $('.tbody tr:visible').find('input:checkbox').length) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        if ($('.tbody tr:visible').find('input:checked').length > 0) {
            $('.tocal').css({ background: '#df3c3a' })
        } else {
            $('.tocal').css({ background: '#9e9e9e' })
        }
        calc();
    });
    //商品数量减
    $('.tbody').find('.down').on('click', function () {
        let $num = $(this).next().val()
        $num--
        if ($num <= 1) {
            $num = 1
        }
        $(this).next().val($num)
        $(this).parents('tr').find('strong').html(($(this).parents('.tbody').find('b').html() * $num).toFixed(2));
        calc();
        setcookie($(this));
    })
    //商品数量加
    $('.tbody').find('.up').on('click', function () {
        let $num = $(this).prev().val()
        $num++
        $(this).prev().val($num)
        $(this).parents('tr').find('strong').html(($(this).parents('.tbody').find('b').html() * $num).toFixed(2));
        calc();
        setcookie($(this));
    })
    //商品数量改变
    $('.num').on('input', function() {
	    let $reg = /^\d+$/g; //只能输入数字
	    let $value = parseInt($(this).val());
	    if ($reg.test($value)) {//是数字
	        if ($value >= 99) {//限定范围
	            $(this).val(99);
	        } else if ($value <= 0) {
	            $(this).val(1);
	        } else {
	            $(this).val($value);
	        }
	    } else {//不是数字
	        $(this).val(1);
	    }
	    $(this).parents('tr').find('strong').html(($(this).parents('.tbody').find('b').html() * $(this).val()).toFixed(2));//改变后的价格
	    calc();
	    setcookie($(this));
    });
    //删除单个商品
    $('.tbody').on('click', '.del', function() {
		cookieToArray();//得到数组,上面的删除cookie需要。
	    if(confirm('你确定要删除吗？')){
	     	$(this).parents('tr').remove();//通过当前点击的元素找到整个一行列表，删除
	    }
	    delgoods($(this).parents('tr').find('img').attr('sid'), sidarr);
        calc();
        empty()
    });
    //删除选定商品
	$('.delsle').on('click', function() {
		cookieToArray();//得到数组,上面的删除cookie需要。
		if(confirm('你确定要删除吗？')){
		    $('.tbody tr:visible').each(function() {
		        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
		            $(this).remove();
		            delgoods($(this).find('img').attr('sid'), sidarr);
		        }
		    });
            calc();
            empty();
		}
	});
    var sidarr = []; //存放商品的编号数组
    var numarr = []; //存放商品的数量数组
    //将cookie取出转换成数组，利用数组进行判断是否是第一次。
    function cookieToArray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            sidarr = getcookie('cookiesid').split(',') //cookie存放商品编号的key值
            numarr = getcookie('cookienum').split(',') //cookie存放商品数量的key值
        }
    }
    //设置cookie
    function setcookie(obj) { //obj:当前操作的对象
        cookieToArray();//得到数组
        var $index = obj.parents('.tbody').find('img').attr('sid');//通过sid找数量的位置
        console.log($index)
        numarr[$.inArray($index, sidarr)] = obj.parents('.tbody').find('.num').val();
        addcookie('cookienum', numarr.toString(), 10);
        console.log(obj.parents('.tbody').find('.num').val())
    }
    //删除商品列表函数
    function delgoods(sid, sidarr) {//sid：当前删除的sid，sidarr:cookie的sid的值
	    let $index = -1;
	    $.each(sidarr,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
	    	if(sid==value){
	    		$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
	    	}
	    });
	    sidarr.splice($index, 1);//删除数组对应的值
	    numarr.splice($index, 1);//删除数组对应的值
	    addcookie('cookiesid', sidarr.toString(), 10);//添加cookie
	    addcookie('cookienum', numarr.toString(), 10);//添加cookie
    }
    //cookie操作方法
    
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
    
    //封装函数，实现商品列表的渲染。
    function showgoodslist(sid, num) { //sid:商品的编号   num：商品的数量。
        $.ajax({
            url: 'http://10.31.157.32/js-1907/xiangmu/php/hotlist1.php',
            dataType: 'json'
        }).done(function (data) {
            let $strhtml = '';
            $.each(data, function (index, value) {
                if (value.sid == sid) {
                    //对隐藏的元素进行克隆。
                    let $clonebox = $('.tbody tr:hidden').clone(true, true);
                    $clonebox.find('img').attr('src', value.bpicurl);
                    $clonebox.find('img').attr('sid', value.sid);
                    $clonebox.find('.title').html(value.title);
                    $clonebox.find('b').html(value.price)
                    $clonebox.find('.num').val(num);
                    //计算总和：
                    let zmoney = (value.price * num).toFixed(2);
                    $clonebox.find('strong').html(zmoney);
                    $clonebox.show()
                    $('.tbody').prepend($clonebox);
                }
            });
            calc()
        })
    }
    //如果购物车不为空,隐藏empty
    empty();
    function empty() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            $('.empty').hide();
            $('.cartlist').show();
            $('.cartfooter').show();
        } else {
            $('.empty').show();
            $('.cartlist').hide();
            $('.cartfooter').hide();
            addcookie('cookiesid','',-1);
            addcookie('cookienum','',-1)
        }
    }
    //总价和总的数量
    function calc() {
        let allprice = 0;//总价
        let allnum = 0;//总的数量。
        $('.tbody tr:visible').each(function (index, element) {//遍历复选框是否选中
            if ($(element).find('input:checkbox').is(':checked')) {
                allprice += parseInt($(element).find('strong').html());
                allnum += parseInt($(element).find('.num').val());
            }
        });
        $('.count strong').html('￥' + allprice);
        $('.allnum').html(allnum);
    }
}(jQuery);