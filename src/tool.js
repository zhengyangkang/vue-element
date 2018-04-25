// 公用的方法
export default {
    setCookie(cname, cvalue, exdays) {
        var d = new Date(),
            days = exdays || 15;// cookie有效期默认15天
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = cname + "=" + cvalue + ";path=/;expires=" + d.toGMTString();
    },// 设置cookie
    getCookie(cname) {
        var v = document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },// 获得单个cookie
    removeCookie(cname) {
        this.setCookie(cname, "", -1);
    },// 移除单个cookie
    clearCookie(cb) {
        var strCookie = document.cookie,
            arrCookie = strCookie.split("; ");// 这里分好后面必须带个空格
        for(var i = 0; i < arrCookie.length; i++){
            var arr = arrCookie[i].split("=");
            this.setCookie(arr[0], "", -1);
        };
        if(cb && typeof cb == "function")
            cb();
    },// 移除所有cookie
    regEvt(vm,item,valKey,textKey) {
        if(vm && item && valKey && textKey && vm.staticData && vm.staticData.regList) {
            var regName = item.reg;// 正则名称
            if(vm.staticData.regList[regName]) {
                var reg = vm.staticData.regList[regName];// 正则表达式
                if(!reg.test(item[valKey])) {
                    vm.$set(item , textKey , "格式错误");
                } else {
                    vm.$set(item , textKey , "");
                };
            };
        };
    },// 正则验证
    setText(arr,key) {
        key+="";// 数字变字符串
        if(typeof arr == 'object' && arr.length > 0 && key) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i].value == key)
                    return arr[i].label;
            };
        } else {
            return "";
        };
    },// 从数组对象中取到对应的label(配合staticData.js和element-UI的select使用)
    format(time, isFull) {
        var text = "";
        if(time) {
            var leftPad = function(s) {
                return s >= 10 ? s : "0" + s;
            };
            var cDate = new Date(time),
                $year = cDate.getFullYear(),
                $month = leftPad(cDate.getMonth() + 1),
                $date = leftPad(cDate.getDate()),
                $hours = leftPad(cDate.getHours()),
                $minutes = leftPad(cDate.getMinutes()),
                $seconds = leftPad(cDate.getSeconds());
            text = $year + "-" + $month + "-" + $date;
            if(isFull)
                text += " " + $hours + ":" + $minutes + ":" + $seconds;
        };
        return text;
    }, // 格式化日期
    clearParam(obj) {
        var $obj = {};
        function loop(param, newObj) {
            for(var key in param) {
                if(param[key] || (typeof param[key] == "number" && param[key] == 0)){
                    if(typeof param[key] == "object" && typeof param[key].length != 'number'){ // 证明是个对象
                        newObj[key] = {};
                        loop(param[key], newObj[key]);
                    } else {
                        newObj[key] = param[key];
                    };
                };
            };
        };
        loop(obj, $obj);
        return $obj;
    }, // 清空请求参数中空的属性
    extend(arr) {
        var $obj = {};
        if(arr.length > 0) {
            for(var i = 0; i < arr.length; i++) {
                if(typeof arr[i] == "object") {
                    for(var key in arr[i]) {
                        $obj[key] = arr[i][key];
                    };
                };
            };
        };
        return $obj;
    }, // 合并对象
    encrypt(obj) {
        var newObj = {};
        if(obj && typeof obj == "object"){
            for(var key in obj){
                if(key)
                    newObj[key] = window.btoa(window.encodeURIComponent(obj[key]));
            };
        };
        return newObj;
    },// 加密
    decrypt(vm) {
        var newObj = {};
        if(vm && vm.$route && vm.$route.query){
            for(var key in vm.$route.query){
                var val = vm.$route.query[key];
                if(key)
                    newObj[key] = window.decodeURIComponent(window.atob(val));
            };
        };
        return newObj;
    }// 解密
}