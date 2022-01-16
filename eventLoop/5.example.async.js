/*
console.log(1);
async function async () {
    console.log(2);
    await console.log(3);
    console.log(4)
}
setTimeout(() => {
	console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7)
})
promise.then(res => {
	console.log(res)
})
async (); 
console.log(8);

// 1 6 2 3 8 7 4 5 

// async返回的是一个promise
// await 等同于Promise.resolve(console.log(3)).then(data => {console.log(4)})
*/

Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4) // then里面返回的如果是一个promise，那么会取这个promise的then，然后由于浏览器规范的原因，会再注册一个then，也就是这里会存在两个then
}).then(res => {
    console.log(res);
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
})

// 在ECMAScript规范中，如果返回的是一个promise，那么不会立即处理这个promise，而是把这个promise放到异步方法中执行（再生成一个微任务）

// 0 1 第一个空then 2 第二个空then 3 4 5