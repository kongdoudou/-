const Promise = require('./1.promise.js');
const fs = require('fs').promises;

// 利用deferred解决 外层嵌套一个return new Promise的问题
// function readFile(...args) {
//     let dfd = Promise.deferred();
//     fs.readFile(...args, function (err, data) {
//         if (err) return dfd.reject(err);
//         dfd.resolve(data);
//     })
//     return dfd.promise;
// }

// readFile('../example/a1.txt','utf8').then(res => {
//     console.log('res', res);
// }).catch(err => {
//     console.log('err', err);
// })

// let promise2 = new Promise((resolve, reject) => {
//     setTimeout(function () {
//         resolve(100100)
//     }, 1000)
// })



// Promise.reject('abc').finally((...args) => {
//     console.log('无论成功和失败都执行', args)
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(100) 
//             // reject('xxxxxxxxxx'); // 如果这里是失败，那么会把失败的原因传递到下一个then里面去
//         }, 1000);
//     })
// }).then(data => {
//     console.log(data);
// }, err => {
//     console.log('err', err);
// })

// Promise.all([1, fs.readFile('promise/example/a.txt', 'utf8'),fs.readFile('promise/example/a.txt', 'utf8')]).then(data => {
//     console.log(data);   
// })


// let promise1 = Promise.resolve(new Promise((resolve, reject) => {
//     reject(123)
// }))

// promise1.then(data => {
//     console.log(data);
// }, err => {
//     console.log('err', err);
// })


Promise.race([fs.readFile('promise/example/a1.txt', 'utf8'),fs.readFile('promise/example/b.txt', 'utf8')]).then(value => {
    console.log(value);
},err => {
    console.log(err);
})