// const list = [1, 2, 3];
// const square = num => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(num * num);
//         }, 1000);
//     });
// }
// function test() {
//     list.forEach(async x => {
//         const res = await square(x);
//         console.log(res);
//     });
// }
// test();


// 题目描述
// 标题：实现一个retry函数，执行失败时重试指定的次数​
// 描述信息​
// 编码题：​
// 实现一个retry函数，执行失败时重新执行，直至执行成功或到达最大重试次数，每次重试间隔时间为 interval 秒​
// 注：​
// 函数可以为同步也可以为异步​
// 抛出异常被视为执行失败，其它则为成功​
// func 要执行的函数，返回promise​
// times 为重试次数​
// interval 为每次重试的间隔，单位为ms​
function retry(func, times, interval) {
    let time = 0;
    let timer = null;
    //补全代码​
    function inner(...args){
        return new Promise((resolve, reject) => {
            timer = setTimeout(() => {
                if(time >= times) clearTimeout(timer);
                time++;
                func(...args).then(resolve, reject).catch(err=> {
                    inner(...args)
                })
            }, interval)
        })
    }
    return inner;
}​
//调用如下：​
function request(url) {
    ​
    return axios.get(url)​
}​
const guaranteed = retry(request, 10, 3000);​
guaranteed(url).then(console.log).catch(console.error)