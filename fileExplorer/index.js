/**
 * Created by Administrator on 2017/6/14 0014.
 */

var fs=require('fs');
var files;//当前目录下的文件
var stats=[];//当前文件的状态

process.stdin.on('data',function (data) {
    var filename=files[Number(data)];
    if(!filename){
        process.stdout.write('your choice is error! enter correct choice:')
    }else {
        process.stdin.pause();
        if(stats[Number(data)].isDirectory()){
            fs.readdir(__dirname+'/'+filename,function (err,fname) {
                console.log('('+fname.length+'files)');
                fname.forEach(function (item) {
                    console.log('-'+item);
                });
            })
        }else{
            fs.readFile(__dirname+'/'+filename,'utf8',function (err,data) {
                console.log(data.replace(/(.*)/g,'$1'));
                console.log(data);
            })
        }
    }
});

fs.readdir(process.cwd(),function (err,fnames) {
    files=fnames;
    if(!files.length){
        return console.log('no files')
    }
    file(0);
});


function file(i) {
    var filename=files[i];

    fs.stat(__dirname+'/'+filename,function (err,stat) {//stat为文件的状态
        stats[i]=stat;//保存文件的状态
        if(stat.isDirectory()){//判断是否文件夹
            console.log('  '+i+'\033[36m'+filename+'/\033[39m');
        }else{
            console.log('  '+i+'\033[90m'+filename+'\033[39m');
        }
        if(++i==files.length){
            process.stdout.write('enter your choice:');
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
        }else {
            file(i);
        }
    })
}

