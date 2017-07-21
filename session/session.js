/**
 * Created by Administrator on 2017/7/12 0012.
 */
var express=require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var logger=require('morgan');
var users=require('./users');

var app=express();

app.set('view engine','ejs');
app.set('views',__dirname+'/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:'my app secret',
    saveUninitialized:false,
    resave:false,
    /*store: new MongoStore({   //创建新的mongodb数据库
        host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: 27017,          //数据库的端口号
        db: 'test-app'        //数据库的名称。
    }),*/
    name:'test',
    cookie:{
        maxAge:10*1000
    }
}));
app.use('/',function (req,res,next) {
    if(req.session.logged_in){
        res.send('welcome back'+req.session.name+'<a href="/logout">Logout</a>');
    }else{
        next();
    }
});
app.get('/',function (req,res) {
    res.send([
        '<form method="post" action="/login">',
        '<h1>Login</h1>',
        '<fieldset>',
        '<label>Please log in</label>',
        '<p>User:<input type="text" name="user"></p>',
        '<p>Password:<input type="password" name="password"></p>',
        '<button>submit</button>',
        '</form>'
    ].join(''));

});
app.post('/login',function (req,res) {
    if(!users[req.body.user]||req.body.password!=users[req.body.user].password){
        res.send('bad username/password');
    }else{
        req.session.logged_in=true;
        req.session.name=users[req.body.user].name;
        res.send('ok');
    }
});
app.use('/logout',function (req,res) {
    req.session.logged_in=false;
    res.send('logged out');
});
app.listen(3000);

