// 1. 开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 1. 测试环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
// 1. 生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'


// 拦截所有ajax请求：get/post/ajax
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url
    console.log(params.url)
})