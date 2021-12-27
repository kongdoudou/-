// 深拷贝和浅拷贝

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};

target.target = target;

const result = deepClone(target);

console.log(result);

function deepClone(target,map=new Map()) {
    if (typeof target == 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.has(target)) {
            return target
        }
        map.set(target, cloneTarget);
        for (let key in target) {
            cloneTarget[key] = deepClone(target[key],map);
        }
        return cloneTarget;
    } else {
        return target;
    }
}



// 4445 442 数组找交集
// 给你一个函数，高阶函数，调用了一次之后返回，输入次数和等待时间，下次调用这个函数 3