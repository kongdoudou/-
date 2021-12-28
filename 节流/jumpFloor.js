// 参考文档：https://blog.csdn.net/cn_yefeng/article/details/80416448

// 时间复杂度为O(2^n) 2的n次方
function jumpFloor(n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 2;
    } else {
        return jumpFloor(n - 1) + jumpFloor(n - 2)
    }
}


// 时间复杂度为O(n)
function jumpFloor2(n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 2;
    }
    let target = 0;
    let number_1 = 1,
        number_2 = 2;
    for (let i = 3; i <= n; i++) {
        target = number_1 + number_2;
        number_1 = number_2;
        number_2 = target;
    }
    return target;
}

console.log(jumpFloor(30));
console.log(jumpFloor2(10000));