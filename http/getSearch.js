/**
 * Created by Administrator on 2017/7/3 0003.
 */
var http=require('http');
var querystring=require('querystring');

var search=process.argv.slice(2).join(' ').trim();
if(!search.length){
    return console.log('\n Usage:node cnblogs <search term>');
}
console.log('searching for: '+search);
var req=http.request({
    host:'http://www.cnblogs.com/aicanxxx',
    //path:'/s/blogpost?'+querystring.stringify({Keywords:search}),
    //host:'search.twitter.com',
    path:'/search.json?'+querystring.stringify({q:search}),
    method:'GET'
},function (res) {
    var body='';
    res.setEncoding('utf8');
    res.on('data',function (data) {
        body+=data;
    });
    res.on('end',function () {
        //console.log(body);
        var obj=JSON.parse(body);
        obj.results.forEach(function (index) {
            console.log(index.text);
            console.log(index.from_user);
            console.log('---')
        })
    })
});
//console.log(req);
req.end();