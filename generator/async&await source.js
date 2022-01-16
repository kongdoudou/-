let fs = require('fs').promises;
const regeneratorRuntime = require('regenerator-runtime')

let path = require('path');

let startUrl = path.resolve(__dirname, 'a.txt');
// console.log(startUrl);

"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function read() {
    return _read.apply(this, arguments);
}

function _read() {
    _read = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var a, b;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fs.readFile(startUrl, 'utf8');

                    case 2:
                        a = _context.sent;
                        _context.next = 5;
                        return fs.readFile(a, 'utf8');

                    case 5:
                        b = _context.sent;
                        return _context.abrupt("return", b);

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));
    return _read.apply(this, arguments);
}

let it = read();
it.then(data => {
    console.log('data', data);
})

// async + await = co + generator (语法糖)
// 看起来像同步方法，但是内部还是递归调用异步方法