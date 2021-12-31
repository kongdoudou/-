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

SSL的加密和解密过程
https://blog.csdn.net/weixin_45309916/article/details/108214105

HTTP1.1和HTTP2.0的区别
Http1.0 客户端的每一个请求必须重新连接，这是非常耗时和资源的
Http1.1 
长连接存在对头阻塞问题，添加并行的tcp连接能够减轻这个问题，但是tcp连接的数量是有限的
对头阻塞问题 -- 当一个队头的请求不能收到响应的资源，它将会阻塞后面的请求

HTTP2.0
SYPD：新协议的功能包括数据流的多路复用、请求优先级以及HTTP报头压缩
交错的请求和响应能够并行的传输而不被阻塞。该过程被称作多路复用技术。
因为多路复用允许客户端并行的构建多个流，这些流仅仅需要一个tcp连接。

流优先级不仅仅解决同一资源的竞态问题，也允许开发人员自定义请求的权重。

http1.1把所有请求和响应作为纯文本不同，http2 使用二进制框架层把所有消息封装成二进制，且仍然保持http语法

头部压缩
https://www.jianshu.com/p/63fe1bf5d445

node缓存
参考文档：https://blog.csdn.net/qq_32438227/article/details/115125382
- 强制缓存
Expires：HTTP1.0 描述的是一个绝对时间，由服务器返回,受限于本地时间，如果修改了本地时间，就会造成缓存失效
Cache-Control:HTTP1.1 常见字段是max-age，单位是秒，很多web服务器都有默认配置，优先级高于Expires，表示的是相对时间
Cache-Control 还拥有多个值：
no-cache 不直接使用缓存，也就是跳过强缓存。
no-store 禁止浏览器缓存数据，每次请求资源都会向服务器要完整的资源。
public 可以被所有用户缓存，包括终端用户和 CDN 等中间件代理服务器。
private 只允许终端用户的浏览器缓存，不允许其他中间代理服务器缓存。
*no-cache和no-store的区别，no-cache是跳过强缓存，还是会走协商缓存的步骤，而no-store是真正的完全不走缓存，所有资源都不会缓存在本地*

- 协商缓存
*注意！！协商缓存需要配合强缓存使用，使用协商缓存需要先设置Cache-Control：no-cache或者pragma：no-cache来告诉浏览器不走强缓存*
【Last-Modified，If-Modified-Since】
表示本地文件最后修改日期
请求头字段：If-Modified-Since
响应头字段：Last-Modified
Last-Modified有几个问题。
文件虽然被修改了，但最终的内容没有变化，这样文件修改时间还是会被更新
有的文件修改频率在秒以内，这时候以秒粒度来记录就不够了
有的服务器无法精确获取文件的最后修改时间

【ETag、If-None-Match】
Etag 的值由服务端生成
浏览器会将 Etag 信息放到 If-None-Match 请求头去访问服务器

前端内存泄露及处理办法
不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。
https://zhuanlan.zhihu.com/p/408482908
https://zhuanlan.zhihu.com/p/411103328

中间件原理
https://zhuanlan.zhihu.com/p/274325699

nextTick -- 详细看下


