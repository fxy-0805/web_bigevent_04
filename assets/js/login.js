$(function () {
    var form = layui.form
    var layer = layui.layer
    // 去验证
    $('#link_reg').on('click', function () {
        $('.login-box').hide().siblings('.reg-box').show()
    })
    // 去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide().siblings('.login-box').show()
    })
    // 自定义验证规则
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6到16位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            // 得到注册页面，密码框的值
            var pwd = $('.reg-box input[name=password]').val()
            // 与确认密码框比较
            if (value !== pwd) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 注册功能
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                // 返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提交成功后处理代码
                layer.msg('注册成功，请登录！')
                // 手动调用登录表单
                $('#link_login').click()
                // 重置form表单
                $('#form_reg')[0].reset()
            }
        })
    })
    //  登录功能（给form标签绑定事件，button按钮触发提交事件）
    $('#form_login').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $('.login-box [name=username]').val(),
                password: $('.login-box [name=password]').val()
            },
            success: function (res) {
                // 校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                // 成功后处理代码
                layer.msg('恭喜您，登录成功！')
                // 保存token,未来接口要使用
                // 将res内的token 保存到token里
                localStorage.setItem('token', res.token)
                // 跳转页面
                location.href = '/index.html'
            }
        })
    })
})