import Vue from 'vue'
import axios from 'axios'
import qs from "qs" // 表单序列化
import { Loading } from 'element-ui';
import { MessageBox } from 'element-ui';
import tool from './tool.js'
import router from './router'

axios.defaults.baseURL = 'http://192.168.1.233:8092'; // 后台连接地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    otherHost: {
        carloan: "http://192.168.1.231:9997" // 本地车贷云后台地址-目前只有上传图片那获取授权用到
    },
    isShowErrorDialog: false,// 是否正在显示错误弹窗(为了多个接口报错时只显示一个)
    goLogin(msg) {
        var $that = this;
        if(!$that.isShowErrorDialog) {
            $that.isShowErrorDialog = true;
            MessageBox(msg || "当前登录失效，立即前往登录", '提示', {
                confirmButtonText: '确定'
            }).then(() => {
                $that.isShowErrorDialog = false;
                router.push({ path: '/login'});
            }).catch(() => {
                $that.isShowErrorDialog = false;
                router.push({ path: '/login'});
            });
        };
    },
    request(cond) {
        var $that = this,
            type = cond.type || 'get',
            param = {
                params: cond.data || {}
            }, // get请求需要用params包装一下
            jwtToken = tool.getCookie('fcsm_token'),
            config = {
                headers: {
                    Authorization: jwtToken
                }
            };// 登录获取的token
        if(type == 'post'){
            param = cond.data || {};
            if(!cond.model) { // 加一个model参数 因为有些请求不需要序列化，比如上传文件
                param = qs.stringify(param); // 序列化参数
            };
        };
        // 更新host
        if(cond.host && $that.otherHost[cond.host])
            config.baseURL = $that.otherHost[cond.host]
        // 没有token并且不是登录接口，提示toekn失效
        if(!jwtToken && cond.url != "/login/doLogin") {
            $that.goLogin();
            return false;
        };
        var loadingInstance = Loading.service({}); // 打开loading
        axios[type](cond.url, param, config).then(res => function (res) {
            loadingInstance.close(); // 关闭loading
            var xhr = res.data || {};
            if(xhr.errCode && xhr.errCode == "LOGIN_EXPIRED") {// token登录失效
                $that.goLogin();
            } else {
                var $success = false,
                    $msg = "";
                if(cond.host) { //说明是车贷云接口(两个后台返回的数据结构不一样，所以要区别判断)
                    $msg = xhr.msg || '系统异常';
                    if(!xhr.code) // code==0请求成功
                        $success = true;
                } else {
                    $msg = xhr.info || '系统异常';
                    if(xhr.success) // success==true请求成功
                        $success = true;
                };                
                if($success) { // 请求成功
                    if(cond.callBack && typeof cond.callBack == 'function')
                        cond.callBack(xhr);
                } else { // 请求失败-统一提示
                    if(!$that.isShowErrorDialog) {
                        $that.isShowErrorDialog = true;
                        MessageBox($msg, '提示', {
                            confirmButtonText: '确定'
                        }).then(() => {
                            $that.isShowErrorDialog = false;
                        }).catch(() => {
                            $that.isShowErrorDialog = false;
                        });
                    };
                };
            };
        } (res), res => function (res) {
            loadingInstance.close();
            var xhr = res.data || {};
            if(cond.errorCallback && typeof cond.errorCallback == 'function'){
                cond.errorCallback(xhr)
            } else {
                var $msg = "";
                if(cond.host) // 说明是车待会接口(两个后台返回的数据结构不一样，所以要区别判断)
                    $msg = xhr.msg || '系统异常';
                else
                    $msg = xhr.info || '系统异常';
                if(!$that.isShowErrorDialog) {
                    $that.isShowErrorDialog = true;
                    MessageBox($msg, '提示', {
                        confirmButtonText: '确定'
                    }).then(() => {
                        $that.isShowErrorDialog = false;
                    }).catch(() => {
                        $that.isShowErrorDialog = false;
                    });
                };
            };
        } (res));
    }
}