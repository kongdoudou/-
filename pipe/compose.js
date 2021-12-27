// pipe(fn1,fn2,fn3,fn4)(args)等价于fn4(fn3(fn2(fn1(args)))
// 第一个函数的结果，作为第二个函数的参数，以此类推...

// compose
// compose(fn1,fn2,fn3,fn4)(args)等价于fn1(fn2(fn3(fn4(args)))
// 与pipe相反，先计算倒数第一个结果，作为倒数第二的参数，以此类推...

let loopItem = (prevFn, nextFn) => {
    return (...args) => {
        return prevFn(nextFn(...args));
    }
}

const compose = (...fns) => fns.reduce(loopItem);
const pipe = (...fns) => fns.reduceRight(loopItem);

console.log(compose);


let fn3 = function (x, y, z) {
    return x + y + z
}

let fn1 = function (y) {
    return y
}

let fn2 = function (x) {
    return x + 1
}

console.log(compose(fn1, fn2, fn3)(3,4,5));
console.log(pipe(fn3, fn2, fn1)(3,5,5));