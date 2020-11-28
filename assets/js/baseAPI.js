$(function () {
    // 1. 开发环境服务器地址
    var baseURL = 'http://ajax.frontend.itheima.net'
    // 1. 测试环境服务器地址
    // var baseURL = 'http://ajax.frontend.itheima.net'
    // 1. 生产环境服务器地址
    // var baseURL = 'http://ajax.frontend.itheima.net'


    // 拦截所有ajax请求：get/post/ajax
    $.ajaxPrefilter(function (params) {
        params.url = baseURL + params.url
        // console.log(params.url)
        // 统一为有权限的接口，设置headers请求头
        if (params.url.indexOf('/my/') !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 拦截所有响应，判断身份认证信息
        params.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清空token
                localStorage.removeItem('token')
                // 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    })
})