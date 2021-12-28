# -
> 节流和防抖：https://www.cnblogs.com/momo798/p/9177767.html


-- 浏览器操作 DOM 是很耗费性能的？
 JavaScript中js引擎和渲染引擎(浏览器内核)是独立实现的。
 使用js 去操作 DOM 时,本质上是 JS 引擎和渲染引擎之间进行了“跨界交流”。
 每操作一次 DOM,都要跨界一次。跨界的次数一多,就会产生比较明显的性能问题

 js 操作 Dom 很耗性能，其实是在说很耗浏览器性能，具体和 js计算 性能没多大的关系；


git pull和git fetch的区别：https://www.jianshu.com/p/5adc552323ca

###多层数组嵌套变成一维的拉平
> 因为之前我想用es6新增的flat方法进行数组的拉平，发现不行。我又查找了一下资料，flat用于数组层层嵌套的拉平.如：const arr2 = [1,2, [3, 4, [5, 6, [7, 8]]]];可以使用flat，变成：[1, 2, 3, 4, 5, 6, 7, 8];
flat默认只会拉平一层，但可以在flat方法中加入参数。默认为1（拉平一层）。
但这样设置参数比较有局限性，使用参数Infinity，可以不管多少参数都拉平成一层。

```
arr2.flat();
//[1, 2, 3, 4, [5, 6, [7, 8]]];
arr2.flat(1); 
//同上
arr2.flat(2);
//[1, 2, 3, 4, 5, 6, [7, 8]];
arr2.flat(Infinity);
//[1, 2, 3, 4, 5, 6, 7, 8 ];
```

隐式转换
https://blog.csdn.net/itcast_cn/article/details/82887895

JS常用函数垫片
https://blog.csdn.net/weixin_33850890/article/details/91461543

promise的原生写法 promise.all Promise.race
https://blog.csdn.net/qq_42880714/article/details/105792817


算法中复杂度的算法
https://www.cnblogs.com/ajaemp/p/13931262.html


