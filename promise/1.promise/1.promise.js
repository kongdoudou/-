const {
    resolve4
} = require("dns");

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// 原生的es6 是自己实现了promise 不需要考虑兼容
// 1.promise是一个类 在使用的时候 需要new这个类
// 2,在newPromise的时候 需要传入一个executor执行器 默认会立即被调用，而且参数有两个 resolve,reject
// 3.promise有三个状态 分别是 pendding 默认等待态  onfulfilled 成功态  onrejected 失败态
//   我们的promise默认就是pendding 当用户调用resolve时会变成成功态 调用reject的时候会变成失败态
//   成功可以传入成功的原因 失败可以传入失败的原因
// 4.new Promise 会返回一个promise实例 这个实例上有一个then方法 , then方法中有两个参数一个是成功的回调一个是失败的回调
// 5.走向失败有两种情况 reject()以及用户主动抛出异常
// 6.一个promise中可以then多次 （发布订阅模式）
// 7.promise的状态是不能从成功变成失败，也不能从失败变成成功 只有pendingg的时候才能更改状态

// Promise A+规范
// https://promisesaplus.com/#notes

function Promise(executor) {
    this.status = PENDING;
    // 成功的回调
    this.value = undefined;
    // 失败的回调
    this.reason = undefined;
    // 异步方法
    this.onResolvedCallbacks = []; // 存放成功的回调
    this.onRejectedCallbacks = []; // 存放失败的回调

    let resolve = (value) => {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn(this.value));
    }
    let reject = (reason) => {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn(this.reason));
    }
    try {
        executor(resolve, reject)
    } catch (err) {
        reject(err);
    }
}

/**
 * 可以在then方法中返回一个promise，promise会采用返回的promise的成功以及失败回调的返回值，传递到下一层的then中
 * 1、如果在then方法中，成功或者失败的回调返回的是一个promise，那么会根据返回的promise的状态，走下一层then中的成功或者失败，同时会将成功或者失败的值也向下传递
 * 2、如果在then方法中，成功或者失败的回调函数返回的是一个普通值（非promise），会将返回的结果传递到下一个then的成功中去
 * 3、如果在then方法中，成功或者失败的函数抛出了错误，那么会走到下一层then的失败中去，如果下一层then中没有失败的处理会走到catch中
 * 4、只有两种情况会走到下一个then的失败中：1）返回的是一个失败态的promise 2）成功或者失败的函数执行中抛出了错误
 */

Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected == 'function' ? onRejected : e => {
        throw e
    };
    let promise2 = new Promise((resolve, reject) => {
        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })
        } else if (this.status === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(x, promise2, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            }, 0)
        } else if (this.status === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(x, promise2, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            }, 0)
        }
    })
    return promise2;
}

function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        // 循环引用的情况
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
        let called = false; // 只能调用一次
        // 只有x是一个函数或者对象的时候才有可能是一个promise
        try {
            let then = x.then;
            if (typeof then === 'function') {
                // 如果x是Promise，那么根据这个promise的状态决定到底是执行resolve还是reject
                // x.then:会再次取值 then.call(x):不需要再次取then方法
                // 这里相当于执行x的then方法，并且根据当前promise的状态去判定执行resolve还是reject
                then.call(x, (y) => {
                    // y有可能是一个promise,所以要一直解析，不停的解析直到是一个普通值
                    if (called) return;
                    called = true;
                    resolvePromise(y, promise2, resolve, reject);
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // 如果x是普通值，那么直接执行resolve
        resolve(x);
    }
}

// promise写法是否符合规范的验证工具：https://github.com/promises-aplus/promises-tests
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};


module.exports = Promise;