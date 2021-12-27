let p1 = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve(10)
    }, 1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(function () {
        resolve(20)
    }, 2000)
})

let p3 = 'sync'

function all(ary) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(ary)) return;
        let count = 0,
            result = [];
        ary.forEach((item, index) => {
            if (typeof item == 'object' && typeof item.then == 'function') {
                item.then((data) => {
                    result[index] = data;
                    count -=1;
                    if(count == 0) resolve(result);
                }, reject);
                count += 1;
            } else {
                result[index] = item;
            }
        })
    })
}

function race(ary) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(ary)) return;
        ary.forEach((item, index) => {
            if (typeof item == 'object' && typeof item.then == 'function') {
                item.then(resolve, reject);
            } else {
                resolve(item);
            }
        })
    })
}


all([p1, p2, p3]).then((result) => {
    console.log(result);
}, e => {
    console.log('error', e);
})


race([p1, p2]).then((result) => {
    console.log(result);
}, e => {
    console.log('error', e);
}).catch(err => {
    console.log(err);
})