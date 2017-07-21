/**
 * Created by Administrator on 2017/6/29 0029.
 */
/*server.js*/
var net=require('net');
var count=0;
var users={};

var server=net.createServer(function (conn) {//net.server
    conn.setEncoding('utf8');
    conn.write(count+' people are connected'
        +'\nplease write your nickname:');
    count++;
    var nickname;
    conn.on('data',function (data) {
        data=data.replace(/\r\n/,'');
        if(!nickname){
            if(users[data]){
                conn.write('\n nickname already used,try again:');
                return;
            }else {
                nickname=data;
                users[nickname]=conn;
                for(var i in users){
                    users[i].write(nickname+' join the romm\n');
                }
            }
        }else {
            conn.write('发送者nickname: '+nickname+'\n');
            for(var i in users){
                if(i!=nickname){
                    users[i].write(nickname+': '+data+'\n');
                }
            }
        }
    });
    conn.on('close',function () {//这里防止连接出错，使用close而非end
        console.log(nickname+' client disconnected\n');
        count--;
        delete users[nickname];
    });
    conn.on('error',function (err) {
        console.log('Error in connection:'+ err+'\n');
    });
}).listen(3000,function () {
    console.log('server is listenning on 3000');
});