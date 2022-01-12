const Promise = require('./1.promise.js');
const fs = require('fs');

// 利用deferred解决 外层嵌套一个return new Promise的问题
function readFile(...args) {
    let dfd = Promise.deferred();
    fs.readFile(...args, function(err, data){
        if(err) return dfd.reject(err);
        dfd.resolve(data);
    })
    return dfd.promise; 
}

// readFile('../example/a1.txt','utf8').then(res => {
//     console.log('res', res);
// }).catch(err => {
//     console.log('err', err);
// })

let promise2 = new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve(200)
    }, 1000)
})

      
Promise.resolve(promise2).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})