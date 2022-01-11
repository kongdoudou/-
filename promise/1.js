function noop() {}

var LAST_ERROR = null;
var IS_ERROR = {};

function getThen(obj) {
    try {
        return obj.then;
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

function tryCallOne(fn, a) {
    try {
        // TODO:这里为什么要return
        return fn(a);
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

function tryCallTwo(fn, a, b) {
    try {
        // TODO:这里为什么不要return
        fn(a, b);
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}


function Promise(fn) {
    if (typeof this !== 'object') {
        throw new TypeError('Promises must be constructed via new');
    }
    if (typeof fn !== 'function') {
        throw new TypeError('Promise constructor\'s argument is not a function');
    }
    this._deferredState = 0;
    this._state = 0;
    this._value = null;
    this._deferreds = null;
    // TODO：这里是做什么用的？
    if (fn == noop) return;
    doResolve(fn, this);
}

// 保证这个方法只执行一次（done作为执行的标识），这里不处理异步逻辑
function doResolve(fn, promise) {
    var done = false;
    // 这里其实是先看初始化传入的处理函数是否能够正确执行，不能的话直接失败，能的话就把成功和失败的操作给到用户
    var res = tryCallTwo(fn, function (value) {
        if (done) return;
        done = true;
        resolve(promise, value)
    }, function (reason) {
        if (done) return;
        done = true;
        reject(promise, reason);
    })
    // 同步执行出现问题之后触发reject
    if (!done && res === IS_ERROR) {
        reject(promise, LAST_ERROR);
    }
}

// self是当前的promise实例，newValue是值
function resolve(self, newValue) {
    // promise成功传入的value不能是实例本身
    if (newValue === self) {
        return reject(
            self,
            new TypeError('A promise cannot be resolved with itself.')
        );
    }
    if (newValue && (typeof newValue == 'object' || typeof newValue == 'function')) {
        // 如果传入的值是对象或者方法，需要判断是不是一个promise
        var then = getThen(newValue);
        // 如果获取then出现了错误
        if (then == IS_ERROR) {
            return reject(self, LAST_ERROR);
        }
        if (then === self.then && newValue instanceof Promise) {
            // TODO：3代表的是什么含义
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
        } else if (typeof then == 'function') {
            doResolve(then.bind(newValue), self);
            return;
        }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
}

function finale() {

}

function reject(self, newValue) {
    console.log(self, newValue)
}

// exports.Promise = Promise;
module.exports = Promise;