// 参考文档：https://www.jianshu.com/p/af3f41d8ef99
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
    return name + ',' + age + ',' + this.value;
}

Function.prototype.call_ = function(context, ...args) {
    context = context || window;
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.myApply = function(context, args) {
    context = context || window;
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.myBind = function(context) {
    let fn = this;
    let args = Array.prototype.slice.call(arguments, 1);
    return function(...params) {
        args = args.concat(params);
        let result = fn.apply(context, args);
        return result;
    }
}

// bar.call_(foo, 'Cherry', 18);

let fn = bar.myBind(foo, 'FIGHTING');
console.log(fn(2));

// bar.myApply(foo, ['Kongcuijuan', 30]);

