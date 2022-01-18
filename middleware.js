// 定义几个中间间函数
function middlewareA(req, res, next) {
    console.log('middlewareA before next()');
    next().then(()=>{
        console.log('middlewareA after next()');
    });
}

function middlewareB(req, res, next) {
    console.log('middlewareB before next()');
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            next();
            resolve('end');
            console.log('middlewareB after next()');
        }, 2000);
    })
}

function middlewareC(req, res, next) {
    console.log('middlewareC before next()');
    next();
    console.log('middlewareC after next()');
}

// 中间件集合
// 中间件的实现原理：将执行下一个中间件的函数传递给下一个中间件的next参数
const middlewares = [middlewareA, middlewareB, middlewareC]

function useApp (req, res) {
    const next = () => {
      const middleware = middlewares.shift()
      if (middleware) {
        // 将返回值包装为Promise对象
        return Promise.resolve(middleware(req, res, next))
      }else {
        return Promise.resolve("end")
      }
    }
    next()
  }

useApp();

// 参考文档：
// https://blog.csdn.net/KlausLily/article/details/109506490
// https://blog.csdn.net/qdmoment/article/details/102523152  