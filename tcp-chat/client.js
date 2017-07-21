/**
 * Created by Administrator on 2017/6/29 0029.
 */
/*client.js*/
var net=require('net');
var stop = false;
process.stdin.resume(); //process.stdin流来接受用户的键盘输入，这个可读流初始化时处于暂停状态，调用流上的resume()方法来恢复流

process.stdin.on('data', function(data){
    if(data.toString().trim().toLowerCase()==='stop'){
        stop=true;
        console.log('connection stop\n');
        client.end();
    }else{
        client.write(data);
    }
});

var client=net.createConnection(3000,function () {//net.socket
    console.log('connected to server!\n');
});
client.on('data', function(data) {
    console.log(data.toString());
});
client.on('error', function(err) {
    console.log('Error in connection:'+ err+'\n');
});
client.on('close', function() {
    if(! stop) {
        console.log('connection got closed');
    }
});

//连接时设置最多连接十次，并且开启定时器三秒后再连接
/*function connect() {
    function reconnect() {
        if (retriedTimes >= maxRetries) {
            throw new Error('Max retries have been exceeded, I give up.');
        }
        retriedTimes +=1;
        setTimeout(connect, retryTimeout);
    }

    conn = net.createConnection(port);

    conn.on('connect', function() {
        retriedTimes = 0;
        console.log('connect to server');
    });

    conn.on('error', function(err) {
        console.log('Error in connection:', err);
    });

    conn.on('close', function() {
        if(! quitting) {
            console.log('connection got closed, will try to reconnect');
            reconnect();
        }
    });

    //打印
    conn.pipe(process.stdout, {end: false});
}
connect();*/