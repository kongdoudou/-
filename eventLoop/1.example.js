Promise.resolve().then(data => {
    console.log('promise1');
    Promise.resolve().then(data => {
        console.log('promise2');
    })
})

setTimeout(function(){
    console.log('setTimeout');
}, 1000)

// 执行结果：promise1、promise2、setTimeout