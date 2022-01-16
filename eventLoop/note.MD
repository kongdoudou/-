浏览器的事件环
进程、线程

进程：浏览器分配任务和调度任务的最小单位

浏览器是一个多进程模型，每个页卡都是一个独立的进程（更稳定）
后台代码都是采用多进程

线程
常见的线程有哪些
GUI渲染线程（页面渲染、绘图、绘制、3D动画）
JS渲染引擎：执行JS代码，当JS执行时渲染线程会挂起，同样渲染的时候不能执行JS
事件触发线程：eventLoop
webApi：也会创建线程，事件、定时器、ajax请求等都会创建一个线程
webWorker（文档：http://www.ruanyifeng.com/blog/2018/07/web-worker.html）


常见的浏览器API整理：https://www.jianshu.com/p/cbfbce3d4787

宏任务：
script脚本、setTimeout、setInterval、UI渲染、setImmediate、事件、ajax、MessageChannel
微任务：
promise.then、mutationObserver、Object.observe、（Process.nextTick）、queueMicrotask
渲染有关:
requestAnimationFrame（大约16.6ms渲染一次页面，如果没有到达渲染时机，也有可能不渲染），渲染之前执行的
requestIDleCallback 空闲时间执行



## eventLoop执行过程
> 1、先执行script脚本，将宏任务和微任务进行分类，如果调用的是浏览器的api，浏览器会开一个线程，等时间到了会自动放入宏任务队列中，微任务是直接放到微任务队列中
> 2、JS执行完毕之后会清空所有的微任务，如果微任务再产生新的微任务，那么会把新产生的微任务放到当前微任务队列的尾部
> 3、如果页面需要渲染，则会进行渲染流程
> 4、事件触发线程会不停的扫描宏任务队列，如果宏任务队列中不为空，会取出来执行一个，继续执行上述过程
宏任务每次只执行一个，微任务会清空队列
同一时间内 大量操作dom 会被合并成一个 一起渲染 （布局抖动）
 除了第一次的宏任务之外  其他的是都先执行微任务 在执行宏任务 （微任务比宏任务快）


 每循环一次会执行一个宏任务，并清空对应的微任务队列，每次事件循环完毕后会判断页面是否需要重新渲染 （大约16.6ms会渲染一次）
 浏览器渲染是每一次eventLoop执行的末尾去检测是否要渲染，每轮只能有一个宏任务







