let fs = require('fs');
let path = require('path');
// let fs = require('fs').promises; // 将fs库里面的所有方法都转换成promise的形式
/**
 * let util = require('util');
 * let readFile = util.promisify(fs.readFile); // 使用util库的promisify方法将单个方法转换成promise方法
*/

function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args,function(err, data){
                // node所有的API方法中第一个参数都是err
                if(err) return reject(err);
                resolve(data);
            }) 
        })
    }
}

// promisifyAll：把对象中的所有方法包装成promise
// todo:forin forof区别 https://blog.csdn.net/q5706503/article/details/82950764
function promisifyAll(obj) {
    for(let key in obj) {
        if(typeof obj[key] == 'function') {
            obj[key] = promisify(obj[key])
        }
    }
    return obj;
}

// let readFile = promisify(fs.readFile);
let {readFile} = promisifyAll(fs);

let fileUrl = path.resolve(__dirname, 'note.MD')
readFile(fileUrl, 'utf8').then(data => {
    console.log(data);
}, err => {
    console.log(err);
})


