// 文档：https://www.jianshu.com/p/e07a8a7c0ce7
function _instanceof(L, R) {
    if (typeof L !== 'object') return false

    L = L.__proto__
    R = R.prototype

    while (true) {
      if (L === null) return false

      if (L === R) return true

      L = L.__proto__
    }
}

// 测试
function Car(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
}
const auto = new Car('Honda', 'Accord', 1998)
console.log(_instanceof(auto, Object)) // expected output: true

// 测试
console.log(_instanceof([1, 2], Array)) // expected output: true
console.log(_instanceof({
    a: 1
}, Object)) // expected output: true