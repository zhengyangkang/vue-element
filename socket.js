var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
var setting = {
    folder: "temporary",
    fileName: "chat.json",
    port: "8083"
};

// socket.io
io.on('connection', (socket) => {
    // 有新用户加入
    // socket.on('join', (val) => {
    //     val.msg = val.nickName + "加入群聊";
    //     readyAddInfo([setting.folder, val.primaryKey, setting.fileName], val);
    // });
    // 接收客户端发送的消息
    // socket.on('sendMsg', (val) => {
    //     // 判断临时聊天记录文件存不存在
    //     readyAddInfo([setting.folder, val.primaryKey, setting.fileName], val);
    // });
    // =======================私聊===============================
    // socket.on('online', (val) => {
    //     val.msg = val.nickName + "已连接";
    //     readyAddInfo([setting.folder, val.primaryKey, val.toId + ".json"], "", "private");
    // });
    // socket.on('privateChat', (val) => {
    //     // 判断临时聊天记录文件存不存在
    //     readyAddInfo([setting.folder, val.primaryKey, val.toId + ".json"], val, "private", socket);
    // });
    // =======================群组===============================
    // 加入群组聊天室
    socket.on('public', (val) => {
        socket.join('public');
        readyAddInfo([setting.folder, "public", setting.fileName], "", "public");
    });
    // 接收客户端发送的消息
    socket.on('sendPMsg', (val) => {
        // 判断临时聊天记录文件存不存在
        val.socketId = socket.id;
        readyAddInfo([setting.folder, "public", setting.fileName], val, "public");
    });
    // =======================用户断开连接=========================
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// 添加记录前的准备工作,判断文件及文件夹是否存在
function readyAddInfo(arrs, val, type) { // type:私聊、群组、公共
    var url = arrs.join(path.sep);
    if(!fs.existsSync(url))
        createFolder(url);
    addRecord(url, val, type);
};

// 创建文件夹
function createFolder(to) {
    var sep = path.sep;
    var folders = path.dirname(to).split(sep);
    var p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p))
            fs.mkdirSync(p);
    };
    fs.createWriteStream(to);
};

// 给临时聊天文件增加记录，并将内容返回给客户端
function addRecord(to, val, type) { // type:私聊,群组,公共
    fs.readFile(to, "utf-8", (err, data) => {
        if(err) {
            console.log(err);
        } else {
            $data = data ? JSON.parse(data) : [];
            // 回调函数
            function cb(res) {
                if(type) {
                    if(type == "public") {
                        io.sockets.in('public').emit('receivePMsg', res);
                    } else if(type == "private") {
                        // io.to(val.socketId).emit('receivePrivateMsg', res);
                    };
                } else {
                    // 给所有客户端广播消息(包括自己)
                    io.sockets.emit("receiveMsg", res);
                };
            };
            if(val) {
                $data.push(type && type == "private" ? val.data : val);
                fs.writeFile(to, JSON.stringify($data), (err) => {
                    if(err) {
                        console.log("写入文件失败");
                    } else {
                        cb($data);
                    };
                });
            } else {
                cb($data);
            };
        };
    });
};

// 监听端口
http.listen(setting.port);
console.log("socket服务已启动，地址：http://localhost:" + setting.port);
