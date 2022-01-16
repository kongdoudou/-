"use strict";
// const regeneratorRuntime = require('regenerator-runtime')

const regeneratorRuntime = {
  mark(genFn){
    return genFn
  },
  wrap(interatorFn) {
    const context = {
      next:0,
      done: false, // 表示迭代器还没有执行完成
      stop(){
        context.done = true; // 表示整个函数执行完成，迭代器停止
      },
      sent: null
    };
    let it = {};
    it.next = function(value){
      if(context.next) {
        context.sent = value;
      }
      
      let val = interatorFn(context);
      return {
        value: val,
        done: context.done
      }
    }
    return it;
  }
}
var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

function read() {
  var a, b, c;
  return regeneratorRuntime.wrap(function (_context) {
    while (1) { // while表示这个方法不止执行一次，方法会多次执行
      // 最开始next和prev的值都是0
      // console.log(_context);
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          a = _context.sent;
          console.log(a);
          _context.next = 6;
          return 2;

        case 6:
          b = _context.sent;
          console.log(b);
          _context.next = 10;
          return 3;

        case 10:
          c = _context.sent;
          console.log(c);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

let it = read();
console.log(it.next());
console.log(it.next(111));
console.log(it.next(222));
console.log(it.next(333));