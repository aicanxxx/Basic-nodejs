/**
 * Created by Administrator on 2017/7/3 0003.
 */
var http=require('http');
var querystring=require('querystring');

function send(name) {
    var req=http.request({
        host:'127.0.0.1',
        port:'3000',
        method:'GET',
        url:'/'
    },function (res) {
        res.setEncoding('utf8');
        res.on('data',function (data) {
            body+=data;
        });
        res.on('end',function () {
            console.log('request finish');
            process.stdout.write('\nyour name:');
        })
    });
    req.end(querystring.stringify({name:name}));
}
process.stdout.write('\nyour name:');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data',function (data) {
    send(data.replace(/\n/,''));
});