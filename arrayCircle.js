// JS:顺时针打印二维数组

// 将二维数组按照顺时针的顺序打印出来。例如


const arr = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
]

// 应该输出1 2 3 4 5 10 15 20 19 18 17 16 11 6 7 8 9 14 13 12
// [1,  2,  3,  4,  5, 10, 15,20, 19, 18, 17, 16, 11,  6,7,  8,  9, 14, 13, 12]

function getStr(arr) {
    if (!Array.isArray(arr)) return;
    let result = [];
    while (arr.length) {
        // 第一行顺序执行
        let first = arr[0];
        // 中间部分循环，先取尾部，执行完最后一行之后取头部
        let enters = arr.slice(1, arr.length - 1);
        // 最后一行倒序执行
        let end = arr[arr.length - 1];
        result.push(...first);

        let entersEnd = [],
            entersStart = [];
        enters.forEach(item => {
            let start = item.splice(0 ,1);
            entersStart.push(...start);
            let last = item.splice(item.length - 1);
            entersEnd.push(...last);
        })


        result.push(...entersEnd);

        end = end.reverse();
        result.push(...end);

        entersStart = entersStart.reverse();
        result.push(...entersStart);

        arr = enters;
    }

    return result;
}

console.log(getStr(arr));