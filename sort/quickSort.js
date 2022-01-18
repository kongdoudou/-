/*
大致分三步：

1、找基准（一般是以中间项为基准）
2、遍历数组，小于基准的放在left，大于基准的放在right
3、递归
*/

var arr = [6, 7, 3, 2, 9];

function quickSort(arr) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;
    let pointIndex = Math.floor(arr.length / 2);
    let point = arr.splice(pointIndex, 1)[0];
    let left = [],
        right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < point) {
            left.push(arr[i])
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(point, quickSort(right));
}

console.log(quickSort(arr));