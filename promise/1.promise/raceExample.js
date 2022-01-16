let fs = require('fs').promises;
let Promise = require('./1.promise.js');

// promise的请求是没有办法中断的，无论如何都会执行完成，可以在未执行完成的时候去指定promise的状态

let p = new Promise((resolve, reject) => {
    setTimeout(function(){
        console.log('三秒之后执行完成')
        resolve('三秒之后成功或者失败')
    }, 3000)
})

// 可以设置请求超时
function wrap(old) {
    let fn = {};
    let newP = new Promise((resolve, reject) => {
        fn.resolve = resolve;
        fn.abort = reject;
    })
    let returnPeomise = Promise.race([old, newP]);
    returnPeomise.fn = fn;
    return returnPeomise;
}

let newPromise = wrap(p);


setTimeout(function(){
    newPromise.fn.abort('请求超时')
}, 2000)

newPromise.then(data => {
    console.log('data', data);
}, err => {
    console.log('err', err);
})


// 中断promise，不向下继续执行：返回一个等待态的promise
Promise.resolve(1).then(data => {
    console.log(data);
    return new Promise(() => {}); // 返回一个promise，会采用他的状态，如果不成功也不失败那么也不会继续向下执行了
}).then(data => {
    console.log('data2', data);
}).catch(err => {
    console.log(err);
})