/**
 * Created by Administrator on 2017/3/17 0017.
 */
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
/*const http=require('http');
options= {
    host: 'www.cnblogs.com',
    port: '80',
    method: 'GET',
    path: '/aicanxxx',
};
var req=http.request(options,function (res) {
    console.log(res.statusCode);
    console.log(JSON.stringify(res.headers));
    res.on('data',function (chunk) {
        console.log(chunk);
    });
    res.on('end',function () {
        console.log('响应已结束');
    });
});
req.on('error',function (err) {
    console.log(err.message);
});

req.write('');//往请求体写入数据
req.end();//完成请求并发送
console.log(req instanceof http.IncomingMessage);
console.log(req instanceof http.ClientRequest);
console.log(req);*/