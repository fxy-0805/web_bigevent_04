$(function () {
    var form = layui.form
    var layer = layui.layer
    // 密码校验规则
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新旧不重复
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        // 两次新密码需相同
        rePwd: function (value) {
            if (value == $('[name=newPwd]').val()) {
                return '两次新密码不一致！'
            }
        },
    })
    // 重置密码
    // 监听表单提交事件
    $('.layui-form').on('submit',function (e) { 
        // 阻止默认提交行为
        e.preventDefault()
        // 发起请求
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function (res) { 
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
             }
        })
     })
})