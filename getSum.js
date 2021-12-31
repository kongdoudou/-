let ary = [2, 2, 3, 4, 7];

// 所有加起来可能是7的结果
function getSum(ary, num) {
    let length = ary.length;
    let result = [];
    // len表示要截取的长度
    for (let len = 1; len <= length; len++) {
        // length - len + 1，最多可截取的循环次数
        for (let i = 0; i < length - len + 1; i++) {
            // 包前不包后
            let current = ary.slice(i, i + len);
            let sum = current.reduce((prev, next) => prev + next);
            if (sum == num) {
                result.push(current);
            }
        }
    }
    return result;
}

console.log(getSum(ary, 7)); // [ [ 7 ], [ 3, 4 ], [ 2, 2, 3 ] ]