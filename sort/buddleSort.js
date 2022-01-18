    // 编写方法，实现冒泡
    var arr = [6,7,3,2,9];
    //外层循环，控制趟数，每一次找到一个最大值
    for (var i = 0; i < arr.length - 1; i++) {
        console.log(i);
        // 内层循环,控制比较的次数，并且判断两个数的大小
        for (var j = 0; j < arr.length - 1 - i; j++) {
            // 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
            console.log(j, arr);
        }  
        console.log('---------')
    }
    console.log(arr); //[2, 4, 5, 12, 31, 32, 45, 52, 78, 89]

    // https://www.jb51.net/article/105688.htm
    // https://www.cnblogs.com/alaner/p/9515070.html