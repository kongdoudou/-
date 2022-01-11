const Promise = require('./1.js');
// 如果引入的文件中没有module.exports或者exports的导出，那么拿到的是空对象

const p1 = new Promise((resolve, reject) => {
    resolve(1);
})