const Promise = require('./1.promise.js');
const fs = require('fs');

function readFile(...args) {
    return new Promise((resolve, reject) => {
        fs.readFile(...args, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// readFile('../example/a.txt', 'utf8').then(data => {
//     readFile(data, 'utf8')
//     return 100
// }).then(data => {
//     console.log('data', data);
// }, error => {
//     console.log('error', error);
// })


/*
let promise2 = new Promise((resolve, reject) => {
    resolve('ok')
}).then(data=>{
    return data
})

// 执行then的过程中已经抛出了错误，也就是这个时候promise2的状态已经是失败态了
// console.log(promise2);

promise2.then(data => {
    console.log('data1', data);
},err=>{
    console.log('err', err);
})
*/

// promiseResolve方法中的问题
// 问题1：循环引用的例子
/*
let promise2 = new Promise((resolve, reject) => {
    resolve(100)
}).then(data => {
    // 造成循环引用的原因：外层定义的promise2需要等这里的函数返回结果决定是成功态还是失败态，循环引用会造成自己等自己
    return promise2
})

promise2.then(res => {
    console.log(res);
}, err => {
    console.log('err', err);
})
*/

// 问题2：x.then取值的时候有可能会抛出错误
/*
let x = {};
Object.defineProperty(x, 'then', {
    get() {
        return new Error('error')
    }
})

console.log(x.then);
*/

/**
 * 问题3：值的穿透
*/
let promise = new Promise((resolve, reject) => {
    reject('ok')
}).then().then().then().then(data => {
    console.log(data)
}, err => {
    console.log(err, 'err')
})

// 示例：返回值中嵌套promise的情况
/*
let promise2 = new Promise((resolve, reject) => {
    resolve('ok')
}).then((data) => {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(new Promise((resolve, reject) =>{
                resolve('last'+ data)
            }))
        }, 2000)
    })
})

promise2.then(data => {
    console.log(data)
},err => {
    console.log(err);
})
*/
