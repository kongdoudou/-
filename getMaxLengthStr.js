/* 找出重复子串中最长的字符串（如果存在多个最长子串，返回其中之一就可以）
例：字符串'aabcedbaaabcfg' ，重复最长的子串为'aabc'
提示：substr(n, m)可以截取字符串从n位置到m位置的字符串
*/

// 算法思路：

// 1.生成后缀数组
// 2.后缀数组按字母顺序排序，方便有重复子串的数组挨在一起
// 3.比较相邻数组，求最大前缀长度；记录所有结果中的最大前缀长度和数组
// 4.记录的数组取记录长度的前缀即结果

let str = "aabcedbaaabcfg",
    suffixArr = [],
    len = str.length,
    maxStrIndex = -1,
    maxLen = 0,
    i, j;

for (i = 0; i < len; i++) { //生成后缀数组
    suffixArr[i] = str.substring(i, len);
}
suffixArr.sort(); //按字母排序

for (i = 0; i < len - 1; i++) { //比较相邻数组求最长子串
    j = 0;
    while (suffixArr[i][j] == suffixArr[i + 1][j]) {
        j++;
    }

    if (j > maxLen) {
        maxStrIndex = i;
        maxLen = j;
    }
}
console.log(suffixArr[maxStrIndex].substring(0, maxLen)); //最长重复子串