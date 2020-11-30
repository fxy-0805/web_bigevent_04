$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1 ~ 6位之间！'
            }
        }
    })
    // 初始化用户信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                // 使用form.val()方法为表单赋值
                form.val('formUserInfo', res.data)
            }

        })
    }

    // 表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    //  更新用户的信息
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发起ajax请求数据
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 调用父页面的方法，重新渲染用户头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})