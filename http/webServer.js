/**
 * Created by Administrator on 2017/7/2.
 */
//提交表单数据
var http=require('http');
var querystring=require('querystring');

var server=http.createServer(function (req,res) {
    //查询字符串不同则返回的页面不同
    if('/'==req.url){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write([
            '<form method="post" action="/url">',
            '<h1>My Form</h1>',
            '<fieldset>',
            '<label>Personal Information</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name">',
            '<button>submit</button>',
            '</form>'
        ].join(''));
        res.end();
    }else if('/url'==req.url&&req.method=='POST'){
        var reqBody='';
        req.on('data',function (data) {
            reqBody += data;
        });
        req.on('end',function () {//用于数据接收完成后再获取
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write('you have sent a '+req.method+' request\n');
            res.write('<p>Content-Type:'+req.headers['content-type']+'</p>'
                +'<p>Data:your name is '+querystring.parse(reqBody).name+'</p>');
            res.end();
        })
    }else{
        res.writeHead(404);
        res.write('Not Found');
        res.end();
    }
}).listen(3000,function () {
    console.log('server is listening 3000');
});