const obj = {
    a: {
        b: 1,
        c: 2,
        d: {
            e: 5
        }
    },
    b: [1, 3, {
        a: 2,
        b: 3
    }],
    c: 3
}

function flatten(obj) {
    // 如果非对象不进行处理
    if (Object.prototype.toString.call(obj) != '[object Object]') return;

    let result = {};
    
    function inner(obj, preKey = '') {
        let keys = Object.keys(obj);
        if (keys && keys.length) {
            keys.forEach(key => {
                let currentKey;
                if (/\d/g.test(key)) {
                    currentKey = preKey ? preKey + '[' + key + ']' : key;
                } else {
                    currentKey = preKey ? preKey + '.' + key : key;
                }
                if (typeof obj[key] == 'object') {
                    inner(obj[key], currentKey);
                } else {
                    result[currentKey] = obj[key];
                }
            })
        }
    }

    inner(obj);

    return result;
}

flatten(obj)

// flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }