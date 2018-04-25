<template>
    <div class="socket">
        <div class="attention">
            <p>注意事项：</p>
            <ul>
                <li>1、使用本功能先启动socket服务(项目根目录执行node socket.js);</li>
                <li>2、项目端口号，项目连接socket端口号，socket服务端口号目前静态，可更改;</li>
                <li>3、第一次使用或者清除换成之后必须先输入用户昵称才可进行对话；</li>
                <li>4、刷新页面或者切换页面</li>
            </ul>
        </div>
        <div v-if="showInput">
            <el-input v-model.trim="nickName" size="small" placeholder="请输入昵称" @keyup.enter.native="saveName"></el-input>
        </div>
        <div class="group" v-else>
            <div class="group-content">
                <div v-for="(item, idx) in list" :key="idx">
                    <div v-if="item.sys" class="sys">
                        <div class="news">{{item.msg}}</div>
                    </div>
                    <div v-else :class="{mine: item.nickName === nickName}">
                        <div class="name-title">
                            <span class="avatar"></span>
                            <span class="name">{{item.nickName}}</span>
                            <span class="time">{{tool.format(item.createTime, true)}}</span>
                        </div>
                        <div class="msg">{{item.msg}}</div>
                    </div>
                </div>
            </div>
            <div class="send">
                <el-input v-model.trim="msg" size="small" placeholder="一起来聊天把~" @keyup.enter.native="sendPMsg"></el-input>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [], // 所有消息数组
                showInput: true, // 是否显示输入昵称
                primaryKey: "", // 当前人的主键，目前使用随机数生成
                nickName: "", // 昵称
                msg: "" // 当前输入框的值
            }
        },
        sockets: {
            connect() {
                this.joinPublic();
            },
            receivePMsg(val) {
                // var $main = document.getElementById("el-main");
                // $main.scrollTo(0, $main.scrollHeight);
                this.list = val;
            }
        },
        mounted() {
            this.nickName = this.tool.getCookie("nickName");
            this.primaryKey = this.tool.getCookie("primaryKey");
            this.showInput = this.nickName && this.primaryKey ? false : true;
            this.$socket.emit('connect', {});
        },
        methods: {
            joinPublic() {
                var $that = this;
                if($that.nickName && $that.primaryKey)
                    $that.$socket.emit('public', {
                        nickName: $that.nickName,
                        primaryKey: $that.primaryKey,
                        createTime: new Date().getTime(),
                        sys: true // 是否是系统消息
                    });
            },
            // 保存昵称
            saveName() {
                if(!this.nickName)
                    return false;
                this.tool.setCookie("nickName", this.nickName);
                this.tool.setCookie("primaryKey", Math.random().toString(36).substr(2));
                this.showInput = false;
                this.joinPublic();
            },
            sendPMsg() {
                var $that = this;
                if(!$that.msg)
                    return false;
                $that.$socket.emit('sendPMsg', {
                    nickName: $that.nickName,
                    primaryKey: $that.primaryKey,
                    createTime: new Date().getTime(),
                    msg: $that.msg
                });
                $that.msg = ""; // 清空文本框
            }
        }
    }
</script>
<style scoped>
    .group {
        background-color: #e5e5e5;
    }
    .group-content {
        padding: 15px;
    }
    .sys {
        text-align: center;
        margin-top: 5px;
    }
    .news {
        font-size: 12px;
        background-color: #888;
        color: #fff;
        line-height: 22px;
        display: inline-block;
        padding: 0px 15px;
        border-radius: 22px;
    }
    .name-title {
        display: flex;
    }
    .name-title>* {
        line-height: 30px;
        display: inline-block;
    }
    .mine {
        text-align: right;
    }
    .mine .name-title {
        flex-direction: row-reverse;
    }
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #ccc;
        vertical-align: middle;
    }
    .name {
        color: green;
        margin: 0px 10px;
        cursor: pointer;
    }
    .time {
        color: #999;
    }
    .msg {
        margin: 10px 50px;
        background-color: #fff;
        border-radius: 8px;
        line-height: 28px;
        padding: 0 10px;
        display: inline-block;
    }
</style>
