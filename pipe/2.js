function judge(ary) {
    if (!Array.isArray(ary) || !ary.length) return false;
    ary.sort((a, b) => {
        return a - b;
    })
    ary = ary.map(item => item % 13);
    for (let i = 0; i < ary.length - 5; i++) {
        let currentAry = ary.slice(i, i + 5);
        let newSet = new Set(currentAry);
        if (newSet.size == 5 && ((currentAry[currentAry.length - 1] - currentAry[0] == 4) || (currentAry[currentAry.length - 1] - currentAry[1] == 3 && currentAry[0] == 3))) {
            return true;
        }
    }
    return false;
}
let arr = [8, 2, 4, 5, 6, 7, 18, 11] // 18 是红桃6，所以 4 5 6 7 8 是顺
let arr2 = [0, 4, 6, 7, 8, 9, 11]
console.log(judge(arr)) // true
console.log(judge(arr2)) // false