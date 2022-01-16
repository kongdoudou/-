let fs = require('fs').promises;

let path = require('path');

let startUrl = path.resolve(__dirname, 'a.txt');
// console.log(startUrl);

function * read(){
    let a = yield fs.readFile(startUrl,'utf8');
    let b = yield fs.readFile(a, 'utf8');
    return b
}

let it = read();
// let {value, done} = it.next();
// value.then(data => {
//     let {value, done} = it.next(data);
//     console.log(done);
//     value.then(data => {
//         let {value, done} = it.next(data);
//         console.log(value, done);
//     })
// })


function co(it){ // co的核心源码
    return new Promise((resolve,reject)=>{
        function next(data){
            let {value,done} = it.next(data); // 拿到 done 是否完成 value就是本次yield的返回值
            if(done){ // 如果解析完毕直接将结果作为co的成功结果
                return resolve(value)
            }
            Promise.resolve(value).then(data=>{
                next(data)
            },reject)
        }
        next();
    })
}

co(it).then(data => {
    console.log('data', data);
});