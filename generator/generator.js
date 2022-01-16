function* read() { // *表示当前是一个generator函数，可以将函数切成若干个部分
    const a = yield 1;
    console.log(a);
    const b = yield 2;
    console.log(b);
    const c = yield 3;
    console.log(c);
}

// 方法碰到yield就停止

let it = read();
// 调用next方法就是给上一次yield的返回值赋值
// 第一次调用next传参是无意义的，因为不存在上一个yield
console.log(it.next(111)); // { value: 1, done: false }
console.log(it.next(222)); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: undefined, done: true }

/*
console.log([...{
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function* () {
        let i = 0;
        while (i !== this.length) {
            yield this[i++]
        }
    }
}]);

console.log([...{
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function() {
        let i = 0;
        return {
            next: () => { // 迭代时候会调用next方法，然后返回{value, done}两个属性
                return {
                    value: this[i],
                    done: i++ == this.length
                }
            }
        }
    }
}]);
*/

// 迭代器就是可以调用next方法返回一个{value,done}的对象

// generator返回的就是一个迭代器生成函数